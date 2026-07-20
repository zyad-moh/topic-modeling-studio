import type { ReactNode } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { LoginPage } from '../pages/auth/LoginPage';
import { SignupPage } from '../pages/auth/SignupPage';
import { StudioHomePage } from '../pages/StudioHomePage';
import { WorkflowPage } from '../pages/WorkflowPage';
import { UploadDatasetPage } from '../pages/UploadDatasetPage';
import { BusinessWorkflowPage } from '../pages/BusinessWorkflowPage';
import { ResultsPage } from '../pages/ResultsPage';
import { DataScientistWorkflowPage } from '../pages/DataScientistWorkflowPage';
import { ResearcherWorkflowPage } from '../pages/ResearcherWorkflowPage';

function ProtectedRoute({ children }: { children: ReactNode }) {
  return localStorage.getItem('access_token') ? children : <Navigate to="/login" replace />;
}

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
    ],
  },
  { path: '/', element: <ProtectedRoute><StudioHomePage /></ProtectedRoute> },
  { path: '/workflow/business', element: <ProtectedRoute><BusinessWorkflowPage /></ProtectedRoute> },
  { path: '/workflow/data-scientist', element: <ProtectedRoute><DataScientistWorkflowPage /></ProtectedRoute> },
  { path: '/workflow/researcher', element: <ProtectedRoute><ResearcherWorkflowPage /></ProtectedRoute> },
  { path: '/workflow/:mode', element: <ProtectedRoute><WorkflowPage /></ProtectedRoute> },
  { path: '/upload', element: <ProtectedRoute><UploadDatasetPage /></ProtectedRoute> },
  { path: '/results', element: <ProtectedRoute><ResultsPage /></ProtectedRoute> },
  { path: '*', element: <Navigate to="/login" replace /> },
]);
