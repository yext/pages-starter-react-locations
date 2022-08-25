declare class Runtime {
    name: "node" | "deno" | "browser";
    version: string;
    constructor();
    getNodeMajorVersion(): number;
}
/**
 * Returns a class that has information about the runtime executing the
 * code. This is important because the code can be executed in:
 * - Node (during local dev)
 * - Deno (during production build/generation)
 * - the browser (any executed frontend code)
 *
 * This can be useful when the function or library differs depending on
 * the runtime. `fetch` is one example as it's not native to Node &lt; v18.
 *
 * @public
 */
export declare const getRuntime: () => Runtime;
export {};
