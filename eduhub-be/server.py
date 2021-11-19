'''
IMP How to setup 

-> Make sure you have python(3.8 or above) installed in your system (and python file path is also working)
-> Then clone This repo
-> Then Open this repo in VScode and press 'Ctrl + j' and type 'pip install virtualenv'
-> Navigate to your repo 'cd eduhub-be'
-> There type 'virtual eduhubenv'
-> Then type '.\eduhubenv\Scripts\activate'
-> If you get any execution policy error then open powershell and type 'Set-ExecutionPolicy unrestricted -scope CurrentUser'
-> Then type this '.\eduhubenv\Scripts\activate' and it should not show any error
-> Now type 'pip install -r requirement.txt'
-> After all files are downloaded type 'python .\server.py'


-> If everything worked completely fine then "Great you are a genius !!!" 
-> IF you are stuck call 7777905606
'''

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