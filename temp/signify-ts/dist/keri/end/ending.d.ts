import { Siger } from '../core/siger';
import { Cigar } from '../core/cigar';
export declare const FALSY: (string | number | boolean)[];
export declare const TRUTHY: (string | number | boolean)[];
export declare class Signage {
    readonly markers: (Siger | Cigar)[] | Map<string, string | Siger | Cigar>;
    readonly indexed?: boolean | undefined;
    readonly signer?: string | undefined;
    readonly ordinal?: string | undefined;
    readonly digest?: string | undefined;
    readonly kind?: string | undefined;
    constructor(markers: (Siger | Cigar)[] | Map<string, string | Siger | Cigar>, indexed?: boolean | undefined, signer?: string | undefined, ordinal?: string | undefined, digest?: string | undefined, kind?: string | undefined);
}
export declare function signature(signages: Signage[]): Headers;
export declare function designature(value: string): Signage[];
