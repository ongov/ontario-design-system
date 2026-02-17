/**
 * Orchestrates the entire sample generation process:
 * 1. Creates output directory
 * 2. Renders each sample component
 * 3. Writes HTML files to disk
 * 4. Reports success/failure statistics
 */
declare function generateSamples(): Promise<void>;
export { generateSamples };
