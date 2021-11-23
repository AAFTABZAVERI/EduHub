from flask import Flask
from flask.json import JSONEncoder
from bson.json_util import dumps
from bson.json_util import loads
import pymongo
import json
import cloudinary

cloudinary.config( 
  cloud_name = "ecproject", 
  api_key = "222581188172946", 
  api_secret = "YzgLHHq_UdSWuraexkccPlQ-I_c" 
)

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

@app.route('/home') #decorator drfines the   
def home():  
    return "hello, this is our route to home API";  
  
if __name__ =='__main__':  
    app.run(debug = True)  