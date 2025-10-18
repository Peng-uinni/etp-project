from fastapi import APIRouter

router = APIRouter(
  prefix="/auth",
)

@router.post("/sigin")
async def sigin():
    #validate user credentials and return a cookie or token
    return {"message": "Sigin endpoint"}

@router.post("/sigup")
async def sigin():
    #add user to database
    #return a cookie or token
    return {"message": "Sigup endpoint"}

@router.post("/signout")
async def signout():  
    #remove user session or token
    return {"message": "Signout endpoint"}