# Component Testing Skill

The `component-testing` agent skill helps an AI coding agent review, create, backfill, and migrate tests for an Ontario Design System web component. It works in two phases. In the first phase the agent reviews the component and its existing tests, reports what it found, and stops for your approval. In the second phase it implements only the scope you approved.

The skill and its playbook live in `.agents/skills/component-testing/`:

- `SKILL.md`: the workflow, the testing principles, and the repository conventions for test work.
- `references/testing-playbook.md`: the reference the skill uses for file locations, the per-layer coverage matrix, patterns for each suite, breakpoints, colour contrast, migrating legacy Puppeteer tests, and the commands.

## Supported tools

There is a single copy of the skill, in `.agents/skills/`. GitHub Copilot (the CLI, agent mode in VS Code and Visual Studio, and the cloud agent) and OpenCode read project skills from that folder, so no setup is needed.

Claude Code reads `.claude/skills/` instead of `.agents/skills/`. If you use it, link the skill locally and do not commit the link:

```bash
mkdir -p .claude/skills
ln -s ../../.agents/skills/component-testing .claude/skills/component-testing
```

## How to invoke the skill

Name the component. The agent can also pick the skill itself from a request that matches its description, but naming the skill is more reliable.

| Tool                                     | How to invoke it                                                                                                                             |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| GitHub Copilot (CLI, agent mode)         | Type `/component-testing` followed by the component name, for example `/component-testing ontario-blockquote`, or ask in a full sentence.    |
| OpenCode                                 | Mention the skill with `@component-testing`, for example `@component-testing review the tests for ontario-blockquote`, or ask in a sentence. |
| Another tool that reads `.agents/skills` | Ask for the `component-testing` skill by name.                                                                                               |

## Narrow the scope

You can limit the work to specific test layers or areas by saying so in the request. The agent reads the request, limits both phases to what you name, and gives gaps outside that scope a single line in its report. The layers are Stencil unit tests, Stencil Playwright E2E, Stencil Playwright VRT, the Next.js fixture, Next.js Playwright E2E, and Next.js Playwright VRT. Areas include accessibility, keyboard behaviour, form integration, responsive behaviour, localization, and migrating legacy Puppeteer tests.

Examples of full requests:

- "Use the component-testing skill to review and create tests for ontario-blockquote." This covers every layer.
- "Use the component-testing skill to review the unit and E2E tests for ontario-button. Skip VRT and the Next.js app."
- "Use the component-testing skill to add Stencil E2E coverage for keyboard behaviour and form integration in ontario-button."
- "Use the component-testing skill to review only the VRT coverage for ontario-blockquote, including a narrow viewport and the French layout."
- "Use the component-testing skill to migrate the commented-out Puppeteer tests for ontario-textarea to Playwright."

If the request leaves the scope unclear, the agent asks before it starts.

## What happens during a run

1. **Review.** The agent reads the component, its SCSS (including media queries and language-dependent rules), and its existing tests. It asks whether it may run the existing tests locally. If you say yes, it uses the results. If you say no, it reviews the tests by reading them and presents options instead of conclusions that would need a run.
2. **Report.** It reports the component's behaviour, the existing coverage, the gaps, any legacy Puppeteer tests, suspected component defects, the files it proposes to create or change, and the commands to validate them. It then stops and asks you to continue, change the proposal, or stop.
3. **Implementation.** After you approve, it implements only the approved scope, runs the narrowest relevant checks, and reports the files changed, the commands run, any snapshot changes, and the defects the tests exposed.

The agent does not update VRT baselines unless you approved VRT work.

## Running the tests

Running the tests locally needs the dependencies installed, the libraries built, and the Playwright browsers installed:

```bash
pnpm install
pnpm run build-libs
cd packages/ontario-design-system-component-library
pnpm exec playwright install
```

The skill asks before it runs anything. When it has finished, run the tests yourself as well, and review any new or changed VRT images by eye. The playbook lists the commands for a single file. Baselines generated on macOS can differ from CI, so use the Docker scripts there (`pnpm run test:update-snapshots:docker`).

## When a test finds a defect

The agent does not record faulty behaviour as the expected result. It offers you a choice: fix the component, keep the test as `test.fail` with a comment that names the Jira issue so the assertion still runs and CI flags when the defect is fixed, or leave the case out of scope. Agents can also draft the Jira issue on request.

## Keeping the skill current

Edit the skill in place in `.agents/skills/component-testing/`, and keep repository-wide testing conventions in the playbook. When a testing pattern or command changes, update the playbook in the same pull request.
