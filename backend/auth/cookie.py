from fastapi import Cookie, status, HTTPException
from typing import Optional
from .token import decode_token

def check_access_cookie(
  token: Optional[str] = Cookie(None, alias='token')
) -> dict:
  if token is None or '':
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail='Please log in'
    )
  
  data = decode_token(token)
  return data