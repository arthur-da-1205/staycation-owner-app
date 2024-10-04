import AuthLayout from '@layouts/auth/auth.layout';
import MainLayout from '@layouts/main/main.layout';
import Dashboard from '@pages/dashboard';
import LoginPage from '@pages/login';
import OrderPage from '@pages/order';
import PropertyPage from '@pages/property';
import PropertyCreatePage from '@pages/property/create';
import PropertyDetailPage from '@pages/property/detail';
import PropertyOverviewPage from '@pages/property/detail/overview';
import { Navigate, RouteObject } from 'react-router-dom';

export default [
  // Auth Routes
  {
    path: '/login',
    element: <AuthLayout component={<LoginPage />} />,
  },
  // Main Routes
  {
    path: '/',
    element: <MainLayout />,
    breadcrumb: 'dashboard',
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/my-properties',
        element: <PropertyPage />,
        breadcrumb: 'myProperties',
        children: [
          { path: 'create', element: <PropertyCreatePage />, breadcrumb: 'create' },
          {
            path: ':id',
            children: [
              {
                element: <PropertyDetailPage />,
                breadcrumb: 'id',
                children: [
                  { index: true, element: <Navigate to="overview" />, breadcrumb: 'id' },
                  {
                    path: 'overview',
                    element: <PropertyOverviewPage />,
                    breadcrumb: 'overview',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '/orders',
        element: <OrderPage />,
      },
    ],
  },
] as RouteObject[];
