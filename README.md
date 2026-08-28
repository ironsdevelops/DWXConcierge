# DWX Concierge — Lisa Web Frontend

Static web frontend for **Lisa**, the DWX Concierge orchestrator (Copilot Studio), branded for
TANDI Laboratories. Matches the look and feel of the existing Marge (Meeting and Room Guidance
Engine) frontend — same shell, voice mode, and connection handling, re-themed to TANDI's brand.

## Structure

```
index.html              Lisa's web chat frontend (Direct Line + Web Chat + voice mode)
tandi-mark-dark.png      Icon mark, navy fill — used in header/sidebar on the navy background
tandi-mark-light.png     Icon mark, white fill — used as the bot avatar in chat bubbles
tandi-background.jpg     Brand hero art — desktop backdrop behind the chat shell
```

Deploys as a static site (Azure Static Web Apps, GitHub Pages, etc.) with no build step —
`index.html` references the three asset files by relative path, so keep them all in the same
folder.

## Before deploying

`index.html` loads its real config from `config.js`, which is **gitignored and never
committed** — this is what keeps the Direct Line endpoint and, more importantly, the Speech
key out of git history and off GitHub's secret scanning radar.

1. Copy `config.example.js` to `config.js` (same folder, next to `index.html`).
2. Fill in the three values in `config.js`:
   - **`TOKEN_ENDPOINT`** — Lisa's Direct Line token endpoint.
     Copilot Studio → Lisa → Settings → Channels → Custom website (or Mobile app) → Token
     Endpoint.
   - **`SPEECH_KEY`** / **`SPEECH_REGION`** — Azure Speech resource for voice mode.
     Currently pointed at the same resource used by Marge's frontend (Free tier: 5 audio
     hours recognition + 500K characters synthesis / month, shared). Swap in a dedicated
     resource if Lisa needs her own quota.
3. Deploy `index.html` *and* your filled-in `config.js` together to your static host — since
   `config.js` is gitignored, most CI/CD pipelines (Azure Static Web Apps' GitHub Actions
   deploy included) won't pick it up automatically. For a quick pilot, upload it manually
   alongside the built site; for anything longer-lived, inject it as a build step from a
   deployment secret rather than hand-copying a file with a live key in it.

`TOKEN_ENDPOINT` is safe to have client-side either way — it only ever hands back a
short-lived Direct Line token. `SPEECH_KEY` is a standing credential and is the one this
whole setup exists to protect from git, though it's still exposed to anyone who views source
on the deployed site — see the security note in `index.html` above the Speech config for the
proper fix (a small server-side token proxy) if this moves past internal pilot use.

Optional query params for a lobby-kiosk deployment (not required — Lisa defaults to a personal
chat with no location context):

```
index.html?location_id=LON-HQ&location_name=London%20Headquarters
```

## Status

- Lisa ↔ Marge and Lisa ↔ DWX-WorkIQ connected-agent links: live (Copilot Studio).
- Frontend capabilities not yet surfaced in Lisa's agent instructions (desk booking, facilities
  requests) are present in the UI shell so no frontend rework is needed once those flows exist.
