import React, {Fragment} from 'react'
import * as Yup from 'yup';
import {useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addPermissionModule } from 'src/store/api/permission-module';
import { SaveButton } from 'src/components/Button'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField, RHFCheckbox } from 'src/components/hook-form';
import BreadcrumbNavigator from 'src/components/BreadcrumbNavigator'
// material
import {
  Grid,
} from '@mui/material';

// ----------------------------------------------------------------------

export default function AddPermissionModule() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const PermissionModuleSchema = Yup.object().shape({
    name: Yup.string().required('Permission Module is required'),
    module_api: Yup.string().required('Route is required')
  });

  const defaultValues = {
    name: '',
    module_api: '',
  };

  const methods = useForm({
    resolver: yupResolver(PermissionModuleSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (formValue) => {
    dispatch(addPermissionModule({formValue, navigate}))
  };
  const breadcrumbNavigate = [
    {
      name : "Permission Module",
      link :  "/permission-module"
    }
  ]

  return (
    <Fragment >
      <BreadcrumbNavigator 
        navigate={breadcrumbNavigate} 
        currentPage="Add Permission Module"
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={7}>
              <RHFTextField name="name" label="Permission Module Name" />
            </Grid>
            <Grid item xs={7}>
              <RHFTextField name="module_api" label="Permission Module API" />
            </Grid>        
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
