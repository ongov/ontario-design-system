# Commit Guidelines

Effective commit messages are crucial for maintaining a clear and traceable project history. They not only help current and future developers understand the evolution of the project but also facilitate efficient collaboration and troubleshooting. This document outlines the guidelines for writing commit messages and versioning our software, ensuring consistency and clarity across the project.

By adhering to the Conventional Commit structure and following semantic versioning principles, we can automate changelog generation, streamline the release process, and maintain a high standard of documentation. These practices are essential for the long-term success and maintainability of our project.

Happy Committing!

## Commit messages

Commit messages are the messages that accompany a commit and help to document the flow of the project history. A good commit message goes a long way to helping other developers (or even future you) trace how a project has progressed over time.

This project follows the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) commit message structure. It is automatically linted using a [Husky](https://typicode.github.io/husky/) pre-commit script that validates the message format, ensuring that it follows the Conventional Commit structure along with a few rules (based off the [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) rule set):

- subjects start with a lower case character
- subject lines are not longer than 100 characters
- body lines are not longer than 100 characters (paragraphs can be made by adding single new lines)
- there are spaces between the subject and the body and the body and the footer created with new lines

These rules help to keep messages concise and on topic.

Messages can be short and sweet, or more verbose to capture what happened in the commit and why it happened.

It is recommended that commit messages:

- use the present tense ("add feature" not "added feature")
- use the imperative mood ("move cursor to..." not "moves cursor to...")

### General tips for writing commit messages

1. **Be Concise**: Keep your commit messages brief and to the point. Avoid unnecessary details.
2. **Focus on the Why**: Explain why the change was made, not just what was changed. This helps others understand the context.
3. **Avoid Vague Language**: Be specific about what the commit does. Avoid terms like "fixed stuff" or "updated code".
4. **Use Consistent Formatting**: Stick to the agreed-upon format for commit messages to maintain consistency.
5. **Review Before Committing**: Take a moment to review your commit message before finalizing it. Ensure it accurately reflects the changes made.

## Semantic versioning

Semantic versioning is a way of versioning software that follows a structured version numbering convention. It helps identify the significance between versions and is always forward facing, meaning versions are always moving into the future.

The semantic versioning scheme uses three digits to construct the version number. For example, say we had version `5.2.6`:

```
  5  .  2  .  6
Major.Minor.Patch
```

The first digit is the _Major_ version, which is incremented whenever there are breaking changes.

The second digit is the _Minor_ version, which is incremented when there are backwards compatible changes, eg. a new component.

The third digit is the _Patch_ version, which is incremented when there are backwards compatible bug fixes.

### Changelog generation

The commit messages are not only consumed by humans, they are also consumed by the project's tooling when publishing our packages upon release. The project uses [semantic-release](https://github.com/semantic-release/semantic-release) to automatically version the packages, create a changelog for each release, and publish the packages to npm. It does this by tracking the Conventional Commit prefixes on each commit to decide its impact.

The two relevant prefixes are `fix` and `feat`. Commits with these prefixes should have clean messages about what they are fixing or what feature is being added, respectively. Each commit specifies the weight and impact of the commit on the project.

Commits prefixed with `fix` are considered bug fixes, and so they are deemed to have little impact on the project, are backwards compatible with the previous version, and aren't going to cause any breaking changes. These commits trigger a patch version to be generated, which is a version increment of `0.0.1` in the semantic versioning scheme.

Commits prefixed with `feat` are considered features, which introduce new functionality into the project, such as a new component, new style change, or other significant change. These commits are backwards compatible as well and trigger a version increment of `0.1.0`.

Not every commit needs to start with `fix` or `feat` within a branch, only the ones that have changes worth calling out in our `CHANGELOG.md` file. Commits can be prefixed with other prefixes: `build:`, `chore:`, `ci:`, `docs:`, `style:`, `refactor:`, `perf:`, or `test:`. These are more suited for smaller parts of a larger update or commits that are being made that should not impact the version number, for example project documentation updates.

The changelog can be found within the [CHANGELOG.md](https://github.com/ongov/ontario-design-system/blob/develop/CHANGELOG.md) file, which is a running history of all changes made in each release. The changelog version entries look like the following example:

```
# 5.0.0-alpha.3 (2024-12-17)

### Bug Fixes

- **grid.mixins:** declare $modules before use 1c7791f
- **utils:** isNumber function validation inverted 37637b6
- **utils:** update `retrieveEnumKeys` function 325d3af
```

#### Breaking changes

A breaking change is a change that is significant enough to cause an incompatibility with the current state of the packages. This could be a removed component property, a set of styles that work differently, or a whole host of different changes.

Breaking changes are denoted in the footer of the commit by starting it with `BREAKING CHANGE:` followed by a message about what the breaking change impacts.

It is highly recommended to add a clear reason for the breaking change and what actions need to be taken when upgrading to the newer version. See the example under [Breaking change](#breaking-change) for an idea of how to communicate the change.

**It is important to note**: Breaking changes can be added to any commit regardless of the commit prefix, they are not just relegated to `fix` or `feat` commit prefixes as those aren't always relevant when introducing a breaking change.

The Conventional Commit structure also allows for an exclamation mark (`!`) to be added before the `:` in the subject. This pattern isn't respected by this projects tooling but it can help commits that contain breaking changes stand out when reviewing the commit subjects.

## Examples

Good commit messages go a long way in creating and maintaining a high quality project. They tell the story of how it grew and evolved over time. They also help when investigating where things happened, should you ever have to go back in time. Commit messages are almost as important as high quality documentation and code comments.

### Base structure

The base structure of a commit message is:

```
prefix(optional-scope): subject

body

footer
```

### Commits with prefix and scope

Adding a prefix and scope helps indicate the impact and theme of the commit and what it impacts.

Commits can be simple:

```
chore(monorepo): add useWorkspaces to lerna.json
```

Commits can be more detailed:

```
fix(utils): isNumber function validation inverted

This fix handles validating numbers are numbers and not numbers are `NaN`.

- Add `undefined` and `null` checks to `isNumber` to guarantee they're
  false.
- Add unit tests to validate this case via the `date-validation-utils` function `isInvalidYear`.
- Add unit tests to validate the `isNumber` util function.

JIRA: DS-1234
```

Commits can have body text span multiple lines as paragraphs using new lines:

```
fix(utils): update retrieveEnumKeys function

Updates to `isNumber` invalided the logic this function was using,
inverting it restores intended functionality.

- Add unit tests to validate different types of enum cases as well as
  `null` and `undefined`.
```

### Breaking change

Adding `BREAKING CHANGE:` to the footer denotes the commit has a breaking change and that there should be a major version increment.

```
feat(ontario-card)!: added layout prop
 - Updated unit tests
 - Regenerated component definitions

BREAKING CHANGE: `card-type` prop is now deprecated. Use `layout` prop instead.
```

### Commits with just a prefix

Sometimes commits can span more than a single scope but contain a number of changes within the same theme or action, or the scope is ambiguous. When this happens, it is recommended to break the commits down by scope. However, in cases where the commits impact multiple scopes, the scope can be omitted. All other commit message rules still apply.

```
ci: update triggers for deploy/publish jobs
```
