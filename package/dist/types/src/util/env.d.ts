/**
 * Determines if the code is being executed on the production site on
 * the client. This is useful for things like firing analytics only
 * in production (opposed to dev or staging) and not during server side
 * rendering.
 *
 * @param domain The production domain of the site
 *
 * @public
 */
export declare const isProduction: (domain: string) => boolean;
