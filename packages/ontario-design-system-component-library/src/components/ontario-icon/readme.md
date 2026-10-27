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

## Colour support

The `colour` property accepts `black` (default), `blue`, `grey`, `white`, `inherit` or a valid CSS colour. `ontario-icon-close-header` and `ontario-icon-menu-header` default to `white` for use on the dark Ontario.ca header. Icons are classified in `icon-manifest.json` as one of:

- `configurable`: exposes `colour` and recolours the artwork.
- `fixed`: keeps its own artwork colour and ignores `colour`. These are the alert icons (`alert-error`, `alert-information`, `alert-success` and `alert-warning`).
- `multicolour`: keeps its brand artwork and ignores `colour`. These are the payment icons (`interac-*`, `mastercard`, `mastercard-alt` and `visa`).

`ontario-icon-critical-alert-warning` is configurable: `colour` sets the exclamation mark, and the warning triangle stays white. `ontario-icon-close-header` and `ontario-icon-menu-header` use the same artwork as `ontario-icon-close` and `ontario-icon-menu` and differ only in their white default.

## Colour changes on hover and focus

An icon does not track hover or focus itself. The component that owns the interactive state sets `color` on that state and renders the icon with `colour="inherit"`, which makes the icon use the surrounding text colour. `color` is inherited through the shadow boundary, so no icon API is needed and icons that never change colour are unaffected.

```css
.search-button {
	color: #1a1a1a;
}

.search-button:hover,
.search-button:focus {
	color: #fff;
}
```

```html
<button class="search-button" type="button">
	<ontario-icon-search colour="inherit"></ontario-icon-search>
</button>
```

Set `color` on the interactive element or one of its ancestors. Rules that target the SVG inside the icon, such as `.search-button svg { fill: ... }`, cannot reach it because the SVG is in the icon's shadow root.

## Deprecated icons

`ontario-icon-search-white` is deprecated. Use `<ontario-icon-search colour="white">` instead. The component keeps rendering and logs a development-only warning once per tag name.

## Upgrade note

Icons without a non-blank `label` now render as decorative images with `aria-hidden="true"`, `focusable="false"` and no image role. Previously, icons defaulted to `role="img"` without an accessible name. Audit existing meaningful icon usage before upgrading and supply a descriptive `label` when equivalent text is not already available. A non-blank label takes precedence over `isDecorative`, which remains accepted but emits a development-only deprecation warning.

`ontario-icon-dropdown-arrow` now accepts `colour` and defaults to `black`. Previously it took the surrounding text colour. Set `colour="inherit"` to keep following the text colour.

The `colour` property now takes effect on `ontario-icon-attach`, `ontario-icon-close-header`, `ontario-icon-menu-header` and `ontario-icon-critical-alert-warning`, which previously ignored it. `ontario-icon-attach` and the exclamation mark of `ontario-icon-critical-alert-warning` now use the standard icon black (`#1a1a1a`) instead of pure black (`#000000`).

## Maintaining icons

The `icons` array in `icon-manifest.json` is the source of truth for icon metadata. Each entry must correspond to an SVG with the same basename in `assets/`.

| Field               | Required | Meaning                                                                                                                                                            |
| ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`              | Yes      | Full existing custom-element name, including the `ontario-icon-` prefix.                                                                                           |
| `category`          | Yes      | Gallery grouping: `primary`, `secondary`, `social`, `payment`, `flag`, `alert` or `other`.                                                                         |
| `viewBox`           | Yes      | SVG coordinate system, for example `0 0 24 24`. This value is applied to the generated SVG.                                                                        |
| `colour`            | Yes      | `configurable` exposes the colour property; `fixed` and `multicolour` preserve the artwork without exposing that property.                                         |
| `aliases`           | Yes      | Alternative names recorded as metadata. Use an empty array when none exist; aliases do not generate additional components.                                         |
| `deprecated`        | Yes      | Marks the icon as deprecated. The generated component logs a development-only warning once per tag name.                                                           |
| `replacedBy`        | No       | Icon that replaces a deprecated icon, with or without the `ontario-icon-` prefix. It must name another icon and requires `deprecated`.                             |
| `defaultColour`     | No       | Default `colour` for a `configurable` icon when it is not `black`: `black`, `blue`, `grey`, `white` or `inherit`. It is also the fallback for an invalid `colour`. |
| `previewBackground` | No       | Set to `dark` when white artwork needs a contrasting gallery preview. This does not change the production icon.                                                    |

### Add or update an icon

1. Add or update the SVG artwork in `assets/` and its matching manifest entry. Preserve existing tag names and colour capabilities unless an approved change requires otherwise.
2. From the component-library package directory, run `pnpm run generate:icons`. The generator validates the asset inventory and updates the per-icon TSX files and the marked gallery section in `src/index.html`.
3. Run `pnpm run build` to regenerate public types, framework wrappers and per-icon documentation. Each icon's component and README live in `ontario-icon/<icon-name>/`.
4. Run `pnpm run check:icons`. This read-only command fails if generated components or gallery markup are missing, unexpected or out of date. CI runs the same check.
5. Review and commit the intended source and generated output together. Do not edit generated TSX files or the marked gallery section manually; update the generator, manifest or SVG assets instead.

To inspect all icons locally, run `pnpm run start` and open the server URL followed by `/#icons`. The Next.js demo intentionally shows only representative integration examples.
