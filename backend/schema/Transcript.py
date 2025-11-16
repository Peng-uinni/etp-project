from pydantic import BaseModel, Field, EmailStr
from typing import Optional

class TranscriptSchema(BaseModel):
  userEmail: EmailStr = Field(...)
  folderId: Optional[str] = Field(None)
  subject: str
  transcript: str
  summary: Optional[str] = Field(None)
  chat: Optional[list] = Field([])

class TranscriptSummary(BaseModel):
  id: str = Field(alias='_id')
  summary: str