from pydantic import BaseModel
from typing import Optional

class config(BaseModel):
    embedding_model: str
    d_m_model: str
    clustering: str
