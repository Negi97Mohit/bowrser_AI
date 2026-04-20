# Privacy Policy — Popup Preview & Search

_Last updated: April 2026_

This Privacy Policy describes how the **Popup Preview & Search** Chrome extension, developed by [fujm](https://github.com/Negi97Mohit), handles information.

## Data Collection

**The Extension does not collect, store, transmit, or share any personal data.** No information about you, your browsing activity, or your searches is ever sent to any server operated by the developer.

## What the Extension Does With Your Data

- **Selected text** — when you right-click selected text and choose a search engine, that text is used only to construct a search URL that opens in a popup window. It is never stored or transmitted to the developer.
- **Link URLs** — when you long-press or right-click a link to open a preview, the URL is loaded inside an iframe. It is never stored or sent anywhere.
- **Settings** — your long-press delay preference is saved locally in `chrome.storage.sync`, which may sync across your own Chrome profile. No one else can access this data.

## Third-Party Services

When you choose to search via Google, DuckDuckGo, ChatGPT, Claude, Gemini, Perplexity, Microsoft Copilot, or DeepSeek, your query is sent directly to that service in your browser — exactly as if you had visited that site yourself. Each service has its own privacy policy governing how they handle your query.

## Permissions Explained

| Permission | Why it's needed |
|---|---|
| `contextMenus` | To add the right-click menu options |
| `scripting` | To inject the link-preview overlay into pages |
| `storage` | To save your delay setting locally |
| `declarativeNetRequest` | To remove headers that block link previews from loading in an iframe |
| `system.display` | To center popup windows on your screen |
| `clipboardWrite` | To auto-fill your selected text into Gemini and DeepSeek, which don't support URL query parameters |

## Changes to This Policy

If this policy changes, the updated version will be published at the same URL. Continued use of the Extension after changes constitutes acceptance of the revised policy.

## Contact

Questions? Open an issue on [GitHub](https://github.com/Negi97Mohit).
