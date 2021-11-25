from types import MethodType
from flask import *
import pymongo
import time
import cloudinary
from bson.objectid import ObjectId
import certifi, random , math
# ------------------------------ Important Keys and connectivity ------------------------------

cloudinary.config( 
  cloud_name = "ecproject", 
  api_key = "222581188172946", 
  api_secret = "YzgLHHq_UdSWuraexkccPlQ-I_c" 
)
randomlist=[] 
randomlist2=[]
certificate = certifi.where()
client = pymongo.MongoClient("mongodb+srv://Admin:Admin12345@cluster0.kr0h0.mongodb.net/?retryWrites=true&w=majority", tlsCAFile=certificate)
print("Connected to database")


db = client.Eduhub


app = Flask(__name__)


# ------------------------------ API session starts here ------------------------------

@app.route('/home', methods=["GET", "POST"])
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
            "ClassCode":ClassCode
        })
        return "Request submitted sucessfully"


@app.route('/course/<id>')
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

@app.route('/home/addinstitute')
def testt():
    digits = [i for i in range(0, 10)]
    InstituteCode = ""
    for i in range(6):
                index = math.floor(random.random() * 10)
                InstituteCode += str(digits[index])
    i = 0
    while i < 10:
        if  InstituteCode in randomlist2:
            InstituteCode=""
            for i in range(6):
                index = math.floor(random.random() * 10)
                InstituteCode += str(digits[index])
        else:
            break
    
    print(InstituteCode)
    randomlist2.append(InstituteCode)
    
    db.institute.insert_one({
            "name": request.json['name'],
            "desc": request.json['desc'],
            "professor": request.json['professor'],
            "InstituteCode":InstituteCode
        })
 
    return "nothing to return"

# @app.route()
if __name__ =='__main__':  
    app.run(debug = True)  