/**
 * Defines the folder paths where certain files live, relative to the root of the project.
 *
 * @public
 */
export interface ProjectFilepaths {
    /** The folder path where the template files live */
    templatesRoot: string;
    /** The folder path where the sites-config files live */
    sitesConfigRoot: string;
    /** The folder path where the compiled files should go */
    distRoot: string;
    /** The folder path where the compiled hydration bundles should go */
    hydrationBundleOutputRoot: string;
    /** The folder path where the compiled server bundles should go */
    serverBundleOutputRoot: string;
}
/**
 * Defines the names of certain files, including extension.
 *
 * @public
 */
export interface ProjectFilenames {
    /** The name of the ci.json file */
    ciConfig: string;
    /** The name of the features.json file */
    featuresConfig: string;
    /** The name of the sites-stream.json file */
    siteStreamConfig: string;
}
/**
 * Defines how environment variables will be declared and processed.
 *
 * @public
 */
export interface EnvVar {
    /**
     * The directory, relative to the root of the user's site that
     * will house all the .env files which define env vars.
     */
    envVarDir: string;
    /**
     * If this prefix is prepended to an env vars name, then it will
     * be considered public. This means that at build time it will be
     * inline replaced in the code with the value of the env var and
     * accessible in the user's browser.
     */
    envVarPrefix: string;
}
/**
 * The configuration structure of a project.
 *
 * @public
 */
export interface ProjectStructureConfig {
    filepathsConfig: ProjectFilepaths;
    filenamesConfig: ProjectFilenames;
    envVarConfig: EnvVar;
}
/**
 * Recursively makes all fields on a given type optional.
 *
 * @public
 */
export declare type Optional<T> = {
    [P in keyof T]?: Optional<T[P]>;
};
/**
 * Provides useful methods to operate on a configured project structure.
 *
 * @public
 */
export declare class ProjectStructure {
    #private;
    sitesConfigRoot: Path;
    templatesRoot: Path;
    distRoot: Path;
    hydrationBundleOutputRoot: Path;
    serverBundleOutputRoot: Path;
    ciConfig: string;
    featuresConfig: string;
    envVarDir: string;
    envVarPrefix: string;
    siteStreamConfig: string;
    constructor(config?: Optional<ProjectStructureConfig>);
}
/**
 * Provides useful methods to operate on a specific property of {@link ProjectFilepathsConfig}.
 *
 * @public
 */
export declare class Path {
    path: string;
    constructor(path: string);
    getRelativePath: (to: string) => string;
    getAbsolutePath: () => string;
}
