

def studentCourseService(id, request):
    instituteId = request.json['instituteId']
    courseCode = request.json['courseCode']
    studentID = id
    studentEmail = request.json['email']


    if(db.institute.find_one({"_id" : ObjectId(instituteId), "students" : {'$in' : [studentEmail]}})):
        print("run")
        course = db.course.find_one({"courseCode" : courseCode, "instituteId": instituteId})
        if(course):
            print("run")
            db.course.update_one({"_id" : course["_id"]}, {'$addToSet' : {"students" : studentID}})
            db.student.update_one({"_id" : ObjectId(studentID)}, {'$addToSet' : {"courses" : str(course["_id"])}})