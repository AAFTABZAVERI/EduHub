from dataObjects.connection import *
from bson.objectid import ObjectId

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