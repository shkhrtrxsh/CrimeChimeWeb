import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { DRAWER_WIDTH, APPBAR_MOBILE, APPBAR_DESKTOP, WEB_WIDTH} from 'src/constants/theme'


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  [theme.breakpoints.up('lg')]: {
    width: WEB_WIDTH,
    margin: 'auto',
    position: 'relative'
  }
}));

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: '80px !important',
  paddingBottom: theme.spacing(10),
  paddingRight: 0,
  [theme.breakpoints.up('lg')]: {
    paddingTop: APPBAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function AppLayoutWithSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <Navbar onOpenSidebar={() => setOpen(true)} />
      <Sidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
