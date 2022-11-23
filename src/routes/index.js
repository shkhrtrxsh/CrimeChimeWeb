import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import AppLayoutWithSidebar from '../layouts/AppLayoutWithSidebar';
import AppLayout from '../layouts/AppLayout';
import AuthLayout from '../layouts/AuthLayout';
import { IsAuth, RoutePermissions } from 'src/helpers/RouteHelper';

// Routes Layouts
import BackendPrivateRoutes from './BackendPrivateRoutes';
import FrontendRoutes from './FrontendRoutes';
import FrontendPrivateRoutes from './FrontendPrivateRoutes';
import AuthRoutes from './AuthRoutes';



// Routes

import NotFound from '../pages/Error/Page404';
import AccessDenied from './AccessDenied';


// ----------------------------------------------------------------------

export default function Router() {

  const routesPermission = RoutePermissions()
  const isAuth = IsAuth()


  const inArray = (needle, haystack) => {
    for(var i = 0; i < haystack.length; i++) {
        if(haystack[i] === needle) return true;
    }
    return false;
  }

  BackendPrivateRoutes.forEach(route => {
    if(routesPermission){
      if(!inArray(route.path, routesPermission)){
        route.element = AccessDenied[0].element
      }
    }
  });

  FrontendPrivateRoutes.forEach(route => {
    if(routesPermission){
      if(!inArray(route.path, routesPermission)){
        route.element = AccessDenied[0].element
      }
    }
  });

  const RouteIndexing = [


    {
      path: '/',
      element: <AppLayout />,
      children: FrontendRoutes
    },
    {
      path: '/',
      element: isAuth === true ? <AppLayout />  : <Navigate to="/login" />,
      children: FrontendPrivateRoutes
    },
    {
      path: '/',
      element: isAuth === true ? <AppLayoutWithSidebar />  : <Navigate to="/login" />,
      children: BackendPrivateRoutes
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    { 
      path: '404', element: 
      <NotFound /> 
    },
  ]


  return useRoutes(RouteIndexing);
}
