import api from './api';

export type UserModelingResult = { plot: unknown; char_plot: unknown };

export async function runBusinessTopicModeling() {
  const projectId = localStorage.getItem('user_id');
  if (!projectId) throw new Error('Your session is missing a project ID. Please sign in again.');
  const { data } = await api.post<UserModelingResult>(`/api/v1/nlp/user/${projectId}`);
  return data;
}

export type DataScientistConfig = {
  embedding_model: 'mpnet' | 'gte';
  d_m_model: 'umap' | 'pca';
  clustering: 'hdbscan' | 'kmeans';
};

export async function runDataScientistTopicModeling(config: DataScientistConfig) {
  const projectId = localStorage.getItem('user_id');
  if (!projectId) throw new Error('Your session is missing a project ID. Please sign in again.');
  const { data } = await api.post<UserModelingResult>(`/api/v1/nlp/ds/${projectId}`, config);
  return data;
}

export type ResearcherConfig = {
  embedding_model: 'mpnet' | 'gte';
  d_m_model: 'umap' | 'pca';
  clustering: 'hdbscan' | 'kmeans';
  d_m_params: { n_components: number; metric?: string };
  clustering_params: { n_clusters: number; metric?: string; cluster_selection_method?: string };
};

export async function runResearcherTopicModeling(config: ResearcherConfig) {
  const projectId = localStorage.getItem('user_id');
  if (!projectId) throw new Error('Your session is missing a project ID. Please sign in again.');
  const { data } = await api.post<UserModelingResult>(`/api/v1/nlp/re/${projectId}`, config);
  return data;
}
