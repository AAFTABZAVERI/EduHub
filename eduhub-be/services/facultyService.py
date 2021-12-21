from flask import jsonify, request, abort

from google.oauth2 import id_token
from google.auth.transport import requests

from time import sleep
import random, string

from dataObjects.instituteDataObject import *
from dataObjects.connection import db


def facultyClassroomService(id, request):
    facultyId = id

    if request.method == "GET":
        facultyObject = db.faculty.find_one({"_id": ObjectId(facultyId)})

        courseCursor =  db.course.find({"_id" : {"$in" : facultyObject["courses"]}})
        courseData = []
        for courses in courseCursor:
            courseData.append({"courseId" : str(courses["_id"]),"name":courses["name"], "description" : courses["description"], "courseCode": courses["courseCode"]})
        
        return jsonify(courseData)
    
    elif request.method == "POST":
        instituteId = request.json["istituteId"]
        courseName = request.json["courseName"]
        courseDesc = request.json["courseDesc"]
        
        randomCourseCode = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        
        while not(db.temp.find_one({"_id" : ObjectId("61bf9bf5dfb26b0115adc184"), "students" : {'$in' : [randomCourseCode]}})):
            db.temp.update_one({"_id": ObjectId("61bf9bf5dfb26b0115adc184")}, {'$addToSet' : {"students" : randomCourseCode}})
        
        insertedCourse = db.course.insert({
            "name": courseName,
            "description": courseDesc,
            "courseCode": randomCourseCode,
            "instituteId": instituteId,
            "facultyId": facultyId,
            "students": [],
            "materials" : [],
            "assignments": [],
            "quiz" : []
            })

        db.faculty.update_one({"_id": ObjectId(facultyId)}, {"$addToSet" : {"courses": insertedCourse}})
        

    elif request.method == "DELETE":
        courseId = request.json["courseId"]
        db.course.delete_one({"_id": ObjectId(courseId)})

    else:
        abort(400)
        
    
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

    return f"sucess"