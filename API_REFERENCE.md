# API Reference Guide

## Backend API Endpoints

### Authentication
```
POST /auth/login
  Body: { email, password }
  Response: Sets cookie with JWT token

POST /auth/signup
  Body: { email, name, password }
  Response: Creates user and sets cookie

POST /auth/signout
  Response: Clears cookie
```

### User Management
```
GET /user/
  Headers: Requires auth cookie
  Response: { id, email, name, createdAt }

GET /user/profile
  Headers: Requires auth cookie
  Response: User profile data

GET /user/transcripts
  Headers: Requires auth cookie
  Response: [ { _id, subject, transcript, userEmail, folderId, summary, chat, createdAt }, ... ]

GET /user/folder
  Headers: Requires auth cookie
  Response: [ { _id, name, userEmail, createdAt }, ... ]

POST /user/transcript
  Headers: Requires auth cookie
  Body: { subject, transcript, folderId (optional), summary (optional) }
  Response: { message, id }

POST /user/folder
  Headers: Requires auth cookie
  Body: { name }
  Response: { message, id }

DELETE /user/transcript/{transcript_id}
  Headers: Requires auth cookie
  Response: { message }

DELETE /user/folder/{folder_id}
  Headers: Requires auth cookie
  Response: { message }
```

### Extension/Upload
```
POST /extension/audio
  Body: Raw audio bytes
  Response: { transcript }

POST /extension/create
  Body: Transcript metadata
  Response: { message, data }

GET /extension/
  Response: { message: "random message" }
```

## Frontend API Service Usage

### Authentication
```javascript
import { authAPI } from './services/api';

// Login
await authAPI.login('user@email.com', 'password');

// Signup
await authAPI.signup('user@email.com', 'John Doe', 'password');

// Logout
await authAPI.logout();
```

### User Operations
```javascript
import { userAPI } from './services/api';

// Get profile
const user = await userAPI.getProfile();

// Get transcripts
const transcripts = await userAPI.getTranscripts();

// Get folders
const folders = await userAPI.getFolders();

// Create transcript
const result = await userAPI.createTranscript({
  subject: 'React Hooks',
  transcript: 'full transcript text...',
  folderId: 'optional-folder-id'
});

// Create folder
const result = await userAPI.createFolder({
  name: 'Web Development'
});

// Delete transcript
await userAPI.deleteTranscript(transcriptId);

// Delete folder
await userAPI.deleteFolder(folderId);
```

## Data Structures

### User
```javascript
{
  id: string,
  email: string,
  name: string,
  createdAt: ISO8601 timestamp
}
```

### Transcript
```javascript
{
  id: string,           // Converted from _id
  userEmail: string,
  subject: string,
  transcript: string,   // Full transcript text
  folderId: string,     // Optional
  summary: string,      // Optional
  chat: array,          // Optional
  createdAt: ISO8601 timestamp
}
```

### Folder
```javascript
{
  id: string,           // Converted from _id
  name: string,
  userEmail: string,
  createdAt: ISO8601 timestamp
}
```

## Error Handling

All API calls may throw errors with:
- `error.message` - Friendly error message
- Backend returns `{ detail: "error message" }`

Example error handling:
```javascript
try {
  const transcripts = await userAPI.getTranscripts();
} catch (err) {
  console.error(err.message);
  // Show error to user
}
```

## Authentication Flow

1. User signs up/logs in
2. Backend sets `token` cookie with JWT
3. All subsequent requests include cookie automatically
4. Backend verifies token and extracts user email
5. All database queries filtered by user email
6. Response includes user's data only

## Environment Setup

Create `.env` files:

**Backend (.env in root):**
```
MONGO_URI=mongodb+srv://...
JWT_KEY=your-secret-key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
GEMINI_API_KEY=your-api-key
```

**Frontend (.env.local in client/):**
```
REACT_APP_API_URL=http://localhost:8000
```

## Running the Stack

**Backend (Python):**
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn server:app --reload
```

**Frontend (Node):**
```bash
cd client
npm install
npm start
```

Server runs on `http://localhost:8000`
Frontend runs on `http://localhost:3000`

## Testing

### Login flow:
1. POST /auth/signup → creates user
2. POST /auth/login → authenticates
3. GET /user/ → retrieves profile
4. GET /user/transcripts → empty list initially
5. POST /user/transcript → creates transcript
6. GET /user/transcripts → shows created transcript

### Folder flow:
1. POST /user/folder → creates folder
2. GET /user/folder → shows created folder
3. DELETE /user/folder/{id} → deletes folder
4. GET /user/folder → folder gone

### Security check:
- Create user A, create data
- Create user B, try to access user A's data
- Backend should reject unauthorized access
