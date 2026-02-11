# JutaDhundo

## Overview
JutaDhundo is a fast, spelling-tolerant search website that helps people find Circle (Juta) information using Village Name or Thana Number. Built with React + Fuse.js for fuzzy search. Deployable on Netlify or Replit.

## Current State
- Fully functional search application
- 3,472+ village records from Bihar land records
- Fuzzy search with spelling tolerance
- Mobile-first responsive design
- Clean, minimal UI with yellow + dark blue accent colors

## Project Structure
```
├── client/
│   └── src/
│       ├── components/      # Reusable UI components
│       │   ├── Header.tsx   # Navigation and branding
│       │   ├── Footer.tsx   # Footer with disclaimers
│       │   ├── SearchBox.tsx # Smart search with suggestions
│       │   └── ResultCard.tsx # Result display cards
│       ├── pages/           # Page components
│       │   ├── Home.tsx     # Main search page
│       │   ├── About.tsx    # About Juta page
│       │   ├── DataSource.tsx # Data source info
│       │   └── Contact.tsx  # Contact page
│       └── App.tsx          # Root component with routing
├── server/
│   ├── routes.ts            # API endpoints
│   └── storage.ts           # Data loading and storage
├── shared/
│   └── schema.ts            # TypeScript types
└── attached_assets/
    └── tableConvert.com_*.json  # Village data source
```

## Key Technologies
- **Frontend**: React, TanStack Query, Wouter (routing), Tailwind CSS
- **Backend**: Express.js
- **Search**: Fuse.js (fuzzy search library)
- **Styling**: Tailwind CSS with custom design system

## API Endpoints
- `GET /api/villages` - Returns all village records

## User Preferences
- Minimal, clean design
- Yellow + dark blue accent colors
- Mobile-first approach
- No emojis in UI (use Lucide icons)

## Netlify Deployment
This project is now fully configured for Netlify deployment:

### Configuration Files
- `netlify.toml` - Build and redirect configuration with proper API routing
- `netlify/functions/villages.js` - Serverless function for village data endpoint
- `netlify/functions/data/villages.json` - Complete village dataset (694 records)

### How to Deploy
1. Push your code to GitHub (make sure netlify.toml, netlify/functions/, and dist/ are committed)
2. Connect repository to Netlify:
   - Go to https://app.netlify.com
   - Click "New site from Git"
   - Select your repository
3. Netlify auto-detects settings from netlify.toml
4. Click "Deploy"
5. Your site will be live at `your-site-name.netlify.app`

### How It Works
- Frontend (React) builds to `dist/public`
- API requests to `/api/villages` automatically route to the serverless function
- Function returns all 694 village records with filtering support
- Search uses Fuse.js on the client for instant results

## Recent Changes
- December 2024: Added Netlify deployment support
  - Created netlify.toml configuration
  - Added serverless function for /api/villages
  - Updated vite.config.ts for Netlify compatibility
  - Made site domain-agnostic
- December 2024: Initial implementation of JutaDhundo
  - Implemented smart search with fuzzy matching
  - Created responsive UI with proper design guidelines
  - Added multiple pages (Home, About, Data Source, Contact)
  - Fixed emoji usage - replaced with Lucide icons
  - Added hover-elevate animations to cards
