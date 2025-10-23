from pydantic import BaseModel

class AudioTranscriptResp(BaseModel):
  transcript: str