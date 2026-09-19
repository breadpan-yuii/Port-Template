# Portfolio

Portfolio template: single-file static site served with Express.

Single `public/index.html` with a `CONFIG` object for content, plus a minimal Express static server in `server.js`.

## Features

- Responsive single-page portfolio: hero, about, skills, projects, experience, contact
- Dark / light theme toggle with `localStorage` persistence
- Typed role animation, scroll reveal, animated skill bars and stat counters
- Project filtering by tag, mobile nav, back-to-top, toast notifications
- Contact form with client-side validation (demo only — no backend sending)

## Project structure

```
.
├── server.js       # Express static server (serves public/)
├── public/
│   └── index.html  # Entire site + CONFIG object + styles + script
├── package.json
└── package-lock.json
```

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

Edit the `CONFIG` object at the top of the `<script>` in `public/index.html`:

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

- Contact form only validates and shows a toast — wire `contactForm` submit handler to an API / email service to actually send messages.
- Theme preference is stored as `pf-theme` in `localStorage`.

## License

MIT
