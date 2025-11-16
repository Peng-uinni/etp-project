from fastapi import APIRouter, UploadFile, File, Request, HTTPException, status
from ..ai.gemini import generateTranscript, randomMessage 
from ..database import driver
from datetime import datetime

router = APIRouter(
  prefix="/extension",
)

@router.get("/")
async def read_extension_root():
  msg = randomMessage()
  return {"message": msg}

@router.post("/transcript")
async def create_transcript_from_audio(request: Request, audio: UploadFile = File(...)):
  """
  Receive audio file from extension, process it, and create a transcript.
  Requires authentication via cookie.
  """
  try:
    # Extract token from cookies
    token = request.cookies.get('token')
    if not token:
      raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="User not authenticated"
      )
    
    # Decode token to get user email
    from ..auth.token import decode_token
    token_data = decode_token(token)
    user_email = token_data.get('email')
    if not user_email:
      raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid token"
      )

    # Read audio file
    audio_content = await audio.read()
    
    # Generate transcript using AI - if this fails, don't save to DB
    transcript_text = generateTranscript(audio_content)
    if not transcript_text or "error" in transcript_text.lower():
      raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail=f"Failed to generate transcript: {transcript_text}"
      )

    # Generate subject using GeminiAI - if this fails, don't save to DB
    from ..ai.gemini import client as gemini_client
    subject_prompt = f"Generate ONLY a single, concise subject/title (5-10 words max) for this transcript. Return ONLY the subject text, no formatting, no asterisks, no special characters:\n{transcript_text[:500]}"
    try:
      subject_response = gemini_client.models.generate_content(
          model="gemini-2.5-flash",
          contents=[subject_prompt]
      )
      subject = subject_response.text.strip() if hasattr(subject_response, 'text') else str(subject_response).strip()
      # Remove any markdown formatting or special characters
      subject = subject.replace('**', '').replace('*', '').replace('##', '').replace('#', '')
    except Exception as subject_err:
      raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail=f"Failed to generate subject: {str(subject_err)}"
      )

    # Only create transcript record in database after all AI processing succeeds
    transcript_data = {
      "transcript": transcript_text,
      "subject": subject,
      "createdAt": datetime.utcnow().isoformat(),
      "source": "extension"
    }

    await driver.createTranscript(transcript_data, user_email)

    return {
      "message": "Transcript created successfully",
      "transcript": transcript_text,
      "subject": subject,
      "createdAt": transcript_data["createdAt"]
    }
    
  except HTTPException:
    raise
  except Exception as e:
    import logging
    logger = logging.getLogger("etp.extension")
    logger.error(f"Error processing audio: {e}")
    raise HTTPException(
      status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail=f"Failed to process audio: {str(e)}"
    )

@router.post("/create")
async def create_extension(data: dict):
  """Legacy endpoint - for transcript metadata and folder assignment."""
  return {"message": "Extension created", "data": data}