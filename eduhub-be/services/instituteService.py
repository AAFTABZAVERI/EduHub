from flask import jsonify, request, abort

from google.oauth2 import id_token
from google.auth.transport import requests

from time import sleep

from dataObjects.instituteDataObject import *


# ------------------------------ Institute Services  ------------------------------

def addinstituteService(request):
    addinstituteDO(request)
    return "Institute created"


def instituteloginService():
    idinfo = None
    while idinfo is None:
        try:
            idinfo = id_token.verify_oauth2_token(request.headers["Authorization"].split()[1], requests.Request(), "1029920867014-8l02s0sh2ossi9sa06u83e09o26elkpf.apps.googleusercontent.com")
        except:
            sleep(0.5)
            pass

    instituteEmail = idinfo["email"]
    instituteData =  instituteFindbyEmail(instituteEmail)
    responseData = {"Id":str(instituteData["_id"]), "instituteName":instituteData["instituteName"], "instituteDescription":instituteData["description"]}
    return jsonify(responseData)


def institutestudentsService(id, request):
    if request.method == "GET":
        instituteData = instituteFindbyID(id)
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


def instituteprofessorService(id, request):
    if request.method == "GET":
        instituteData = instituteFindbyID(id)
        return jsonify(instituteData["professors"])

    elif request.method == "POST":
        instituteData = instituteFindbyID(id)
        professorslist = []
        for oldprofessor in instituteData["professors"]:
            professorslist.append(oldprofessor)

        for newprofessor in request.json["professors"]:
            if not newprofessor in professorslist:
                professorslist.append(newprofessor)
        
        instituteUpdateProfessors(id, professorslist)
        
        instituteData = instituteFindbyID(id)
        return jsonify(instituteData["professors"])

    elif request.method == "DELETE":
        instituteData = instituteFindbyID(id)
        professorslist = []
        for oldprofessor in instituteData["professors"]:
            professorslist.append(oldprofessor)

        for removeprofessor in request.json["professors"]:
            if removeprofessor in professorslist:
                professorslist.remove(removeprofessor)

        instituteUpdateProfessors(id, professorslist)
        
        instituteData = instituteFindbyID(id)
        return jsonify(instituteData["professors"])

    else:
        abort(400)