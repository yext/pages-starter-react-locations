/**
 * Function that takes a path to a generated template and returns the
 * relative path to the root of the site. Will return the empty string
 * if already at the root level.
 *
 * @public
 */
export declare const getRelativePrefixToRootFromPath: (path: string) => string;
/**
 * Converts any path to a posix path delimted by "/". Useful for ensuring that a path will be dynamically importable as only posix-style
 * paths are supported with import.
 */
export declare const convertToPosixPath: (p: string) => string;
