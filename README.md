# TeraDownloaderPlayer

A modern web application for parsing Terabox links and providing easy media download/streaming capabilities.

## 🚀 Live Demo

The application is deployed on Render and can be accessed here:

**[https://teradownloader-a1og.onrender.com/](https://teradownloader-a1og.onrender.com/)**

## Features

- 🎥 Parse Terabox links and extract media information
- 🌙 Dark mode with system preference detection
- 🚀 Clean, modern UI built with React and Tailwind CSS
- ⚡ Fast backend API built with Express.js
- 📱 Responsive design for all devices
- 🔒 Secure with proper CORS and security headers
- 🌐 Universal support for all Terabox domains and mirrors
- 📋 Copy to clipboard functionality
- 🔍 SEO optimized with proper meta tags

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- React Router for navigation

### Backend
- Node.js with Express.js
- CORS for cross-origin requests

## Development

### Prerequisites
- Node.js 20+
- npm 9+

### Setup
```bash
# Install dependencies
npm install

# Start development servers (both frontend and backend)
npm run dev:full
```

### Building for Production
```bash
# Build the frontend application
npm run build

# Start production server
npm start
```

## Deployment

This project is configured for deployment on platforms like Render.

### Render Deployment Settings
1.  Fork this repository.
2.  Create a new "Web Service" on Render and connect your GitHub repository.
3.  Use the following settings:
    -   **Environment:** `Node`
    -   **Root Directory:** (leave blank)
    -   **Build Command:** `npm install && npm run build`
    -   **Start Command:** `npm start`
    -   **Health Check Path:** `/api/health`

## Project Structure

```
teraplayer/
├── server/                 # Express.js API server
│   └── api-server.js       # Main server file
├── src/                    # React frontend application
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── components/
├── public/                 # Public assets
├── package.json            # Project dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md
```

## API Endpoints

- `POST /api/parse` - Parse a Terabox link and return media information
- `GET /health` - Health check endpoint
- `GET /healthz` - Simple health check

## Supported Domains

TeraDownloaderPlayer supports all Terabox domains and mirrors:
- terabox.com, teraboxapp.com
- 1024tera.com, 4funbox.com
- nephobox.com, terabox.app
- And many more regional mirrors

## License

This project is for educational purposes only. Not affiliated with Terabox or any third-party services.