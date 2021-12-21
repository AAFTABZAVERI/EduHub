import os, uuid
from flask import jsonify
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient


connectionString = "DefaultEndpointsProtocol=https;AccountName=eduhub;AccountKey=dq2ymu4dKsovCTUX91D8J0v8yjrh62snwd7vIs7tHcypDDe2gKQA+zyfc3Sbkzct8nUctx9MJBZ3jf6lTKexpQ==;EndpointSuffix=core.windows.net"
containerName = "filestore"
blob_service_client = BlobServiceClient.from_connection_string(connectionString)


def fileUploadService(fileObject):

    fileName = fileObject.filename
    extension = fileName.split(".")[-1]
    uuidFileName = str(uuid.uuid4()) + '.' + extension
    fileObject.save(fileName)

    blob_client = blob_service_client.get_blob_client(container=containerName, blob=uuidFileName)

    with open(fileName, "rb") as data:
        blob_client.upload_blob(data)

    returnData = {}
    url = 'https://eduhub.blob.core.windows.net/filestore/' + uuidFileName
    returnData["fileName"] = fileName
    returnData["uuidFileName"] = uuidFileName 
    returnData["url"] = url

    os.remove(fileName)

    return returnData