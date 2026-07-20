from fastapi import FastAPI, APIRouter, Depends, UploadFile, status, Request
from fastapi.responses import JSONResponse
import os
from helpers.config import get_settings, Settings
from controllers import DataController, ProjectController, ProcessController
import aiofiles
from models import ResponseSignal
from bertopic import BERTopic
import logging
from .schemes.data import ProcessRequest
from .schemes.ds_request import config
from .schemes.researcher_request import re_config
from models.ProjectModel import ProjectModel
import time
from ai_controllers.clusters import cluster
from ai_controllers.dim_red import dimention_reduction
from ai_controllers.embeddings import embedding_model
import pandas as pd
import numpy as np
from numpy.typing import NDArray
import json

logger = logging.getLogger('uvicorn.error')

nlp_router = APIRouter(
    prefix="/api/v1/nlp",
    tags=["api_v1"],
)

@nlp_router.post("/user/{project_id}")
async def user(request: Request, project_id: str, 
                      app_settings: Settings = Depends(get_settings)):
    db_client=request.app.db_client
    collection=db_client[
        app_settings.MONGODB_DATABASE
    ]["datasets"]
    records= await collection.find({
            "project_id":project_id # field named project_id with type project_id
        }).to_list(length=None)
    
    titles = [record["Titles"] for record in records]
    texts = [record["Abstracts"] for record in records]
    #df_0= pd.read_csv("new_arxiv_nlp.csv")
    #abstracts = df_0["Abstracts"].tolist()
    
    emb_model= embedding_model.mpnet()
    umap_model= dimention_reduction.umap()
    hdb= cluster.hdbscan()
    embeddings = emb_model.encode(texts)
    #df = pd.read_csv("new_embeddings.csv")
    #embeddings: NDArray[np.float64] = df.to_numpy(dtype=np.float64)
    topic_model = BERTopic(
        embedding_model=emb_model,
        umap_model=umap_model,
        hdbscan_model=hdb,
        verbose=True
        ).fit(texts,embeddings)
    topic_info = topic_model.get_topic_info()

    umap_model_1 = dimention_reduction.umap(n_components=2,metric='cosine')
    reduced_embeddings = umap_model_1.fit_transform(embeddings)
    fig = topic_model.visualize_documents(
                titles,
                reduced_embeddings=reduced_embeddings,
                width=1200,
                hide_annotations=True
            )

    fig.update_layout(font=dict(size=16))
    
    char_fig = topic_model.visualize_barchart()

    char_fig.update_layout(font=dict(size=16))

    return {
    "plot": json.loads(fig.to_json()),
    "char_plot": json.loads(char_fig.to_json()),
}

@nlp_router.post("/ds/{project_id}")
async def ds(request: Request, project_id: str, config:config,
                      app_settings: Settings = Depends(get_settings)):
    db_client=request.app.db_client
    collection=db_client[
        app_settings.MONGODB_DATABASE
    ]["datasets"]
    records= await collection.find({
            "project_id":project_id # field named project_id with type project_id
        }).to_list(length=None)
    
    #labels = [record["y"] for record in records]
    texts = [record["Abstracts"] for record in records]
    #df_0= pd.read_csv("new_arxiv_nlp.csv")
    #abstracts = df_0["Abstracts"].tolist()
    
    emb_model = getattr(embedding_model, config.embedding_model)()
    umap_model = getattr(dimention_reduction, config.d_m_model)()
    hdb = getattr(cluster, config.clustering)()
    #embeddings = emb_model.encode(texts)
    df = pd.read_csv("new_embeddings.csv")
    embeddings: NDArray[np.float64] = df.to_numpy(dtype=np.float64)
    topic_model = BERTopic(
        embedding_model=emb_model,
        umap_model=umap_model,
        hdbscan_model=hdb,
        verbose=True
        ).fit(texts,embeddings)
    topic_info = topic_model.get_topic_info()
    umap_model_1 = dimention_reduction.umap(n_components=2,metric='cosine')
    reduced_embeddings = umap_model_1.fit_transform(embeddings)
    fig = topic_model.visualize_documents(
                titles,
                reduced_embeddings=reduced_embeddings,
                width=1200,
                hide_annotations=True
            )

    fig.update_layout(font=dict(size=16))
    
    char_fig = topic_model.visualize_barchart()

    char_fig.update_layout(font=dict(size=16))

    return {
    "plot": json.loads(fig.to_json()),
    "char_plot": json.loads(char_fig.to_json()),
}


@nlp_router.post("/re/{project_id}")
async def re(request: Request, project_id: str, re_config:re_config,
                      app_settings: Settings = Depends(get_settings)):
    db_client=request.app.db_client
    collection=db_client[
        app_settings.MONGODB_DATABASE
    ]["datasets"]
    records= await collection.find({
            "project_id":project_id # field named project_id with type project_id
        }).to_list(length=None)
    
    titles= [record["Titles"] for record in records]
    texts = [record["Abstracts"] for record in records]
    #df_0= pd.read_csv("new_arxiv_nlp.csv")
    #abstracts = df_0["Abstracts"].tolist()
    
    emb_model = getattr(embedding_model, re_config.embedding_model)()
    umap_model = getattr(dimention_reduction, re_config.d_m_model)(**re_config.d_m_params.model_dump())
    hdb = getattr(cluster, re_config.clustering)(**re_config.clustering_params.model_dump())
    #embeddings = emb_model.encode(texts)
    df = pd.read_csv("new_embeddings.csv")
    embeddings: NDArray[np.float64] = df.to_numpy(dtype=np.float64)
    topic_model = BERTopic(
        embedding_model=emb_model,
        umap_model=umap_model,
        hdbscan_model=hdb,
        verbose=True
        ).fit(texts,embeddings)
    topic_info = topic_model.get_topic_info()
    umap_model_1 = dimention_reduction.umap(n_components=2,metric='cosine')
    reduced_embeddings = umap_model_1.fit_transform(embeddings)
    fig = topic_model.visualize_documents(
                titles,
                reduced_embeddings=reduced_embeddings,
                width=1200,
                hide_annotations=True
            )

    fig.update_layout(font=dict(size=16))
    
    char_fig = topic_model.visualize_barchart()

    char_fig.update_layout(font=dict(size=16))

    return {
    "plot": json.loads(fig.to_json()),
    "char_plot": json.loads(char_fig.to_json()),
}