import { SignifyClient } from './clienting';
import { Dict } from '../core/core';
import { Serder } from '../core/serder';
import { Operation } from './coring';
import { HabState } from '../core/state';
/** Types of credentials */
export declare class CredentialTypes {
    static issued: string;
    static received: string;
}
/** Credential filter parameters */
export interface CredentialFilter {
    filter?: object;
    sort?: object[];
    skip?: number;
    limit?: number;
}
export interface CredentialSubject {
    /**
     * Issuee, or holder of the credential.
     */
    i?: string;
    /**
     * Timestamp of issuance.
     */
    dt?: string;
    /**
     * Privacy salt
     */
    u?: string;
    [key: string]: unknown;
}
export interface CredentialData {
    v?: string;
    d?: string;
    /**
     * Privacy salt
     */
    u?: string;
    /**
     * Issuer of the credential.
     */
    i?: string;
    /**
     * Registry id.
     */
    ri?: string;
    /**
     * Schema id
     */
    s?: string;
    /**
     * Credential subject data
     */
    a: CredentialSubject;
    /**
     * Credential source section
     */
    e?: {
        [key: string]: unknown;
    };
    /**
     * Credential rules section
     */
    r?: {
        [key: string]: unknown;
    };
}
export interface IssueCredentialResult {
    acdc: Serder;
    anc: Serder;
    iss: Serder;
    op: Operation;
}
export interface RevokeCredentialResult {
    anc: Serder;
    rev: Serder;
    op: Operation;
}
export interface IpexApplyArgs {
    /**
     * Alias for the IPEX sender AID
     */
    senderName: string;
    /**
     * Prefix of the IPEX recipient AID
     */
    recipient: string;
    /**
     * Message to send
     */
    message?: string;
    /**
     * SAID of schema to apply for
     */
    schemaSaid: string;
    /**
     * Optional attributes for selective disclosure
     */
    attributes?: Record<string, unknown>;
    datetime?: string;
}
export interface IpexOfferArgs {
    /**
     * Alias for the IPEX sender AID
     */
    senderName: string;
    /**
     * Prefix of the IPEX recipient AID
     */
    recipient: string;
    /**
     * Message to send
     */
    message?: string;
    /**
     * ACDC to offer
     */
    acdc: Serder;
    /**
     * Optional qb64 SAID of apply message this offer is responding to
     */
    applySaid?: string;
    datetime?: string;
}
export interface IpexAgreeArgs {
    /**
     * Alias for the IPEX sender AID
     */
    senderName: string;
    /**
     * Prefix of the IPEX recipient AID
     */
    recipient: string;
    /**
     * Message to send
     */
    message?: string;
    /**
     * qb64 SAID of offer message this agree is responding to
     */
    offerSaid: string;
    datetime?: string;
}
export interface IpexGrantArgs {
    /**
     * Alias for the IPEX sender AID
     */
    senderName: string;
    /**
     * Prefix of the IPEX recipient AID
     */
    recipient: string;
    /**
     * Message to send
     */
    message?: string;
    /**
     * qb64 SAID of agree message this grant is responding to
     */
    agreeSaid?: string;
    datetime?: string;
    acdc: Serder;
    acdcAttachment?: string;
    iss: Serder;
    issAttachment?: string;
    anc: Serder;
    ancAttachment?: string;
}
export interface IpexAdmitArgs {
    /**
     * Alias for the IPEX sender AID
     */
    senderName: string;
    /**
     * Prefix of the IPEX recipient AID
     */
    recipient: string;
    /**
     * Message to send
     */
    message?: string;
    /**
     * qb64 SAID of agree message this admit is responding to
     */
    grantSaid: string;
    datetime?: string;
}
export type CredentialState = {
    vn: [number, number];
    i: string;
    s: string;
    d: string;
    ri: string;
    a: {
        s: number;
        d: string;
    };
    dt: string;
    et: string;
} & ({
    et: 'iss' | 'rev';
    ra: Record<string, never>;
} | {
    et: 'bis' | 'brv';
    ra: {
        i: string;
        s: string;
        d: string;
    };
});
/**
 * Credentials
 */
export declare class Credentials {
    client: SignifyClient;
    /**
     * Credentials
     * @param {SignifyClient} client
     */
    constructor(client: SignifyClient);
    /**
     * List credentials
     * @async
     * @param {CredentialFilter} [kargs] Optional parameters to filter the credentials
     * @returns {Promise<any>} A promise to the list of credentials
     */
    list(kargs?: CredentialFilter): Promise<any>;
    /**
     * Get a credential
     * @async
     * @param {string} said - SAID of the credential
     * @param {boolean} [includeCESR=false] - Optional flag export the credential in CESR format
     * @returns {Promise<any>} A promise to the credential
     */
    get(said: string, includeCESR?: boolean): Promise<any>;
    /**
     * Delete a credential from the DB
     * @async
     * @param {string} said - SAID of the credential
     * @returns {Promise<void>}
     */
    delete(said: string): Promise<void>;
    /**
     * Get the state of a credential
     * @async
     * @param {string} ri - management registry identifier
     * @param {string} said - SAID of the credential
     * @returns {Promise<CredentialState>} A promise to the credential registry state
     */
    state(ri: string, said: string): Promise<CredentialState>;
    /**
     * Issue a credential
     */
    issue(name: string, args: CredentialData): Promise<IssueCredentialResult>;
    /**
     * Revoke credential
     * @async
     * @param {string} name Name or alias of the identifier
     * @param {string} said SAID of the credential
     * @param {string} datetime date time of revocation
     * @returns {Promise<any>} A promise to the long-running operation
     */
    revoke(name: string, said: string, datetime?: string): Promise<RevokeCredentialResult>;
}
export interface CreateRegistryArgs {
    name: string;
    registryName: string;
    toad?: string | number | undefined;
    noBackers?: boolean;
    baks?: string[];
    nonce?: string;
}
export declare class RegistryResult {
    private readonly _regser;
    private readonly _serder;
    private readonly _sigs;
    private readonly promise;
    constructor(regser: Serder, serder: Serder, sigs: any[], promise: Promise<Response>);
    get regser(): any;
    get serder(): Serder;
    get sigs(): string[];
    op(): Promise<any>;
}
/**
 * Registries
 */
export declare class Registries {
    client: SignifyClient;
    /**
     * Registries
     * @param {SignifyClient} client
     */
    constructor(client: SignifyClient);
    /**
     * List registries
     * @async
     * @param {string} name Name or alias of the identifier
     * @returns {Promise<any>} A promise to the list of registries
     */
    list(name: string): Promise<any>;
    /**
     * Create a registry
     * @async
     * @param {CreateRegistryArgs}
     * @returns {Promise<[any, Serder, any[], object]> } A promise to the long-running operation
     */
    create({ name, registryName, noBackers, toad, baks, nonce, }: CreateRegistryArgs): Promise<RegistryResult>;
    createFromEvents(hab: HabState, name: string, registryName: string, vcp: Dict<any>, ixn: Dict<any>, sigs: any[]): Promise<Response>;
    /**
     * Rename a registry
     * @async
     * @param {string} name Name or alias of the identifier
     * @param {string} registryName Current registry name
     * @param {string} newName New registry name
     * @returns {Promise<any>} A promise to the registry record
     */
    rename(name: string, registryName: string, newName: string): Promise<any>;
}
/**
 * Schemas
 */
export declare class Schemas {
    client: SignifyClient;
    /**
     * Schemas
     * @param {SignifyClient} client
     */
    constructor(client: SignifyClient);
    /**
     * Get a schema
     * @async
     * @param {string} said SAID of the schema
     * @returns {Promise<any>} A promise to the schema
     */
    get(said: string): Promise<any>;
    /**
     * List schemas
     * @async
     * @returns {Promise<any>} A promise to the list of schemas
     */
    list(): Promise<any>;
}
/**
 * Ipex
 */
export declare class Ipex {
    client: SignifyClient;
    /**
     * Schemas
     * @param {SignifyClient} client
     */
    constructor(client: SignifyClient);
    /**
     * Create an IPEX apply EXN message
     */
    apply(args: IpexApplyArgs): Promise<[Serder, string[], string]>;
    submitApply(name: string, exn: Serder, sigs: string[], recp: string[]): Promise<any>;
    /**
     * Create an IPEX offer EXN message
     */
    offer(args: IpexOfferArgs): Promise<[Serder, string[], string]>;
    submitOffer(name: string, exn: Serder, sigs: string[], atc: string, recp: string[]): Promise<any>;
    /**
     * Create an IPEX agree EXN message
     */
    agree(args: IpexAgreeArgs): Promise<[Serder, string[], string]>;
    submitAgree(name: string, exn: Serder, sigs: string[], recp: string[]): Promise<any>;
    /**
     * Create an IPEX grant EXN message
     */
    grant(args: IpexGrantArgs): Promise<[Serder, string[], string]>;
    submitGrant(name: string, exn: Serder, sigs: string[], atc: string, recp: string[]): Promise<any>;
    /**
     * Create an IPEX admit EXN message
     */
    admit(args: IpexAdmitArgs): Promise<[Serder, string[], string]>;
    submitAdmit(name: string, exn: Serder, sigs: string[], atc: string, recp: string[]): Promise<any>;
}
