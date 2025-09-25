# Dynamic Address Form (Fullstack TypeScript Demo)

## Overview
This project demonstrates a dynamic address form for customer onboarding, supporting country-specific layouts and validation. It uses React for the frontend and Express + SQLite for the backend. Google Places Autocomplete is integrated for quick address entry.

## Folders
- `backend/`: Express + SQLite + TypeScript API
- `frontend/`: React + TypeScript dynamic form

## Setup

### Backend
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Start the server:
   ```bash
   npm run dev
   ```
   The server will run at http://localhost:4000

### Frontend
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Add  Google Maps API key to a `.env` file:
   ```env
   REACT_APP_GOOGLE_API_KEY=your_google_api_key_here
   ```
3. Start the application:
   ```bash
   npm start
   ```
   The app will run at http://localhost:3000

## Features
- Country dropdown for address input
- Google Places Autocomplete (requires API key)
- "Manually Edit" mode for country-specific address formats
- Validation for required fields and formats per country
- Save and list addresses (demo)
- Metadata-driven, extensible
- Responsive, modern UI

## API
- `GET /metadata/countries` — Get address field metadata for all countries
- `GET /metadata/countries/:code` — Get address field metadata for a specific country
- `POST /addresses` — Save address data
- `GET /addresses` — Retrieve all saved addresses

## Design Decisions & Trade-offs
- **SQLite for Backend Storage:** Lightweight, file-based, ideal for demos; easy migration to other DBs.
- **Dynamic Metadata API:** Enables flexible, country-specific forms; scalable for global products.
- **Google Places Autocomplete:** Improves UX and data accuracy; requires API key and billing for production.
- **Validation:** Driven by backend metadata for consistency; frontend and backend can both validate.
- **UI/UX:** Minimal but modern and responsive; can be further improved for production.

## Security & Demo Notes
- **Google API Key:** Not included in the repository for security
- **Demo Video:** (Optional) Attach a video or GIF in your submission to show Google Places integration if reviewers cannot test with their own API key.

## License
MIT