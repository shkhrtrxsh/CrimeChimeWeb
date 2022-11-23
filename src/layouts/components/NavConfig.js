// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'user',
    path: '/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title:'Role Permission',
    icon: getIcon('eva:lock-fill'),
    children:[
      {
        title: 'role',
        path: '/role',
        icon: getIcon('eva:lock-fill'),
      },
      {
        title: 'Permission Module',
        path: '/permission-module',
        icon: getIcon('eva:person-add-fill'),
      },
    ],    
  },
  {
    title: 'service',
    path: '/service',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export default navConfig;
