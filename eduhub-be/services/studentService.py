from flask import jsonify, request, abort

from google.oauth2 import id_token
from google.auth.transport import requests

from time import sleep



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
            { "_id": request.json["classId"]},
            { "$pull": {"cources":{"$in":[request.json["classId"]]}}}
        )

        print(ret)
        return "done"

    else:
        abort(400)