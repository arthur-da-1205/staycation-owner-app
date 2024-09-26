import AuthLayout from '@layouts/auth/auth.layout';
import LoginPage from '@pages/login';
import { RouteObject } from 'react-router-dom';

export default [
  // Auth Routes
  {
    path: '/login',
    element: <AuthLayout component={<LoginPage />} />,
  },
] as RouteObject[];
