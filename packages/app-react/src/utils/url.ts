/**
 * Prepend links with # to integrate with HashRouter
 * This allows for the app to be hosted from a single resource
 *
 * @param path URL to resourse
 * @returns a hash (#) prepended URL
 */
export const generateHashPath = (path: string) => `#${path}`;
