from fastapi import APIRouter

router = APIRouter(
  prefix="/extension",
)

@router.post("/create")
async def create_extension(data: dict):
    #create a transcript based on data
    #add to folder if required
    #commit to database
    #return ok if accepted
    return {"message": "Extension created", "data": data}
