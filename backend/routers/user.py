from fastapi import APIRouter

router = APIRouter(
  prefix="/user",
)

@router.get("/")
async def get_user_data():  
    #send user data including some folders and transcripts
    return {"message": "User dashboard endpoint"}

@router.get("/profile")
async def get_profile():
    #unsure might remove later
    return {"message": "User profile endpoint"}

@router.get("/folder")
async def get_folders():
    #return user folders
    return {"message": "User folders endpoint"}

@router.get("/transcript")
async def get_transcripts():
    #return user transcripts
    return {"message": "User transcripts endpoint"}

@router.post("/folder")
async def create_folder(data: dict):
    #check data and create folder
    return {"message": "Folder created", "data": data}

@router.post("/transcript")
async def create_transcript(data: dict):
    #check data and create transcript  
    return {"message": "Transcript created", "data": data}