Topic Modeling Studio

Topic Modeling Studio is a full-stack application for exploring topics in a CSV dataset. It provides a guided React interface with three levels of control over a BERTopic pipeline:

- **Business User** - run topic modeling with the default configuration.
- **Data Scientist** - choose the embedding model, dimensionality-reduction method, and clustering algorithm.
- **NLP Researcher** - configure the core models and their UMAP/PCA and HDBSCAN/K-Means parameters.

The backend stores uploaded records in MongoDB, runs BERTopic, and returns interactive Plotly visualizations to the frontend.

## Tech stack

- Frontend: React 19, TypeScript, Vite, Material UI, Plotly
- Backend: FastAPI, Uvicorn, Motor (async MongoDB driver)
- Topic modeling: BERTopic, Sentence Transformers, UMAP, HDBSCAN, scikit-learn
- Database: MongoDB 7

## Prerequisites

- Python 3.10 or later
- Node.js 20 or later and npm
- Docker Desktop (recommended for MongoDB)
- NVIDIA CUDA-compatible GPU for the current embedding implementation

The application loads `all-mpnet-base-v2` and `gte-small` with `local_files_only=True` and uses `device="cuda"`. Download/cache those models before starting the API, and make sure the Python environment has CUDA-enabled PyTorch available.

## Quick start

### 1. Start MongoDB

From the project root:

```powershell
docker compose -f docker/docker-compose.yml up -d
```

MongoDB will be available at `mongodb://localhost:27007`.

### 2. Create and configure the backend environment

```powershell
cd src
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
pip install bertopic sentence-transformers pandas numpy scikit-learn umap-learn hdbscan "python-jose[cryptography]" email-validator
```

Create `src/.env`:

```env
APP_NAME=Topic Modeling Studio
APP_VERSION=0.1.0
OPENAI_API_KEY=

FILE_ALLOWED_TYPES=["text/csv"]
FILE_MAX_SIZE=20
FILE_DEFAULT_CHUNK_SIZE=1048576

MONGODB_URL=mongodb://localhost:27007
MONGODB_DATABASE=topic_modeling_studio
```

`OPENAI_API_KEY` is currently required by the settings model, even though the existing topic-modeling routes do not use it. It may be left blank.

Start the API from `src` so its local imports and `.env` file resolve correctly:

```powershell
uvicorn main:app --reload --host 0.0.0.0 --port 5000
```

The API documentation is then available at <http://localhost:5000/docs>.

### 3. Start the frontend

Open a second terminal:

```powershell
cd web
npm install
npm run dev
```

Open the URL printed by Vite (normally <http://localhost:5173>). The frontend targets `http://localhost:5000` by default. To use another API address, create `web/.env.local`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Using the app

1. Create an account or sign in.
2. Upload a CSV file.
3. Choose a workflow: Business User, Data Scientist, or NLP Researcher.
4. Run topic modeling and explore the document and topic-bar-chart visualizations.

Uploaded data is scoped to the signed-in user's project ID. Uploading another dataset for that project replaces its stored dataset.

### Dataset format

Upload a CSV file with these columns:

| Column | Purpose |
| --- | --- |
| `Titles` | Document title used in the document visualization. |
| `Abstracts` | Document text used to create embeddings and topics. |

The upload screen accepts CSV files. Keep the configured file-size limit in mind (`FILE_MAX_SIZE`, in MB).

## Backend endpoints

All routes are prefixed with `/api/v1`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Return the application name and version. |
| `POST` | `/auth/signup` | Create a user/project. |
| `POST` | `/auth/login` | Sign in and receive access/refresh tokens. |
| `POST` | `/data/upload/{project_id}` | Upload and store a CSV dataset. |
| `POST` | `/nlp/user/{project_id}` | Run the default topic-modeling workflow. |
| `POST` | `/nlp/ds/{project_id}` | Run a configurable data-scientist workflow. |
| `POST` | `/nlp/re/{project_id}` | Run the researcher workflow with algorithm parameters. |

## Project structure

```text
src/                         FastAPI application
  ai_controllers/            Embedding, dimensionality reduction, clustering factories
  controllers/               Upload, project, and processing helpers
  routes/                    Auth, data, and NLP API routes
  assets/files/              Runtime storage for uploaded files (created as needed)
web/                         React/Vite application
  src/pages/                 Auth, upload, workflow, and result pages
  src/services/              API client and backend service calls
docker/docker-compose.yml    Local MongoDB service
```

## Development notes

- The frontend can be type-checked and built with `cd web; npm run build`.
- The backend requirements file covers the base web service; the additional ML packages shown in the setup step are needed by the current BERTopic routes.
- The Data Scientist and NLP Researcher routes currently read a `new_embeddings.csv` file at runtime. Provide that file in the backend working directory, or update those routes to encode the uploaded texts as the Business User route does.
- Authentication and password handling are development-only in the current implementation. Do not deploy it with the hard-coded JWT secrets or plaintext password storage.

## License

No license has been specified for this project.
