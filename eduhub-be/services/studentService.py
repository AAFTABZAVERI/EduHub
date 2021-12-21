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
        studentObject = db.student.find_one({"_id" : ObjectId(id)})

        courseCursor =  db.course.find({"_id" : {"$in" : studentObject["courses"]}})
        courseData = []
        for courses in courseCursor:
            courseData.append({"courseId" : str(courses["_id"]),"name":courses["name"], "description" : courses["description"], "courseCode": courses["courseCode"]})
        return jsonify(courseData)

    elif request.method == "POST":
         
        instituteId = request.json['instituteId']
        courseCode = request.json['courseCode']
        studentID = id
        studentEmail = request.json['email']

        if(db.institute.find_one({"_id" : ObjectId(instituteId), "students" : {'$in' : [studentEmail]}})):
            course = db.course.find_one({"courseCode" : courseCode, "instituteId": instituteId})
            if(course):
                db.course.update_one({"_id" : course["_id"]}, {'$addToSet' : {"students" : ObjectId(studentID)}})
                db.student.update_one({"_id" : ObjectId(studentID)}, {'$addToSet' : {"courses" : course["_id"]}})
        
        studentObject = db.student.find_one({"_id" : ObjectId(id)})
        courseCursor =  db.course.find({"_id" : {"$in" : studentObject["courses"]}})
        courseData = []
        for courses in courseCursor:
            courseData.append({"courseId" : str(courses["_id"]), "name":courses["name"], "description" : courses["description"], "courseCode": courses["courseCode"]})
        
        return jsonify(courseData)

    elif request.method == "DELETE":     
        db.course.update_one(
            { "_id":  ObjectId(request.json["courseId"])},
            { "$pull": {"students" :ObjectId(id)}}
        )

        db.student.update_one(
            { "_id": ObjectId(id)},
            { "$pull": {"courses" : ObjectId(request.json["courseId"])}}
        )

        studentObject = db.student.find_one({"_id" : ObjectId(id)})
        courseCursor =  db.course.find({"_id" : {"$in" : studentObject["courses"]}})
        courseData = []
        for courses in courseCursor:
            courseData.append({"courseId" : str(courses["_id"]),"name":courses["name"], "description" : courses["description"], "courseCode": courses["courseCode"]})
        return jsonify(courseData)

    else:
        abort(400)

def  studentAssignmentService(id,request):
    if request.method == "GET":
        assignmentCursor = db.assignment.find({"courseId":request.json["courseId"]})
        assigmetData = []
        for assignment in assignmentCursor:
            assigmetData.append(assignment["description"])
        return jsonify(assigmetData)

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
        QuizCursor = db.assignment.find({"courseId":request.json["courseId"]})
        quizData = []
        for quiz in QuizCursor:
            quizData.append(quiz["description"])
        return jsonify(quizData)

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
        materialCursor = db.assignment.find({"courseId":request.json["courseId"]})
        materialData = []
        for material in materialCursor:
            materialData.append(material["description"])
        return jsonify(materialData)
    else:
        abort(400)








