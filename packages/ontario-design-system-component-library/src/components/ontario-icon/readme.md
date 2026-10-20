import { OntarioIconAccessibility } from '@ongov/ontario-design-system-component-library-react';
import { OntarioIconBookmarkOff } from '@ongov/ontario-design-system-component-library-react';
import { OntarioIconBookmarkOn } from '@ongov/ontario-design-system-component-library-react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ontario-icon

Use simple, easy-to-understand icons from Material Design to help guide users.

Icons are a visual representation of a single and simple object, action or idea. If you need to communicate more complicated concepts, consider an illustration or infographic.

## Usage guidance

Please refer to the [Ontario Design System primary icons](https://designsystem.ontario.ca/components/detail/icons-primary.html) and [Ontario Design System secondary icons](https://designsystem.ontario.ca/components/detail/icons-secondary.html) for current documentation guidance.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the icon component can be added directly into the project's code. Each icon has its own generated README listing the properties it supports. Please see the [examples](#examples) below for how to configure the component. Check [here](https://designsystem.ontario.ca/components/detail/icons-primary.html) to see the list of all available primary icons. Check [here](https://designsystem.ontario.ca/components/detail/icons-secondary.html) to see the list of all available secondary icons.

## Examples

Icons are decorative by default. Add a `label` when the icon communicates information that is not already available in nearby text. The `isDecorative` property is deprecated; use `label` to provide an accessible name.

```mdx-code-block
<Tabs
	defaultValue="html"
	values={[
		{label: 'HTML', value: 'html'},
		{label: 'React', value: 'react'},
		{label: 'Angular', value: 'angular'},
	]}
	groupId="framework"
	queryString="framework">
<TabItem value="html">
```

```html
<ontario-icon-accessibility></ontario-icon-accessibility>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioIconAccessibility></OntarioIconAccessibility>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-icon-accessibility></ontario-icon-accessibility>
```

```mdx-code-block
</TabItem>
</Tabs>
```

<div>
	<OntarioIconAccessibility></OntarioIconAccessibility>
</div>

Example of a meaningful icon with an accessible name.

```mdx-code-block
<Tabs
	defaultValue="html"
	values={[
		{label: 'HTML', value: 'html'},
		{label: 'React', value: 'react'},
		{label: 'Angular', value: 'angular'},
	]}
	groupId="framework"
	queryString="framework">
<TabItem value="html">
```

```html
<ontario-icon-accessibility label="Accessibility options"></ontario-icon-accessibility>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioIconAccessibility label="Accessibility options"></OntarioIconAccessibility>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-icon-accessibility label="Accessibility options"></ontario-icon-accessibility>
```

```mdx-code-block
</TabItem>
</Tabs>
```

<div>
	<OntarioIconAccessibility label="Accessibility options"></OntarioIconAccessibility>
</div>

Example of bookmark icons with a `grey` colour property.

```mdx-code-block
<Tabs
	defaultValue="html"
	values={[
		{label: 'HTML', value: 'html'},
		{label: 'React', value: 'react'},
		{label: 'Angular', value: 'angular'},
	]}
	groupId="framework"
	queryString="framework">
<TabItem value="html">
```

```html
<ontario-icon-bookmark-off colour="grey" icon-width="32"></ontario-icon-bookmark-off>
<ontario-icon-bookmark-on colour="grey" icon-width="32"></ontario-icon-bookmark-on>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioIconBookmarkOff colour="grey" iconWidth={32}></OntarioIconBookmarkOff>
<OntarioIconBookmarkOn colour="grey" iconWidth={32}></OntarioIconBookmarkOn>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-icon-bookmark-off [colour]="'grey'" [iconWidth]="32"></ontario-icon-bookmark-off>
<ontario-icon-bookmark-on [colour]="'grey'" [iconWidth]="32"></ontario-icon-bookmark-on>
```

```mdx-code-block
</TabItem>
</Tabs>
```

<div>
	<OntarioIconBookmarkOff colour="grey" iconWidth={32}></OntarioIconBookmarkOff>
	<OntarioIconBookmarkOn colour="grey" iconWidth={32}></OntarioIconBookmarkOn>
</div>

## Styling, transforms and responsive sizing

Style the icon custom-element host, not the SVG inside its shadow root. The host must be `inline-block` or `inline-flex` for transforms to apply reliably. For configurable-colour icons, set `colour="inherit"` to use the surrounding text colour. Use the existing `iconWidth` property for responsive sizes; update it at the breakpoints used by your application.

```css
.rotating-icon {
	display: inline-block;
	transition: transform 200ms ease-in-out;
}

.rotating-icon--open {
	transform: rotate(180deg);
}

@media (prefers-reduced-motion: reduce) {
	.rotating-icon {
		transition: none;
	}
}
```

Apply the class to the icon element itself, for example `<ontario-icon-chevron-down class="rotating-icon"></ontario-icon-chevron-down>`. Keep rotation state and timing in the consuming component; the icon does not provide a rotate or flip property.

Each icon has its own generated README with the properties supported by that icon.

## Upgrade note

Icons without a non-blank `label` now render as decorative images with `aria-hidden="true"`, `focusable="false"` and no image role. Previously, icons defaulted to `role="img"` without an accessible name. Audit existing meaningful icon usage before upgrading and supply a descriptive `label` when equivalent text is not already available. A non-blank label takes precedence over `isDecorative`, which remains accepted but emits a development-only deprecation warning.

## Maintaining icons

The `icons` array in `icon-manifest.json` is the source of truth for icon metadata. Each entry must correspond to an SVG with the same basename in `assets/`.

| Field        | Required | Meaning                                                                                                                    |
| ------------ | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| `name`       | Yes      | Full existing custom-element name, including the `ontario-icon-` prefix.                                                   |
| `category`   | Yes      | Icon category: `primary`, `secondary`, `social`, `payment`, `flag`, `alert` or `other`.                                    |
| `viewBox`    | Yes      | SVG coordinate system, for example `0 0 24 24`. This value is applied to the generated SVG.                                |
| `colour`     | Yes      | `configurable` exposes the colour property; `fixed` and `multicolour` preserve the artwork without exposing that property. |
| `aliases`    | Yes      | Alternative names recorded as metadata. Use an empty array when none exist; aliases do not generate additional components. |
| `deprecated` | Yes      | Deprecation metadata. This flag alone does not emit a component warning.                                                   |
| `replacedBy` | No       | Replacement icon name recorded as metadata when an icon is deprecated.                                                     |

### Add or update an icon

1. Add or update the SVG artwork in `assets/` and its matching manifest entry. Preserve existing tag names and colour capabilities unless an approved change requires otherwise.
2. From the component-library package directory, run `pnpm run generate:icons`. The generator validates the asset inventory and updates the per-icon TSX files.
3. Run `pnpm run build` to regenerate public types, framework wrappers and per-icon documentation. Each icon's component and README live in `ontario-icon/<icon-name>/`.
4. Run `pnpm run check:icons`. This read-only command fails if generated components are missing, unexpected or out of date. CI runs the same check.
5. Review and commit the intended source and generated output together. Do not edit generated TSX files manually; update the generator, manifest or SVG assets instead.
