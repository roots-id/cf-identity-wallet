import { SignifyClient } from './clienting';
import { Operation } from './coring';
export interface Contact {
    alias: string;
    oobi: string;
    id: string;
    [key: string]: unknown;
}
export interface ContactInfo {
    [key: string]: unknown;
}
/**
 * Contacts
 */
export declare class Contacts {
    client: SignifyClient;
    /**
     * Contacts
     * @param {SignifyClient} client
     */
    constructor(client: SignifyClient);
    /**
     * List contacts
     * @async
     * @param {string} [group] Optional group name to filter contacts
     * @param {string} [filterField] Optional field name to filter contacts
     * @param {string} [filterValue] Optional field value to filter contacts
     * @returns {Promise<any>} A promise to the list of contacts
     */
    list(group?: string, filterField?: string, filterValue?: string): Promise<Contact[]>;
    /**
     * Get a contact
     * @async
     * @param {string} pre Prefix of the contact
     * @returns {Promise<any>} A promise to the contact
     */
    get(pre: string): Promise<Contact>;
    /**
     * Add a contact
     * @async
     * @param pre Prefix of the contact
     * @param info Information about the contact
     * @returns A promise to the result of the addition
     */
    add(pre: string, info: ContactInfo): Promise<Contact>;
    /**
     * Delete a contact
     * @async
     * @param {string} pre Prefix of the contact
     * @returns {Promise<void>}
     */
    delete(pre: string): Promise<void>;
    /**
     * Update a contact
     * @async
     * @param {string} pre Prefix of the contact
     * @param {any} info Updated information about the contact
     * @returns {Promise<any>} A promise to the result of the update
     */
    update(pre: string, info: ContactInfo): Promise<Contact>;
}
export interface Challenge {
    words: string[];
}
/**
 * Challenges
 */
export declare class Challenges {
    client: SignifyClient;
    /**
     * Challenges
     * @param {SignifyClient} client
     */
    constructor(client: SignifyClient);
    /**
     * Generate a random challenge word list based on BIP39
     * @async
     * @param {number} strength Integer representing the strength of the challenge. Typically 128 or 256
     * @returns {Promise<any>} A promise to the list of random words
     */
    generate(strength?: number): Promise<Challenge>;
    /**
     * Respond to a challenge by signing a message with the list of words
     * @async
     * @param name Name or alias of the identifier
     * @param recipient Prefix of the recipient of the response
     * @param words List of words to embed in the signed response
     * @returns A promise to the result of the response
     */
    respond(name: string, recipient: string, words: string[]): Promise<unknown>;
    /**
     * Ask Agent to verify a given sender signed the provided words
     * @param source Prefix of the identifier that was challenged
     * @param words List of challenge words to check for
     * @returns A promise to the long running operation
     */
    verify(source: string, words: string[]): Promise<Operation<unknown>>;
    /**
     * Mark challenge response as signed and accepted
     * @param source Prefix of the identifier that was challenged
     * @param said qb64 AID of exn message representing the signed response
     * @returns {Promise<Response>} A promise to the result
     */
    responded(source: string, said: string): Promise<Response>;
}
