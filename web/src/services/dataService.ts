import api from './api';

export type UploadResponse = { signal: string; file_id: string };

export async function uploadDataset(file: File, onProgress: (progress: number) => void) {
  const projectId = localStorage.getItem('user_id');
  if (!projectId) throw new Error('Your session is missing a project ID. Please sign in again.');

  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post<UploadResponse>(`/api/v1/data/upload/${projectId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (event) => {
      if (event.total) onProgress(Math.round((event.loaded * 100) / event.total));
    },
  });
  return data;
}
