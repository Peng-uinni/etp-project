from fastapi import APIRouter, UploadFile, File, Request
from ai.gemini import generateTranscript, randomMessage 
from models import AudioTranscriptResp

router = APIRouter(
  prefix="/extension",
)

@router.get("/")
async def read_extension_root():
  msg = randomMessage()
  return {"message": msg}

@router.post("/create")
async def create_extension(data: dict):
  #for transcript metadata
  #create a transcript based on data
  #add to folder if required
  #commit to database
  #return ok if accepted
  return {"message": "Extension created", "data": data}

@router.post("/audio")
async def process_audio(request: Request):
  audioFile: bytes = await request.body()
  transcript = generateTranscript(audioFile)
  #store transcript in database
  return AudioTranscriptResp(transcript=transcript).model_dump()