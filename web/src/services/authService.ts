import api from './api';

export type AuthCredentials = { email: string; password: string };
export type SignupResponse = { message: string; user_id: string };
export type LoginResponse = SignupResponse & { access_token: string; refresh_token: string };

export async function signup(credentials: AuthCredentials) {
  const { data } = await api.post<SignupResponse>('/api/v1/auth/signup', credentials);
  return data;
}

export async function login(credentials: AuthCredentials) {
  const { data } = await api.post<LoginResponse>('/api/v1/auth/login', credentials);
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);
  localStorage.setItem('user_id', data.user_id);
  return data;
}

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_id');
}
