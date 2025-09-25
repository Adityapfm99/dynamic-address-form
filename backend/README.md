# Dynamic Address Form Backend

## Setup
1. Install dependencies:
   ```
   npm install
   ```
2. Start the server:
   ```
   npm run dev
   ```
   The server will run at http://localhost:4000

## API Endpoints
- `GET /metadata/countries` — Get address field metadata for all countries
- `GET /metadata/countries/:code` — Get address field metadata for a specific country
- `POST /addresses` — Save address data
- `GET /addresses` — Retrieve all saved addresses

## Database
- Uses SQLite (the `addresses.db` file is created automatically)
- Address data is stored as JSON

## Notes
- Make sure the frontend is running at http://localhost:3000