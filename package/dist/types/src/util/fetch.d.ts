/**
 * A custom fetch implementation that determines which fetch library to use
 * depending on the current runtime. When running the local development server,
 * Node is used. Since fetch is only native starting in v18 and the version on the
 * user's machine is up to them, we need to polyfill fetch. Under the hood this
 * uses cross-fetch.
 *
 * @public
 */
declare const fetchInternal: (input: RequestInfo, init?: RequestInit | undefined) => Promise<any>;
export { fetchInternal as fetch };
