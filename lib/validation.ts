/**
 * Deliberately loose: the address is only ever delivered to by Resend, never
 * used as a local-part mailbox, so the check rejects obvious typos without
 * pretending to implement RFC 5322.
 */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
