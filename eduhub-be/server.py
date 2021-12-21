from flask import *
from flask_cors import CORS
from datetime import datetime
import pymongo

from google.oauth2 import id_token
from google.auth.transport import requests

import certifi
import os
from time import sleep
# from datetime import datetime

from dotenv import load_dotenv
load_dotenv()

from services.instituteService import *
from services.facultyService import *
from services.studentService import *
from services.fileUploadService import *

from bson.objectid import ObjectId
import certifi, random , math
# ------------------------------ Important Keys and connectivity ------------------------------

certificate = certifi.where()
client = pymongo.MongoClient("mongodb+srv://Admin:Admin12345@cluster0.kr0h0.mongodb.net/?retryWrites=true&w=majority", tlsCAFile=certificate)
print("Connected to database")
db = client.Eduhub

app = Flask(__name__)
CORS(app)

# app.secret_key = os.getenv("APP_SECRET_KEY")
# app.config['SESSION_COOKIE_NAME'] = 'google-login-session'
# app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=5)



# -------------------------------------------------------------------------------------
# ******************************API section starts here********************************
#--------------------------------------------------------------------------------------


#------------------------------- Institute APIs start----------------------------------

@app.route('/add-institute', methods=["POST"])
def addinstitute():
    serviceResponse = addinstituteService(request)
    return serviceResponse

@app.route('/institute-login', methods=["GET"])
def institutelogin():
    serviceResponse = instituteloginService()
    return serviceResponse

@app.route('/institute-students/<id>', methods=["GET", "POST", "DELETE", "PATCH"])
def institutestudents(id):
    serviceResponse = institutestudentsService(id, request)
    return serviceResponse

@app.route('/institute-professors/<id>', methods=["GET", "POST", "DELETE"])
def instituteprofessor(id):
    serviceResponse = instituteprofessorService(id, request)
    return serviceResponse

#------------------------------- institute APIs End----------------------------------




#------------------------------- Faculty APIs Start---------------------------
@app.route('/faculty-classroom/<id>', methods=["GET", "POST", "DELETE"])
def facultyClassroom(id):
    serviceResponse = facultyClassroomService(id, request)
    return serviceResponse 

@app.route('/file-upload', methods=["GET", "POST", "DELETE"])
def fileUpload():
    serviceResponse = fileUploadService(request.files['file'])
    print(serviceResponse)
    return "uploaded"
 
@app.route('/faculty-assignment/<id>', methods=["GET", "POST", "DELETE"])
def facultyAssignment(id):
    serviceResponse = facultyAssignmentService(id, request)
    return serviceResponse

@app.route('/faculty-material/<id>', methods=["GET", "POST", "DELETE"])
def facultyMaterial(id):
    serviceResponse = facultyMaterialService(id, request)
    return serviceResponse
#------------------------------- Faculty APIs End---------------------------




#------------------------------- Students APIs Start---------------------------


@app.route('/student-class/<id>', methods=["GET", "POST","DELETE"])
def studentClasses(id):
    serviceResponse = studentCourseService(id,request)
    return serviceResponse

@app.route('/student-assignment/<id>', methods=["GET", "POST","DELETE"])
def studentAssignment(id):
    serviceResponse = studentAssignmentService(id,request)
    return serviceResponse

@app.route('/student-quiz/<id>', methods=["GET", "POST","DELETE"])
def studentQuiz(id):
    serviceResponse = studentQuizService(id,request)
    return serviceResponse

@app.route('/student-material/<id>', methods=["GET", "POST","DELETE"])
def studentMaterial(id):
    serviceResponse = studentMaterialService(id,request)
    return serviceResponse
#------------------------------- Students APIs End---------------------------





#------------------------------- token and validation APIs---------------------------

@app.route('/tokenApi', methods=["GET"])
def tokenApi():

    idinfo = None
    while idinfo is None:
        try:
            idinfo = id_token.verify_oauth2_token(request.headers["Authorization"].split()[1], requests.Request(), "1029920867014-8l02s0sh2ossi9sa06u83e09o26elkpf.apps.googleusercontent.com")
        except:
            sleep(0.5)
            pass

    data = db.user.find_one({"email": idinfo["email"]})
    print(data)
    if not (data):
        db.user.insert_one({
            "name": idinfo["name"],
            "email": idinfo["email"],
            "role": "student",
            "image" : idinfo["picture"],
            "courses" : []
        })
  
    return f'Token Authinciated'

@app.route('/home', methods=["GET", "POST"])
#@login_required
def home():
    randomlist =[]
    if request.method == "GET":
        cursor = db.clasroom.find({})
        dataArr = []

        for data in cursor:
            dataArr.append({"name":data['name'], "ID": str(data['_id']), "professor": data['professor']})

        return jsonify(dataArr)

    elif request.method == "POST":
        digits = [i for i in range(0, 10)]
        ClassCode = ""
        for i in range(6):
            index = math.floor(random.random() * 10)
            ClassCode += str(digits[index])
        print("ksdnflkjds")
        i = 0
        while i < 10:
            if  ClassCode in randomlist:
                for i in range(6):
                    index = math.floor(random.random() * 10)
                    ClassCode += str(digits[index])
            else:
                break

        randomlist.append(ClassCode)
        print(ClassCode)

        db.clasroom.insert_one({
            "name": request.json['name'],
            "desc": request.json['desc'],
            "professor": request.json['professor'],
            "classCode":ClassCode
        })
        return "Request submitted sucessfully"

@app.route('/course/<id>')
# @login_required
def course(id):
    cursor = db.classcontent.find({"parentID" : id})
    dataArr = []

    for index, data in enumerate(cursor):
        dataArr.append({"name":data['name'], "desc":data['desc'], "topics":[], "students":[]})
        for subdata in data['topics']:
            dataArr[index]["topics"].append({"name": subdata['name'], "page":subdata['pages']})
        for subdata in data['students']:
            dataArr[index]["students"].append(subdata)

    return jsonify(dataArr);  
  
@app.route('/home/addstudent',methods=["POST"])
def addstudent():
    db.Students.insert_one({
            "name": request.json['name'],
            "phoneNo": request.json['phoneNo'],
            "email": request.json['email']
        })
    return "Request submitted sucessfully"

# @app.route('home/addinstitute',methods=["POST"])
# def addInstitute():
#     db.Institute.insert_one({
#         "name":request.json['name'],
#         "code":,
#         "desc":request.json['desc']
#     })



# @app.route()
if __name__ =='__main__':  
    app.run(debug = True)  