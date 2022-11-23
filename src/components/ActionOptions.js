import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import Iconify from 'src/components/Iconify';
import { styled } from '@mui/material/styles';

import { 
  Menu, 
  MenuItem, 
  IconButton, 
  ListItemIcon, 
  ListItemText,
} from '@mui/material';

const LinkToEdit = styled(Link)(({ theme }) => ({
    width: '100%',
    display: 'inherit',
    color: 'inherit',
    textDecoration: 'inherit',
}));

const ActionOptions = (props) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openDialog, setOpenDialog] = React.useState({
    status: false, 
    id: null 
  });
  const {delete_id, edit_url, show_url, extra_url} = props;

  useEffect(() => {
    props.deleteAction(openDialog)
    setIsOpen(false)
  }, [openDialog])

  return(
    <>
    <IconButton ref={ref} onClick={() => setIsOpen(true)}>
      <Iconify icon="eva:more-vertical-fill" />
    </IconButton>

    <Menu
      open={isOpen}
      anchorEl={ref.current}
      onClose={() => setIsOpen(false)}
      PaperProps={{
        sx: { width: 200, maxWidth: '100%' }
      }}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      {delete_id !== undefined ? 
      <MenuItem sx={{ color: 'text.secondary' }} 
        onClick={() => setOpenDialog({ status: true, id: delete_id })}>
        <ListItemIcon>
        <Iconify icon="eva:trash-2-outline" />
        </ListItemIcon>
        <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
      </MenuItem>
      : '' }

      {edit_url !== undefined ? 
      <MenuItem sx={{ color: 'text.secondary' }}>
        <LinkToEdit to={edit_url}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" sx={{fontSize : 20}}/>
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </LinkToEdit>
      </MenuItem>
      : '' }

      {show_url !== undefined ? 
      <MenuItem sx={{ color: 'text.secondary' }}>
        <LinkToEdit to={show_url}>
          <ListItemIcon>
            <Iconify icon="clarity:eye-line" sx={{fontSize : 22}} />
          </ListItemIcon>
          <ListItemText primary="Show" primaryTypographyProps={{ variant: 'body2' }} />
        </LinkToEdit>
      </MenuItem>
      : '' }

      {extra_url !== undefined ? 
        <MenuItem sx={{ color: 'text.secondary' }}>
          <LinkToEdit to={extra_url.url}>
            <ListItemIcon>
              <Iconify icon={extra_url.icon} sx={{fontSize : 22}} />
            </ListItemIcon>
            <ListItemText primary={extra_url.name} primaryTypographyProps={{ variant: 'body2' }} />
          </LinkToEdit>
        </MenuItem>
        : '' }

      </Menu>
    </>
  )
}

export default ActionOptions;