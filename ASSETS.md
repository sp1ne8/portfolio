# Asset provenance

## Brand and icons

The original sp1ne mark consists of three offset angular elements, suggesting a spine. `dist/assets/logo.svg` is the standalone symbol. `dist/assets/favicon.svg` is the favicon. The complete wordmark is composed with live text in the header and footer.

Telegram, GitHub, mail and arrow symbols are inline SVG paths in `dist/index.html`. No icon font or emoji is used.

## Project images

- `dist/assets/future-tech.jpg`: screenshot of https://sp1ne8.github.io/future-tech/, captured 2026-10-15; cropped to the first 1700 px.
- `dist/assets/area.jpg`: screenshot of https://sp1ne8.github.io/Area/, captured 2026-10-15; cropped to the first 2000 px.

These are screenshots of the supplied projects, not fabricated mockups. Content and figures inside the screenshots belong to the demonstration sites and are not claims about sp1ne's clients or results.

## Generated landscapes

Created with the built-in imagegen tool. No CLI or external API key was used. Both original PNGs are copied into the project and need no replacement.

### `dist/assets/landscape.png`

Final prompt:

> Use case: photorealistic-natural. Asset type: full-bleed landscape photograph for a developer portfolio hero. Create one ultra-wide cinematic natural photograph, 3:2 or 16:9 landscape, of a remote Norwegian mountain lake at blue hour, near-black pine forest and steep mountainous silhouette on the right side, delicate mist rolling over mirror-still water, slate silver storm clouds. Very restrained near monochrome palette: obsidian charcoal, smoky cool gray, muted silver, faint desaturated violet in the sky. The LEFT HALF and lower-left two-thirds must be very dark quiet open water and deep shadow with smooth natural texture, intended for large white text overlay; the lightest narrow mist and small distant ridge sit upper-right, optical center airy and empty. Natural photographic low-key exposure, editorial fine art landscape photography, subtle analog grain, beautiful complex cloud textures, no artificial lighting. Calm, vast, mysterious and premium. No people, no buildings, no computers, no devices, no graphics, no text, no logos, no border. Do not add a graphic gradient or typography. The scene itself should give excellent white-text contrast at the lower-left. Output a finished natural landscape image.

### `dist/assets/forest.png`

Final prompt:

> Use case: photorealistic-natural. Asset type: portrait landscape photograph for a developer portfolio about section, seamless dark editorial atmosphere. One vertical 3:4 natural photographic composition: a remote hillside covered with dark fir trees disappearing into delicate low clouds and fog, mountain wilderness in blue hour, very dark obsidian pine silhouettes in lower half, many layered conifers and quiet luminous gray mist in upper half. Restrained near monochrome cool charcoal, slate gray, muted silver, faint desaturated violet. Tactile natural detail, cinematic fine art landscape photography, calm and contemplative, no fantasy, no artificial lights. Edge-to-edge photographic crop. No people, no buildings, no text, no graphic gradients, no borders, no logos, no watermark.

## Fonts

Manrope 400 and Playfair Display 400 (normal / italic), fetched from Google Fonts and stored locally under `dist/assets/fonts/`. OFL license texts are included. Cyrillic and Latin subsets are included. The finished page makes no font request to third-party servers.
