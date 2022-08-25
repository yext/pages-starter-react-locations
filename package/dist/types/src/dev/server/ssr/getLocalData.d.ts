declare class LocalDataManifest {
    static: Array<string>;
    entity: Map<string, Array<string>>;
    constructor();
}
export declare const getLocalDataManifest: () => Promise<LocalDataManifest>;
export declare const getLocalDataForEntity: (entityId: string, locale: string) => Promise<any>;
export {};
