# Habits Tracker - Frontend Setup

## Prerequisites
- Node.js 16+ and npm

## Installation

```bash
cd frontend
npm install
```

## Running the Frontend

```bash
npm start
```

The application will open at `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs tests
- `npm eject` - Ejects from Create React App (one-way operation)

## Features

- Create and manage daily habits
- Track habit completions
- Mark habits as active/inactive
- Edit and delete habits
- Responsive design for mobile and desktop

## Configuration

The frontend is configured to connect to the backend at `http://localhost:8080`.

To change the API URL, edit the `API_BASE_URL` in:
- `src/services/HabitService.js`
- `src/services/HabitEntryService.js`
