import logging
from fastapi import APIRouter, Depends, Body
from ..schema import UserSchema, TranscriptSchema
from ..database import getUser, createUser, createTranscript
from ..auth import check_access_cookie
from ..ai.gemini import client as gemini_client

router = APIRouter(
  prefix="/user",
)
logger = logging.getLogger("etp.user")
def convert_mongo_id(items):
  """Convert MongoDB _id to id for JSON serialization"""
  if isinstance(items, list):
    return [{"id": str(item.get("_id")), **{k: v for k, v in item.items() if k != "_id"}} for item in items]
  if isinstance(items, dict):
    return {"id": str(items.get("_id")), **{k: v for k, v in items.items() if k != "_id"}}
  return items


@router.get("/", response_model=UserSchema)
async def get_user_data(
  data: dict = Depends(check_access_cookie)
):  
  logger.info(f"User data: {data}")
  return data

@router.get("/profile")
async def get_profile(
  user: dict = Depends(check_access_cookie)
):
  """Get user profile"""
  try:
    userData = await getUser(user['email'])
    return convert_mongo_id(userData) if userData else {"error": "User not found"}
  except Exception as e:
    logger.error(f"Profile error: {e}")
    return {"error": str(e)}

@router.get("/folder")
async def get_folders(
  user: dict = Depends(check_access_cookie)
):
  """Get all folders for the logged-in user"""
  try:
    from ..database.driver import getFolders
    folders = await getFolders(user['email'])
    return convert_mongo_id(folders)
  except Exception as e:
    logger.error(f"Get folders error: {e}")
    return {"error": str(e)}

@router.get("/transcripts")
async def get_user_transcripts(
  user: dict = Depends(check_access_cookie)
):
  """Get all transcripts for the logged-in user"""
  try:
    from ..database.driver import getTranscripts
    transcripts = await getTranscripts(user['email'])
    return convert_mongo_id(transcripts)
  except Exception as e:
    logger.error(f"Get transcripts error: {e}")
    return {"error": str(e)}

@router.post("/folder")
async def create_new_folder(
  data: dict,
  user: dict = Depends(check_access_cookie)
):
  """Create a new folder for the user"""
  try:
    from ..database.driver import createFolder
    result = await createFolder(data, user['email'])
    if result and result.acknowledged:
      return {"message": "Folder created", "id": str(result.inserted_id)}
    else:
      return {"error": "Failed to create folder"}
  except Exception as e:
    logger.error(f"Create folder error: {e}")
    return {"error": str(e)}

@router.delete("/folder/{folder_id}")
async def delete_user_folder(
  folder_id: str,
  user: dict = Depends(check_access_cookie)
):
  """Delete a folder"""
  try:
    from ..database.driver import deleteFolder
    success = await deleteFolder(folder_id, user['email'])
    if success:
      return {"message": "Folder deleted"}
    else:
      return {"error": "Folder not found or unauthorized"}
  except Exception as e:
    logger.error(f"Delete folder error: {e}")
    return {"error": str(e)}

@router.post("/transcript")
async def create_new_transcript(
  data: dict,
  user: dict = Depends(check_access_cookie)
):
  try:
    data['userEmail'] = user['email']
    result = await createTranscript(data)
    if result.acknowledged:
      return {"message": "Transcript created", "id": str(result.inserted_id), "data": data}
    else:
      return {'error': 'Something went wrong'}
  except Exception as e:
    logger.error(f"Create transcript error: {e}")
    return {"error": str(e)}

@router.delete("/transcript/{transcript_id}")
async def delete_user_transcript(
  transcript_id: str,
  user: dict = Depends(check_access_cookie)
):
  """Delete a transcript"""
  try:
    from ..database.driver import deleteTranscript
    success = await deleteTranscript(transcript_id, user['email'])
    if success:
      return {"message": "Transcript deleted"}
    else:
      return {"error": "Transcript not found or unauthorized"}
  except Exception as e:
    logger.error(f"Delete transcript error: {e}")
    return {"error": str(e)}

@router.post("/transcript/{transcript_id}/chat")
async def chat_with_transcript(transcript_id: str, data: dict = Body(...), user: dict = Depends(check_access_cookie)):
    """
    Accepts a question, gets GeminiAI response, stores chat in transcript.
    """
    from ..database.driver import getTranscripts, updateTranscriptChat
    question = data.get('question')
    if not question:
        return {"error": "No question provided"}
    # Fetch transcript
    transcripts = await getTranscripts(user['email'])
    transcript = next((t for t in transcripts if str(t.get('_id')) == transcript_id), None)
    if not transcript:
        return {"error": "Transcript not found"}
    transcript_text = transcript.get('transcript', '')
    # Call GeminiAI chat
    prompt = f"Transcript:\n{transcript_text}\n\nQuestion: {question}\n\nAnswer as helpfully as possible."
    response = gemini_client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[prompt]
    )
    answer = response.text if hasattr(response, 'text') else str(response)
    # Store chat in DB
    chat_entry = {"question": question, "answer": answer}
    await updateTranscriptChat(transcript_id, user['email'], chat_entry)
    return {"answer": answer, "chat": transcript.get('chat', []) + [chat_entry]}