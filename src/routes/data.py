from fastapi import FastAPI, APIRouter, Depends, UploadFile, status, Request
from fastapi.responses import JSONResponse
import os
from helpers.config import get_settings, Settings
from controllers import DataController, ProjectController, ProcessController
import aiofiles
from models import ResponseSignal

import logging
from .schemes.data import ProcessRequest
from models.ProjectModel import ProjectModel
import time
#project stand for user

logger = logging.getLogger('uvicorn.error')

data_router = APIRouter(
    prefix="/api/v1/data",
    tags=["api_v1", "data"],
)

@data_router.post("/upload/{project_id}")
async def upload_data(request: Request, project_id: str, file: UploadFile,
                      app_settings: Settings = Depends(get_settings)):
        
    
    project_model = ProjectModel(
        db_client=request.app.db_client
    )

    

    # validate the file properties
    data_controller = DataController()

    is_valid, result_signal = data_controller.validate_uploaded_file(file=file)
    
    if not is_valid:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={
                "signal": result_signal
            }
        )
    
    file_path, file_id = data_controller.generate_unique_filepath(
        orig_file_name=file.filename,
        project_id=project_id
    )
    
    try:
        async with aiofiles.open(file_path, "wb") as f:
            while chunk := await file.read(app_settings.FILE_DEFAULT_CHUNK_SIZE):
                await f.write(chunk)
    except Exception as e:

        logger.error(f"Error while uploading file: {e}")

        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={
                "signal": ResponseSignal.FILE_UPLOAD_FAILED.value
            }
        )
    process_controller = ProcessController(project_id=project_id)

    file_content = process_controller.get_file_content(file_id=file_id)
    records = file_content.to_dict("records")
    
    collection = request.app.db_client[
        app_settings.MONGODB_DATABASE
    ]["datasets"]

    flag = await collection.find_one({
            "project_id": project_id
        })

    if flag is not None: 
        _ = await collection.delete_many({
                "project_id": project_id
            })
    for record in records:
      record["project_id"] = project_id
    result = await collection.insert_many(records)
    return JSONResponse(
            content={
                "signal": ResponseSignal.FILE_UPLOAD_SUCCESS.value,
                "file_id": file_id,
            }
        )

@data_router.post("/process/{project_id}")
async def process_endpoint(request: Request, project_id: str, process_request: ProcessRequest,
app_settings: Settings = Depends(get_settings)):

    file_id = process_request.file_id
    
    project_model = ProjectModel(
        db_client=request.app.db_client
    )

    
    process_controller = ProcessController(project_id=project_id)

    file_content = process_controller.get_file_content(file_id=file_id)
    records = file_content.to_dict("records")
    
    collection = request.app.db_client[
        app_settings.MONGODB_DATABASE
    ]["datasets"]

    flag = await collection.find_one({
            "project_id": project_id
        })

    if flag is not None: 
        _ = await collection.delete_many({
                "project_id": project_id
            })
    for record in records:
      record["project_id"] = project_id
    result = await collection.insert_many(records)
    

    return JSONResponse(
    content={
        "signal": ResponseSignal.PROCESSING_SUCCESS.value,
        "inserted_chunks": "no_records",
       
    }
)

