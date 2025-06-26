# TeraPlayer

A modern web application for parsing Terabox links and providing easy media download/streaming capabilities.

## Features

- 🎥 Parse Terabox links and extract media information
- 🚀 Clean, modern UI built with React and Tailwind CSS
- ⚡ Fast backend API built with Express.js and TypeScript
- 📱 Responsive design for all devices
- 🔒 Secure with proper CORS and security headers

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- React Router for navigation

### Backend
- Node.js with Express.js
- TypeScript for type safety
- Helmet for security headers
- CORS for cross-origin requests

## Development

### Prerequisites
- Node.js 18+
- npm 9+

### Setup
```bash
# Install dependencies
npm install

# Start development servers (both frontend and backend)
npm run dev

# Or start individually
npm run dev:backend
npm run dev:frontend
```

### Building for Production
```bash
# Build both apps
npm run build

# Start production server
npm start
```

## Project Structure

```
teraplayer/
├── apps/
│   ├── backend/          # Express.js API server
│   │   ├── src/
│   │   │   ├── index.ts  # Main server file
│   │   │   ├── routes/   # API routes
│   │   │   └── utils/    # Utility functions
│   │   └── package.json
│   └── frontend/         # React application
│       ├── src/
│       │   ├── App.tsx   # Main app component
│       │   ├── main.tsx  # Entry point
│       │   └── ...
│       └── package.json
├── package.json          # Root package.json with workspaces
└── README.md
```

## API Endpoints

- `POST /api/parse` - Parse a Terabox link and return media information

## License

This project is for educational purposes only. Not affiliated with Terabox or any third-party services.