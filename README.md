# Property Rental Management Platform - Frontend

React (Vite) frontend for the Property Rental Management Platform.

## Tech stack
- React 18, React Router
- Vite
- Plain CSS

## Pages
- Home: search properties by location, type and budget
- Property details with a rental request form
- Login and registration (tenant or owner)
- Owner dashboard: properties, rental requests, payments received, complaints
- Tenant dashboard: requests and history, payments, complaints
- Admin dashboard: reports, users, property listings, transactions, complaints

## Run locally
1. Start the backend first (see the backend repo)
2. `npm install`
3. `npm run dev`
4. Open http://localhost:5173

## Environment variable
| Name | Purpose | Default |
|---|---|---|
| VITE_API_URL | backend address, ending in /api | http://localhost:8080/api |

When deploying on Vercel, set `VITE_API_URL` to `https://YOUR-BACKEND.onrender.com/api` (https, no trailing slash after api), then redeploy.

`vercel.json` makes page refreshes work for the React routes.

## Demo logins
| Role | Email | Password |
|---|---|---|
| Admin | admin@rental.com | admin123 |
| Owner | owner@rental.com | owner123 |
| Tenant | tenant@rental.com | tenant123 |

Note: the backend on a free hosting plan sleeps when idle, so the first request can take up to a minute.
