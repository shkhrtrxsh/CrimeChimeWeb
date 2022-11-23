import React, {Fragment} from 'react'
import * as Yup from 'yup';
import {useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addPermission } from 'src/store/api/permission';
import { SaveButton } from 'src/components/Button'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField, RHFCheckbox } from 'src/components/hook-form';
import BreadcrumbNavigator from 'src/components/BreadcrumbNavigator'
// material
import {
  Stack,
  TextField,
  Container,
  Typography,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Box
} from '@mui/material';

// ----------------------------------------------------------------------

export default function AddPermission() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [morePermission, setMorePermission] = React.useState(false);
  const [permissionState, setPermissionState] = React.useState({
    read: false,
    create: false,
    update: false,
    delete: false,
  });

  const morePermissionFunc = (event) => {
    setMorePermission(event.target.checked);
  }

  const handlePermissionChange = (event) => {
    setPermissionState({
      ...permissionState,
      [event.target.name]: event.target.checked,
    });
  };

  const PermissionSchema = Yup.object().shape({
    name: Yup.string().required('Permission is required'),
    route: Yup.string().required('Route is required')
  });

  const defaultValues = {
    name: '',
    route: '',
    rrr: ''
  };

  const methods = useForm({
    resolver: yupResolver(PermissionSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (formValue) => {
    formValue.permission = permissionState
    dispatch(addPermission({formValue, navigate}))
  };
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
        currentPage="Add Permission"
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={7}>
              <RHFTextField name="name" label="Permission Module Name" />
            </Grid>
            <Grid item xs={7}>
              <RHFTextField name="route" label="Permission Route" />
            </Grid>
            <Grid item xs={7}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={morePermission} 
                      onChange={morePermissionFunc}
                      name="read"
                    />
                  }
                  label="Add Permissions"
                />
              </FormGroup>
            </Grid>
            { morePermission == true ?
            <Grid item xs={7}>
              <Grid container>
                <Grid item xs={5}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={permissionState.read} 
                          onChange={handlePermissionChange}
                          name="read"
                        />
                      }
                      label="Read"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={permissionState.create} 
                          onChange={handlePermissionChange}
                          name="create"
                        />
                      }
                      label="Create"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={5}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={permissionState.update} 
                          onChange={handlePermissionChange}
                          name="update"
                        />
                      }
                      label="Update"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={permissionState.delete} 
                          onChange={handlePermissionChange}
                          name="delete"
                        />
                      }
                      label="Delete"
                    />
                  </FormGroup>
                </Grid> 
              </Grid>
            </Grid> : ''
            }            
            <Grid item xs={6}>
              <SaveButton type="submit">
                Save
              </SaveButton>
            </Grid>
          </Grid> 
      </FormProvider>
    </Fragment>
  );
}
