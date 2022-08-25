import { AddressType } from "./types";
/**
 * Get the unabbreviated version of a field if available
 *
 * getUnabbreviated('countryCode', address) ==> 'United States'
 *
 * @param field an address field name
 * @param address a Yext address
 * @returns the unabbreviated version of the field
 */
export declare const getUnabbreviated: (field: keyof AddressType, address: AddressType) => string | undefined;
