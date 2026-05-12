# Pull Request Guidelines

This project follows a small set of guidelines for creating pull requests. Keep titles descriptive, label the package you changed, and make sure your branch is ready for review before you submit it.

## Title Guidelines

If the work is tied to a Jira ticket, prefix the title with the ticket number.

If there is no Jira ticket, use a **capitalized** descriptive title with no prefix.

The title should clearly describe what the pull request brings to the code base. Avoid Conventional Commit prefixes such as `fix(...)` or `feat(...)` in pull request titles.

Examples:

- `DS-2625: Prevent active background gaps on uneven card heights`
- `DS-2246: Mark decorative icons as non-focusable for accessibility`
- `Update card spacing for compact layouts`

## Labels

Labels are located on the right side of the pull request, under Assignees.

If the change spans multiple packages, label all affected packages.  If not then choose the most specific package label available to where the change impacts.

## Submitting a Pull Request

1. Ensure your branch is up to date with the target branch.
2. Open a pull request with a clear description of your changes.
3. Request reviews from relevant team members.
4. Confirm tests have been run, or explain why they were not needed.
5. Update the pull request title or labels if the scope changes during review.

> [!TIP]
> After opening a pull request review it thoroughly to ensure you have not missed anything.
