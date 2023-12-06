import * as Yup from 'yup';
import { useState, useEffect, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
import { addCorporate, updateCorporate } from 'src/store/api/corporate';
import { SaveButton } from 'src/components/Button';
import { slugConvertor } from 'src/helpers/StringHelper';
import Iconify from 'src/components/Iconify';
import { listIndustryType } from 'src/store/api/corporate';

import {
  Grid,
  Button,
  IconButton,
  InputAdornment,
  FormControl,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  Box,
  Typography,
  Paper,
} from '@mui/material';

import BreadcrumbNavigator from 'src/components/BreadcrumbNavigator';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { list } from 'postcss';
import { showCorporate } from 'src/store/api/corporate';
export default function EditCorporate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [industryType, setIndustryType] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const params = useParams();
  const listData = useSelector((state) => state?.industrytypelist.industryTypes);
  const UserSchema = Yup.object().shape({
    corporate_name: Yup.string().required('Corporate Name is required'),
    address: Yup.string().required('Address is required'),
    user_name: Yup.string().required('Username is required'),
    corpgroup_mailing_address: Yup.string().email('Invalid email address').required('Corporate Mail is required'),
   corp_group_branch: Yup.string().required('Corporate Branch is required'),
     phone: Yup.string().required('Phone is required'),
     email: Yup.string().email('Invalid email address').required('Email is required'),
    // logo: Yup.mixed().test('file', 'Please upload a logo', (value) => !!value),
  });
  

  useEffect(() => {
    dispatch(listIndustryType({}));
  }, []);

  const handleChangeIndustryType = (event) => {
    setIndustryType(event.target.value);
  };

  const defaultValues = {
    corporate_name: '',
    address: '',
    user_name: '',
    phone: '',
    email: '',
    corpgroup_mailing_address: '',
    corp_group_branch: '',
    corp_group_branch_phone: ''
  };

  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });


  const {
    handleSubmit,
    formState: { isSubmitting },
    setValue
  } = methods;
  const handleChangeLogo = (event) => {
    const file = event.target.files[0];
    setLogoFile(file);
  };

  const onSubmit = (formValue) => {
    formValue.industry_types_id = industryType;
    formValue.logo = logoFile;
    // formValue.slug = slugConvertor(formValue.corporate_name);
    dispatch(updateCorporate({ formValue, navigate }));
  };

  const breadcrumbNavigate = [
    {
      name: 'corporate',
      link: '/corporate',
    },
  ];
  
  const corporateData = useSelector((state) => state?.corporate?.data);

  // useEffect(() => {
  //   dispatch(showCorporate({}));
  // }, []);
  useEffect(()=>{
    const id = params.id
    dispatch(showCorporate())
  }, [params])
  useEffect(()=>{
    corporateData.map((item)=>{
      if(item.id == params.id){
        setValue("corporate_name", item?.name != null ? item?.name : '')
        setValue("address", item?.address != null ? item?.address : '')
        setValue("user_name", item?.cor_admin.name != null ? item?.cor_admin.name : '')
        setValue("phone", item?.cor_admin.phone != null ? item?.cor_admin.phone : '')
        setValue("email", item?.cor_admin.email != null ? item?.cor_admin.email : '')
        setValue("corpgroup_mailing_address", item?.corp_group_mailing_address != null ? item?.corp_group_mailing_address : '')
        setValue("corp_group_branch", item?.corp_group_branch != null ? item?.corp_group_branch : '')
        setValue("corp_group_branch_phone", item?.corp_group_branch_phone != null ? item?.corp_group_branch_phone : '')

        const urlParts = item.logo.split('/');
        const imageName = urlParts[urlParts.length - 1];
        setLogoFile({name:imageName})
        setIndustryType(item.industry.name)
        // dispatch(getRoles({}))
        // const value = [];
        // user.roles.forEach(element => {          
        //   value.push(element.name);
        // });
        // setUserRole(value);
      }
    })
  }, [corporateData])
  return (
    <Fragment>
      <BreadcrumbNavigator navigate={breadcrumbNavigate} currentPage="Update Corporate/Group" />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" style={{padding:"0 0 20px 0"}} >Corporate/Group Details</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <RHFTextField name="corporate_name" label="Corp./Group Name" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="industry-type-label">Industry Type</InputLabel>
              <Select
                labelId="industry-type-label"
                id="industry-type"
                value={industryType}
                label="Industry Type"
                onChange={handleChangeIndustryType}
              >
                {listData.map((item) => (
                  <MenuItem key={item[1]} value={item[0]}>
                    {item[1]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* will remove billo field */}
          {/* <Grid item xs={12} sm={6}>
            <RHFTextField name="corpgroup_mailing_address" label="Corp./Group Mailing Address" />
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <RHFTextField name="corp_group_branch_phone" label="Corp./Group Branch Phone Number" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RHFTextField name="address" label="Corp./Group Mailing Address" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RHFTextField name="corp_group_branch" label="Corp./Group Branch" />
          </Grid>
          <Grid item xs={12} sm={12} >
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="subtitle2">Logo</Typography>
              <input
                type="file"
                accept="image/*"
                id="logo-file"
                style={{ display: 'none' }}
                onChange={handleChangeLogo}
              />
              <label htmlFor="logo-file">
                <Button component="span" color="primary" variant="outlined">
                  Upload Logo
                </Button>
                {logoFile && <span>{logoFile.name}</span>}
              </label>
            </Paper>
          </Grid>

          <Typography variant="h4" style={{padding:"30px 0 0 24px "}}>Key Contact at Corp./Group (Providing associated mobile numbers)</Typography>
          <Grid item xs={12} sm={6}>
            <RHFTextField name="user_name" label="Name" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RHFTextField name="phone" label="Mobile Number" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RHFTextField name="email" label="Email Address" type="email" />
          </Grid>
          
          <Grid item xs={12}>
            <SaveButton type="submit">Save</SaveButton>
          </Grid>
        </Grid>
      </FormProvider>
    </Fragment>
  );
}
