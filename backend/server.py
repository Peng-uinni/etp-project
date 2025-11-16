import os
import dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import *

dotenv.load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:3000",
    "chrome-extension://fohnfiggddpjbgkicemfppkdckmadjai",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      
    allow_credentials=True,       
    allow_methods=["*"],         
    allow_headers=["*"],         
)

app.include_router(ExtensionRouter)
app.include_router(UserRouter)
app.include_router(AuthRouter)

@app.get("/")
async def read_root():
    return {"Hello": os.getenv('GEMINI_API_KEY')}