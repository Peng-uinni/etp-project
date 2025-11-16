import os
from io import BytesIO
from google import genai
from google.genai.errors import APIError

try:
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
    client = genai.Client(api_key=GEMINI_API_KEY)
except Exception as e:
    print(e)

def generateTranscript(audio_file_bytes: bytes, mime_type: str = "audio/webm") -> str:
    try:
        audio_data = BytesIO(audio_file_bytes)
      
        uploaded_file = client.files.upload(
            file=audio_data,
            config = {
                "mime_type": mime_type
            }
        )

        prompt = "Transcribe the following audio file to text."
        
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[prompt, uploaded_file]
        )

        client.files.delete(name=uploaded_file.name)
        
        return response.text
    
    except APIError as e:
        return f"An API error occurred: {e}"
    except Exception as e:
        return f"An unexpected error occurred: {e}"

def randomMessage() -> str:
    try:
        prompt = "Tell me a random fun fact."
        
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[prompt]
        )

        return response.text
    
    except APIError as e:
        return f"An API error occurred: {e}"