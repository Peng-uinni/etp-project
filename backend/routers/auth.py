import os
from fastapi import APIRouter, HTTPException, status, Response, Request
from ..auth import generate_access_token, verify_password, hash_password
from ..database import getUser, createUser
from ..schema import CreateUserSchema

router = APIRouter(
  prefix="/auth",
)

@router.post("/login")
async def sigin(response: Response, data: dict):
  user = await getUser(data['email'])
  if user is None:
    raise HTTPException(
      status.HTTP_404_NOT_FOUND,
      detail="User doesn't exist"
    )
  
  #authentication 
  if(not data['password'] == user['password']):
     raise HTTPException(
       status.HTTP_401_UNAUTHORIZED,
       detail="Incorrect email or password"
     )

  access_token = generate_access_token(user)
  response.set_cookie(
    key='token',
    value=access_token,
    httponly=True,
    samesite='lax',
    secure=True,
    max_age=os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES') * 60
  )
  return {"message": "Login success"}

@router.post("/signup")
async def sigup(data: dict):
  user = await getUser(data['email'])
  if user is not None:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail='User exists'
    )
  
  try:
    user = CreateUserSchema.model_validate(data)
  except Exception as e:
    print(e)
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail='Missing request params'
    )
  
  user = user.model_dump()
  await createUser(user)

  return {'message': 'successful register'}

@router.post("/signout")
async def signout(response: Response):  
    response.delete_cookie(
      key='token'
    )
    return {"message": "Signout endpoint"}