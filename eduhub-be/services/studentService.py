from flask import jsonify, request, abort

from google.oauth2 import id_token
from google.auth.transport import requests

from time import sleep

from dataObjects.instituteDataObject import *


def studentClassService(id, request):
    if request.method == "GET":
        instituteData = (id)
        return jsonify(instituteData["students"])

    elif request.method == "POST":
        instituteData = instituteFindbyID(id)
        studentlist = []
        for oldstudent in instituteData["students"]:
            studentlist.append(oldstudent)

        for newstudent in request.json["students"]:
            if not newstudent in studentlist:   
                studentlist.append(newstudent)

        instituteUpdateStudent(id, studentlist)

        instituteData = instituteFindbyID(id)
        return jsonify(instituteData["students"])

    elif request.method == "DELETE":
        instituteData = instituteFindbyID(id)
        studentlist = []
        for oldstudent in instituteData["students"]:
            studentlist.append(oldstudent)

        for removestudent in request.json["students"]:
            if removestudent in studentlist:
                studentlist.remove(removestudent)

        instituteUpdateStudent(id, studentlist)
        
        instituteData = instituteFindbyID(id)
        return jsonify(instituteData["students"])

    else:
        abort(400)