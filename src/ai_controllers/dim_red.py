from sklearn.decomposition import PCA
from umap import UMAP #


class dimention_reduction():

    def pca(n_components:int = 5, metric:str = "cosine"):
        pca_model = PCA(n_components=n_components)
        return pca_model

    def umap(n_components : int =10 , metric:str  = 'cosine' ):
        umap_model = UMAP(
            n_components=n_components, 
            metric = metric,
            random_state=42
            )
        return umap_model