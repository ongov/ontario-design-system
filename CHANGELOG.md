# 6.0.0 (2026-02-04)

- **@ongov/ontario-design-system-complete-styles:** fix(complete-styles)!: update Gulp tasks to handle pkg Sass imports def4550
- **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** feat(fonts)!: update font files and SCSS variables for Raleway Modified and Open Sans 5fa5465
- **@ongov/ontario-design-system-component-library:** feat(badge)!: update colour prop to use kebab-case & add legacy support 52789f0
- **@ongov/ontario-design-system-component-library:** refactor(accordion)!: remove global isOpen prop, use per-item isOpen for initial state 774ab3f
- **@ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** fix(global-styles)!: update gulp-sass and enable NodePackageImporter 6877ffd

### Bug Fixes

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** fix tab navigation from overflow to tab eef4ae4
- **@ongov/ontario-design-system-component-library:** added a function for the menu button to regain focus once users escape the menu d2fd938
- **@ongov/ontario-design-system-component-library:** added hover state style to language toggle 5a2c251
- **@ongov/ontario-design-system-component-library:** added hover state style to language toggle 6d45d42
- **@ongov/ontario-design-system-component-library:** added missing styles for ontario-radio button 6b4f8b4
- **@ongov/ontario-design-system-component-library:** adds aria-hidden attribute to multiple decorative icons across components 9aa7bfa
- **@ongov/ontario-design-system-component-library:** ensure focus trap is working properly and we are not defining the same constant over again b392577
- **@ongov/ontario-design-system-component-library:** ensures first item always gets focus when menu opens a5bce4d
- **@ongov/ontario-design-system-component-library:** fix broken loader export for angular component library e79092e
- **@ongov/ontario-design-system-component-library:** fixed bugs with arrow keys and tabbing on mobile dea4546
- **@ongov/ontario-design-system-component-library:** fixed the index page and removed menubuttonhref fa2dcf4
- **@ongov/ontario-design-system-component-library:** fixed the menu button focus state when using shift tab 2241ef0
- **@ongov/ontario-design-system-component-library:** focus now always follows the index, regardless of whether you use tab or arrow keys 9e158a3
- **@ongov/ontario-design-system-component-library:** refactors initializeFormContainerSettings function in fieldset component dacd942
- **@ongov/ontario-design-system-component-library:** removed calc from statements that dont need it c755a48
- **@ongov/ontario-design-system-component-library:** removed current index from tabs component and added ability to add an icon to menu item c16fd32
- **@ongov/ontario-design-system-component-library:** removes paragraph tags around slots in critical alert and page alert components dc6e5f8
- **@ongov/ontario-design-system-component-library:** removes paragraph tags around slots in critical alert and page alert components 1e0c2e9
- **@ongov/ontario-design-system-component-library:** replace zero with a spacing variable edd1671
- **@ongov/ontario-design-system-component-library:** update HeaderLanguageToggleEventDetails type in accordion language toggle add2693
- **@ongov/ontario-design-system-component-library:** updated paths for the language toggle event ac8a773
- **@ongov/ontario-design-system-component-library:** updating z-indexes to ensure we are only using variables ac68093
- added hover state style to language toggle ([#133](undefined/ongov/ontario-design-system/issues/133)) 92f1b5f
- adds html and string options for hint text and hint expander 2136659
- **angular:** roll back typescript version to be compatible for angular compiler 5552f20
- **ci:** fix JUnit publish task, update snapshots, update docker-compose to include build for apps 8a0ad33
- **component-library:** include shipped components/ and export component entrypoints e96022d
- **component-library:** refactor SCSS imports to use pkg namespace 5cbb64f
- **components-documentation:** rollback docusaurus devdeps b/c we're not at react19 860a2b5
- **footer:** replace url("") fallback with 'none' in CSS background-image 8f93d31
- **gulpfile:** update complete style package build c10a288
- **jest:** move svgTransform to .cjs to support require() in ESM context bb48dd0
- **jest:** move svgTransform to .cjs to support require() in ESM context 049181a
- **nextjs:** update to use label prop for dynamic button text 150417a
- **nextjs:** update to use label prop for dynamic button text 8952a73
- **ontario-task:** updates ontario-task to set default task status properly, fixes broken unit tests b9afff9
- **ontario-task:** updates ontario-task to set default task status properly, fixes broken unit tests 3945269
- **releaserc:** enable prerelease latching for semantic-release-lerna 512c58a
- remove documentation app 3271167
- **srr:** improve hydration safety across compnents via default props, validation and error handling 21c0b1c
- **srr:** improve hydration safety across compnents via default props, validation and error handling 014fb43
- **srr:** improve hydration safety across compnents via default props, validation and error handling a6f18a7
- **srr:** improve hydration safety across compnents via default props, validation and error handling 30394b8
- **srr:** Optimize Components for SSR (Pt 1) ([#52](undefined/ongov/ontario-design-system/issues/52)) 526f7df
- **ssr:** improves SSR optimizations across components 8f5ebee
- **ssr:** improves SSR optimizations across components 7e4c371
- **SSR:** Optimize Components for SSR (Pt 2) ([#60](undefined/ongov/ontario-design-system/issues/60)) e1083a7
- **tsconfig:** downgrade TypeScript target and lib to ES2017 for compatibility 361cbbc
- **tsconfig:** downgrade TypeScript target and lib to ES2017 for compatibility f779a68
- update header and overflow menu readmes to use MDX syntax correctly 1b21d23
- updates docker image, reruns snapshot tests, adds new fonts to nextjs build 4e2863e
- version bump to test ci updates 6fabd7b
- **web-components-library:** remove unused header type swap code from global.ts file 8cce6f4

### Build System

- **@ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** fix react-component-library build errors f70efa0
- **@ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** fix react-component-library build errors 1e05e9a

### Code Refactoring

- **ontario-header:** add `maxSubheaderLinks` object to `application-header-info` prop ca0f204

### Features

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** create ontario-form-container component and update naming d5200b7
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** added language handling for header menus f129f39
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** adding tabbing functionality and component for mobile menu a27c52f
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** change to stencil events e1ad2ed
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** rebasing on origin branch eda237a
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** rebasing on origin branch 8976aeb
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** rebasing on origin branch 4e0f15d
- **@ongov/ontario-design-system-component-library-react:** added documentation for Next.js support 0a21573
- **@ongov/ontario-design-system-component-library-react:** added documentation for Next.js support f3c9553
- **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** rebasing on origin branch c8ae1cb
- **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** updated and reorganized header styles to remove redundancy 92ab7b9
- **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** updated menutoggle to menutoggled 10f6d73
- **@ongov/ontario-design-system-component-library:** add spacing config, snapshots, and logic for form container integration f9378ee
- **@ongov/ontario-design-system-component-library:** added aria-expanded to the ontario header menu button 7de766f
- **@ongov/ontario-design-system-component-library:** added focus state for service ontario header links d0076d5
- **@ongov/ontario-design-system-component-library:** added focusout functionality with tabbing 980addf
- **@ongov/ontario-design-system-component-library:** added more test cases based on MR feedback bb2fb42
- **@ongov/ontario-design-system-component-library:** added one more import for header styles to service ontario header style sheet 79a634d
- **@ongov/ontario-design-system-component-library:** added service ontario header spec test back in 3a41492
- **@ongov/ontario-design-system-component-library:** added unit tests for overflow menu 43fac25
- **@ongov/ontario-design-system-component-library:** adding tabbing functionality and component for mobile menu 58dc659
- **@ongov/ontario-design-system-component-library:** adding tabbing functionality and component for mobile menu 5fee02e
- **@ongov/ontario-design-system-component-library:** adds new more-accounts icon, generates more accounts icon component 11cc0ab
- **@ongov/ontario-design-system-component-library:** adds new sort icon svgs, generates new sort icon components, fixes icon generator script 61095eb
- **@ongov/ontario-design-system-component-library:** adds new tune icon svg, generates new tune icon component b4238ef
- **@ongov/ontario-design-system-component-library:** fixed breaking tests and updated header styles e80d40c
- **@ongov/ontario-design-system-component-library:** fixed focus rings f433afb
- **@ongov/ontario-design-system-component-library:** fixed focus states on header buttons a7d13f1
- **@ongov/ontario-design-system-component-library:** fixed the unit tests for header 613c182
- **@ongov/ontario-design-system-component-library:** fixed the unit tests for header e7fd4ee
- **@ongov/ontario-design-system-component-library:** remove import statement for event and eventEmitter ede3612
- **@ongov/ontario-design-system-component-library:** reset the current index when menu is closed 79c94ec
- **@ongov/ontario-design-system-component-library:** tabbing focus works on mobile 6364449
- **@ongov/ontario-design-system-component-library:** testing replacing the imported breakpoints with consts 8b5e766
- **@ongov/ontario-design-system-component-library:** testing replacing the imported breakpoints with consts 7005ff4
- **@ongov/ontario-design-system-component-library:** testing replacing the imported breakpoints with consts 0390fe1
- **@ongov/ontario-design-system-component-library:** testing replacing the imported breakpoints with consts c854fab
- **@ongov/ontario-design-system-component-library:** updated index file to have proper hrefs in the overflow menu 9effcdd
- **accordion:** add AccordionChangeDetailReasons enum and update README docs e2b3f6c
- **accordion:** emit accordionChange with full context (open indexes, changed index, reason) 347046e
- added accessibility features to overflow menu ([#35](undefined/ongov/ontario-design-system/issues/35)) 898e3cb
- added consistent naming conventions 0ef72a5
- added documentation for Next.js support ([#59](undefined/ongov/ontario-design-system/issues/59)) 4182dd9
- added link for ontario-card 33a5099
- added more colour types for ontario badge 8939ceb
- added more tests for heading leel, highlight colour, and heading content type 766ca8a
- added more tests for highligh colour and heading type 4edd8f9
- added playwright to the repo e085722
- added test pace for ontario-card 39c3ad7
- added test page for ontario-callout 391c5e0
- added test page for ontario-critical-alert bf05b52
- added testing page for aside df92f59
- added testing page for badge cff01a3
- added testing page for badge a924974
- added testing page for ontario-card-collection 429fa66
- added testing page for ontario-search-box b816757
- adds hint-text test page with hint content type variants f060126
- adds ontario-hint-expander page with hint content type variants 6d46bdf
- adds page alert testing page with type props a6a6b0e
- adds test page for ontario-input component 50a914a
- adds textarea page with multiple variants to nextjs vrt poc cf72996
- creating test page for ontario-aside 7e1be5b
- **ontario-header:** modularize header menu into it's own subcomponent 7772e2d
- **utils:** add convertStringToBoolean util 8874144

### BREAKING CHANGES

- **@ongov/ontario-design-system-component-library:** Badge colour prop values are now defined in kebab-case. Legacy camelCase values
  are still accepted but deprecated and will log a warning. Support will be
  removed in a future major release.
- **@ongov/ontario-design-system-component-library:** Ontario accordion component `isOpen` global prop has been removed. To set the
  `isOpen` status of an accordion section, add the `isOpen` prop to the
  `accordionData` prop list.
- **@ongov/ontario-design-system-complete-styles:** Style imports from the Complete Styles package now use
  the `pkg:` prefix and must be resolved using `NodePackageImporter()`
  when compiling Sass in external projects.
- **@ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** Style imports from the Global Styles package now use
  the `pkg:` prefix and must be resolved using `NodePackageImporter()`
  when compiling Sass in external projects.
- **@ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** `component` folder in the component-library moved from `dist`
  to the root of the package
- **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** New font variants have been added alongside references
  to Raleway has been updated to use `Raleway Modified`. Please validate
  your font assets and CSS/SCSS.
- **@ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** `component` folder in the component-library moved from `dist`
  to the root of the package
- **ontario-header:** `maxSubheaderDesktopLinks`, `maxSubheaderTabletLinks`,
  and `maxSubheaderMobileLinks` have been deprecated.

# 6.0.0-alpha.10 (2025-12-23)

- **@ongov/ontario-design-system-component-library:** feat(badge)!: update colour prop to use kebab-case & add legacy support 52789f0

### Bug Fixes

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** fix tab navigation from overflow to tab eef4ae4
- **@ongov/ontario-design-system-component-library:** ensure focus trap is working properly and we are not defining the same constant over again b392577
- **@ongov/ontario-design-system-component-library:** ensures first item always gets focus when menu opens a5bce4d
- **@ongov/ontario-design-system-component-library:** fixed bugs with arrow keys and tabbing on mobile dea4546
- **@ongov/ontario-design-system-component-library:** fixed the index page and removed menubuttonhref fa2dcf4
- **@ongov/ontario-design-system-component-library:** fixed the menu button focus state when using shift tab 2241ef0
- **@ongov/ontario-design-system-component-library:** removed current index from tabs component and added ability to add an icon to menu item c16fd32
- **footer:** replace url("") fallback with 'none' in CSS background-image 8f93d31
- remove documentation app 3271167

### Features

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** added language handling for header menus f129f39
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** adding tabbing functionality and component for mobile menu a27c52f
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** change to stencil events e1ad2ed
- **@ongov/ontario-design-system-component-library:** adding tabbing functionality and component for mobile menu 58dc659
- **@ongov/ontario-design-system-component-library:** adding tabbing functionality and component for mobile menu 5fee02e
- **@ongov/ontario-design-system-component-library:** adds new more-accounts icon, generates more accounts icon component 11cc0ab
- **@ongov/ontario-design-system-component-library:** adds new tune icon svg, generates new tune icon component b4238ef
- **@ongov/ontario-design-system-component-library:** tabbing focus works on mobile 6364449

### BREAKING CHANGES

- **@ongov/ontario-design-system-component-library:** Badge colour prop values are now defined in kebab-case. Legacy camelCase values
  are still accepted but deprecated and will log a warning. Support will be
  removed in a future major release.

# 6.0.0-alpha.9 (2025-11-24)

### Bug Fixes

- update header and overflow menu readmes to use MDX syntax correctly 1b21d23

# 6.0.0-alpha.8 (2025-11-24)

### Bug Fixes

- **releaserc:** enable prerelease latching for semantic-release-lerna 512c58a

# 6.0.0-alpha.7 (2025-11-20)

### Bug Fixes

- version bump to test ci updates 6fabd7b

# 6.0.0-alpha.6 (2025-11-20)

### Bug Fixes

- **component-library:** include shipped components/ and export component entrypoints e96022d

# 6.0.0-alpha.5 (2025-11-14)

### Bug Fixes

- **@ongov/ontario-design-system-component-library:** added a function for the menu button to regain focus once users escape the menu d2fd938
- **@ongov/ontario-design-system-component-library:** focus now always follows the index, regardless of whether you use tab or arrow keys 9e158a3
- **@ongov/ontario-design-system-component-library:** removed calc from statements that dont need it c755a48
- **@ongov/ontario-design-system-component-library:** updating z-indexes to ensure we are only using variables ac68093

### Code Refactoring

- **ontario-header:** add `maxSubheaderLinks` object to `application-header-info` prop ca0f204

### Features

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** rebasing on origin branch eda237a
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** rebasing on origin branch 8976aeb
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** rebasing on origin branch 4e0f15d
- **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** rebasing on origin branch c8ae1cb
- **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** updated and reorganized header styles to remove redundancy 92ab7b9
- **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** updated menutoggle to menutoggled 10f6d73
- **@ongov/ontario-design-system-component-library:** added aria-expanded to the ontario header menu button 7de766f
- **@ongov/ontario-design-system-component-library:** added focus state for service ontario header links d0076d5
- **@ongov/ontario-design-system-component-library:** added focusout functionality with tabbing 980addf
- **@ongov/ontario-design-system-component-library:** added more test cases based on MR feedback bb2fb42
- **@ongov/ontario-design-system-component-library:** added one more import for header styles to service ontario header style sheet 79a634d
- **@ongov/ontario-design-system-component-library:** added service ontario header spec test back in 3a41492
- **@ongov/ontario-design-system-component-library:** added unit tests for overflow menu 43fac25
- **@ongov/ontario-design-system-component-library:** fixed breaking tests and updated header styles e80d40c
- **@ongov/ontario-design-system-component-library:** fixed focus rings f433afb
- **@ongov/ontario-design-system-component-library:** fixed focus states on header buttons a7d13f1
- **@ongov/ontario-design-system-component-library:** fixed the unit tests for header 613c182
- **@ongov/ontario-design-system-component-library:** fixed the unit tests for header e7fd4ee
- **@ongov/ontario-design-system-component-library:** remove import statement for event and eventEmitter ede3612
- **@ongov/ontario-design-system-component-library:** reset the current index when menu is closed 79c94ec
- **@ongov/ontario-design-system-component-library:** testing replacing the imported breakpoints with consts 8b5e766
- **@ongov/ontario-design-system-component-library:** testing replacing the imported breakpoints with consts 7005ff4
- **@ongov/ontario-design-system-component-library:** testing replacing the imported breakpoints with consts 0390fe1
- **@ongov/ontario-design-system-component-library:** testing replacing the imported breakpoints with consts c854fab
- **@ongov/ontario-design-system-component-library:** updated index file to have proper hrefs in the overflow menu 9effcdd
- added accessibility features to overflow menu ([#35](undefined/ongov/ontario-design-system/issues/35)) 898e3cb
- **ontario-header:** modularize header menu into it's own subcomponent 7772e2d
- **utils:** add convertStringToBoolean util 8874144

### BREAKING CHANGES

- **ontario-header:** `maxSubheaderDesktopLinks`, `maxSubheaderTabletLinks`,
  and `maxSubheaderMobileLinks` have been deprecated.

# 6.0.0-alpha.4 (2025-11-12)

- **@ongov/ontario-design-system-complete-styles:** fix(complete-styles)!: update Gulp tasks to handle pkg Sass imports def4550
- **@ongov/ontario-design-system-component-library:** refactor(accordion)!: remove global isOpen prop, use per-item isOpen for initial state 774ab3f
- **@ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** fix(global-styles)!: update gulp-sass and enable NodePackageImporter 6877ffd

### Bug Fixes

- **@ongov/ontario-design-system-component-library:** added hover state style to language toggle 5a2c251
- **@ongov/ontario-design-system-component-library:** added hover state style to language toggle 6d45d42
- **@ongov/ontario-design-system-component-library:** added missing styles for ontario-radio button 6b4f8b4
- **@ongov/ontario-design-system-component-library:** adds aria-hidden attribute to multiple decorative icons across components 9aa7bfa
- **@ongov/ontario-design-system-component-library:** fix broken loader export for angular component library e79092e
- **@ongov/ontario-design-system-component-library:** refactors initializeFormContainerSettings function in fieldset component dacd942
- **@ongov/ontario-design-system-component-library:** removes paragraph tags around slots in critical alert and page alert components 1e0c2e9
- **@ongov/ontario-design-system-component-library:** replace zero with a spacing variable edd1671
- **@ongov/ontario-design-system-component-library:** update HeaderLanguageToggleEventDetails type in accordion language toggle add2693
- **@ongov/ontario-design-system-component-library:** updated paths for the language toggle event ac8a773
- added hover state style to language toggle ([#133](undefined/ongov/ontario-design-system/issues/133)) 92f1b5f
- adds html and string options for hint text and hint expander 2136659
- **angular:** roll back typescript version to be compatible for angular compiler 5552f20
- **ci:** fix JUnit publish task, update snapshots, update docker-compose to include build for apps 8a0ad33
- **component-library:** refactor SCSS imports to use pkg namespace 5cbb64f
- **components-documentation:** rollback docusaurus devdeps b/c we're not at react19 860a2b5
- **jest:** move svgTransform to .cjs to support require() in ESM context 049181a
- **nextjs:** update to use label prop for dynamic button text 8952a73
- **ontario-task:** updates ontario-task to set default task status properly, fixes broken unit tests 3945269
- **srr:** improve hydration safety across compnents via default props, validation and error handling a6f18a7
- **srr:** improve hydration safety across compnents via default props, validation and error handling 30394b8
- **srr:** Optimize Components for SSR (Pt 1) ([#52](undefined/ongov/ontario-design-system/issues/52)) 526f7df
- **ssr:** improves SSR optimizations across components 7e4c371
- **SSR:** Optimize Components for SSR (Pt 2) ([#60](undefined/ongov/ontario-design-system/issues/60)) e1083a7
- **tsconfig:** downgrade TypeScript target and lib to ES2017 for compatibility f779a68
- updates docker image, reruns snapshot tests, adds new fonts to nextjs build 4e2863e

### Build System

- **@ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** fix react-component-library build errors 1e05e9a

### Features

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** create ontario-form-container component and update naming d5200b7
- **@ongov/ontario-design-system-component-library-react:** added documentation for Next.js support f3c9553
- **@ongov/ontario-design-system-component-library:** add spacing config, snapshots, and logic for form container integration f9378ee
- **@ongov/ontario-design-system-component-library:** adds new sort icon svgs, generates new sort icon components, fixes icon generator script 61095eb
- **accordion:** add AccordionChangeDetailReasons enum and update README docs e2b3f6c
- **accordion:** emit accordionChange with full context (open indexes, changed index, reason) 347046e
- added consistent naming conventions 0ef72a5
- added documentation for Next.js support ([#59](undefined/ongov/ontario-design-system/issues/59)) 4182dd9
- added link for ontario-card 33a5099
- added more colour types for ontario badge 8939ceb
- added more tests for heading leel, highlight colour, and heading content type 766ca8a
- added more tests for highligh colour and heading type 4edd8f9
- added playwright to the repo e085722
- added test pace for ontario-card 39c3ad7
- added test page for ontario-callout 391c5e0
- added test page for ontario-critical-alert bf05b52
- added testing page for aside df92f59
- added testing page for badge cff01a3
- added testing page for badge a924974
- added testing page for ontario-card-collection 429fa66
- added testing page for ontario-search-box b816757
- adds hint-text test page with hint content type variants f060126
- adds ontario-hint-expander page with hint content type variants 6d46bdf
- adds page alert testing page with type props a6a6b0e
- adds test page for ontario-input component 50a914a
- adds textarea page with multiple variants to nextjs vrt poc cf72996
- creating test page for ontario-aside 7e1be5b

### BREAKING CHANGES

- **@ongov/ontario-design-system-component-library:** Ontario accordion component `isOpen` global prop has been removed. To set the
  `isOpen` status of an accordion section, add the `isOpen` prop to the
  `accordionData` prop list.
- **@ongov/ontario-design-system-complete-styles:** Style imports from the Complete Styles package now use
  the `pkg:` prefix and must be resolved using `NodePackageImporter()`
  when compiling Sass in external projects.
- **@ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** Style imports from the Global Styles package now use
  the `pkg:` prefix and must be resolved using `NodePackageImporter()`
  when compiling Sass in external projects.
- **@ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** `component` folder in the component-library moved from `dist`
  to the root of the package

# 6.0.0-alpha.3 (2025-09-08)

### Bug Fixes

- **@ongov/ontario-design-system-component-library:** removes paragraph tags around slots in critical alert and page alert components dc6e5f8
- **jest:** move svgTransform to .cjs to support require() in ESM context bb48dd0
- **nextjs:** update to use label prop for dynamic button text 150417a
- **ontario-task:** updates ontario-task to set default task status properly, fixes broken unit tests b9afff9
- **srr:** improve hydration safety across compnents via default props, validation and error handling 21c0b1c
- **srr:** improve hydration safety across compnents via default props, validation and error handling 014fb43
- **ssr:** improves SSR optimizations across components 8f5ebee
- **tsconfig:** downgrade TypeScript target and lib to ES2017 for compatibility 361cbbc

### Build System

- **@ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** fix react-component-library build errors f70efa0

### Features

- **@ongov/ontario-design-system-component-library-react:** added documentation for Next.js support 0a21573

### BREAKING CHANGES

- **@ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** `component` folder in the component-library moved from `dist`
  to the root of the package

# 6.0.0-alpha.2 (2025-08-12)

### Bug Fixes

- **gulpfile:** update complete style package build c10a288
- **web-components-library:** remove unused header type swap code from global.ts file 8cce6f4

# 6.0.0-alpha.1 (2025-07-03)

- **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** feat(fonts)!: update font files and SCSS variables for Raleway Modified and Open Sans 5fa5465

### BREAKING CHANGES

- **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** New font variants have been added alongside references
  to Raleway has been updated to use `Raleway Modified`. Please validate
  your font assets and CSS/SCSS.

# 5.0.0 (2025-06-13)

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** feat!: change layout prop name to layoutDirection for clarity 9a0dcfc
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** feat(ontario-card)!: added layout prop b721250
- **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** feat(fonts)!: update font asset set 178b657
- **@ongov/ontario-design-system-component-library:** feat(ontario-card)!: remove headerType prop as it is replaced by headerColour d797223
- DS-2137: update font asset set ([#32](undefined/ongov/ontario-design-system/issues/32)) 7766b6a

### Bug Fixes

- **.releaserc.json:** swap lockfile references from npm to pnpm 3567d96
- **.releaserc:** add back pattern to commit package.json files 436e127
- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** update module paths to use local node_modules now that we are using pnpm without hoisting b713fd7
- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library:** added missing smoth scroll script from complete styles package 0f545e7
- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library:** deduplicate SASS variable naming conflict c839558
- **@ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** removed row-gap from card collection to remove extra space 1837f61
- **@ongov/ontario-design-system-component-library-react:** fix broken symlinks in packages 96ec819
- **@ongov/ontario-design-system-component-library:** added gap style rule and remove space-between 5a5b8ba
- **@ongov/ontario-design-system-component-library:** added terms of use link prop 1352fa3
- **@ongov/ontario-design-system-component-library:** added white colour to the background of the card to avoid bleed-through ad61ba2
- **@ongov/ontario-design-system-component-library:** adds missing package to component library - uuid 4626619
- **@ongov/ontario-design-system-component-library:** card title consistent height when one title is longer than the other one in a collection e404fdf
- **@ongov/ontario-design-system-component-library:** ds-1974 language toggle label flips to early 2f1a8e1
- **@ongov/ontario-design-system-component-library:** fixed unit test to account for a card without a description 2a7d4cf
- **@ongov/ontario-design-system-component-library:** fixes broken header and footer components for react projects 0ffb098
- **@ongov/ontario-design-system-component-library:** header menu items now respect intial page load language coming from language toggle 0ee32be
- **@ongov/ontario-design-system-component-library:** remove gap property 1272dc5
- **@ongov/ontario-design-system-component-library:** remove partial and required properties f29ac98
- **@ongov/ontario-design-system-component-library:** update styles so mobile menu button appears 80557a3
- **@ongov/ontario-design-system-component-library:** updated border radius on horizontal cards along with width ffafa6b
- **@ongov/ontario-design-system-component-library:** updated how we access property && updated link example for terms of use a40aa5b
- **@ongov/ontario-design-system-component-library:** updated scss to more accurately compute 66.66 eafc5be
- **@ongov/ontario-design-system-component-library:** updated width for 3 cards per row b930d8f
- **@ongov/ontario-design-system-component-library:** updates after running refresh 8985cc7
- **@ongov/ontario-design-system-component-library:** updates to header event listeners 65761c7
- **app-angular:** correct import paths and update TypeScript configuration b7d4ae0
- **app-angular:** remove .js extensions from import paths since theyre all typescript... c5989ea
- **app-angular:** update Angular dependencies to use exact versions 6200309
- **app-angular:** update paths for Angular CLI schema and asset copying 6cf4ccc
- **app-angular:** updated fonts and lock file 9464e12
- **app-react:** add missing properties that are broken in react 18 7736754
- **code-highlighter:** add type assertion for Prism component due to incomplete types 0045d00
- **component-library:** return an object with code property for non-SVG files b2e996c
- **dependencies:** downgrade design tokens and global styles to version 4.3.1-alpha.1 7dc56ee
- **dependencies:** update global styles and design tokens to version 4.3.1-alpha.1 2ee1b39
- **dependencies:** update nanoid to version 3.3.8 and upgrade design tokens to version 4.3.1-alpha.1 e9598ec
- **dependencies:** update TypeScript, Sass, Prettier, and Stencil packages 03bbeaa
- fix broken symlinks in packages ([#27](undefined/ongov/ontario-design-system/issues/27)) 45a8756
- fix module resolution for angular component library 444a112
- **global-styles:** add comment about import in index.js b9402ec
- **global-styles:** update paths for fonts and favicons to remove unnecessary wildcards fe4113c
- **grid.mixins:** declare $modules before use 1c7791f
- **gulpfile:** correct options parameter name in compileSass function 25463ee
- **gulpfile:** replace src and dest with fs.cp for fonts and favicons tasks 8ff6327
- **gulpfile:** update Sass options to use includePaths for better compatibility 289bca4
- **husky:** simplify commit-msg hook by removing unnecessary lines for v10 d8d8c1a
- **input-caption:** add special case to handle disabling the "required" label text internally c5a7136
- **ontario-design-system-complete-styles:** upgrade our own packages 9611040
- **ontario-design-system-global-styles:** restore original gulpfile 90d6415
- **ontario-design-system-global-styles:** revert change to dsTokensPath for now 6bf8094
- **ontario-design-system-global-styles:** update font and favicon moving tasks to use path constants 946677f
- remove prod flag 3fb2b06
- **snapshots:** update shadow DOM mock elements to use <template> for consistency f6ab738
- updated production flag to point to the proper environment file 335c580
- **utils:** isNumber function validation inverted 37637b6
- **utils:** update `retrieveEnumKeys` function 325d3af
- **workflows:** update pnpm action to use action-setup for installation f4ab102
- **workflows:** update pnpm version to 10.2.0 in all workflow files 45ac877

### Code Refactoring

- **global-styles:** update global styles to use new fonts partial 4e855db

### Features

- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library, @ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** update lerna, semantic-release, and snapshots 0053577
- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library, @ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** use pnpm 3ea714a
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** ontario-card header supports ds colour options 3ec917a
- **@ongov/ontario-design-system-component-library:** add alt text property for images within an ontario-card 0ea14ac
- **@ongov/ontario-design-system-component-library:** add dynamic heading level rendering to ontario-card component 3a6fc36
- **@ongov/ontario-design-system-component-library:** added readMes to the two new task components 1ac0fd2
- **@ongov/ontario-design-system-component-library:** update hint text and language validators cbb3a42
- add missing environment variables for Renovate configuration 891ee92
- add Renovate configuration and update workflow for PNPM integration afa9368
- add Renovate configuration parameters to workflow 5f6c2bb
- add Renovate configuration parameters to workflow ([#50](undefined/ongov/ontario-design-system/issues/50)) a774862
- add Renovate GitHub Action workflow 985247c
- add RENOVATE_TOKEN to Renovate workflow for improved authentication aacf9b3
- enable pull request trigger for Renovate workflow 6a0d996
- **global-styles:** add index.js file to allow for import in JS 0f029eb
- **monorepo:** add rimraf as a dev dependency in multiple packages de2959d
- **monorepo:** add script to check for outdated dependencies and update gulpfile paths 764c2a4
- **monorepo:** migrate to npm workspaces with Lerna a16264d
- **monorepo:** updating dependencies 0b1e74d
- **ontario-design-system-component-library-react:** update everything else except np 7d61e74
- **ontario-design-system-component-library-react:** update types and jest dependencies 357392b
- **ontario-design-system-component-library\*:** update imports to follow nodenext standard 6553372
- **ontario-design-system-components:** update StyleDictionary implementation 666a0d1
- **ontario-design-system-design-tokens:** add js platform output for tokens f670e60
- **ontario-design-system:** add TypeScript configuration file with baseUrl and path mappings 06d5cc8
- **ontario-search-box:** add component to library b2756b6
- **ontario-task-list:** add comments to the task list file 9f66fa4
- **ontario-task-list:** updated tests for task list 753247c
- **ontario-task:** add translation for aria-label c51eb12
- **ontario-task:** added test to check heading level of task label 4f69ff8
- **ontario-task:** updated translation functionality bd931fe
- remove RENOVATE_CONFIG_FILE from Renovate workflow e2c3351
- update PNPM version to 10.2.0 in Renovate workflow 227ca04

### BREAKING CHANGES

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** cards with the `layout` prop should now use `layout-direction` or `layoutDirection`
- Font assets have been restructured, review font files
  and SCSS/CSS imports in use.

### update global styles to use new fonts partial

- Provide `font-family` strings from `fonts` partial instead of
  `typography` partial
- Rename `$ontario-font-raleway-modified` to `$ontario-font-raleway`
- Add `fonts` to `theme.scss`

* `font-family` vars → `fonts`; Removed `-modified` from
  `$ontario-font-raleway`.

### update component styles to use fonts

- Update components using `typeography` `font-face` vars to use `fonts`.
- Rename uses of `$ontario-font-raleway-modified` to
  `$ontario-font-raleway`.

* **global-styles:** `font-family` vars → `fonts`; Removed `-modified` from `$ontario-font-raleway`.
* **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** Font assets have been restructured, review font files and SCSS/CSS imports in use.
* **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** `card-type` prop is now deprecated. Use `layout` prop instead.
* **@ongov/ontario-design-system-component-library:** `headerType` prop has been deprecated. Use the `headerColour` prop instead.

# 5.0.0-alpha.10 (2025-03-31)

### Bug Fixes

- **global-styles:** add comment about import in index.js b9402ec

# 5.0.0-alpha.9 (2025-03-31)

### Bug Fixes

- **.releaserc:** add back pattern to commit package.json files 436e127

# 5.0.0-alpha.8 (2025-03-27)

### Features

- **global-styles:** add index.js file to allow for import in JS 0f029eb

# 5.0.0-alpha.7 (2025-03-13)

### Bug Fixes

- **.releaserc.json:** swap lockfile references from npm to pnpm 3567d96

# 5.0.0-alpha.6 (2025-03-13)

- **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** feat(fonts)!: update font asset set 178b657
- DS-2137: update font asset set ([#32](undefined/ongov/ontario-design-system/issues/32)) 7766b6a

### Bug Fixes

- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** update module paths to use local node_modules now that we are using pnpm without hoisting b713fd7
- **@ongov/ontario-design-system-component-library-react:** fix broken symlinks in packages 96ec819
- **@ongov/ontario-design-system-component-library:** adds missing package to component library - uuid 4626619
- **@ongov/ontario-design-system-component-library:** updates after running refresh 8985cc7
- **app-angular:** correct import paths and update TypeScript configuration b7d4ae0
- **app-angular:** remove .js extensions from import paths since theyre all typescript... c5989ea
- **app-angular:** update Angular dependencies to use exact versions 6200309
- **app-angular:** update paths for Angular CLI schema and asset copying 6cf4ccc
- **app-angular:** updated fonts and lock file 9464e12
- **app-react:** add missing properties that are broken in react 18 7736754
- **code-highlighter:** add type assertion for Prism component due to incomplete types 0045d00
- **component-library:** return an object with code property for non-SVG files b2e996c
- **dependencies:** downgrade design tokens and global styles to version 4.3.1-alpha.1 7dc56ee
- **dependencies:** update global styles and design tokens to version 4.3.1-alpha.1 2ee1b39
- **dependencies:** update nanoid to version 3.3.8 and upgrade design tokens to version 4.3.1-alpha.1 e9598ec
- **dependencies:** update TypeScript, Sass, Prettier, and Stencil packages 03bbeaa
- fix broken symlinks in packages ([#27](undefined/ongov/ontario-design-system/issues/27)) 45a8756
- **global-styles:** update paths for fonts and favicons to remove unnecessary wildcards fe4113c
- **gulpfile:** correct options parameter name in compileSass function 25463ee
- **gulpfile:** replace src and dest with fs.cp for fonts and favicons tasks 8ff6327
- **gulpfile:** update Sass options to use includePaths for better compatibility 289bca4
- **husky:** simplify commit-msg hook by removing unnecessary lines for v10 d8d8c1a
- **ontario-design-system-complete-styles:** upgrade our own packages 9611040
- **ontario-design-system-global-styles:** restore original gulpfile 90d6415
- **ontario-design-system-global-styles:** revert change to dsTokensPath for now 6bf8094
- **ontario-design-system-global-styles:** update font and favicon moving tasks to use path constants 946677f
- **snapshots:** update shadow DOM mock elements to use <template> for consistency f6ab738
- **workflows:** update pnpm action to use action-setup for installation f4ab102
- **workflows:** update pnpm version to 10.2.0 in all workflow files 45ac877

### Code Refactoring

- **global-styles:** update global styles to use new fonts partial 4e855db

### Features

- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library, @ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** update lerna, semantic-release, and snapshots 0053577
- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library, @ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** use pnpm 3ea714a
- **monorepo:** add rimraf as a dev dependency in multiple packages de2959d
- **monorepo:** add script to check for outdated dependencies and update gulpfile paths 764c2a4
- **monorepo:** migrate to npm workspaces with Lerna a16264d
- **monorepo:** updating dependencies 0b1e74d
- **ontario-design-system-component-library-react:** update everything else except np 7d61e74
- **ontario-design-system-component-library-react:** update types and jest dependencies 357392b
- **ontario-design-system-component-library\*:** update imports to follow nodenext standard 6553372
- **ontario-design-system-components:** update StyleDictionary implementation 666a0d1
- **ontario-design-system-design-tokens:** add js platform output for tokens f670e60
- **ontario-design-system:** add TypeScript configuration file with baseUrl and path mappings 06d5cc8

### BREAKING CHANGES

- Font assets have been restructured, review font files
  and SCSS/CSS imports in use.

### update global styles to use new fonts partial

- Provide `font-family` strings from `fonts` partial instead of
  `typography` partial
- Rename `$ontario-font-raleway-modified` to `$ontario-font-raleway`
- Add `fonts` to `theme.scss`

* `font-family` vars → `fonts`; Removed `-modified` from
  `$ontario-font-raleway`.

### update component styles to use fonts

- Update components using `typeography` `font-face` vars to use `fonts`.
- Rename uses of `$ontario-font-raleway-modified` to
  `$ontario-font-raleway`.

* **global-styles:** `font-family` vars → `fonts`; Removed `-modified` from `$ontario-font-raleway`.
* **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** Font assets have been restructured, review font files and SCSS/CSS imports in use.

# 5.0.0-alpha.5 (2025-01-27)

### Bug Fixes

- **@ongov/ontario-design-system-component-library:** added gap style rule and remove space-between 5a5b8ba
- **@ongov/ontario-design-system-component-library:** added terms of use link prop 1352fa3
- **@ongov/ontario-design-system-component-library:** added white colour to the background of the card to avoid bleed-through ad61ba2
- **@ongov/ontario-design-system-component-library:** remove partial and required properties f29ac98
- **@ongov/ontario-design-system-component-library:** updated border radius on horizontal cards along with width ffafa6b
- **@ongov/ontario-design-system-component-library:** updated how we access property && updated link example for terms of use a40aa5b
- **@ongov/ontario-design-system-component-library:** updated scss to more accurately compute 66.66 eafc5be
- **@ongov/ontario-design-system-component-library:** updated width for 3 cards per row b930d8f

# 5.0.0-alpha.4 (2025-01-17)

### Bug Fixes

- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library:** deduplicate SASS variable naming conflict c839558

# 5.0.0-alpha.3 (2024-12-17)

### Bug Fixes

- **grid.mixins:** declare $modules before use 1c7791f
- **utils:** isNumber function validation inverted 37637b6
- **utils:** update `retrieveEnumKeys` function 325d3af

# 5.0.0-alpha.2 (2024-11-26)

### Bug Fixes

- remove prod flag 3fb2b06
- updated production flag to point to the proper environment file 335c580

# 5.0.0-alpha.1 (2024-10-21)

### Bug Fixes

- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library:** added missing smoth scroll script from complete styles package 0f545e7
- **@ongov/ontario-design-system-component-library:** update styles so mobile menu button appears 80557a3
- **input-caption:** add special case to handle disabling the "required" label text internally c5a7136

- **@ongov/ontario-design-system-component-library:** feat(ontario-card)!: remove headerType prop as it is replaced by headerColour d797223
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** feat(ontario-card)!: added layout prop b721250

### Features

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** ontario-card header supports ds colour options 3ec917a
- **ontario-search-box:** add component to library b2756b6

### BREAKING CHANGES

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** `card-type` prop is now deprecated. Use `layout` prop instead.
- **@ongov/ontario-design-system-component-library:** `headerType` prop has been deprecated. Use the `headerColour` prop instead.

## 4.3.1-alpha.1 (2024-10-11)

### Bug Fixes

- **@ongov/ontario-design-system-component-library:** card title consistent height when one title is longer than the other one in a collection e404fdf
- **@ongov/ontario-design-system-component-library:** ds-1974 language toggle label flips to early 2f1a8e1
- **@ongov/ontario-design-system-component-library:** fixed unit test to account for a card without a description 2a7d4cf
- **@ongov/ontario-design-system-component-library:** header menu items now respect intial page load language coming from language toggle 0ee32be
- **@ongov/ontario-design-system-component-library:** updates to header event listeners 65761c7

# 4.3.0 (2024-10-02)

### Bug Fixes

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** convert headingContent and headingType to optional in OntarioCallout and OntarioAside 7aaf331
- **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** added new bold italic open sans font 599e21a
- **@ongov/ontario-design-system-component-library:** document how to use events with form components 2acd311
- **@ongov/ontario-design-system-component-library:** ontario card height is now the same for all cards regardless of individual card content length 8c3e95a
- **@ongov/ontario-design-system-component-library:** ontario-card-collection\_\_container now has padding set to 0 c83e311
- **@ongov/ontario-design-system-component-library:** readme updates to component name and properties e5af8b1
- **@ongov/ontario-design-system-component-library:** stacking all cards in one column on small breakpoints 67958f1
- **@ongov/ontario-design-system-component-library:** web components now have import injection support 83e4c8e
- **@ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** small breakpoint styling error in heading regarding language toggle and logo adbc8b2
- **@ongov/ontario-design-system-global-styles:** moved local font to the end of declaration 62e487a
- **ontario-button:** update submit method to requestSubmit() c113b20
- **ontario-header:** fix OntarioHeader emitting `0` when max links set to zero de9bdaa
- tablet and mobile subheader links now collapse into a menu button b888a36

### Features

- **@ongov/ontario-design-system-component-library:** final qa fixes 928645f
- **@ongov/ontario-design-system-component-library:** fixes for poc 1638cb7
- **@ongov/ontario-design-system-component-library:** implement ontario-badge as a web component 14bfdef
- **@ongov/ontario-design-system-global-styles:** add hyphenation support for labels and fieldsets df759f3
- **@ongov/ontario-design-system-global-styles:** move form styles from \_text_input.component.scss 5ee2679
- fix build error 5ccded9
- fix build error 4a2c3d4
- fix manifest json fbd8fc7
- remove margin top 2ff51bd
- update angular page titles 9715eda
- update angular title for content 6725ca3
- update base url to be a constant aefd901
- updates based on QA feedback ec45cbb

# 4.3.0-alpha.3 (2024-10-01)

### Bug Fixes

- **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** added new bold italic open sans font 599e21a
- **@ongov/ontario-design-system-component-library:** document how to use events with form components 2acd311
- **@ongov/ontario-design-system-component-library:** readme updates to component name and properties e5af8b1
- **@ongov/ontario-design-system-component-library:** web components now have import injection support 83e4c8e
- **@ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** small breakpoint styling error in heading regarding language toggle and logo adbc8b2
- **@ongov/ontario-design-system-global-styles:** moved local font to the end of declaration 62e487a
- **ontario-button:** update submit method to requestSubmit() c113b20
- **ontario-header:** fix OntarioHeader emitting `0` when max links set to zero de9bdaa
- tablet and mobile subheader links now collapse into a menu button b888a36

### Features

- **@ongov/ontario-design-system-component-library:** implement ontario-badge as a web component 14bfdef
- **@ongov/ontario-design-system-global-styles:** add hyphenation support for labels and fieldsets df759f3

# 4.3.0-alpha.2 (2024-08-19)

### Bug Fixes

- **@ongov/ontario-design-system-component-library:** stacking all cards in one column on small breakpoints 67958f1

# 4.3.0-alpha.1 (2024-08-07)

### Bug Fixes

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** convert headingContent and headingType to optional in OntarioCallout and OntarioAside 7aaf331
- **@ongov/ontario-design-system-component-library:** ontario card height is now the same for all cards regardless of individual card content length 8c3e95a
- **@ongov/ontario-design-system-component-library:** ontario-card-collection\_\_container now has padding set to 0 c83e311

### Features

- **@ongov/ontario-design-system-component-library:** final qa fixes 928645f
- **@ongov/ontario-design-system-component-library:** fixes for poc 1638cb7
- **@ongov/ontario-design-system-global-styles:** move form styles from \_text_input.component.scss 5ee2679
- fix build error 5ccded9
- fix build error 4a2c3d4
- fix manifest json fbd8fc7
- remove margin top 2ff51bd
- update angular page titles 9715eda
- update angular title for content 6725ca3
- update base url to be a constant aefd901
- updates based on QA feedback ec45cbb

# 4.3.0-alpha.1 (2024-08-07)

### Bug Fixes

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** convert headingContent and headingType to optional in OntarioCallout and OntarioAside 7aaf331
- **@ongov/ontario-design-system-component-library:** ontario card height is now the same for all cards regardless of individual card content length 8c3e95a
- **@ongov/ontario-design-system-component-library:** ontario-card-collection\_\_container now has padding set to 0 c83e311

### Features

- **@ongov/ontario-design-system-component-library:** final qa fixes 928645f
- **@ongov/ontario-design-system-component-library:** fixes for poc 1638cb7
- **@ongov/ontario-design-system-global-styles:** move form styles from \_text_input.component.scss 5ee2679
- fix build error 5ccded9
- fix build error 4a2c3d4
- fix manifest json fbd8fc7
- remove margin top 2ff51bd
- update angular page titles 9715eda
- update angular title for content 6725ca3
- update base url to be a constant aefd901
- updates based on QA feedback ec45cbb

# 4.2.0 (2024-04-18)

### Bug Fixes

- **@ongov/ontario-design-system-component-library:** adds background-colour and border-radius for cards d8a9b8a
- **@ongov/ontario-design-system-component-library:** changed-header-width-to-match-card 1733743
- **@ongov/ontario-design-system-component-library:** fixed typo d2113a7
- **@ongov/ontario-design-system-global-styles:** updated global styles to include edge case for columns 3ee2e29
- **ontario-footer:** add assetBasePath to allow custom asset paths 414a83e

### Features

- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library, @ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** adds note about changes to package namespace in README files d068527
- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library, @ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** update the namespaces across the entire repo 26a6b77
- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library, @ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** update the namespaces across the entire repo 75811a2
- **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** updated sass files to reference new namespace e287af4
- **@ongov/ontario-design-system-component-library:** add native form support to the form elements 0de149f
- **@ongov/ontario-design-system-global-styles:** fix multi comlumn list layout issue 3488a4c
- **component-library:** upgrade to Stencil 4.12.2 3d0da0f

# 4.2.0-alpha.1 (2024-04-17)

### Bug Fixes

- **@ongov/ontario-design-system-component-library:** adds background-colour and border-radius for cards d8a9b8a
- **@ongov/ontario-design-system-component-library:** changed-header-width-to-match-card 1733743
- **@ongov/ontario-design-system-component-library:** fixed typo d2113a7
- **@ongov/ontario-design-system-global-styles:** updated global styles to include edge case for columns 3ee2e29
- **ontario-footer:** add assetBasePath to allow custom asset paths 414a83e

### Features

- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library, @ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** adds note about changes to package namespace in README files d068527
- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library, @ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** update the namespaces across the entire repo 26a6b77
- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library, @ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** update the namespaces across the entire repo 75811a2
- **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** updated sass files to reference new namespace e287af4
- **@ongov/ontario-design-system-component-library:** add native form support to the form elements 0de149f
- **@ongov/ontario-design-system-global-styles:** fix multi comlumn list layout issue 3488a4c
- **component-library:** upgrade to Stencil 4.12.2 3d0da0f

# 4.1.0 (2024-04-09)

### Bug Fixes

- **@ontario-digital-service/ontario-design-system-global-styles:** updated global styles to include edge case for columns 249d1c6
- **ontario-footer:** add assetBasePath to allow custom asset paths 2303da1
- **OntarioDateInput:** add custom inputOnChange event ef80b9a

### Features

- **@ontario-digital-service/ontario-design-system-complete-styles, @ontario-digital-service/ontario-design-system-component-library-angular, @ontario-digital-service/ontario-design-system-component-library-react, @ontario-digital-service/ontario-design-system-component-library, @ontario-digital-service/ontario-design-system-design-tokens, @ontario-digital-service/ontario-design-system-global-styles:** adds note about changes to package namespace in README files db051a3
- **@ontario-digital-service/ontario-design-system-component-library-angular, @ontario-digital-service/ontario-design-system-component-library:** adds web-component examples de083e9
- **@ontario-digital-service/ontario-design-system-component-library:** add component examples to component documentation 8cb7fea
- **@ontario-digital-service/ontario-design-system-global-styles:** fix multi comlumn list layout issue 33dec9d
- update package version 007ea21

# 4.1.0-alpha.4 (2024-04-04)

### Features

- **@ontario-digital-service/ontario-design-system-complete-styles, @ontario-digital-service/ontario-design-system-component-library-angular, @ontario-digital-service/ontario-design-system-component-library-react, @ontario-digital-service/ontario-design-system-component-library, @ontario-digital-service/ontario-design-system-design-tokens, @ontario-digital-service/ontario-design-system-global-styles:** adds note about changes to package namespace in README files db051a3

# 4.1.0-alpha.3 (2024-03-25)

### Bug Fixes

- **ontario-footer:** add assetBasePath to allow custom asset paths 2303da1

# 4.1.0-alpha.2 (2024-03-20)

### Bug Fixes

- **@ontario-digital-service/ontario-design-system-global-styles:** updated global styles to include edge case for columns 249d1c6

### Features

- **@ontario-digital-service/ontario-design-system-global-styles:** fix multi comlumn list layout issue 33dec9d

# 4.1.0-alpha.1 (2024-03-18)

### Bug Fixes

- **OntarioDateInput:** add custom inputOnChange event ef80b9a

### Features

- **@ontario-digital-service/ontario-design-system-component-library-angular, @ontario-digital-service/ontario-design-system-component-library:** adds web-component examples de083e9
- **@ontario-digital-service/ontario-design-system-component-library:** add component examples to component documentation 8cb7fea
- update package version 007ea21

# 4.0.0 (2024-02-02)

### Bug Fixes

- **@ongov/ontario-design-system-component-library:** add additional icon sizes, 16 and 48 2311f4b
- **@ongov/ontario-design-system-component-library:** avoid overriding language through events if lang is passed as prop 6e4d5b7
- **@ongov/ontario-design-system-component-library:** disable es5 production build 8453a6c
- **@ongov/ontario-design-system-component-library:** fix footer tests for the year 2024 967c66f
- **@ongov/ontario-design-system-component-library:** fixed unit tests b484da4
- **@ongov/ontario-design-system-component-library:** remove the open string type from IconColours on the icons d323137

### Features

- **@ongov/ontario-design-system-component-library:** update styles to flex wrap card-collection 4dcf380
- **developer-docs:** add Google Tag Manager plugin to inject Google Analytics into Docusaurus 6eccd18

### BREAKING CHANGES

- **@ongov/ontario-design-system-component-library:** remove es5 support from the build

# 4.0.0-alpha.4 (2024-02-02)

### Bug Fixes

- **@ongov/ontario-design-system-component-library:** add additional icon sizes, 16 and 48 2311f4b
- **@ongov/ontario-design-system-component-library:** remove the open string type from IconColours on the icons d323137

### Features

- **@ongov/ontario-design-system-component-library:** update styles to flex wrap card-collection 4dcf380
- **developer-docs:** add Google Tag Manager plugin to inject Google Analytics into Docusaurus 6eccd18

# 4.0.0-alpha.3 (2024-01-30)

### Reverts

- **@ongov/ontario-design-system-component-library:** Revert "chore: add 'use client' to button to see how it works in NextJS" d961089

# 4.0.0-alpha.2 (2024-01-04)

### Bug Fixes

- **@ongov/ontario-design-system-component-library:** fix footer tests for the year 2024 967c66f

# 4.0.0-alpha.1 (2023-12-29)

### Bug Fixes

- **@ongov/ontario-design-system-component-library:** disable es5 production build 8453a6c

### BREAKING CHANGES

- **@ongov/ontario-design-system-component-library:** remove es5 support from the build

## 3.2.1-alpha.1 (2023-12-29)

### Bug Fixes

- **@ongov/ontario-design-system-component-library:** avoid overriding language through events if lang is passed as prop 6e4d5b7
- **@ongov/ontario-design-system-component-library:** fixed unit tests b484da4

# 3.2.0 (2023-12-11)

### Bug Fixes

- **@ongov/ontario-design-system-component-library:** refactor error messaging SASS to make it reusable 62e3caf

### Features

- **ontario-input:** add error messaging and live validation to input e1641fa

# 3.2.0-alpha.1 (2023-12-11)

### Bug Fixes

- **@ongov/ontario-design-system-component-library:** refactor error messaging SASS to make it reusable 62e3caf

### Features

- **ontario-input:** add error messaging and live validation to input e1641fa

# 3.1.0 (2023-12-11)

### Bug Fixes

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** emit change events from input components 3b2302c
- **@ongov/ontario-design-system-component-library:** added config for header link api 28cb9b6
- **@ongov/ontario-design-system-component-library:** added hint-expander container bb97823
- **@ongov/ontario-design-system-component-library:** empty hint-expander container 10f739b
- **@ongov/ontario-design-system-component-library:** update typo 1dda24b
- **@ongov/ontario-design-system-global-styles:** add design tokens in global styles distribution package ebae02d
- **@ongov/ontario-design-system-global-styles:** review comments changes fa4bd86
- **ontario-header:** add information about serviceOntario header type to readme 47dc2b8
- **ontario-hint-expender:** add type information to emitted toggleExpanderEvent be56364
- **ontario-hint-text:** clean up HTML example formatting a63f718
- **ontario-input:** clean up HTML examples' formatting 794eb67
- **ontario-step-indicator:** add documentation and usage examples d48577c
- **ontario-table:** update custom prop type docs with defaults 3da7134
- **ontario-textarea:** add default column to custom prop type tables e9b4e24

### Features

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** angular poc environment ddc6fe8
- **@ongov/ontario-design-system-component-library:** fetch dynamic french menu for header 01b1713

# 3.1.0-alpha.1 (2023-12-08)

### Bug Fixes

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** emit change events from input components 3b2302c
- **@ongov/ontario-design-system-component-library:** added config for header link api 28cb9b6
- **@ongov/ontario-design-system-component-library:** added hint-expander container bb97823
- **@ongov/ontario-design-system-component-library:** empty hint-expander container 10f739b
- **@ongov/ontario-design-system-component-library:** update typo 1dda24b
- **@ongov/ontario-design-system-global-styles:** add design tokens in global styles distribution package ebae02d
- **@ongov/ontario-design-system-global-styles:** review comments changes fa4bd86
- **ontario-header:** add information about serviceOntario header type to readme 47dc2b8
- **ontario-hint-expender:** add type information to emitted toggleExpanderEvent be56364
- **ontario-hint-text:** clean up HTML example formatting a63f718
- **ontario-input:** clean up HTML examples' formatting 794eb67
- **ontario-step-indicator:** add documentation and usage examples d48577c
- **ontario-table:** update custom prop type docs with defaults 3da7134
- **ontario-textarea:** add default column to custom prop type tables e9b4e24

### Features

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** angular poc environment ddc6fe8
- **@ongov/ontario-design-system-component-library:** fetch dynamic french menu for header 01b1713

# 3.0.0 (2023-09-27)

### Bug Fixes

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** update event function signature to match the types expected a18275f
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** update event signatures on ontario-checkboxes ed3afae
- **@ongov/ontario-design-system-component-library:** added DateValidatorReturnType to readme 74540ea
- **@ongov/ontario-design-system-component-library:** review comment fixes 43d0d47
- **@ongov/ontario-design-system-component-library:** review comment fixes 8a1f520
- **@ongov/ontario-design-system-component-library:** review comment fixes for date-input component 3bd4251
- **@ongov/ontario-design-system-component-library:** update all event signatures to return void to be compatible with React e775f88
- **@ongov/ontario-design-system-component-library:** updated date validation logic 3f1a96d
- **@ongov/ontario-design-system-component-library:** updated dateValidator example f0bbbbb
- **global-styles:** add px-to-rem function and mark rem-calc deprecated ea8124b
- **web-components:** update readme script links to point to correct paths b896904

- **@ongov/ontario-design-system-component-library:** feat!: upgrade to Stencil v4.1.0 1d6a1a9, closes /github.com/ionic-team/stencil/blob/main/BREAKING_CHANGES.md#stencil-v400
- **@ongov/ontario-design-system-component-library:** feat!: upgrade to Stencil v3.0.0 cdc25c8, closes /github.com/ionic-team/stencil/blob/main/BREAKING_CHANGES.md#stencil-v300

### Features

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** added date input component c247722
- **@ongov/ontario-design-system-component-library:** added service ontario header 606bd99

### BREAKING CHANGES

- **@ongov/ontario-design-system-component-library:** Upgrading StencilJS next major version, v4.1.0.

Although there is not a big change in Stencil it might have unforeseen side-effects.

- **@ongov/ontario-design-system-component-library:** Upgrading StencilJS next major version.

Although there is not a big change in Stencil it might have unforeseen side-effects.

# 3.0.0-alpha.2 (2023-09-26)

### Bug Fixes

- **@ongov/ontario-design-system-component-library:** added DateValidatorReturnType to readme 74540ea
- **@ongov/ontario-design-system-component-library:** review comment fixes 43d0d47
- **@ongov/ontario-design-system-component-library:** review comment fixes 8a1f520
- **@ongov/ontario-design-system-component-library:** review comment fixes for date-input component 3bd4251
- **@ongov/ontario-design-system-component-library:** update all event signatures to return void to be compatible with React e775f88
- **@ongov/ontario-design-system-component-library:** updated date validation logic 3f1a96d
- **@ongov/ontario-design-system-component-library:** updated dateValidator example f0bbbbb

### Features

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** added date input component c247722
- **@ongov/ontario-design-system-component-library:** added service ontario header 606bd99

# 3.0.0-alpha.1 (2023-09-22)

### Bug Fixes

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** update event function signature to match the types expected a18275f
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** update event signatures on ontario-checkboxes ed3afae
- **global-styles:** add px-to-rem function and mark rem-calc deprecated ea8124b
- **web-components:** update readme script links to point to correct paths b896904

- **@ongov/ontario-design-system-component-library:** feat!: upgrade to Stencil v4.1.0 1d6a1a9, closes /github.com/ionic-team/stencil/blob/main/BREAKING_CHANGES.md#stencil-v400
- **@ongov/ontario-design-system-component-library:** feat!: upgrade to Stencil v3.0.0 cdc25c8, closes /github.com/ionic-team/stencil/blob/main/BREAKING_CHANGES.md#stencil-v300

### BREAKING CHANGES

- **@ongov/ontario-design-system-component-library:** Upgrading StencilJS next major version, v4.1.0.

Although there is not a big change in Stencil it might have unforeseen side-effects.

- **@ongov/ontario-design-system-component-library:** Upgrading StencilJS next major version.

Although there is not a big change in Stencil it might have unforeseen side-effects.

# 2.7.0 (2023-08-17)

### Bug Fixes

- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** updates package.lock files, adds variable for asset-styles in complete styles package 4d5e138
- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library:** updates complete-styles package to include missing and broken assets 5853344
- **@ongov/ontario-design-system-complete-styles:** adds missing packages 80dcb32
- **@ongov/ontario-design-system-complete-styles:** fixes from MR review d710ca4
- **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** updates heading styles for fieldset legends, updates component lib index file for accessibility 5ad58d8
- **@ongov/ontario-design-system-component-library:** fixed header showing empty menu 635ca12
- **@ongov/ontario-design-system-component-library:** fixes back button custom on click functionality in step indicator 4b8ddcd
- **@ongov/ontario-design-system-component-library:** showing menu button based on allowed sub header links 6ac6cd2
- **@ongov/ontario-design-system-component-library:** updates icon colour options, updates hint expander colour and test a3af8ef
- swithch app to using HashRouter ef0faba
- update header links to expose some from the menu e1bbcb4

### Features

- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library, @ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** updates package.lock files 03c844b
- **@ongov/ontario-design-system-component-library:** adds table component to web component library b7629cc
- **@ongov/ontario-design-system-component-library:** adds translations + updates menu accessibility text for ontario-header web component d0bdf0e
- **@ongov/ontario-design-system-component-library:** update loading indicator watch state b04a716

# 2.7.0-alpha.3 (2023-08-10)

### Bug Fixes

- **@ongov/ontario-design-system-component-library:** fixed header showing empty menu 635ca12
- **@ongov/ontario-design-system-component-library:** showing menu button based on allowed sub header links 6ac6cd2

# 2.7.0-alpha.2 (2023-07-31)

### Bug Fixes

- **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** updates heading styles for fieldset legends, updates component lib index file for accessibility 5ad58d8
- **@ongov/ontario-design-system-component-library:** fixes back button custom on click functionality in step indicator 4b8ddcd
- **@ongov/ontario-design-system-component-library:** updates icon colour options, updates hint expander colour and test a3af8ef
- swithch app to using HashRouter ef0faba
- update header links to expose some from the menu e1bbcb4

### Features

- **@ongov/ontario-design-system-component-library:** adds table component to web component library b7629cc
- **@ongov/ontario-design-system-component-library:** adds translations + updates menu accessibility text for ontario-header web component d0bdf0e
- **@ongov/ontario-design-system-component-library:** update loading indicator watch state b04a716

# 2.7.0-alpha.1 (2023-07-19)

### Bug Fixes

- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** updates package.lock files, adds variable for asset-styles in complete styles package 4d5e138
- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library:** updates complete-styles package to include missing and broken assets 5853344
- **@ongov/ontario-design-system-complete-styles:** adds missing packages 80dcb32
- **@ongov/ontario-design-system-complete-styles:** fixes from MR review d710ca4

### Features

- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library, @ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** updates package.lock files 03c844b

# 2.6.0 (2023-07-13)

### Bug Fixes

- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library:** fixed missing styles for complete-style package 445c7c6
- **@ongov/ontario-design-system-component-library:** adds missing styles for ontario logo in application header 2829ef3

### Features

- **@ongov/ontario-design-system-component-library:** update indentation 26445a9
- **@ongov/ontario-design-system-component-library:** update tests f4a8ef5
- **@ongov/ontario-design-system-component-library:** update tests based on mr feedback 206e34d

# 2.6.0-alpha.1 (2023-07-12)

### Bug Fixes

- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library:** fixed missing styles for complete-style package 445c7c6
- **@ongov/ontario-design-system-component-library:** adds missing styles for ontario logo in application header 2829ef3

### Features

- **@ongov/ontario-design-system-component-library:** update indentation 26445a9
- **@ongov/ontario-design-system-component-library:** update tests f4a8ef5
- **@ongov/ontario-design-system-component-library:** update tests based on mr feedback 206e34d

# 2.5.0 (2023-06-13)

### Bug Fixes

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** adds events and custom event listeners for dropdown, textarea and text input components 73b2bfe
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** fixed footer margin and heading class 5724c7f
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** fixes according to MR review 3391c2d
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** fixes according to MR review 8f9852d
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** updates events for radio button and checkbox component 26ac007
- **@ongov/ontario-design-system-component-library:** added components.d.s and package-lock.json changes aa46c48
- **@ongov/ontario-design-system-component-library:** adds composable input element bbb911c
- **@ongov/ontario-design-system-component-library:** adds helper function to translate slots and textContent 3be6cd4
- **@ongov/ontario-design-system-component-library:** adds mockMutationObserver in utils to import into component tests that use it e8116a9
- **@ongov/ontario-design-system-component-library:** fixed remaining footer component bugs d9568ec
- **@ongov/ontario-design-system-component-library:** fixes according to MR review 8424490
- **@ongov/ontario-design-system-component-library:** fixes broken build 15800f9
- **@ongov/ontario-design-system-component-library:** fixes broken tests 0c353b5
- **@ongov/ontario-design-system-component-library:** fixes componentDidLoad function caef125
- **@ongov/ontario-design-system-component-library:** moves mock observer into test folder within utils 41e72c0
- **@ongov/ontario-design-system-component-library:** moves util functions around in new folders, updates input functional component props 473d9eb
- **@ongov/ontario-design-system-component-library:** rebases with develop 10116b3
- **@ongov/ontario-design-system-component-library:** remove console logs ea55c20
- **@ongov/ontario-design-system-component-library:** removed conflicting footer link styles ba9d8d8
- **@ongov/ontario-design-system-component-library:** removes default language, adds watch to changes in langauge prop 9f88652
- **@ongov/ontario-design-system-component-library:** removes extra \* ed4bb74
- **@ongov/ontario-design-system-component-library:** removes unused uuid import 8f3af5c
- **@ongov/ontario-design-system-component-library:** resolve merge conflicts 7d117b4
- **@ongov/ontario-design-system-component-library:** updates according to MR review b1679fd
- **@ongov/ontario-design-system-component-library:** updates branch to fix MR review discussions bfa6634
- **@ongov/ontario-design-system-component-library:** updates examples for READMEs with broken formatting, updates general component README file 77cf00a
- **@ongov/ontario-design-system-global-styles:** removed duplicate line-height variable d5876d0
- fixes broken formatting for ontario-button readme example 1bfb75c
- **language event handlers:** refactor code to be consistant 9b5c0df
- updated footer in react poc 25690c8

### Features

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** adds ontario-language-toggle component d8176ad
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** fix merge conflicts coming from develop 4da363e
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** fix merge conflicts coming from develop 9fbc051
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** fix merge conflicts coming from develop 366d66e
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** fix merge conflicts coming from develop 0b63336
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** fix merge conflicts coming from develop 7f3043f
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** resolve merge coflicts 294baa7
- **@ongov/ontario-design-system-component-library-angular:** added more frames 87d9c36
- **@ongov/ontario-design-system-component-library:** fix merge conflicts coming from develop 58fd0f8
- **@ongov/ontario-design-system-component-library:** fix merge conflicts coming from develop db7ba7e
- **@ongov/ontario-design-system-component-library:** fixed build errors 51c56c7
- **@ongov/ontario-design-system-component-library:** fixed merge conflicts 7e83f25
- **@ongov/ontario-design-system-component-library:** initial foundation for step indicator 60b20e7
- **@ongov/ontario-design-system-component-library:** remove unit tests for this branch e125b90
- **@ongov/ontario-design-system-component-library:** resolve merge coflicts 32c3f89
- **@ongov/ontario-design-system-component-library:** update based on mr feedback 557c94d
- **@ongov/ontario-design-system-component-library:** updates based on MR 51e6937
- remove the step indicator from the frames 85a484c
- resolve merge coflicts 966f319

# 2.5.0-alpha.3 (2023-07-11)

### Bug Fixes

- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library:** fixed missing styles for complete-style package 445c7c6
- **@ongov/ontario-design-system-component-library:** adds missing styles for ontario logo in application header 2829ef3

### Features

- **@ongov/ontario-design-system-component-library:** update indentation 26445a9
- **@ongov/ontario-design-system-component-library:** update tests f4a8ef5
- **@ongov/ontario-design-system-component-library:** update tests based on mr feedback 206e34d

# 2.5.0-alpha.2 (2023-06-13)

### Bug Fixes

- **language event handlers:** refactor code to be consistant 9b5c0df

# 2.5.0-alpha.1 (2023-06-07)

### Bug Fixes

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** fixes according to MR review 3391c2d
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** fixes according to MR review 8f9852d
- **@ongov/ontario-design-system-component-library:** adds composable input element bbb911c
- **@ongov/ontario-design-system-component-library:** adds helper function to translate slots and textContent 3be6cd4
- **@ongov/ontario-design-system-component-library:** adds mockMutationObserver in utils to import into component tests that use it e8116a9
- **@ongov/ontario-design-system-component-library:** fixes broken tests 0c353b5
- **@ongov/ontario-design-system-component-library:** fixes componentDidLoad function caef125
- **@ongov/ontario-design-system-component-library:** moves mock observer into test folder within utils 41e72c0
- **@ongov/ontario-design-system-component-library:** moves util functions around in new folders, updates input functional component props 473d9eb
- **@ongov/ontario-design-system-component-library:** rebases with develop 10116b3
- **@ongov/ontario-design-system-component-library:** removes default language, adds watch to changes in langauge prop 9f88652
- **@ongov/ontario-design-system-component-library:** removes extra \* ed4bb74
- **@ongov/ontario-design-system-component-library:** removes unused uuid import 8f3af5c
- **@ongov/ontario-design-system-component-library:** resolve merge conflicts 7d117b4
- **@ongov/ontario-design-system-component-library:** updates according to MR review b1679fd
- **@ongov/ontario-design-system-component-library:** updates branch to fix MR review discussions bfa6634
- **@ongov/ontario-design-system-component-library:** updates examples for READMEs with broken formatting, updates general component README file 77cf00a
- fixes broken formatting for ontario-button readme example 1bfb75c
- updated footer in react poc 25690c8

### Features

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** adds ontario-language-toggle component d8176ad
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** fix merge conflicts coming from develop 4da363e
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** fix merge conflicts coming from develop 9fbc051
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** fix merge conflicts coming from develop 366d66e
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** fix merge conflicts coming from develop 0b63336
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** fix merge conflicts coming from develop 7f3043f
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** resolve merge coflicts 294baa7
- **@ongov/ontario-design-system-component-library-angular:** added more frames 87d9c36
- **@ongov/ontario-design-system-component-library:** fix merge conflicts coming from develop 58fd0f8
- **@ongov/ontario-design-system-component-library:** fix merge conflicts coming from develop db7ba7e
- **@ongov/ontario-design-system-component-library:** fixed build errors 51c56c7
- **@ongov/ontario-design-system-component-library:** fixed merge conflicts 7e83f25
- **@ongov/ontario-design-system-component-library:** initial foundation for step indicator 60b20e7
- **@ongov/ontario-design-system-component-library:** remove unit tests for this branch e125b90
- **@ongov/ontario-design-system-component-library:** resolve merge coflicts 32c3f89
- **@ongov/ontario-design-system-component-library:** update based on mr feedback 557c94d
- **@ongov/ontario-design-system-component-library:** updates based on MR 51e6937
- remove the step indicator from the frames 85a484c
- resolve merge coflicts 966f319

## 2.4.1-alpha.2 (2023-05-23)

### Bug Fixes

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** adds events and custom event listeners for dropdown, textarea and text input components 73b2bfe
- **@ongov/ontario-design-system-component-library:** added components.d.s and package-lock.json changes aa46c48
- **@ongov/ontario-design-system-component-library:** removed conflicting footer link styles ba9d8d8
- **@ongov/ontario-design-system-global-styles:** removed duplicate line-height variable d5876d0

## 2.4.1-alpha.1 (2023-05-17)

### Bug Fixes

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** fixed footer margin and heading class 5724c7f
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** updates events for radio button and checkbox component 26ac007
- **@ongov/ontario-design-system-component-library:** fixed remaining footer component bugs d9568ec
- **@ongov/ontario-design-system-component-library:** fixes according to MR review 8424490
- **@ongov/ontario-design-system-component-library:** fixes broken build 15800f9
- **@ongov/ontario-design-system-component-library:** remove console logs ea55c20

# 2.4.0 (2023-05-16)

### Bug Fixes

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** adds fixes according to code review e258375
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** allow passing footer link labels e551d63
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** fix for angular component library 337e88a
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** update hint and hint expander props 03cf633
- **@ongov/ontario-design-system-component-library-angular:** fix for angular component library 88b29b7
- **@ongov/ontario-design-system-component-library-angular:** removes breaking space in rEADME d1fe3f4
- **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** adds ontario-page-alert styles to global styles package to target slots 50c4ce8
- **@ongov/ontario-design-system-component-library:** adds changes to loading indicator component based on MR review 5b52937
- **@ongov/ontario-design-system-component-library:** adds check to see if slot is passed before running validation for critical alert content prop a126261
- **@ongov/ontario-design-system-component-library:** adds id prop to checkbox options props, updates checkbox examples in app-react and index.html 6e3ed28
- **@ongov/ontario-design-system-component-library:** adds missing fixes from MR review 1b7d837
- **@ongov/ontario-design-system-component-library:** adds selected key to dropdown list options props 6e5243e
- **@ongov/ontario-design-system-component-library:** app-react bugs pt 2 1292f07
- **@ongov/ontario-design-system-component-library:** changes according to MR review 125d14e
- **@ongov/ontario-design-system-component-library:** fix for how html is rendered in callout/aside components 617e39e
- **@ongov/ontario-design-system-component-library:** fixes according to MR review 2a63efd
- **@ongov/ontario-design-system-component-library:** fixes according to MR review 0abf571
- **@ongov/ontario-design-system-component-library:** fixes according to MR review aa23a6c
- **@ongov/ontario-design-system-component-library:** fixes according to MR review 16c1918
- **@ongov/ontario-design-system-component-library:** fixes broken test for loading indicator component 62bf349
- **@ongov/ontario-design-system-component-library:** fixes broken tests eb664e0
- **@ongov/ontario-design-system-component-library:** fixes errors and warnings from app-react POC 830cfd6
- **@ongov/ontario-design-system-component-library:** fixes examples + props in radio interfaces 065f4fe
- **@ongov/ontario-design-system-component-library:** fixes for remaining component pages for react app fc4149d
- **@ongov/ontario-design-system-component-library:** fixes incorrect links, re-runs build 120c62a
- **@ongov/ontario-design-system-component-library:** fixes MR conflicts 7370775
- **@ongov/ontario-design-system-component-library:** fixes typo for checkbox readme a2c77f1
- **@ongov/ontario-design-system-component-library:** rebase with develop 0d0e650
- **@ongov/ontario-design-system-component-library:** rebases with develop 98e65f8
- **@ongov/ontario-design-system-component-library:** rebases with develop bce6caa
- **@ongov/ontario-design-system-component-library:** remove references to describedBy prop in app-react + README files 3b3aab9
- **@ongov/ontario-design-system-component-library:** removes console log ae11bc5
- **@ongov/ontario-design-system-component-library:** removes name prop from radio buttons options prop, updates app-react radio buttons page bc351c9
- **@ongov/ontario-design-system-component-library:** review comment fix ba834b9
- **@ongov/ontario-design-system-component-library:** review comment fix 75435cf
- **@ongov/ontario-design-system-component-library:** review comment fixes 4d8c781
- **@ongov/ontario-design-system-component-library:** update form web components to generate the same id as the hint text for aria-describedby value bfa8bc0
- **@ongov/ontario-design-system-component-library:** updates according to MR review 2d56b38
- **@ongov/ontario-design-system-component-library:** updates aria hidden value to not use toString 1d649ec
- **@ongov/ontario-design-system-component-library:** updates branch according to code review 89e672e
- **@ongov/ontario-design-system-component-library:** updates branch according to MR suggestions 8961193
- **@ongov/ontario-design-system-component-library:** updates broken e2e back to top tests dd628bd
- **@ongov/ontario-design-system-component-library:** updates checkbox options + descriptions 2b68b9c
- **@ongov/ontario-design-system-component-library:** updates package-lock.json file 1dfaec5
- **@ongov/ontario-design-system-component-library:** updates README files for callouts and asides 8d1211a
- **@ongov/ontario-design-system-component-library:** updates with develop, fixes broken application header in react app d8ce640
- **@ongov/ontario-design-system-global-styles:** adds page alert scss file 8585226
- **@ongov/ontario-design-system-global-styles:** updaets from code review, adds work for DS-1483 01ae369
- **@ongov/ontario-design-system-global-styles:** updates calculated styles fbffc9a
- adds @nrwl optional dependencies 2918762
- **angular-component-library:** move package readme contents to main angular workspace readme f8ce678
- fixes incorrect heading order in HeaderApplication file 0622379
- passes objects as props to react app cae5b18
- **test:** ran refresh b9bab7f
- **test:** resolve issues with header unit tests 389b894
- updates prop options for modified components a6bdc8d
- updates react app components to use objects as props c732702

### Features

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** added foundational npm package for angular 67468af
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** adds publishing requirements for angular component library, updates component library README 877a408
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** rebased with develop ff4745f
- **@ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** adds callout + aside components to component library 8b7c99a
- **@ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** adds loading indicator component fc0d4cf
- **@ongov/ontario-design-system-component-library:** add prop to disable dynamic menu 08d7a99
- **@ongov/ontario-design-system-component-library:** added language support e2647fb
- **@ongov/ontario-design-system-component-library:** adding tests e2e614b
- **@ongov/ontario-design-system-component-library:** adds unit and e2e test for callouts and asides e8232fb
- **@ongov/ontario-design-system-component-library:** adds unit and e2e tests for ontario-loading-indicator component cc40799
- **@ongov/ontario-design-system-component-library:** remove default for menuItems prop 79f89bc
- **@ongov/ontario-design-system-component-library:** set default data in parsed items 952b49e
- **@ongov/ontario-design-system-component-library:** testing new fetch 4b97af6
- **@ongov/ontario-design-system-component-library:** update examples 0317457
- **@ongov/ontario-design-system-component-library:** update generate link functionality to account for dynamic menu a01cd12
- **@ongov/ontario-design-system-component-library:** update ternary for generating navigation links 9ae0558
- **@ongov/ontario-design-system-component-library:** wip a1d023d
- **@ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** add new tokens for service ontario header 2bf65cd
- **@ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** remove green from brand name 60478ae
- **@ongov/ontario-design-system-global-styles:** adds swap font-display to font-face declarations in global-styles package 8987f06
- **@ongov/ontario-design-system-global-styles:** update configuration steps for global styles package d07a352
- **@ongov/ontario-design-system-global-styles:** update tense of verb c130047
- **@ongov/ontario-design-system-global-styles:** updated based on nakibs mr feedback bedb20a

# 2.4.0-alpha.4 (2023-05-15)

### Bug Fixes

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** fix for angular component library 337e88a
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** update hint and hint expander props 03cf633
- **@ongov/ontario-design-system-component-library-angular:** fix for angular component library 88b29b7
- **@ongov/ontario-design-system-component-library:** review comment fix ba834b9
- **@ongov/ontario-design-system-component-library:** review comment fix 75435cf
- **@ongov/ontario-design-system-component-library:** updates branch according to MR suggestions 8961193

# 2.4.0-alpha.3 (2023-05-11)

### Bug Fixes

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** allow passing footer link labels e551d63
- **@ongov/ontario-design-system-component-library:** adds selected key to dropdown list options props 6e5243e
- **@ongov/ontario-design-system-component-library:** fixes according to MR review 2a63efd
- **@ongov/ontario-design-system-component-library:** fixes broken tests eb664e0
- **@ongov/ontario-design-system-component-library:** fixes typo for checkbox readme a2c77f1
- **@ongov/ontario-design-system-component-library:** review comment fixes 4d8c781
- **@ongov/ontario-design-system-component-library:** updates branch according to code review 89e672e

### Features

- **@ongov/ontario-design-system-component-library:** added language support e2647fb
- **@ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** add new tokens for service ontario header 2bf65cd
- **@ongov/ontario-design-system-design-tokens, @ongov/ontario-design-system-global-styles:** remove green from brand name 60478ae

# 2.4.0-alpha.2 (2023-05-05)

### Bug Fixes

- **angular-component-library:** move package readme contents to main angular workspace readme f8ce678

# 2.4.0-alpha.1 (2023-05-05)

### Bug Fixes

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** adds fixes according to code review e258375
- **@ongov/ontario-design-system-component-library-angular:** removes breaking space in rEADME d1fe3f4
- **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** adds ontario-page-alert styles to global styles package to target slots 50c4ce8
- **@ongov/ontario-design-system-component-library:** adds changes to loading indicator component based on MR review 5b52937
- **@ongov/ontario-design-system-component-library:** adds check to see if slot is passed before running validation for critical alert content prop a126261
- **@ongov/ontario-design-system-component-library:** adds id prop to checkbox options props, updates checkbox examples in app-react and index.html 6e3ed28
- **@ongov/ontario-design-system-component-library:** adds missing fixes from MR review 1b7d837
- **@ongov/ontario-design-system-component-library:** app-react bugs pt 2 1292f07
- **@ongov/ontario-design-system-component-library:** changes according to MR review 125d14e
- **@ongov/ontario-design-system-component-library:** fix for how html is rendered in callout/aside components 617e39e
- **@ongov/ontario-design-system-component-library:** fixes according to MR review 0abf571
- **@ongov/ontario-design-system-component-library:** fixes according to MR review aa23a6c
- **@ongov/ontario-design-system-component-library:** fixes according to MR review 16c1918
- **@ongov/ontario-design-system-component-library:** fixes broken test for loading indicator component 62bf349
- **@ongov/ontario-design-system-component-library:** fixes errors and warnings from app-react POC 830cfd6
- **@ongov/ontario-design-system-component-library:** fixes examples + props in radio interfaces 065f4fe
- **@ongov/ontario-design-system-component-library:** fixes for remaining component pages for react app fc4149d
- **@ongov/ontario-design-system-component-library:** fixes incorrect links, re-runs build 120c62a
- **@ongov/ontario-design-system-component-library:** fixes MR conflicts 7370775
- **@ongov/ontario-design-system-component-library:** rebase with develop 0d0e650
- **@ongov/ontario-design-system-component-library:** rebases with develop 98e65f8
- **@ongov/ontario-design-system-component-library:** rebases with develop bce6caa
- **@ongov/ontario-design-system-component-library:** remove references to describedBy prop in app-react + README files 3b3aab9
- **@ongov/ontario-design-system-component-library:** removes console log ae11bc5
- **@ongov/ontario-design-system-component-library:** removes name prop from radio buttons options prop, updates app-react radio buttons page bc351c9
- **@ongov/ontario-design-system-component-library:** update form web components to generate the same id as the hint text for aria-describedby value bfa8bc0
- **@ongov/ontario-design-system-component-library:** updates according to MR review 2d56b38
- **@ongov/ontario-design-system-component-library:** updates aria hidden value to not use toString 1d649ec
- **@ongov/ontario-design-system-component-library:** updates broken e2e back to top tests dd628bd
- **@ongov/ontario-design-system-component-library:** updates checkbox options + descriptions 2b68b9c
- **@ongov/ontario-design-system-component-library:** updates package-lock.json file 1dfaec5
- **@ongov/ontario-design-system-component-library:** updates README files for callouts and asides 8d1211a
- **@ongov/ontario-design-system-component-library:** updates with develop, fixes broken application header in react app d8ce640
- **@ongov/ontario-design-system-global-styles:** adds page alert scss file 8585226
- **@ongov/ontario-design-system-global-styles:** updaets from code review, adds work for DS-1483 01ae369
- **@ongov/ontario-design-system-global-styles:** updates calculated styles fbffc9a
- adds @nrwl optional dependencies 2918762
- fixes incorrect heading order in HeaderApplication file 0622379
- passes objects as props to react app cae5b18
- **test:** ran refresh b9bab7f
- **test:** resolve issues with header unit tests 389b894
- updates prop options for modified components a6bdc8d
- updates react app components to use objects as props c732702

### Features

- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** added foundational npm package for angular 67468af
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** adds publishing requirements for angular component library, updates component library README 877a408
- **@ongov/ontario-design-system-component-library-angular, @ongov/ontario-design-system-component-library:** rebased with develop ff4745f
- **@ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** adds callout + aside components to component library 8b7c99a
- **@ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** adds loading indicator component fc0d4cf
- **@ongov/ontario-design-system-component-library:** add prop to disable dynamic menu 08d7a99
- **@ongov/ontario-design-system-component-library:** adding tests e2e614b
- **@ongov/ontario-design-system-component-library:** adds unit and e2e test for callouts and asides e8232fb
- **@ongov/ontario-design-system-component-library:** adds unit and e2e tests for ontario-loading-indicator component cc40799
- **@ongov/ontario-design-system-component-library:** remove default for menuItems prop 79f89bc
- **@ongov/ontario-design-system-component-library:** set default data in parsed items 952b49e
- **@ongov/ontario-design-system-component-library:** testing new fetch 4b97af6
- **@ongov/ontario-design-system-component-library:** update examples 0317457
- **@ongov/ontario-design-system-component-library:** update generate link functionality to account for dynamic menu a01cd12
- **@ongov/ontario-design-system-component-library:** update ternary for generating navigation links 9ae0558
- **@ongov/ontario-design-system-component-library:** wip a1d023d
- **@ongov/ontario-design-system-global-styles:** adds swap font-display to font-face declarations in global-styles package 8987f06
- **@ongov/ontario-design-system-global-styles:** update configuration steps for global styles package d07a352
- **@ongov/ontario-design-system-global-styles:** update tense of verb c130047
- **@ongov/ontario-design-system-global-styles:** updated based on nakibs mr feedback bedb20a

# 2.3.0 (2023-04-21)

### Bug Fixes

- **@ongov/ontario-design-system-complete-styles:** fixed complete styles package name e8a11e9
- **@ongov/ontario-design-system-component-library:** added missing aria-label for search button 59eff8d
- **@ongov/ontario-design-system-component-library:** addresses MR feedback 3c7c66c
- **@ongov/ontario-design-system-component-library:** build fixes b5ef8bc
- **@ongov/ontario-design-system-component-library:** duplicate SASS variable error with back-to-top component b8b7a76
- **@ongov/ontario-design-system-component-library:** remove stray toUpperCase from language toggle 875de73
- **@ongov/ontario-design-system-component-library:** updates language type to be uppercase EN/FR 84b2bad
- **component-library:** remove my-component sample component as it is no longer relevant eb4aa16
- **deps:** update package dependencies to the latest versions cc27aab
- **global-styles:** reorder @forwards to import them once 2068cf3
- **package.json:** clean up and standardise package.json files 0ca6341
- **react-app:** upgrade main render to use React 18 API 2ad3b32
- **utility:** fix generic type issue with enum checker 22c2e1d

### Features

- **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** added ontario-design-system-complete-styles package 817bd3d
- **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** creating a release branch 74aee17
- **@ongov/ontario-design-system-component-library:** adds validation functions for language prop, runs refresh to update README files ff2f82d
- **@ongov/ontario-design-system-component-library:** creating a release branch 716cbe8
- **@ongov/ontario-design-system-component-library:** fixes according to MR review 4535ac5
- **@ongov/ontario-design-system-global-styles:** add fonts only css 0ce4b73
- **@ongov/ontario-design-system-global-styles:** creating a release branch 271c672
- **ontario-button:** fix type collision on the `ariaLabel` property, renamed to `ariaLabelText` e22ff33

# 2.3.0-alpha.5 (2023-04-19)

### Bug Fixes

- **package.json:** clean up and standardise package.json files 0ca6341

# 2.3.0-alpha.4 (2023-04-18)

### Bug Fixes

- **@ongov/ontario-design-system-component-library:** added missing aria-label for search button 59eff8d
- **@ongov/ontario-design-system-component-library:** addresses MR feedback 3c7c66c
- **@ongov/ontario-design-system-component-library:** duplicate SASS variable error with back-to-top component b8b7a76
- **@ongov/ontario-design-system-component-library:** remove stray toUpperCase from language toggle 875de73
- **@ongov/ontario-design-system-component-library:** updates language type to be uppercase EN/FR 84b2bad
- **component-library:** remove my-component sample component as it is no longer relevant eb4aa16

### Features

- **@ongov/ontario-design-system-component-library:** adds validation functions for language prop, runs refresh to update README files ff2f82d
- **@ongov/ontario-design-system-component-library:** fixes according to MR review 4535ac5
- **@ongov/ontario-design-system-global-styles:** add fonts only css 0ce4b73

# 2.3.0-alpha.3 (2023-01-31)

### Bug Fixes

- **@ongov/ontario-design-system-complete-styles:** fixed complete styles package name e8a11e9
- **global-styles:** reorder @forwards to import them once 2068cf3

# 2.3.0-alpha.2 (2023-01-18)

### Bug Fixes

- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library:** build fixes b5ef8bc

### Features

- **@ongov/ontario-design-system-complete-styles, @ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** added ontario-design-system-complete-styles package 817bd3d
- **@ongov/ontario-design-system-component-library, @ongov/ontario-design-system-global-styles:** creating a release branch 74aee17
- **@ongov/ontario-design-system-component-library:** creating a release branch 716cbe8
- **@ongov/ontario-design-system-global-styles:** creating a release branch 271c672

# 2.3.0-alpha.1 (2023-01-11)

### Bug Fixes

- **deps:** update package dependencies to the latest versions cc27aab
- **react-app:** upgrade main render to use React 18 API 2ad3b32
- **utility:** fix generic type issue with enum checker 22c2e1d

### Features

- **ontario-button:** fix type collision on the `ariaLabel` property, renamed to `ariaLabelText` e22ff33

## 2.2.1 (2022-12-16)

### Bug Fixes

- **component-library:** replace template readme copy with real copy d324770
- **component-library:** update description and unpkg properties 3596a71

# 2.2.0 (2022-12-12)

### Features

- **@ongov/ontario-design-system-global-styles:** created alpha release e7e2a42
- **@ongov/ontario-design-system-global-styles:** mark new alpha release 6f04d22
- **@ongov/ontario-design-system-global-styles:** updating namespaces for new release 6e08c7a
- add commit message linting tooling and configs 40f4a54

# 2.2.0-alpha.2 (2022-12-12)

### Features

- add commit message linting tooling and configs 40f4a54

# 2.2.0-alpha.1 (2022-12-07)

### Features

- **@ongov/ontario-design-system-global-styles:** created alpha release e7e2a42
- **@ongov/ontario-design-system-global-styles:** mark new alpha release 6f04d22
- **@ongov/ontario-design-system-global-styles:** updating namespaces for new release 6e08c7a

## 2.1.1 (2022-12-01)

### Bug Fixes

- **design-tokens:** update package.json authors a6e041a

# 2.1.0 (2022-12-01)

### Features

- **react:** Update Readme with getting started content e5b3a88

# 2.0.0 (2022-12-01)

### Bug Fixes

- **buttons:** add missing global namespace to SASS vars 996b2e8
- **buttons:** remove instances of CSS calc from styles 5972717
- **design-tokens:** update reference to design token variables bd233ac
- **docs:** update readme.md files 081f665
- **global-styles:** add missing namespaces to our SASS functions 76b78ca
- **react-poc:** change dropdown label to be caption 6779b76
- **react-poc:** update Home.scss to use @use 5cad12a
- **release:** add react comp lib `src/` to package cca6034
- **release:** update files propery in package.json files a3adab2
- **release:** update to new beta cd707f2

- **@ongov/ontario-design-system-component-library:** feat{legend}!: incorporate translation into legend 721aab5

### Features

- **@ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** added Page Alert component 870d2d5
- **@ongov/ontario-design-system-component-library:** Add component documentation release build script 4e17c03
- **component-docs:** update build script to be more robust 765ea33
- **input-caption:** Add support for string only captions 32cb178
- **lerna:** add lerna script to package.json to build docs 1224034

### BREAKING CHANGES

- **@ongov/ontario-design-system-component-library:** The `input-caption` class constructor now requires
  `translations`, `langauge` to work.

# 2.0.0-beta.7 (2022-12-01)

### Bug Fixes

- **docs:** update readme.md files 081f665

### Features

- **@ongov/ontario-design-system-component-library:** Add component documentation release build script 4e17c03
- **component-docs:** update build script to be more robust 765ea33
- **lerna:** add lerna script to package.json to build docs 1224034

# 2.0.0-beta.6 (2022-10-14)

### Bug Fixes

- **buttons:** add missing global namespace to SASS vars 996b2e8
- **buttons:** remove instances of CSS calc from styles 5972717
- **global-styles:** add missing namespaces to our SASS functions 76b78ca
- **react-poc:** change dropdown label to be caption 6779b76
- **react-poc:** update Home.scss to use @use 5cad12a

### Features

- **@ongov/ontario-design-system-component-library-react, @ongov/ontario-design-system-component-library:** added Page Alert component 870d2d5
- **input-caption:** Add support for string only captions 32cb178

# 2.0.0-beta.5 (2022-08-26)

### Bug Fixes

- **release:** update to new beta cd707f2

# 2.0.0-beta.4 (2022-08-03)

### Bug Fixes

- **release:** add react comp lib `src/` to package cca6034

# 2.0.0-beta.3 (2022-08-03)

### Bug Fixes

- **release:** update files propery in package.json files a3adab2

# 2.0.0-beta.2 (2022-08-03)

### Bug Fixes

- **design-tokens:** update reference to design token variables bd233ac

# 2.0.0-beta.1 (2022-08-02)

- **@ongov/ontario-design-system-component-library:** feat{legend}!: incorporate translation into legend 721aab5

### BREAKING CHANGES

- **@ongov/ontario-design-system-component-library:** The `input-caption` class constructor now requires
  `translations`, `langauge` to work.

# 1.0.0 (2022-03-17)

### Features

- **release:** Initial package release 5f991c4
