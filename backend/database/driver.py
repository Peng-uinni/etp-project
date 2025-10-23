import os
import asyncio
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
      raise EnvironmentError("[ENV] Failed to load .env file")
    
    self.client = AsyncMongoClient(
      host=DB_HOST,
      port=int(DB_PORT),
    )
    
    try:
      self.database = self.client[DB_NAME]
      print("Database connected")
    except Exception as e:
      raise Exception(f"[DB] Failed to connect to the database: {e}") 

  async def find(self, collection: str, query: dict):
    try:
      cursor = self.database[collection].find(query) 
      async for c in cursor:
        print(c)
      return cursor
    except Exception as e:
      print(e)

  async def insert(self, collection: str, query: dict):
    try:
      await self.database[collection].insert_one(query)
    except Exception as e:
      print(f"{e}\n")
  
  async def close(self):
    try:
      await self.client.close()
      print("[DB] Connection closed")
    except Exception as e:
      print(e)