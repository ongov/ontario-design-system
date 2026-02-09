# Ontario Design System Scripts

This folder serves as a collection of project-wide scripts that provide shared functionality and utilities used throughout the application. By centralising these scripts, the project ensures consistency, reusability, and easier maintenance across different components and features.

## extract-git-issues.js

A utility script that extracts Jira issue keys from git commit subjects since a specified tag. If a Jira instance URL is provided, it outputs Jira links. If Jira credentials are also provided, it fetches issue titles from Jira.

### Usage

```sh
node extract-git-issues.js --tag v1.1.0
```

#### Options

- `-t, --tag <string>`: Release tag name, e.g. `v1.1.0` (or `RELEASE_TAG_NAME`)
- `-k, --projectKey <string>`: Limit matches to a specific Jira project key, e.g. `ODS`
- `--no-unique`: Keep duplicate issue keys
- `--no-sort`: Keep the original order from git output
- `-u, --username <string>`: Jira username for title lookup (or `JIRA_USERNAME`)
- `-p, --personalAccessToken <string>`: Jira personal access token for title lookup (or `JIRA_PERSONAL_ACCESS_TOKEN`)
- `-i, --jiraInstanceUrl <string>`: Jira base URL (or `JIRA_INSTANCE_URL`)
- `-c, --date`: Use the tag date (`git log --since`) instead of tag-to-HEAD range
- `-j, --json`: Output as JSON (`issueId`, `issueUrl`, and optional `issueTitle`)
- `-d, --debug`: Enable debug mode

## documentation-helper.ts

A utility script for processing documentation files in Ontario Design System repositories.

### Features

- Prepend front matter or arbitrary text to a single file (see `--prepend` option)
- Batch process files using a YAML mapping file, prepending front matter and copying to a destination directory

### Usage

#### Single File Mode

Prepend text (e.g., front matter) to a single file:

```
ts-node documentation-helper.ts -f <file> -p "---\ntitle: My Title\n---" -df <destinationFile>
```

- `-f, --file <string>`: File to process
- `-p, --prepend <string>`: Text to prepend
- `-df, --destinationFile <string>`: (Optional) Destination file to write to

#### Batch Mode

Copy all files from an input directory to an output directory, prepending front matter from a YAML mapping file where specified:

```
ts-node documentation-helper.ts -i <inputDir> -o <destinationDir> [-m <mappingFile>]
```

- `-i, --inputDir <string>`: Input directory containing files to process
- `-o, --destinationDir <string>`: Output directory for processed files
- `-m, --mappingFile <string>`: (Optional) YAML mapping file (default: `docs-metadata.yaml`)

##### Example Mapping File (`docs-metadata.yaml`)

```yaml
files:
  framework-integrations/next-js-ssr/readme.md:
    frontmatter: |
      ---
      title: Next.js Server-Side Rendering (SSR)
      ---
  another-section/readme.md:
    frontmatter: |
      ---
      title: Another Section
      ---
```

### Notes

- Only one mode (single file or batch) can be used at a time.
- The script enforces mutually exclusive modes and provides clear error/help output.
- Run with `--help` for all options.
