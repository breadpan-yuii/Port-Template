# Portfolio

Portfolio template: static site served with Express, organized by separation of concerns.

The site is split by responsibility — **structure** (HTML), **presentation** (CSS), **content** (config.js), and **behavior** (main.js). A minimal Express static server in `server.js` serves `public/`.

## Features

- Responsive single-page portfolio: hero, about, skills, projects, experience, contact
- Dark / light theme toggle with `localStorage` persistence
- Typed role animation, scroll reveal, animated skill bars and stat counters
- Project filtering by tag, mobile nav, back-to-top, toast notifications
- Contact form with client-side validation (demo only — no backend sending)

## Project structure

```
.
├── server.js            # Express static server (serves public/)
├── public/
│   ├── index.html       # Structure / markup only
│   ├── css/
│   │   └── style.css    # Presentation / styling
│   └── js/
│       ├── config.js    # Content / data — edit this to make it yours
│       └── main.js      # Behavior / interactions
├── package.json
└── package-lock.json
```

> Note: a one-line theme-init script stays inline in `index.html`'s `<head>`.
> It must run before first paint to avoid a theme flash; loading it as an
> external file would delay it.

## Quick start

Requirements: Node.js 18+

```bash
npm install
npm start
```

Open http://localhost:3000

Custom port:

```bash
PORT=4000 npm start
```

No build step — edit and refresh.

## Customize

Edit the `CONFIG` object in `public/js/config.js`:

- `name`, `initials`, `roles`, `email`, `location`, `cvUrl`
- `socials` — `{ label, url, icon }`, icons: `github`, `linkedin`, `x`, `mail`
- `bio`, `stats`, `skills`, `projects`, `experience`, `contactBlurb`

Example:

```js
const CONFIG = {
  name: 'Your Name',
  roles: ['Frontend Developer', 'UI Enthusiast'],
  // ...
};
```

## Scripts

| Script | Description |
| ------ | ----------- |
| `npm start` | Serve `public/` with Express on `$PORT` (default 3000) |

## Notes

- Contact form only validates and shows a toast — wire `contactForm` submit handler (in `public/js/main.js`) to an API / email service to actually send messages.
- Theme preference is stored as `pf-theme` in `localStorage`.

## License

MIT