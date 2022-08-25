/// <reference types="react" />
import { AddressProps } from "./types";
/**
 * Renders an HTML address based from the Yext Knowledge Graph. Example of using the component to render
 * a location entity's address from Yext Knowledge Graph:
 * ```
 * import { Address } from "@yext/pages/components";
 *
 * const address = (<Address address={document.address} />);
 *   --> 1101 Wilson Blvd., Suite 2300,
 *       Arlington, VA, 22201,
 *       US
 * const customAddress = (<Address address={document.address} lines={[['line1', 'city', 'region']]} />);
 *   --> 1101 Wilson Blvd., Arlington, VA
 * ```
 *
 * @public
 */
export declare const Address: {
    ({ address, lines, separator }: AddressProps): JSX.Element;
    defaultProps: {
        separator: string;
    };
};
