from datetime import datetime
from flask import jsonify, request, abort

from google.oauth2 import id_token
from google.auth.transport import requests

from time import sleep


from datetime import datetime
from bson.objectid import ObjectId
from dataObjects.studentDataObject import *


def studentCourseService(id, request):
    if request.method == "GET":
        student = db.student.find_one({"_id" : ObjectId(id)})
        return jsonify(student["course"])


    elif request.method == "DELETE":

        courseCode = request.json["courseCode"]
        print(request.json["id"])
        print(request.json["courseCode"])
     
        ret = db.course.update_many(
            { "_id": request.json["studentId"] },
             { "$pull": {"students":{"$in":[request.json["studentId"]]}}}
        )

        db.student.update_many(
            { "_id": request.json["courseId"]},
            { "$pull": {"cources":{"$in":[request.json["classId"]]}}}
        )

        print(ret)
        return "done"

    else:
        abort(400)

def  studentAssignmentService(id,request):
    if request.method == "GET":
        course = db.course.find_one({"_id":ObjectId(request.json["courseId"])})     
        # print (course)
        return jsonify(course["assignments"])

    elif request.method == "POST":
        deadline = request.json["deadline"]
        date_time_obj = datetime. strptime(deadline, '%d/%m/%y %H:%M:%S')
        now = datetime.now()
        print(now)
        if now > date_time_obj:
            print("NOOOO")
            # late submission
            # 
            # 
        else:
            # in time submission 
            # 
            # 
            print("yesss")
        return "-"
    else:
        abort(400)

def  studentQuizService(id,request):
    if request.method == "GET":
        course = db.course.find_one({"_id":ObjectId(request.json["courseId"])}) 
        # print (course)
        return jsonify(course["quizes"])

    elif request.method == "POST":
        deadline = request.json["deadline"]
        date_time_obj = datetime. strptime(deadline, '%d/%m/%y %H:%M:%S')
        now = datetime.now()
        print(now)
        if now > date_time_obj:
            print("NOOOO")
            # late submission
            # 
            # 
        else:
            # in time submission 
            # 
            # 
            print("yesss")
        return "-"
    else:
        abort(400)

def studentMaterialService(id,request):
    if request.method == "GET":
        course = db.course.find_one({"_id":ObjectId(request.json["courseId"])}) 
        # print (course)
        return jsonify(course["materials"])
    else:
        abort(400)


