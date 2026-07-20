from hdbscan import HDBSCAN
from sklearn.cluster import KMeans

class cluster():
    def kmeans(n_clusters:int = 20, metric:str  = 'euclidean' , cluster_selection_method: str = "eom"):
        kmeans_model = KMeans(
            n_clusters=n_clusters,
            random_state=42
        )
        return kmeans_model

    def hdbscan(n_clusters: int = 5, metric:str  = 'euclidean' , cluster_selection_method: str = "eom"):
        hdb=HDBSCAN(
        min_cluster_size = n_clusters ,
        metric=metric,
        cluster_selection_method=cluster_selection_method)
        return hdb