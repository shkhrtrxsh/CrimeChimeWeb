import * as React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';

export default function UserSideName() {
  const theme = useTheme()
  return (
    <Grid item md={3} sx={{
      background: "#fff",
      borderRight: '1px solid #ddd',
      height:"calc( 100vh - 65px )",
      maxHeight:"calc( 100vh - 65px )",
      [theme.breakpoints.down('md')]: {
        display: 'none'
      }
    }}>
      <Paper sx={{ maxWidth: '100%', }} id="user-side">
        <MenuList>
          <MenuItem component={Link} to="/profile">
            <ListItemIcon sx={{  }}>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText sx={{}}>User Profile</ListItemText>
          </MenuItem>
          <MenuItem component={Link} to="/my-report">
            <ListItemIcon sx={{  }}>
              <ManageAccountsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText sx={{  }}>My Reports</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </Grid>
  );
}