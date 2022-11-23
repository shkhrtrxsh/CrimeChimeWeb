import { useEffect, useState, Fragment } from 'react'
import * as Yup from 'yup';
import {useNavigate, useParams } from 'react-router-dom';
import { editPermission, showPermission } from 'src/store/api/permission';
import EditPermissionFileds from './components/EditPermissionFileds';
import BreadcrumbNavigator from 'src/components/BreadcrumbNavigator'
// material
import {
  Stack,
  TextField,
  Container,
  Typography,
  Button,
  Grid,
  Card
} from '@mui/material';
import { SaveButton } from 'src/components/Button'
import Iconify from 'src/components/Iconify';
import { useDispatch, useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export default function EditPermission() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [routeChanges, setRouteChanges] = useState(null);
  const [newValue, setNewValue] = useState({
    "name": null
  });
  const permissionChanges = {};

  const changePermissionFunc = (id, name, api, url, changes)=>{
    if(changes == true){
      permissionChanges[id] = {
        "id"    : id,
        "name"  : name,
        "url"   : url,
        "api"   : api
      }
    }

  }

  const { permission } = useSelector((state) => ({ ...state.permission }));

  const saveChanges = () => {
    
    const formValue = {
      "id" : permission.id,
      "name": newValue.name ? newValue.name : permission.name,
      "routes" : permissionChanges
    }

    dispatch(editPermission({formValue, navigate}))
  }

  const handleChange = (event)=>{
    setNewValue({
      ...newValue,
      [event.target.name]: event.target.value
      
    });
  }

  useEffect(() => {
    const id = params.id
    dispatch(showPermission({id}))
  }, [])

  const breadcrumbNavigate = [
    {
      name : "permission",
      link :  "/permission"
    }
  ]

  return (
    <Fragment >
      <BreadcrumbNavigator 
        navigate={breadcrumbNavigate} 
        currentPage="Edit Permission"
      />
      <Card>
        <Container sx={{ margin:'2rem 0' }}>
          <Grid container spacing={3}>
            <Grid item xs={7}>
              <TextField
                fullWidth
                id="name"
                placeholder="Ex: User Module"
                label="Module Name"
                name="name"
                color="form"
                value={newValue.name ? newValue.name : permission ? permission.name : ''}
                onChange={handleChange}
              />
            </Grid> 
          </Grid>                     
          {permission && permission.permissions.map((route, index) => (
            <EditPermissionFileds 
              route={route} 
              key={route.id} 
              changePermissionFunc={changePermissionFunc}
            />
          ))}
          <Grid container spacing={3} style={{paddingTop:40}}> 
            <Grid item xs={6}>
              <SaveButton onClick={saveChanges}>
                Save
              </SaveButton>
            </Grid>
          </Grid>
        </Container>
      </Card>

    </Fragment>
  );
}
