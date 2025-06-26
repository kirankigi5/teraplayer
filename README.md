# TeraPlayer Backend

## How to Run Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **(Optional) Create a `.env` file** in the project root to set environment variables:
   ```
   PORT=5000
   FRONTEND_ORIGIN=http://localhost:3000
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   or
   ```bash
   node server.js
   ```

4. **API is available at:**  
   `http://localhost:5000/api/parse`

5. **Health check:**  
   Visit `http://localhost:5000/` in your browser to confirm the backend is running.

## Example API Usage

**POST** `/api/parse`  
Body:
```json
{
  "link": "https://www.terabox.com/s/1abcDEFghijKLMN"
}
```

**Response:**
```json
{
  "success": true,
  "fileName": "...",
  "fileSize": "...",
  "fileType": "...",
  "directLink": "..."
}
```

## Overview

TeraPlayer backend provides an API to parse Terabox links and extract file metadata and direct download links for use in the TeraPlayer frontend.

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Running the Server

```bash
npm start
```
or
```bash
node server.js
```

#### Environment Variables

- `PORT` (optional): Port to run the server (default: 5000)
- `FRONTEND_ORIGIN` (optional): Allowed CORS origin for your frontend (default: `*`)

Create a `.env` file if you want to set these.

## API

### POST `/api/parse`

Parses a Terabox link and returns file metadata and a direct download link.

#### Request

- **Content-Type:** `application/json`
- **Body:**
  ```json
  {
    "link": "<user_pasted_terabox_link>"
  }
  ```

#### Response (Success)

```json
{
  "success": true,
  "fileName": "Sample File (1abcDEFghijKLMN).mp4",
  "fileSize": "1.2 GB",
  "fileType": "video/mp4",
  "directLink": "https://download-placeholder.terabox.com/file/1abcDEFghijKLMN?token=demo"
}
```

#### Response (Error)

```json
{
  "success": false,
  "error": "Reason for failure"
}
```

#### Possible Error Reasons

- Invalid URL format
- Unsupported domain
- Could not extract file identifier from link
- Failed to parse link

## Notes

- No user data or links are stored or logged.
- All processing is ephemeral and privacy-focused.
- CORS is enabled for frontend-backend communication.

## Development

- See `utils/teraboxParser.js` for the parsing logic.
- The code is structured for easy updates when real Terabox parsing is implemented.

## License

MIT
