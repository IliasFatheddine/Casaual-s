# Casauals.

## License

© 2026 casauals. All Rights Reserved.

This software and associated documentation are the exclusive property of casauals.

You may not use, copy, modify, publish, distribute, sublicense, or sell
this software without explicit written permission from casauals.

Title and ownership of this software, and all associated intellectual property rights,
remain with casauals. Unauthorized reproduction, distribution, or modification is
strictly prohibited and constitutes a violation of intellectual property rights.

Use of this software does not convey any license under casauals's intellectual property
rights, including any trademarks or service marks.

All rights reserved.

Node/Express + MongoDB Atlas. Frontend: `public/` (HTML, `css/`, `js/`, `assets/`). Backend: `server.js` + `src/`.

## Run
1. `npm install`
2. Fill `.env` (see below)
3. `npm start` -> http://localhost:3000

## .env
- `MONGODB_URI` Atlas connection string (already filled) | `DB_NAME` database name (`casauals`)
- `GMAIL_USER` / `GMAIL_APP_PASSWORD` Gmail + App Password (Google Account > Security > 2-Step Verification > App passwords)
- `BASE_URL` public site address (used in e-mailed links) | `ADMIN_PASSWORD` dashboard login | `PORT`

## Registration flow
Collections gate -> `POST /api/request` (pending_registrations + Gmail link) -> `register.html?token=...` (`GET /api/register-info`, `POST /api/register`) -> club_members. At startup the server prints `[mail] Gmail login OK` or the reason it failed. `GET /api/health` shows the database status.
The e-mailed link uses the address the visitor used (or BASE_URL when it is a real domain), so on a phone use the PC address (e.g. http://192.168.x.x:3000) or deploy the site.

## Database
`pending_registrations` (e-mail + one-time token, auto-deleted) and `club_members` (e-mail, name, phone, blocked, registeredAt).
Never commit `.env` (it is in `.gitignore`).
