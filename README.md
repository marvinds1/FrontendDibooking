# FrontendDibooking

React client for **Dibooking**, a sports-field booking app. Renters browse fields, pick a 2-hour slot, pay from their in-app balance and leave reviews; field owners get a dashboard to manage fields and confirm bookings. API: [backend-dibooking](https://github.com/marvinds1/backend-dibooking).

## Stack

React 18 (Create React App), React Router 6, React Bootstrap, Axios. Owner dashboard is based on the SB Admin 2 template.

## Features

- Field catalogue, detail page, rating breakdown and reviews
- Slot picker (next 4 days, 2-hour slots within opening hours) → booking → payment confirmation
- Booking list and history (active vs. finished/cancelled)
- Owner dashboard: add/edit fields, accept or reject paid bookings
- Profile page with editable contact data

## How the client talks to the API

All requests go through one Axios instance (`src/api.js`):

- `baseURL` from `REACT_APP_API_URL` (falls back to the deployed backend).
- Adds `Authorization: Bearer <access token>` to every request.
- On `401` it refreshes the access token **once** via the httpOnly refresh cookie and retries the request. Concurrent `401`s share a single in-flight refresh promise — firing several refreshes in parallel would trip the backend's refresh-token reuse detection and log the user out.
- `errorMessage()` surfaces the server's message (e.g. *"Slot sudah dibooking"*, *"Saldo tidak mencukupi"*) instead of a generic failure.

## Safety notes

- The price and user ID are **not** sent when booking; the server derives them from the token and the field's price.
- Pay / book buttons stay disabled while a request is in flight (no artificial delays that briefly re-enable them), so double clicks don't produce duplicate requests. The backend is idempotent anyway.
- No `console.log` of form data (the register form used to log the password).
- The access token is short-lived but stored in `localStorage`, which is readable by any script on the page. Keep dependencies updated and avoid `dangerouslySetInnerHTML` with user content; a stricter setup would keep the access token in memory only.

## Running locally

```bash
cp .env.example .env      # point REACT_APP_API_URL to your backend
npm ci
npm start                 # http://localhost:3000
CI=true npm run build     # production build, warnings fail the build
```
