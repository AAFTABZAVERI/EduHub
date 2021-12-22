from flask import jsonify, request, abort

from google.oauth2 import id_token
from google.auth.transport import requests

from time import sleep
import random, string

from dataObjects.instituteDataObject import *
from dataObjects.connection import db
from services.fileUploadService import *

def facultyClassroomService(id, request):
    facultyId = id

    if request.method == "GET":
        facultyObject = db.faculty.find_one({"_id": ObjectId(facultyId)})

        courseCursor =  db.course.find({"_id" : {"$in" : facultyObject["courses"]}})
        courseData = []
        for courses in courseCursor:
            courseData.append({"courseId" : str(courses["_id"]),"name":courses["name"], "faculty": courses["facultyName"], "description" : courses["description"], "courseCode": courses["courseCode"]})
        
        return jsonify(courseData)
    
    elif request.method == "POST":
        instituteId = request.json["instituteId"]
        courseName = request.json["courseName"]
        courseDesc = request.json["courseDesc"]
        facultyName = request.json["facultyName"]
        
        randomCourseCode = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        
        while not(db.temp.find_one({"_id" : ObjectId("61bf9bf5dfb26b0115adc184"), "students" : {'$in' : [randomCourseCode]}})):
            db.temp.update_one({"_id": ObjectId("61bf9bf5dfb26b0115adc184")}, {'$addToSet' : {"students" : randomCourseCode}})
        
        insertedCourse = db.course.insert({
            "name": courseName,
            "description": courseDesc,
            "courseCode": randomCourseCode,
            "instituteId": instituteId,
            "facultyId": facultyId,
            "facultyName": facultyName,
            "students": [],
            "materials" : [],
            "assignments": [],
            "quiz" : []
            })

        db.faculty.update({"_id": ObjectId(facultyId)}, {"$addToSet" : {"courses": insertedCourse}})
        
        facultyObject = db.faculty.find_one({"_id": ObjectId(facultyId)})
        courseCursor =  db.course.find({"_id" : {"$in" : facultyObject["courses"]}})
        courseData = []
        for courses in courseCursor:
            courseData.append({"courseId" : str(courses["_id"]),"name":courses["name"], "faculty": courses["facultyName"],"description" : courses["description"], "courseCode": courses["courseCode"]})
        
        print(courseData)
        return jsonify(courseData)

    elif request.method == "DELETE":
        courseId = request.json["courseId"]
        db.course.delete_one({"_id": ObjectId(courseId)})

        db.faculty.update_one(
            { "_id":  ObjectId(facultyId)},
            { "$pull": {"courses" :ObjectId(courseId)}}
        )

        # db.student.update_one(
        #     { "_id": ObjectId(id)},
        #     { "$pull": {"courses" : ObjectId(request.json["courseId"])}}
        # )

    else:
        abort(400)

def facultyAssignmentService(id,request):
    facultyId = id
    # courseId = request.json["courseId"]
    if request.method == "GET":

        assignmentCursor = db.assignment.find({"courseId":request.json["courseId"]})
        assigmetData = []
        for assignment in assignmentCursor:
            assigmetData.append(assignment["description"])
        return jsonify(assigmetData)

    if request.method == "POST":

        facultyObject = db.faculty.find_one({"_id": ObjectId(facultyId)})
        # courseId = request.json["courseId"]
        assignmentDesc = request.json["assignmentDesc"]
        # assignmentTitle = request.json["name"]
        # serviceResponse = fileUploadService(request.files['file'])
        # print(serviceResponse)
        insertedAssignment = db.assignment.insert_one({
                # "fileName": serviceResponse["fileName"],
                "description": assignmentDesc,
                "courseId": request.json["courseId"],
                # "url":serviceResponse["url"],
                # "uuidFileNmae":serviceResponse["uuidFileName"],
                "deadline" : request.json["deadline"]
                })

        assignmentCursor = db.assignment.find({"courseId":request.json["courseId"]})
        assigmetData = []
        for assignment in assignmentCursor:
            assigmetData.append(assignment["description"])
        return jsonify(assigmetData)

def facultyMaterialService(id,request):
    facultyId = id
    # courseId = request.json["courseId"]
    if request.method == "GET":

        materialCursor = db.assignment.find({"courseId":request.json["courseId"]})
        materialData = []
        for material in materialCursor:
            materialData.append(material["description"])
        return jsonify(materialData)

    if request.method == "POST":

        facultyObject = db.faculty.find_one({"_id": ObjectId(facultyId)})
        # courseId = request.json["courseId"]
        # assignmentTitle = request.json["name"]
        # serviceResponse = fileUploadService(request.files['file'])
        # print(serviceResponse)
        insertedmaterial = db.assignment.insert_one({
                # "fileName": serviceResponse["fileName"],
                "title":request.json["title"],
                "description": request.json["materialDesc"],
                "courseId": request.json["courseId"],
                # "url":serviceResponse["url"],
                # "uuidFileNmae":serviceResponse["uuidFileName"],
                })

        materialCursor = db.assignment.find({"courseId":request.json["courseId"]})
        materialData = []
        for material in materialCursor:
            materialData.append(material["description"])
        return jsonify(materialData)

    # print(data.count())

    # print(dir(data))
    # print(data.modified_count)
    
    # instituteStudentData = db.institute.find_one({"_id" : ObjectId(instituteID)})

    # courseStudents = []
    # studentCourses = []



    # for student in instituteStudentData["students"]:
    #     if student == studentEmail:

            # courseData = db.course.find_one({"classCode" : classCode})
            # for data in courseData['students']:
            #     courseStudents.append(data)
            # if studentID not in courseStudents:
            #     courseStudents.append(studentID)
            # db.course.update_one({"classCode": classCode }, {"$set": {"students": courseStudents}})


            
            # courseDataStudent = db.student.find_one({"_id" : ObjectId(studentID)})
            # for courseStudent in courseDataStudent['course']:
            #     studentCourses.append(courseStudent)
            # if classCode not in studentCourses:
            #     studentCourses.append(classCode)
            # db.student.update_one({"_id": ObjectId(studentID)}, {"$set": {"course": studentCourses}})

    return "sucess"