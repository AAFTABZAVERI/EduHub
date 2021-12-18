import pymongo
import certifi

from dotenv import load_dotenv
load_dotenv()

# ------------------------------ Important Keys and connectivity ------------------------------

certificate = certifi.where()
client = pymongo.MongoClient("mongodb+srv://Admin:Admin12345@cluster0.kr0h0.mongodb.net/?retryWrites=true&w=majority", tlsCAFile=certificate)
print("Connected to database")
db = client.Eduhub

# ---------------------------- Important Keys and connectivity End---------------------------
