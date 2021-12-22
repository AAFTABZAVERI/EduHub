from flask import jsonify, request, abort
# from werkzeug.datastructures import ImmutableMultiDict

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

        return f"deleted"

    else:
        abort(400)

def facultyAssignmentService(id,request):
    facultyId = id
    # courseId = request.json["courseId"]
    if request.method == "GET":

        assignmentCursor = db.assignment.find({"courseId":request.json["courseId"]})
        assigmetData = []
        for assignment in assignmentCursor:
            # assigmetData.append({"descriprion":assignment["description"],"url":assignment["url"],"deadline" : assignment["deadline"],"fileName":assignment["fileName"]})
            assigmetData.append({"description":assignment["description"]})
        
        return jsonify(assigmetData)

    elif request.method == "POST":

        # facultyObject = db.faculty.find_one({"_id": ObjectId(facultyId)})
        # courseId = request.json["courseId"]
        assignmentDesc = request.json["description"]
        # assignmentTitle = request.json["name"]
        # serviceResponse = fileUploadService(request.files['file'])
        # print(serviceResponse)
        insertedAssignment = db.assignment.insert({
                # "fileName": serviceResponse["fileName"],
                "description": assignmentDesc,
                "courseId": request.json["courseId"],
                # "url":serviceResponse["url"],
                # "uuidFileNmae":serviceResponse["uuidFileName"],
                "deadline" : request.json["deadline"]
                })
        db.course.update_one({"_id" : ObjectId(request.json["courseId"])}, {'$addToSet' : {"assignments" : insertedAssignment}})
        assignmentCursor = db.assignment.find({"courseId":request.json["courseId"]})
        assigmetData = []
        for assignment in assignmentCursor:
            assigmetData.append(assignment["description"])
        return jsonify(assigmetData)

    elif request.method == "DELETE":
        assignmentId = request.json["assignmentId"]

        # db.assignmnet.delete_one({"_id": ObjectId(assignmentId)})
        db.assignment.delete_one({"_id": ObjectId(assignmentId)})

        db.course.update_one(
            { "_id":  ObjectId(request.json["courseId"])},
            { "$pull": {"assignments" :ObjectId(assignmentId)}}
        )
        return "deleted"
    

def facultyMaterialService(id,request):
    facultyId = id
    if request.method == "GET":
        CourseId = request.args.get("courseId")

        materialCursor = db.material.find({"courseId" : CourseId})
        materialData = []
        for material in materialCursor:
            materialData.append({"Id": str(material["_id"]), "title" : material["title"], "description": material["description"], "fileName" : material["fileName"], "url": material["url"] })
        return jsonify(materialData)

    elif request.method == "POST":

        fileUploadData = fileUploadService(request.files['file'])
        data = dict(request.form)
 
        insertedmaterial = db.material.insert({
                "title": data["materialName"],
                "description": data["materialDescription"],
                "courseId": data["courseId"],
                "fileName": fileUploadData["fileName"],
                "url":fileUploadData["url"],
                "uuidFileNmae":fileUploadData["uuidFileName"],
        })

        db.course.update({"_id": ObjectId(data["courseId"])}, {"$addToSet": {"materials": insertedmaterial}})
        materialCursor = db.material.find({"courseId" : data["courseId"]})
        materialData = []
        for material in materialCursor:
            materialData.append({"Id": str(material["_id"]), "title" : material["title"], "description": material["description"], "fileName" : material["fileName"], "url": material["url"] })
        return jsonify(materialData)

    elif request.method == "DELETE":
        materialId = request.json["materialId"]
        db.material.delete_one({"_id": ObjectId(materialId)})

        db.course.update_one(
            { "_id":  ObjectId(request.json["courseId"])},
            { "$pull": {"materials" :ObjectId(materialId)}}
        )
        return "deleted"

def facultyQuizService(id,request):
    # facultyId = id
    # courseId = request.json["courseId"]
    if request.method == "GET":
    
        quizCursor = db.quiz.find({"courseId":request.json["courseId"]})
        quizData = []
        for quiz in quizCursor:
            quizData.append({"title":quiz["title"],"link":quiz["link"]})
        return jsonify(quizData)
    
    elif request.method == "POST":

        # facultyObject = db.faculty.find_one({"_id": ObjectId(facultyId)})
        # # courseId = request.json["courseId"]
        # # assignmentTitle = request.json["name"]
        # # serviceResponse = fileUploadService(request.files['file'])
        # # print(serviceResponse)
        insertequiz = db.quiz.insert({
                # "fileName": serviceResponse["fileName"],
                "title":request.json["title"],
                # "description": request.json["materialDesc"],
                "courseId": request.json["courseId"],
                "link":request.json["link"]
                # "url":serviceResponse["url"],
                # "uuidFileNmae":serviceResponse["uuidFileName"],
                })
        # quizzz = db.quiz.find_one({"courseId":request.json["courseId"]})
        db.course.update_one({"_id" : ObjectId(request.json["courseId"])}, {'$addToSet' : {"quiz" : insertequiz}})
        quizCursor = db.quiz.find({"courseId":request.json["courseId"]})
        quizData = []
        for quiz in quizCursor:
             quizData.append({"title":quiz["title"],"link":quiz["link"]})
        return jsonify(quizData)

    elif request.method == "DELETE":
        quizId = request.json["quizId"]
        db.quiz.delete_one({"_id": ObjectId(quizId)})

        db.course.update_one(
            { "_id":  ObjectId(request.json["courseId"])},
            { "$pull": {"quiz" :ObjectId(quizId)}}
        )
        return "deleted"









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