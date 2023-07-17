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
  // {
  //   title: 'role',
  //   path: '/role',
  //   icon: getIcon('eva:lock-fill'),
  // },
  {
    title: 'Reported Crimes',
    path: '/reports',
    icon: getIcon('eva:lock-fill'),
  },
];

export default navConfig;
