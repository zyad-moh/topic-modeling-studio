from sentence_transformers import SentenceTransformer

_mpnet_model = SentenceTransformer(
    "sentence-transformers/all-mpnet-base-v2",
    local_files_only=True,
    device="cuda"      
)

_gte_model = SentenceTransformer(
    "thenlper/gte-small",
    local_files_only=True,
    device="cuda"
)


class embedding_model:

    @staticmethod
    def mpnet():
        return _mpnet_model

    @staticmethod
    def gte():
        return _gte_model