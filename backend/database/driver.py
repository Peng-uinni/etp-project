import os
from pymongo import AsyncMongoClient
from pydantic import ValidationError
from ..schema import CreateUserSchema, Transcript
from datetime import datetime
from bson import ObjectId

async def get_database():
  try:
    MONGO_URI = os.getenv('MONGO_URI')
    client = AsyncMongoClient(MONGO_URI)
    return client['etp-transcript-app']
  except Exception as e:
    print(e)


async def createUser(userData: dict):
  try:
    db = await get_database()
    validatedUser = CreateUserSchema.model_validate(userData)
    result = await db['users'].insert_one(validatedUser.model_dump())
    return result
  except Exception as e:
    print(e)

async def getUser(email: str):
  try:
    db = await get_database()
    result = await db['users'].find_one({"email": email})
    result["id"] = str(result.pop("_id"))
    return result
  except Exception as e:
    print(e)

async def createTranscript(transcriptData: dict, email: str = None):
  try:
    db = await get_database()
    # Add user email if provided
    if email:
      transcriptData["userEmail"] = email
    validated = Transcript.TranscriptSchema.model_validate(transcriptData)
    result = await db['transcripts'].insert_one(validated.model_dump())
    return result
  except ValidationError as e:
    raise e

async def getTranscripts(email: str):
  try:
    db = await get_database()
    results = await db['transcripts'].find({"userEmail": email}).to_list(length=None)
    return results
  except Exception as e:
    print(e)
    return []

async def createFolder(folderData: dict, email: str):
  try:
    db = await get_database()
    folder = {
      "name": folderData.get("name"),
      "userEmail": email,
      "createdAt": datetime.now()
    }
    result = await db['folders'].insert_one(folder)
    return result
  except Exception as e:
    print(e)
    return None

async def getFolders(email: str):
  try:
    db = await get_database()
    results = await db['folders'].find({"userEmail": email}).to_list(length=None)
    return results
  except Exception as e:
    print(e)
    return []

async def deleteFolder(folderId: str, email: str):
  try:
    from bson import ObjectId
    db = await get_database()
    result = await db['folders'].delete_one({
      "_id": ObjectId(folderId),
      "userEmail": email
    })
    return result.deleted_count > 0
  except Exception as e:
    print(e)
    return False

async def deleteTranscript(transcriptId: str, email: str):
  try:
    from bson import ObjectId
    db = await get_database()
    result = await db['transcripts'].delete_one({
      "_id": ObjectId(transcriptId),
      "userEmail": email
    })
    return result.deleted_count > 0
  except Exception as e:
    print(e)
    return False

async def updateTranscriptChat(transcriptId: str, email: str, chatEntry: dict):
    try:
        db = await get_database()
        from bson import ObjectId
        result = await db['transcripts'].update_one(
            {"_id": ObjectId(transcriptId), "userEmail": email},
            {"$push": {"chat": chatEntry}}
        )
        return result.modified_count > 0
    except Exception as e:
        print(e)
        return False