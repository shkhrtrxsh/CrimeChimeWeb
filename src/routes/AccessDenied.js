import { Navigate, useRoutes } from 'react-router-dom';
import AccessDeniedPage from '../pages/Error/AccessDenied';


// ----------------------------------------------------------------------

const AccessDenied = [
  { 
    path: '/access-denied', element: <AccessDeniedPage /> 
  }
]

export default AccessDenied;