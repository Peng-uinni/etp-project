# Video Transcript Generation and Manager via Browser Extension
The app is an extension that captures the audio from the current tab and creates transcripts. It is not yet implemented but will be soon! (probably)

The backend is created using FastAPI using python 3.13
The database used is MongoDB

## How to run
### The FastAPI backend 
Make sure to create a .env file in the root project directory with the following variables 
```
DB_HOST=
DB_PORT=
DB_NAME=
```

Make sure you have atleast python 3.13 installed and run the following commands 
```
python -m venv .venv
.venv/Scripts/activate
pip install -r requirements.txt
```
To run the development server 
```
cd backend
fastapi dev server.py
```

### The Node frontend
Make sure to have Node version 22.18.0 or above (lower versions might work but idk) and run the following 
```
npm install
cd client
npm install
```
To run the frontend use
```
npm run dev
```