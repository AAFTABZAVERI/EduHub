from dataObjects.connection import *
from bson.objectid import ObjectId

# def veifyInstitute(studentEmail):
#     return db.institute.find_one({"": instituteEmail})

def classUpdateStudent(id, studentlist):
    return db.course.update_one(
                    {"_id": ObjectId(id)},
                    {"$set": {"students": studentlist}})

def studentUpdateClass(id, classlist):
    return db.student.update_one(
                    {"_id": ObjectId(id)},
                    {"$set": {"classes": classlist}})

def studentFindbyID(id):
    return db.student.find_one({"_id" : ObjectId(id)})
