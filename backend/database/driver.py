import os
from pymongo import AsyncMongoClient
from pydantic import ValidationError
from ..schema import CreateUserSchema, Transcript

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

async def createTranscript(transcriptData: dict):
  try:
    db = await get_database()
    validated = Transcript.TranscriptSchema.model_validate(transcriptData)
    result = await db['transcripts'].insert_one(validated.model_dump())
    return result
  except ValidationError as e:
    raise e
  except Exception as e:
    print(e)