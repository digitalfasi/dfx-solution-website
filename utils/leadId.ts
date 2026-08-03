import { randomBytes } from "crypto";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I — avoids ambiguous reference codes

/** Public-facing reference number shown to the visitor and sales team, e.g. "DFX-8K3N2P1Q". */
export function generateLeadId(): string {
  const bytes = randomBytes(8);
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return `DFX-${code}`;
}
