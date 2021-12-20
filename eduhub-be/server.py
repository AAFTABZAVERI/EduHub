from flask import *
from flask_cors import CORS

import pymongo

from google.oauth2 import id_token
from google.auth.transport import requests

import certifi
import os
from time import sleep
from datetime import timedelta

from dotenv import load_dotenv
load_dotenv()


from bson.objectid import ObjectId
import certifi, random , math
# ------------------------------ Important Keys and connectivity ------------------------------

certificate = certifi.where()
client = pymongo.MongoClient("mongodb+srv://Admin:Admin12345@cluster0.kr0h0.mongodb.net/?retryWrites=true&w=majority", tlsCAFile=certificate)
print("Connected to database")
db = client.Eduhub

app = Flask(__name__)
CORS(app)

app.secret_key = os.getenv("APP_SECRET_KEY")
app.config['SESSION_COOKIE_NAME'] = 'google-login-session'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=5)

# -------------------------------------------------------------------------------------
# ******************************API section starts here********************************
#--------------------------------------------------------------------------------------


#------------------------------- institute APIs----------------------------------

@app.route('/add-institute', methods=["POST"])
def addinstitute():
    print(request.json)
    db.institute.insert_one({
            "instituteName": request.json['name'],
            "description": request.json['description'],
            "email": request.json['email'],
            "professors": [],
            "students": [],
    })

    return "Institute created"

@app.route('/institute-login', methods=["GET"])
def institutelogin():
    idinfo = None
    while idinfo is None:
        try:
            idinfo = id_token.verify_oauth2_token(request.headers["Authorization"].split()[1], requests.Request(), "1029920867014-8l02s0sh2ossi9sa06u83e09o26elkpf.apps.googleusercontent.com")
        except:
            sleep(0.5)
            pass

    instituteEmail = idinfo["email"]
    instituteData =  db.institute.find_one({"email": instituteEmail})
    responseData = {"Id":str(instituteData["_id"]), "instituteName":instituteData["instituteName"], "instituteDescription":instituteData["description"]}
    return jsonify(responseData)


@app.route('/institute-students/<id>', methods=["GET", "POST", "DELETE", "PATCH"])
def institutestudents(id):
    if request.method == "GET":
        instituteData = db.institute.find_one({"_id" : ObjectId(id)})
        print("data sent")
        return jsonify(instituteData["students"])

    elif request.method == "POST":
        instituteData = db.institute.find_one({"_id" : ObjectId(id)})
        studentlist = []
        for oldstudent in instituteData["students"]:
            studentlist.append(oldstudent)

        for newstudent in request.json["students"]:
            if not newstudent in studentlist:
                studentlist.append(newstudent)
        db.institute.update_one(
                    {"_id": ObjectId(id)},
                    {"$set": {"students": studentlist}})

        instituteData = db.institute.find_one({"_id" : ObjectId(id)})
        return jsonify(instituteData["students"])

    elif request.method == "DELETE":
        instituteData = db.institute.find_one({"_id" : ObjectId(id)})
        studentlist = []
        for oldstudent in instituteData["students"]:
            studentlist.append(oldstudent)

        for removestudent in request.json["students"]:
            if removestudent in studentlist:
                studentlist.remove(removestudent)

        db.institute.update_one(
                    {"_id": ObjectId(id)},
                    {"$set": {"students": studentlist}})
        
        instituteData = db.institute.find_one({"_id" : ObjectId(id)})
        return jsonify(instituteData["students"])

    else:
        abort(400)


@app.route('/institute-professors/<id>', methods=["GET", "POST", "DELETE"])
def instituteprofessor(id):

    if request.method == "GET":
        instituteData = db.institute.find_one({"_id" : ObjectId(id)})
        return jsonify(instituteData["professors"])

    elif request.method == "POST":
        instituteData = db.institute.find_one({"_id" : ObjectId(id)})
        professorslist = []
        for oldprofessor in instituteData["professors"]:
            professorslist.append(oldprofessor)

        for newprofessor in request.json["professors"]:
            if not newprofessor in professorslist:
                professorslist.append(newprofessor)
        db.institute.update_one(
                    {"_id": ObjectId(id)},
                    {"$set": {"professors": professorslist}})

        instituteData = db.institute.find_one({"_id" : ObjectId(id)})
        return jsonify(instituteData["professors"])

    elif request.method == "DELETE":
        instituteData = db.institute.find_one({"_id" : ObjectId(id)})
        professorslist = []
        for oldprofessor in instituteData["professors"]:
            professorslist.append(oldprofessor)

        for removeprofessor in request.json["professors"]:
            if removeprofessor in professorslist:
                professorslist.remove(removeprofessor)

        db.institute.update_one(
                    {"_id": ObjectId(id)},
                    {"$set": {"professors": professorslist}})
        
        instituteData = db.institute.find_one({"_id" : ObjectId(id)})
        return jsonify(instituteData["professors"])

    else:
        abort(400)

#------------------------------- Faculty APIs---------------------------



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

#------------------------------ Student APIs ------------------------------------
@app.route('/home', methods=["GET", "POST"])
#@login_required
def home():
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