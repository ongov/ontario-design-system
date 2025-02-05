# Commit Guidelines

Effective commit messages are crucial for maintaining a clear and traceable project history. They not only help current and future developers understand the evolution of the project but also facilitate efficient collaboration and troubleshooting. This document outlines the guidelines for writing commit messages and versioning our software, ensuring consistency and clarity across the project.

By adhering to the Conventional Commit structure and following semantic versioning principles, we can automate changelog generation, streamline the release process, and maintain a high standard of documentation. These practices are essential for the long-term success and maintainability of our project.

Happy Committing!

## Commit messages

Commit messages are the messages that accompany a commit and help to document the flow of the project history. A good commit message goes a long way to helping other developers (or even future you) trace how a project has progressed over time.

This project follows the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) commit message structure. It is automatically linted using a [Husky](https://typicode.github.io/husky/) pre-commit script that validates the message format, ensuring that it follows the Conventional Commit structure along with a few rules (based off the [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) rule set):

- subjects must start with a lower case character
- subject lines must not be longer than 100 characters
- body lines must not be longer than 100 characters (paragraphs can be made by adding single new lines)
- new lines must exist between the subject and the body, as well as the body and the footer

These rules keep messages concise and relevant.

Messages can be short and sweet, or more verbose to capture what happened in the commit and why it happened.

Commit messages should:

- use the present tense ("add feature" not "added feature")
- use the imperative mood ("move cursor to..." not "moves cursor to...")

### General tips for writing commit messages

1. **Be Concise**: Keep your commit messages brief and to the point. Avoid unnecessary details.
2. **Focus on the Why**: Explain why the change was made, not just what was changed. This helps others understand the context.
3. **Avoid Vague Language**: Be specific about what the commit does. Avoid terms like "fixed stuff" or "updated code".
4. **Use Consistent Formatting**: Stick to the agreed-upon format for commit messages to maintain consistency.
5. **Review Before Committing**: Take a moment to review your commit message before finalizing it. Ensure it accurately reflects the changes made.

Do not be afraid to break up files across multiple commits if they thematically do not fall into one unit.

## Semantic versioning

Semantic versioning is a way of versioning software that follows a structured version numbering convention. It helps determine the significance of changes between versions and ensures that version numbers always increase over time.

The semantic versioning scheme uses three digits to construct the version number. For example, say we had version `5.2.6`:

```
  5  .  2  .  6
Major.Minor.Patch
```

The first digit is the _Major_ version, which is incremented whenever there are breaking changes.

The second digit is the _Minor_ version, which is incremented when there are backwards compatible changes, eg. a new component.

The third digit is the _Patch_ version, which is incremented when there are backwards compatible bug fixes.

### Changelog generation

The commit messages are not only consumed by humans, they are also consumed by the project's tooling when publishing our packages upon release. The project uses [semantic-release](https://github.com/semantic-release/semantic-release) to automatically version the packages, create a changelog for each release, and publish the packages to npm by tracking the Conventional Commit prefixes on each commit to decide its impact.

The two relevant prefixes are `fix` and `feat`. Commits with these prefixes should have clean messages about what they are fixing or what feature is being added, respectively. Each commit specifies the weight and impact of the commit on the project.

Commits prefixed with `fix` are considered bug fixes. They are deemed to have little impact on the project, are backward-compatible with the previous version, and do not cause any breaking changes. These commits trigger a patch version increment of 0.0.1 in the semantic versioning scheme.

Commits prefixed with `feat` are considered features, which introduce new functionality into the project, such as a new component, new style change, or other significant change. These commits are backward-compatible as well and trigger a version increment of `0.1.0`.

Not every commit needs to start with `fix` or `feat` within a branch, only the ones that have changes worth calling out in our `CHANGELOG.md` file. See [Non `feat` or `fix` commit prefixes](#non-feat-or-fix-commit-prefixes) for more information.

The changelog can be found within the [CHANGELOG.md](https://github.com/ongov/ontario-design-system/blob/develop/CHANGELOG.md) file, which is a running history of all changes made in each release. The changelog version entries look like the following example:

```
# 5.0.0-alpha.3 (2024-12-17)

### Bug Fixes

- **grid.mixins:** declare $modules before use 1c7791f
- **utils:** isNumber function validation inverted 37637b6
- **utils:** update `retrieveEnumKeys` function 325d3af
```

This example was made from three different commit message subjects:

- (1c7791f) fix(grid.mixins): declare $modules before use
- (37637b6) fix(utils): isNumber function validation inverted
- (325d3af) fix(utils): update `retrieveEnumKeys` function

The `type` is parsed into a section within the release version, the `(scope)` indicates what was impacted, and the `subject` describes the specific change within that scope.

#### Breaking changes

A breaking change is a change significant enough to cause an incompatibility with the current state of the package(s). This could be the removal of a component property, a modification to existing styles, or various other impactful changes.

Breaking changes are denoted in the footer of the commit by starting it with `BREAKING CHANGE:` followed by a message about what the breaking change impacts.

Breaking change commits must include a clear reason for the breaking change and what actions need to be taken when upgrading to the newer version. See the example under [Breaking change](#breaking-change) for an idea of how to communicate the change.

**It is important to note**: Breaking changes can be added to any commit regardless of the commit prefix, they are not just relegated to `fix` or `feat` commit prefixes as those aren't always relevant when introducing a breaking change.

The Conventional Commit structure also allows for an exclamation mark (`!`) to be added before the colon (`:`) in the subject. This pattern isn't respected by this projects tooling but it helps commits that contain breaking changes stand out when reviewing the commit subjects.

### Non `feat` or `fix` commit prefixes

Commits can be prefixed with other prefixes other than `feat:` and `fix:`, as mentioned in [Changelog generation](#changelog-generation). These additional types are: `build:`, `chore:`, `ci:`, `docs:`, `style:`, `refactor:`, `perf:`, or `test:`. These are more suited for smaller parts of a larger update or commits that are being made that should not impact the version number, for example project documentation updates.

The other prefixes have particular meanings:

- `build:` Changes that affect the project build process, build system, or external dependencies (e.g. npm, gulp).
- `chore:` Routine tasks that don't modify source code or tests (e.g. updating package versions, configuration changes)
- `ci:` Changes to Continuous Integration (CI) workflow configuration files and scripts
- `docs:` Documentation-only changes (e.g. updating README, adding comments).
- `style:` Changes that do not affect the meaning of the code (e.g. formatting, missing semi-colons, whitespace)
- `refactor:` Changes that neither fix a bug nor add a feature (e.g. code restructuring, renaming variables)
- `perf:` Changes that relate to performance and neither fix a bug nor add a feature
- `test:` Adding or updating tests (e.g. unit tests, integration tests)

## Examples

Good commit messages are important for creating and maintaining a high quality project. They tell the story of how the project grew and evolved over time. They also help when investigating where things happened, should you ever have to go back in time. Commit messages are as important as high quality documentation and code comments.

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

```
docs(commit-guidelines): add commit guidelines documentation

This documentation outlines recommendations for the commit style,
what tools use the commits to make decisions,
as well as illustrates some examples of commit messages.

The configuration update for `commitlint` adds a new help path to aid in
surfacing these practices when performing Git commits.

JIRA: DS-2107
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

_Note_: It is a best practice to include an exclamation mark (`!`) after your commit `type(scope)`. This is not used as an identifier by the changelog tooling (instead the `BREAKING CHANGE` footer identifier is leveraged), but it can be used as a further identifier to the reader that the change is of a breaking nature when reviewing the subjects.

### Commits with just a prefix

Commits will occasionally span more than a single scope but contain a number of changes within the same theme or action, or the scope is ambiguous. When this happens, it is recommended to break the commits down by scope. However, in cases where the commits impact multiple scopes, the scope can be omitted. All other commit message rules still apply.

```
ci: update triggers for deploy/publish jobs
```
