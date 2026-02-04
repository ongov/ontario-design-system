# 💡 Contributing Guidelines

## Getting Started

- Clone the main [GitHub repository](https://github.com/ongov/ontario-design-system) and follow the [setup guide](https://github.com/ongov/ontario-design-system?tab=readme-ov-file#quick-start).
- Ensure your environment meets the system requirements.

## Workflow and Branching

### Issue Tracking

The Design System has its own issue tracking board via Jira.

### Branching

The development workflow has four main branches - `master`, `develop`, `alpha` and `beta`.

The `master` branch should always be in a releasable state. In theory, this means at any point a release should be able to be cut and tagged from this branch.

The `develop` branch is where all completed development work that is destined for the next release should end up.

For all other branches there are a few different types that can be used.

#### Branch Types

| Branch Type | Description                                                                | Example                                         |
| ----------- | -------------------------------------------------------------------------- | ----------------------------------------------- |
| _feature_   | A branch that contains a feature, which is a significant work item/change. | `meaghan/feature/DS-122/create-table-component` |
| _bugfix_    | A branch that is based off a _Bug_ issue in Jira.                          | `erin/bugfix/DS-123`                            |
| _hotfix_    | A branch that fixes an issue with production, similar to a _bugfix_.       | `kyle/hotfix/DS-124`                            |
| _task_      | _Reserved for future use._                                                 | `matt/task/DS-125`                              |
| _patch_     | _Reserved for future use._                                                 | `scott/patch/DS-333`                            |

#### Branch Naming

The recommended naming convention for branches is,

```
[your-name]/[branch-type]/[issue-number]/[description]
```

|                  |                                                |
| ---------------- | ---------------------------------------------- |
| `[your-name]`    | Your name, eg. `scott`                         |
| `[branch-type]`  | Branch Type, see [Branch Types](#branch-types) |
| `[issue-number]` | Jira issue number, DS-123                      |
| `[description]`  | Short description of issue/branch (_optional_) |

_Note_: Although the `description` is optional, it is recommended to help distinguish the branch from other branches once a number of them have been created.

## Code Standards

This project uses [BEM](http://getbem.com/introduction/) methodology for SCSS class naming, as well as the following [SASS guidelines](https://ontariodigital.atlassian.net/wiki/spaces/TECH/pages/939786380/Frontend+Guidelines+CSS#SASS).

## Commit Guidelines

This project follows the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) commit message structure. It is automatically linted using a [Husky](https://typicode.github.io/husky/) pre-commit script that validates the message format, ensuring that it follows the Conventional Commit structure along with a few rules (based off the [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) rule set).

Learn more through the [commit guidelines documentation](../../COMMIT-GUIDELINES.MD).

## Testing

- Run unit and e2e tests using Jest before submitting code:

  ```bash
  pnpm run test:e2e
  pnpm run test:unit
  ```

## Release Process

_More info soon_.

## Submitting a Pull Request

1. Ensure your branch is up to date with the `develop` branch (unless one is working on a hotfix in which case start off of `master`).
2. Open a pull request with a clear description of your changes.
3. Request reviews from relevant team members.
