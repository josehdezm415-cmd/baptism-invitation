# Baptism Invitation React Site

React + Vite baptism invitation, ready for GitHub Pages.

## Edit details

Open `src/main.jsx` and edit the `invitation` object near the top.

Replace placeholders:

- `[Nombre del bebé]`
- `[Sábado]`
- `[15 de marzo, 2026]`
- `[10:00 a.m.]`
- `[Nombre de la iglesia]`
- `[Dirección de la iglesia]`
- `[Lugar de recepción]`
- `[LINK_GOOGLE_MAPS_IGLESIA]`
- `[LINK_GOOGLE_MAPS_RECEPCION]`
- `[NUMERO]` — WhatsApp format, e.g. `503XXXXXXXX`
- `[Nombres de los papás]`

## Local dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production output is in `dist/`.

## GitHub Pages

For a project repo, set the Vite `base` to `/<repo-name>/` in `vite.config.js` before building.

For example, if the repo is `baptism-invitation`:

```js
export default defineConfig({
  plugins: [react()],
  base: '/baptism-invitation/'
})
```
