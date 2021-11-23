<<<<<<< HEAD
from flask import Flask
from flask.json import JSONEncoder
from bson.json_util import dumps
from bson.json_util import loads
=======
from flask import *
>>>>>>> 07c571d02d55cf7e04c8d172fd968cdf21bec605
import pymongo
import json
import cloudinary
from bson.objectid import ObjectId
import certifi


# ------------------------------ Important Keys and connectivity ------------------------------

cloudinary.config( 
  cloud_name = "ecproject", 
  api_key = "222581188172946", 
  api_secret = "YzgLHHq_UdSWuraexkccPlQ-I_c" 
)

<<<<<<< HEAD
client = ""

try:
    client = pymongo.MongoClient("mongodb+srv://Admin:Admin12345@cluster0.kr0h0.mongodb.net/?retryWrites=true&w=majority", serverSelectionTimeoutMS=2000)
    print("Connected to database")
except Exception:
    print("Unable to connect to the database.")

db = client.Eduhub
cursor = db.clasroom.find_one({"name": "maths"})
list_cur = list(cursor)

print(cursor['name'])

#print(dir(list_cur))
app = Flask(__name__) #creating the Flask class object   
 
@app.route('/') #decorator drfines the   
def main():
    db = client.Eduhub
    cursor = db.clasroom.find({"name": "maths"})
    #return json.dumps(list_cur["name"])
    #return "hello, this is our first flask website"; 
=======
client = pymongo.MongoClient("mongodb+srv://Admin:Admin12345@cluster0.kr0h0.mongodb.net/?retryWrites=true&w=majority", tlsCAFile=certificate)
print("Connected to database")
db = client.Eduhub

certificate = certifi.where()
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
>>>>>>> 07c571d02d55cf7e04c8d172fd968cdf21bec605

    elif request.method == "POST":

        db.clasroom.insert_one({
            "name": request.json['name'],
            "desc": request.json['desc'],
            "professor": request.json['professor']
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
  

if __name__ =='__main__':  
    app.run(debug = True)  