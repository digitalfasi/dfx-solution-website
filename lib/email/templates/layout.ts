import { SITE_CONFIG } from "@/lib/config/site";

/** Shared branded shell every transactional email renders inside — keeps every email visually consistent with the site. */
export function renderEmailLayout({ previewText, bodyHtml }: { previewText: string; bodyHtml: string }): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${SITE_CONFIG.name}</title>
  </head>
  <body style="margin:0;padding:0;background:#F3F7FF;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <span style="display:none;font-size:1px;color:#F3F7FF;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${previewText}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F3F7FF;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid rgba(24,27,49,0.10);">
            <tr>
              <td style="padding:28px 32px;background:linear-gradient(135deg,#8777E0,#60A3E6);">
                <span style="font-size:20px;font-weight:700;color:#FFFFFF;letter-spacing:-0.02em;">${SITE_CONFIG.name}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;color:#181B31;font-size:15px;line-height:1.6;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:#F3F7FF;text-align:center;">
                <p style="margin:0;font-size:12px;color:#6E7F99;">${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function button(label: string, href: string): string {
  return `<a href="${href}" style="display:inline-block;margin:6px 8px 6px 0;padding:12px 22px;border-radius:10px;background:linear-gradient(135deg,#8777E0,#60A3E6);color:#FFFFFF;font-weight:600;font-size:14px;text-decoration:none;">${label}</a>`;
}

export function secondaryButton(label: string, href: string): string {
  return `<a href="${href}" style="display:inline-block;margin:6px 8px 6px 0;padding:12px 22px;border-radius:10px;border:1px solid rgba(24,27,49,0.15);color:#181B31;font-weight:600;font-size:14px;text-decoration:none;">${label}</a>`;
}
