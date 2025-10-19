import os
from dotenv import load_dotenv
from pymongo import AsyncMongoClient

ENV_PATH = os.path.join(os.path.dirname(__file__), '../../.env')

class Database:
  def __init__(self):
    if load_dotenv(dotenv_path=ENV_PATH):
      DB_HOST = os.getenv('DB_HOST')
      DB_PORT = os.getenv('DB_PORT')
      DB_NAME = os.getenv('DB_NAME')
      print("Fetched env")
    else:
      raise EnvironmentError("Failed to load .env file")
    
    self.client = AsyncMongoClient(
      host=DB_HOST,
      port=int(DB_PORT),
    )
    
    try:
      self.database = self.client.get_database(DB_NAME)
      print("Database connected")
    except Exception as e:
      raise Exception(f"Failed to connect to the database: {e}") 

  def getCollection(self, collection_name: str):
    return self.database.get_collection(collection_name)

  def find(self, collection_name: str, query: dict):
    collection = self.getCollection(collection_name)
    return collection.find(query)
  
  async def __del__(self) -> None:
    await self.client.close()
