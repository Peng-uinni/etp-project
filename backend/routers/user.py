from fastapi import APIRouter, Depends
from ..schema import UserSchema, TranscriptSchema
from ..database import getUser, createUser, createTranscript
from ..auth import check_access_cookie

router = APIRouter(
  prefix="/user",
)

@router.get("/", response_model=UserSchema)
async def get_user_data(
  data: dict = Depends(check_access_cookie)
):  
  print(data)
  return data

@router.get("/profile")
async def get_profile():
  #unsure might remove later
  return {"message": "User profile endpoint"}

@router.get("/folder")
async def get_folders():
  #return user folders
  return {"message": "User folders endpoint"}

@router.get("/transcripts")
async def get_transcripts():
  #return user transcripts
  return {"message": "User transcripts endpoint"}

@router.post("/folder")
async def create_folder(
  data: dict,
  user: dict = Depends(check_access_cookie)
):
  
  return {"message": "Folder created", "data": data}

@router.post("/transcript")
async def create_transcript(
  data: dict,
  user: dict = Depends(check_access_cookie)
):
  try:
    data['userEmail'] = user['email']
    result = await createTranscript(data)
    if result.acknowledged:
      return {"message": "Transcript created", "data": data}
    else:
      return {'message': 'Something went wrong'}
  except Exception as e:
    print(e)