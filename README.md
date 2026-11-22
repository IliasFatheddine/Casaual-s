# Casauals.
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

## Deploy on Vercel
Add these Environment Variables in the Vercel project settings: `MONGODB_URI`, `DB_NAME`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `ADMIN_PASSWORD`, `BASE_URL` (your https Vercel address). In Atlas > Network Access allow `0.0.0.0/0`. Then redeploy. Runtime errors appear in Vercel > project > Logs.
