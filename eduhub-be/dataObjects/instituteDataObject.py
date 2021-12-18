import pymongo

import certifi
import os
from time import sleep
from datetime import timedelta

from dotenv import load_dotenv
load_dotenv()


from bson.objectid import ObjectId
import certifi, random , math

# ------------------------------ Important Keys and connectivity ------------------------------

certificate = certifi.where()
client = pymongo.MongoClient("mongodb+srv://Admin:Admin12345@cluster0.kr0h0.mongodb.net/?retryWrites=true&w=majority", tlsCAFile=certificate)
print("Connected to database")
db = client.Eduhub

# ---------------------------- Important Keys and connectivity End---------------------------



# ------------------------------ Institute Data object functions ------------------------------
def addinstituteDO(request):
    db.institute.insert_one({
            "instituteName": request.json['name'],
            "description": request.json['description'],
            "email": request.json['email'],
            "professors": [],
            "students": [],
    })

def instituteFindbyEmail(instituteEmail):
    return db.institute.find_one({"email": instituteEmail})

def instituteFindbyID(id):
    return db.institute.find_one({"_id" : ObjectId(id)})

def instituteUpdateStudent(id, studentlist):
    return db.institute.update_one(
                    {"_id": ObjectId(id)},
                    {"$set": {"students": studentlist}})

def instituteUpdateProfessors(id, professorslist):
    return db.institute.update_one(
                    {"_id": ObjectId(id)},
                    {"$set": {"professors": professorslist}})