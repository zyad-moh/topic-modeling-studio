from pydantic import BaseModel
from typing import Optional
class UMAPConfig(BaseModel):
    n_components: int = 10
    metric: str = "cosine"

class ClusterConfig(BaseModel):
    n_clusters: int = 10
    metric: str = "cosine"
    cluster_selection_method :str = 'eom'


class re_config(BaseModel):
    embedding_model: str
    d_m_model: str
    clustering: str
    d_m_params: UMAPConfig = UMAPConfig()
    clustering_params : ClusterConfig = ClusterConfig()

