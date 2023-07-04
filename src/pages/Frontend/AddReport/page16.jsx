import React, { useEffect, useState} from 'react';
import { Container, Typography,useTheme, Grid, Box, Select, MenuItem, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useDispatch, useSelector } from 'react-redux';
import { setLock, setPage,  } from 'src/store/reducers/registerReport';
import { objectToFormData } from 'src/utils/formatObject';
import API from 'src/config/api';
import police from '../../../assets/images/police.png'
import ProgressBar from 'src/layouts/Report/ProgressBar';
import { useNavigate } from 'react-router-dom';

export const SubmitDialog = ({open,handleClose,confirm,onClickEvent})=>{
  const [disable, setDisable] = useState(false)
  
  const navigate = useNavigate();
  const handleSuccess = ()=>{
    handleClose();
    navigate("/");
  }
  return(
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">
          {confirm?"Success":"Submit Report"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirm?"Report Submitted Successfully":"Are you sure you want to report the crime?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={disable} onClick={confirm?handleSuccess:handleClose}>{confirm?"OK":"Cancel"}</Button>
          {!confirm&&<Button disabled={disable} onClick={()=>{
            setDisable(true);
            onClickEvent();
            setDisable(false);}} autoFocus>
            {disable?"Submitting...":"OK"}
          </Button>}
        </DialogActions>
      </Dialog>
  )
}

const Page16 = ({selectActive,setActiveStep}) => {
  const theme = useTheme();
  const register = useSelector(state=>state.reportRegister);
  const {data:value,lock}=register;
  const {police_reporting,reported_to_the_police,police_case_num}=value;
  const dispatch = useDispatch();
  const [error, setError] = useState("")

  const setValue=(value)=>dispatch(setPage(value));

  const handleChange = (event) => {
    const {name,value:val} = event.target;
    setValue({...value,[name]:val});
  };



  

  useEffect(()=>{
    if(police_case_num||reported_to_the_police===2){
      dispatch(setLock(false));
      setError("")
    }else if(reported_to_the_police===1){
      dispatch(setLock(true));
      setError("*required")
    }
  },[police_case_num,reported_to_the_police])
  

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Container>
            <Grid container spacing={2} justifyContent="center" sx={{ paddingY: 0 }}>
              <Grid item xs={10} sx={{ pt: 5 }}>
              <Box display="flex" alignItems="center" justifyContent="center" paddingTop='10%'>
              <Box borderBottom={2} borderColor={theme.palette.warning.main} style={{ marginRight: '5px', width: '20px' }} />
              <Typography variant="h1" align="center" style={{ fontWeight: 'bold', paddingBottom: '5px', fontSize: '24px' }}>
                  Police Reporting
                </Typography>
                <Box borderBottom={2} borderColor={theme.palette.warning.main} style={{ marginLeft: '5px', width: '20px' }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px' }}>
      <img src={police} alt="Vehicle Theft" style={{ height: '100px' }} />
    </Box>
              </Grid>

              <Grid item xs={10}>
                <Box sx={{ display: 'flex', flexDirection: 'column',paddingTop:'15%' }}>
                  <Box sx={{ display: 'flex',alignItems:'center',paddingTop:'10px'  }}>
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px:1, textAlign: 'left' }}>
                      Did the police attend the scene of crime?
                    </Typography>
                    <Select name="police_reporting" value={value.police_reporting!==null?value.police_reporting:""} onChange={handleChange} sx={{ paddingX: 2,width:'95%',maxWidth:'310px',height:"50px" }}>
                      <MenuItem value={0}>Yes</MenuItem>
                      <MenuItem value={1}>No</MenuItem>
                      <MenuItem value={2}>Unknown</MenuItem>
                    </Select>
                  </Box>

                  <Box sx={{ display: 'flex',alignItems:'center',mt:3,paddingTop:'10%',paddingBottom:'10%'   }}>
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 1,  textAlign: 'left' }}>
                      Was the crime formally reported to the police?
                    </Typography>
                    <Select value={value.reported_to_the_police!==null?value.reported_to_the_police:""} name="reported_to_the_police" onChange={handleChange} sx={{ paddingX: 2,width:'95%',maxWidth:'310px', height:"50px" }}>
                      <MenuItem value={1}>Yes</MenuItem>
                      <MenuItem value={2}>No</MenuItem>
                    </Select>
                  </Box>

                  <Box sx={{ display: 'flex',mt:2,alignItems:"center",paddingTop:'10px'  }}>
                    <Typography variant="h6" sx={{ fontWeight: 'normal', px: 1,  textAlign: 'left' }}>
                      Please Specify the Case Number
                    </Typography>
                    <TextField name="police_case_num" variant="outlined" onChange={handleChange} value={value?.police_case_num||""} disabled={value.reported_to_the_police===2} error={error?true:false} helperText={error}/>
                  </Box>

                </Box>
              </Grid>
            </Grid>
          </Container>
    </LocalizationProvider>
  );
};

export default Page16;
