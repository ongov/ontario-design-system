// Load the built Stencil components so their custom elements are registered for
// testing. The `pretest:unit` script runs `build:test` (a trimmed Stencil dev
// build) before the Vitest run, so the lazy-loader bundle is available here.
await import('./dist/ontario-design-system-components/ontario-design-system-components.esm.js');

export {};
