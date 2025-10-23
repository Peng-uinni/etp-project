import os
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import ExtensionRouter, UserRouter, AuthRouter

current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.append(current_dir)

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
    return {"Hello": "World"}