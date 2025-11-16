from pydantic import BaseModel, EmailStr, Field
from bson import ObjectId
from datetime import datetime

class UserSchema(BaseModel):
  id: str = Field(alias="_id")
  email: EmailStr = Field(..., unique=True)
  name: str
  password: str
  createdAt: datetime = Field(default_factory=datetime.now)
  class Config:
    populate_by_name = True
    arbitrary_types_allowed = True
    json_encoders = {ObjectId: str}

class CreateUserSchema(BaseModel):
  email: EmailStr = Field(..., unique=True)
  name: str
  password: str