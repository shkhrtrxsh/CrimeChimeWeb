import { useEffect, useState } from 'react'
import * as Yup from 'yup';
import {useNavigate, useParams } from 'react-router-dom';
// material
import {
  Stack,
  TextField,
  Container,
  Typography,
  Button,
  Grid,
  Box
} from '@mui/material';

// ----------------------------------------------------------------------

export default function EditPermissionFileds(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { route } = props
  const [changes, setChanges] = useState(false);
  const [routeChanges, setRouteChanges] = useState(null);

  const [newValue, setNewValue] = useState({
    "url": null,
    "api": null,
    "name": null
  });


  const handleChangeFun = (event)=>{
    setNewValue({
      ...newValue,
      [event.target.name]: event.target.value
    });
    setChanges(true)

  }

  useEffect(() => {
    props.changePermissionFunc(route.id, newValue.name, newValue.api, newValue.url, changes)
  }, [newValue])

  return (    
    <Grid container spacing={3} style={{paddingTop:30}} key={route.id}>
      <Grid item xs={3}>
        <TextField
          fullWidth
          placeholder="Ex: Create OR Update"
          label="Permission Name"
          name="name"
          color="form"
          value={newValue.name ? newValue.name : route.name}
          onChange={handleChangeFun}
          // error={Boolean(touched.route && errors.route)}
          // helperText={touched.route && errors.route}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          fullWidth
          placeholder="Ex: /role/permission"
          label="URL"
          name="url"
          color="form"
          value={newValue.url ? newValue.url : route.url}
          onChange={handleChangeFun}
          // error={Boolean(touched.url && errors.url)}
          // helperText={touched.url && errors.url}
        />
      </Grid>
      <Grid item xs={5}>
        <TextField
          fullWidth
          placeholder="Ex: /role/permission"
          label="API"
          name="api"
          value={newValue.api ? newValue.api : route.api}
          onChange={handleChangeFun}
          color="form"
          InputProps={{
            endAdornment: (
              <Typography component="h6" 
                sx={{fontSize:'14px', color:'#F23E4D'}}
              >
                {route.method}
              </Typography>
            ),
          }}
          // error={Boolean(touched.url && errors.url)}
          // helperText={touched.url && errors.url}
        />
      </Grid>
    </Grid>
  );
}
