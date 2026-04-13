#!/usr/bin/env node
const { program } = require('commander');
const { promisify } = require('util');
const execFile = promisify(require('child_process').execFile);
const colour = require('bash-color');
require('dotenv').config();

const defaultIssuePattern = /\b[A-Z][A-Z0-9]+-\d+\b/g;

/**
 * Escape regex control characters in a user-supplied string.
 *
 * @param {string} value String to escape for safe regex interpolation.
 * @returns {string} Escaped string.
 */
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Build a Jira issue-key regex.
 *
 * @param {string | undefined} projectKey Optional Jira project key (e.g. `DS`).
 * @returns {RegExp} Global regex used to extract issue keys.
 */
const buildIssuePattern = (projectKey) => {
	// Match any Jira-style key by default, or constrain to one project key.
	if (!projectKey) return defaultIssuePattern;
	const key = escapeRegExp(projectKey.toUpperCase());
	return new RegExp(`\\b${key}-\\d+\\b`, 'g');
};

/**
 * Optionally de-duplicate and sort extracted issue keys.
 *
 * @param {string[]} items Issue keys.
 * @param {{ unique: boolean; sort: boolean }} options Normalisation options.
 * @returns {string[]} Normalised issue keys.
 */
const normaliseList = (items, { unique, sort }) => {
	// Keep deduplication and ordering configurable for release-note workflows.
	let output = items;
	if (unique) output = [...new Set(output)];
	if (sort) output = [...output].sort();
	return output;
};

/**
 * Run a git command safely without shell interpolation.
 *
 * @param {string[]} args Git CLI arguments.
 * @returns {Promise<string>} Command stdout.
 */
async function runGit(args) {
	const execResults = await execFile('git', args);
	return execResults.stdout;
}

/**
 * Fetch commit subjects between a tag and HEAD.
 *
 * @param {string} tagName Tag used as the lower bound.
 * @returns {Promise<string[]>} Commit subject lines.
 */
async function getCommitSubjectsSinceTag(tagName) {
	// Default mode: compare the provided tag with HEAD.
	const gitOutput = await runGit(['log', `${tagName}..HEAD`, '--pretty=format:%s']);
	return gitOutput.split('\n').filter(Boolean);
}

/**
 * Fetch commit subjects since the timestamp of a tag.
 *
 * @param {string} tagName Tag used to derive the start date.
 * @returns {Promise<string[]>} Commit subject lines.
 */
async function getCommitSubjectsSinceTagDate(tagName) {
	// Optional mode: include all commits since the tag timestamp.
	const tagDateOutput = await runGit(['log', '-1', '--format=%ai', tagName]);
	const tagDate = tagDateOutput.trim();
	const gitOutput = await runGit(['log', `--since=${tagDate}`, '--pretty=format:%s']);
	return gitOutput.split('\n').filter(Boolean);
}

/**
 * Extract Jira issue keys from commit subjects.
 *
 * @param {string[]} subjects Commit subject lines.
 * @param {RegExp} pattern Regex used for matching issue keys.
 * @returns {string[]} Matched issue keys.
 */
function extractIssueKeys(subjects, pattern) {
	const matches = [];
	for (const subject of subjects) {
		const subjectMatches = subject.match(pattern);
		if (subjectMatches) matches.push(...subjectMatches);
	}
	return matches;
}

/**
 * Look up a Jira issue summary via Jira REST API.
 *
 * @param {string} issueId Jira issue key.
 * @param {{ jiraInstanceUrl: string; username: string; personalAccessToken: string; debug: boolean }} params Request options.
 * @returns {Promise<string>} Jira issue summary text.
 */
async function getJiraIssueSummary(issueId, { jiraInstanceUrl, username, personalAccessToken, debug }) {
	const issueUrl = `${jiraInstanceUrl}/rest/api/latest/issue/${issueId}`;
	if (debug) console.log('Fetching Jira summary:', issueUrl);

	// Jira Cloud accepts Basic auth using email/username + API token.
	const authHeader = Buffer.from(`${username}:${personalAccessToken}`).toString('base64');
	const response = await fetch(issueUrl, {
		headers: {
			Authorization: `Basic ${authHeader}`,
			Accept: 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error(`Jira lookup failed for ${issueId} (${response.status})`);
	}

	const payload = await response.json();
	return payload.fields?.summary ?? '';
}

/**
 * Build output data for one issue key, with optional Jira enrichment.
 *
 * @param {string} issueId Jira issue key.
 * @param {{ jiraInstanceUrl?: string; username?: string; personalAccessToken?: string; debug: boolean }} options Script options.
 * @returns {Promise<{ issueId: string; issueUrl: string | null; issueTitle: string | null }>} Output object for formatting.
 */
async function buildIssueInfo(issueId, options) {
	const issueUrl = options.jiraInstanceUrl ? `${options.jiraInstanceUrl}/browse/${issueId}` : null;
	if (!options.username || !options.personalAccessToken) {
		// Keep key-only output when Jira credentials are not provided.
		return { issueId, issueUrl, issueTitle: null };
	}

	try {
		const issueTitle = await getJiraIssueSummary(issueId, options);
		return { issueId, issueUrl, issueTitle };
	} catch (error) {
		console.error(colour.yellow(error.message || String(error)));
		return { issueId, issueUrl, issueTitle: null };
	}
}

/**
 * Format a single issue row for markdown-friendly output.
 *
 * @param {{ issueId: string; issueUrl: string | null; issueTitle: string | null }} issueInfo Issue output data.
 * @returns {string} Formatted output line.
 */
function formatIssueOutput(issueInfo) {
	if (!issueInfo.issueUrl) return `- ${issueInfo.issueId}`;
	if (issueInfo.issueTitle) return `- [${issueInfo.issueId}](${issueInfo.issueUrl}): ${issueInfo.issueTitle}`;
	return `- [${issueInfo.issueId}](${issueInfo.issueUrl})`;
}

program
	.description(
		'Extract Jira issue keys from git commit subjects starting from a specific tag to HEAD.\nNote: This operates on the current git branch.',
	)
	.requiredOption(
		'-t, --tag <string>',
		`Release tag name, e.g. v1.1.0. Can also be set via ${colour.green('RELEASE_TAG_NAME')}.`,
		process.env['RELEASE_TAG_NAME'],
	)
	.option('-k, --projectKey <string>', 'Limit matches to a specific Jira project key, e.g. ODS.')
	.option('--no-unique', 'Do not de-duplicate issue keys.')
	.option('--no-sort', 'Do not sort issue keys alphabetically.')
	.option(
		'-u, --username <string>',
		`Jira username for issue title lookup. Can also be set via ${colour.green('JIRA_USERNAME')}.`,
		process.env['JIRA_USERNAME'],
	)
	.option(
		'-p, --personalAccessToken <string>',
		`Jira personal access token for issue title lookup. Can also be set via ${colour.green('JIRA_PERSONAL_ACCESS_TOKEN')}.`,
		process.env['JIRA_PERSONAL_ACCESS_TOKEN'],
	)
	.option(
		'-i, --jiraInstanceUrl <string>',
		`Jira base URL. Can also be set via ${colour.green('JIRA_INSTANCE_URL')}.`,
		process.env['JIRA_INSTANCE_URL'],
	)
	.option('-c, --date', 'Use the date of the tag rather than the commit range to HEAD.')
	.option('-j, --json', 'Output results as JSON.')
	.option('-d, --debug', 'Enable debug mode.');

program.parse();

const options = program.opts();

(async () => {
	try {
		if (options.debug) console.log('Processing tag:', options.tag);

		// Switch between commit-range mode and tag-date mode.
		const subjects = options.date
			? await getCommitSubjectsSinceTagDate(options.tag)
			: await getCommitSubjectsSinceTag(options.tag);
		if (options.debug) console.log('Commit subjects:', subjects.length);

		const pattern = buildIssuePattern(options.projectKey);
		const issueKeys = extractIssueKeys(subjects, pattern);
		const processedKeys = normaliseList(issueKeys, {
			unique: options.unique,
			sort: options.sort,
		});

		if (processedKeys.length === 0) {
			console.error(colour.yellow('No issue keys found for the specified range.'));
			return;
		}

		if ((options.username || options.personalAccessToken) && !options.jiraInstanceUrl) {
			throw new Error('A Jira instance URL is required when using Jira credentials.');
		}

		const issueInfoList = await Promise.all(processedKeys.map((issueId) => buildIssueInfo(issueId, options)));

		if (options.json) {
			console.log(JSON.stringify(issueInfoList, null, 2));
			return;
		}

		console.log(issueInfoList.map(formatIssueOutput).join('\n'));
	} catch (error) {
		console.error(colour.red(error.message || String(error)));
		process.exitCode = 1;
	}
})();
