# Platform logo SVGs

Drop official monochrome SVG logos here with these exact filenames — the
Hero component already points to them, no code changes needed:

| File          | Platform |
|----------------|----------|
| google.svg      | Google   |
| meta.svg          | Meta     |
| openai.svg        | OpenAI   |
| shopify.svg        | Shopify  |
| claude.svg          | Claude   |

Use single-color (monochrome) SVG versions if the brand offers one —
most companies publish these in their official brand/press kits. The
Hero already applies `grayscale` + reduced opacity on top, so a
full-color source SVG will still render correctly, just desaturated.

Until a file exists, that slot renders as empty space (no broken image,
no placeholder logo) — nothing displays until you add the real asset.
