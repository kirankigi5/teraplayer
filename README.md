# TeraPlayer

A modern web application for parsing Terabox links and providing easy media download/streaming capabilities.

## 🚀 Live Demo
Deploy on Vercel: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kirankigi5/teraplayer)

## Features

- 🎥 Parse Terabox links and extract media information
- 🌙 Dark mode with system preference detection
- 🚀 Clean, modern UI built with React and Tailwind CSS
- ⚡ Fast backend API built with Express.js and TypeScript
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
- TypeScript for type safety
- Helmet for security headers
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
npm run dev

# Or start individually
npm run dev:backend
npm run dev:frontend
```

### Building for Production
```bash
# Build both apps
npm run build

# Or use Vercel build command
npm run vercel-build

# Start production server
npm start
```

## Deployment

### Vercel (Recommended)
1. Fork this repository
2. Connect to Vercel
3. Use these settings:
   - **Framework:** Other
   - **Root Directory:** `./`
   - **Build Command:** `npm run vercel-build`
   - **Output Directory:** `apps/frontend/dist`
   - **Install Command:** `npm install`

See [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) for detailed instructions.

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
│       │   └── components/
│       └── package.json
├── package.json          # Root package.json with workspaces
├── vercel.json           # Vercel deployment config
└── README.md
```

## API Endpoints

- `POST /api/parse` - Parse a Terabox link and return media information
- `GET /health` - Health check endpoint
- `GET /healthz` - Simple health check

## Supported Domains

TeraPlayer supports all Terabox domains and mirrors:
- terabox.com, teraboxapp.com
- 1024tera.com, 4funbox.com
- nephobox.com, terabox.app
- And many more regional mirrors

## License

This project is for educational purposes only. Not affiliated with Terabox or any third-party services.