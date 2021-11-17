from flask import Flask
import pymongo
import time
import cloudinary

cloudinary.config( 
  cloud_name = "ecproject", 
  api_key = "222581188172946", 
  api_secret = "YzgLHHq_UdSWuraexkccPlQ-I_c" 
)

client = pymongo.MongoClient("mongodb+srv://Admin:Admin12345@cluster0.kr0h0.mongodb.net/?retryWrites=true&w=majority", serverSelectionTimeoutMS=2000)
db = client.Eduhub

try:
   print("Connected to database")
except Exception:
    print("Unable to connect to the database.")

app = Flask(__name__) #creating the Flask class object   
 
@app.route('/') #decorator drfines the   
def main():  
    return "hello, this is our first flask website"; 

@app.route('/home') #decorator drfines the   
def home():  
    return "hello, this is our route to home API";  
  
if __name__ =='__main__':  
    app.run(debug = True)  