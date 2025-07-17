# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript application for "Thriving with ADHD" - a simple landing page with email signup functionality. The project is built with Vite and currently consists of a single signup page that collects email addresses via EmailOctopus API.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Architecture

### Core Structure
- **Frontend**: React 19 with TypeScript, built with Vite
- **Styling**: Inline styles (no CSS framework currently active)
- **Build Tool**: Vite with standard React setup
- **Email Service**: EmailOctopus API integration for newsletter signup

### Key Files
- `src/App.tsx` - Main app component that renders SignupPage
- `src/main.tsx` - Application entry point
- `src/pages/SignupPage.tsx` - Main landing page with email signup form
- `index.html` - HTML template
- `package.json` - Dependencies and scripts

### Directory Structure
```
src/
├── components/     # Currently empty - for reusable UI components
├── features/       # Currently empty - for feature-specific code
├── hooks/          # Currently empty - for custom React hooks
├── lib/            # Currently empty - for utility functions
├── pages/          # Page components
├── routes/         # Currently empty - for routing setup
└── styles/         # CSS files (tailwind.css exists but not actively used)
```

### Email Integration
The signup form directly posts to EmailOctopus API endpoint: `https://eocampaign1.com/api/forms/ebf614bc-625c-11f0-ab08-f51526c9c4c3/subscribe`

## TypeScript Configuration
- Strict mode enabled
- React JSX transform
- ES modules with Node resolution
- Target: ESNext with DOM libraries

## Notes
- No testing framework currently configured
- No linting tools configured
- Tailwind CSS is set up but not actively used (inline styles preferred)
- The `api/` directory contains unused TypeScript files
- Configuration files (vite.config.ts, tailwind.config.ts, postcss.config.js) exist but are mostly empty