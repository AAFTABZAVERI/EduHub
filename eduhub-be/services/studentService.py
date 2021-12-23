from datetime import datetime
from flask import json, jsonify, request, abort

from google.oauth2 import id_token
from google.auth.transport import requests

from time import sleep


from datetime import datetime
from bson.objectid import ObjectId
from dataObjects.studentDataObject import *
from services.fileUploadService import *


def studentCourseService(id, request):
    if request.method == "GET":
        studentObject = db.student.find_one({"_id" : ObjectId(id)})

        courseCursor =  db.course.find({"_id" : {"$in" : studentObject["courses"]}})
        courseData = []
        for courses in courseCursor:
            courseData.append({"courseId" : str(courses["_id"]),"name":courses["name"], "faculty": courses["facultyName"] ,"description" : courses["description"], "courseCode": courses["courseCode"]})
        return jsonify(courseData)

    elif request.method == "POST":
         
        instituteId = request.json['instituteId']
        courseCode = request.json['courseCode']
        studentID = id
        studentEmail = request.json['email']

        # if(db.institute.find_one({"_id" : ObjectId(instituteId), "students" : {'$in' : [studentEmail]}})):
        course = db.course.find_one({"courseCode" : courseCode, "instituteId": instituteId})
        if(course):
                db.course.update_one({"_id" : course["_id"]}, {'$addToSet' : {"students" : ObjectId(studentID)}})
                db.student.update_one({"_id" : ObjectId(studentID)}, {'$addToSet' : {"courses" : course["_id"]}})
        
        studentObject = db.student.find_one({"_id" : ObjectId(id)})
        courseCursor =  db.course.find({"_id" : {"$in" : studentObject["courses"]}})
        courseData = []
        for courses in courseCursor:
            courseData.append({"courseId" : str(courses["_id"]), "name":courses["name"], "faculty": courses["facultyName"], "description" : courses["description"], "courseCode": courses["courseCode"]})
        
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
            courseData.append({"courseId" : str(courses["_id"]),"name":courses["name"], "faculty": courses["facultyName"], "description" : courses["description"], "courseCode": courses["courseCode"]})
        return jsonify(courseData)

    else:
        abort(400)

def  studentAssignmentService(id,request):
    studentId = id
    if request.method == "GET":
        assignmentCursor = db.assignment.find({"courseId":request.args.get("courseId")})
        assigmetData = []
        for assignment in assignmentCursor:
            assigmetData.append({"Id": str(assignment["_id"]),"title":assignment["title"], "description": assignment["description"], "url": assignment["url"], "fileName": assignment["fileName"], "date": assignment["date"]})
        return jsonify(assigmetData)

    elif request.method == "POST":
        data = dict(request.form)
        # deadline = request.json["deadline"]
        # date_time_obj = datetime.strptime(deadline, '%d/%m/%y %H:%M:%S')
        # now = datetime.now()
        # print(now)
        # if now > date_time_obj:
        #     flag = True
        # else:
        #     flag  = False

        fileUploadData = fileUploadService(request.files['file'])
        courseId = data["courseId"]
        assignmentDescription = data["assignmentDescription"]
        assignmentId = data["assignmentId"]
        
        submitAssignment = db.submission.insert({
                "fileName": fileUploadData["fileName"],
                "Description" : assignmentDescription,
                "assignmentId":assignmentId,
                "studentId":studentId,
                "courseId": courseId,
                "late":"",
                "url":fileUploadData["url"],
                "uuidFileNmae":fileUploadData["uuidFileName"],
                "submissionTime":datetime.now()
                })
        print(submitAssignment)
        return f"sucess"

    #     materialCursor = db.assignment.find({"courseId":request.json["courseId"]})
    #     materialData = []
    #     for material in materialCursor:
    #         materialData.append(material["description"])
    #     return jsonify(materialData)
    # else:
    #     abort(400)

def studentAssignmentStatusService(id, request):
    if request.method == "GET":
        studentId = id
        courseId = request.args.get("courseId")
        assignmentId = request.args.get("assignmentId")
        assignmentStatus = db.submission.find_one({"assignmentId": assignmentId, "studentId": studentId})
        assignmentData = []
        if assignmentStatus:
            assignmentData.append({"fileName": assignmentStatus["fileName"], "url": assignmentStatus["url"]})
            return jsonify(assignmentData)
        else:
            return f"No assignment"



def  studentQuizService(id,request):
    if request.method == "GET":
        
        courseId=request.args.get("courseId")
        quizCursor = db.quiz.find({"courseId":courseId})
        quizData = []
        for quiz in quizCursor:
             quizData.append({"title":quiz["title"],"link":quiz["link"]})
        return jsonify(quizData)

    # elif request.method == "POST":
    #     deadline = request.json["deadline"]
    #     date_time_obj = datetime. strptime(deadline, '%d/%m/%y %H:%M:%S')
    #     now = datetime.now()
    #     print(now)
    #     if now > date_time_obj:
    #         print("NOOOO")
    #         # late submission
    #         # 
    #         # 
    #     else:
    #         # in time submission 
    #         # 
    #         # 
    #         print("yesss")
    #     return "-"
    # else:
    #     abort(400)

def studentMaterialService(id,request):
    if request.method == "GET":
        CourseId = request.args.get("courseId")
        materialCursor = db.material.find({"courseId" : CourseId})
        materialData = []
        for material in materialCursor:
            materialData.append({"Id": str(material["_id"]), "title" : material["title"], "description": material["description"], "fileName" : material["fileName"], "url": material["url"] })
        return jsonify(materialData)
    else:
        abort(400)








