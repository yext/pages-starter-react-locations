declare type ServerSideArgs = Record<string, any>;
/**
 * TODO (SUMO-4392) - document.
 *
 * @public
 */
export declare type GetServerSideProps = (data: ServerSideArgs) => any;
/**
 * TODO (SUMO-4392) - document.
 *
 * @public
 */
export declare type Page = {
    path: string;
    props: any;
    component: any;
};
export {};
