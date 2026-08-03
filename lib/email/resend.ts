import { Resend } from "resend";

let client: Resend | null | undefined;

/** Returns `null` (not throwing) when RESEND_API_KEY is unset, so lead creation never fails because email isn't configured yet. */
export function getResendClient(): Resend | null {
  if (client !== undefined) return client;
  const apiKey = process.env.RESEND_API_KEY;
  client = apiKey ? new Resend(apiKey) : null;
  return client;
}
