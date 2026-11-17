import type { ID } from "./utils";
/**
 * The protocol of an OOB interaction.
 * @category OOB
 */
export type OOBInteractionProtocol = "DNS" | "FTP" | "HTTP" | "HTTPS" | "LDAP" | "RESPONDER" | "SMB" | "SMTP";
/**
 * The metadata of a DNS interaction.
 * @category OOB
 */
export type OOBInteractionMetadataDNS = {
    kind: "DNS";
    /**
     * The DNS query type (e.g. `A`, `AAAA`, `MX`).
     */
    queryType: string;
};
/**
 * The metadata of an SMTP interaction.
 * @category OOB
 */
export type OOBInteractionMetadataSMTP = {
    kind: "SMTP";
    /**
     * The `MAIL FROM` address.
     */
    from: string;
};
/**
 * The protocol specific metadata of an OOB interaction.
 * @category OOB
 */
export type OOBInteractionMetadata = OOBInteractionMetadataDNS | OOBInteractionMetadataSMTP;
/**
 * The OOB session of the current project.
 * @category OOB
 */
export type OOBSession = {
    /**
     * The hostname receiving interactions on the OOB server.
     * Any subdomain of it also reaches the session, which is useful to tag payloads.
     */
    hostname: string;
    /**
     * When the session was created.
     */
    createdAt: Date;
};
/**
 * An interaction received by the OOB server.
 * @category OOB
 */
export type OOBInteraction = {
    /**
     * The unique identifier of the interaction.
     */
    id: ID;
    /**
     * The protocol of the interaction.
     */
    protocol: OOBInteractionProtocol;
    /**
     * The labels that matched the session, including any subdomain prefix (e.g. `ssrf1.<label>`).
     */
    fullId: string;
    /**
     * The address that triggered the interaction.
     */
    remoteAddress: string;
    /**
     * The protocol specific metadata, for DNS and SMTP interactions.
     *
     * @example
     * ```ts
     * if (interaction.metadata?.kind === "DNS") {
     *   console.log(interaction.metadata.queryType);
     * }
     * ```
     */
    metadata?: OOBInteractionMetadata;
    /**
     * The raw request received by the OOB server.
     */
    rawRequest: string;
    /**
     * The raw response sent by the OOB server, if any.
     */
    rawResponse?: string;
    /**
     * When the OOB server received the interaction.
     */
    timestamp: Date;
};
