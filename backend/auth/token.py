import os
from datetime import datetime, timedelta, timezone
from jose import jwt

try:
  JWT_KEY = os.getenv('JWT_KEY')
  JWT_ALGORITHM = os.getenv('JWT_ALGORITHM')
  ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES'))
except Exception as e:
  print(e)

def generate_access_token(data: dict) -> str:
  to_encode = data
  
  expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
  
  to_encode.update({"exp": expire}) 
  
  encoded_jwt = jwt.encode(to_encode, JWT_KEY, algorithm=JWT_ALGORITHM)
  return encoded_jwt

def decode_token(token: str) -> dict:
  decoded = jwt.decode(token, key=JWT_KEY, algorithms=JWT_ALGORITHM)
  return decoded