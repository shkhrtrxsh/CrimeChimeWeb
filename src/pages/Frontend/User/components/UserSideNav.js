import * as React from 'react';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';

export default function UserSideName() {
  return (
    <Paper sx={{ maxWidth: '100%' }}>
      <MenuList>
        <MenuItem component={Link} to="/profile">
          <ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon>
          <ListItemText>User Profile</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to="/profile/report">
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>My  Reports</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to="/profile/change-password">
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Change Password</ListItemText>
        </MenuItem>        
      </MenuList>
    </Paper>
  );
}