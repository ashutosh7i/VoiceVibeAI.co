from pymongo import MongoClient
import sys
import os
from dotenv import load_dotenv

load_dotenv()
db = None

def get_mongo_client():
    global db
    if db is None:
        uri = os.environ.get('DATABASE_URL')
        db = MongoClient(uri, appname="devrel.content.vercel")['diarydb']
    return db

def get_collection(collection_name):
    if db is None:
        get_mongo_client()
    return db[collection_name]
