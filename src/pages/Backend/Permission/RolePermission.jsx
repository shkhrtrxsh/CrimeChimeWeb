import React, { Fragment, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showRolePermission, updateRolePermission} from 'src/store/api/permission';
import { showRole } from 'src/store/api/role';
// import { makeStyles } from '@mui/styles';
import {useParams } from 'react-router-dom';
import GivePermission from './components/GivePermission'
import Iconify from 'src/components/Iconify';
import BreadcrumbNavigator from 'src/components/BreadcrumbNavigator'

import {
  Container, 
  Stack, 
  Typography,
  Button, 
  Grid,
  Card
} from '@mui/material';

export default function RolePermission() {
  const dispatch = useDispatch();
  const params = useParams();
  const { role } = useSelector((state) => ({ ...state.role }));
  const { permissions } = useSelector((state) => ({ ...state.permission }));
  const permissionChanges = {};

  useEffect(() => {
    const id = params.slug
    const by = 'slug';
    dispatch(showRole({id, by}))

    dispatch(showRolePermission({id}))

  },[params]);

  const changePermissionFunc = (changes, id, status) => {
    if(changes == true){
      permissionChanges[id] = status;
    }
  }

  const savePermissionChanges = () => {
    const formValue = { permission:permissionChanges }
    dispatch(updateRolePermission({formValue}));
  }

  const breadcrumbNavigate = [
    {
      name : "Role",
      link :  "/role"
    }
  ]
  
  return (
    <Fragment>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <BreadcrumbNavigator
          navigate={breadcrumbNavigate} 
          currentPage={role && role.name+" Permission List"}
          sx={{ marginBottom: 5 }}
        />
        <Button 
          variant="contained" 
          startIcon={<Iconify icon="fluent:save-28-regular" />}
          size="large"
          onClick={savePermissionChanges}
        >
          Save
        </Button>
      </Stack>
      
      
      {permissions.data && permissions.data.map((permission) => (
        <Card sx={{
          padding:'30px',
          marginBottom: '30px'
        }}>
          <Grid container key={permission.id}>
            <Grid item xs={10}>
              <Typography variant="h6">  
                {permission.name}
              </Typography>
            </Grid>
            {permission.permissions && permission.permissions.map((option) => (          
              <GivePermission 
                permission={option} 
                key={option.id} 
                changePermissionFunc={changePermissionFunc}
              />
            ))}    
          </Grid>
        </Card>    
      ))}
      
      <Grid container sx={{marginBottom: '30px'}}>
        <Grid item xs={10}>
          
        </Grid>
      </Grid>
    </Fragment>
  );
}
