# Video Transcript Generation and Manager via Browser Extension
The app is an extension that captures the audio from the current tab and creates transcripts

The backend is created using FastAPI using python 3.13 and the database used is MongoDB

## How to run
### Database
The database used is MongoDB, make sure you have it installed before running the application

### The FastAPI backend 
Make sure to create a .env file in the root project directory with the following variables 
```
MONGO_URI=<YOUR LOCAL MONGODB URI>
GEMINI_API_KEY=<YOUR API KEY>
JWT_KEY=<ANY STRING>
JWT_ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=1600
```

Make sure you have atleast python 3.13 or greater installed and run the following commands 
```
python -m venv .venv
.venv/Scripts/activate
pip install -r requirements.txt
```
To run the development server 
```
cd backend
fastapi dev ./server.py
```

### The Node frontend
Make sure to have Node version 22.18.0 or above and run the following 
```
npm install
cd client
npm install
```
To run the frontend
```
cd client
npm start
```

### Enabling the extension 
The extension was used on a chromium based browser, to add the extension do the following
1) Go to your browser and open the extensions page
2) Enable Developer mode
3) Click on Load Unpacked 
4) Select the extension dir from the project 