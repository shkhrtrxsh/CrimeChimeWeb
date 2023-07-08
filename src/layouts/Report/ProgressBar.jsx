import { useTheme } from '@emotion/react';
import { Box, Divider, LinearProgress, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NextButton from 'src/components/Button/NextButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { loadGoogleMaps } from 'src/utils/googleMap';

const Progress = ({ activeStep }) => {
  const totalSteps = 15;
  const progress = (activeStep / totalSteps) * 100;

  return <LinearProgress variant="determinate" value={progress} />;
};

const ProgressBar = ({
  activeStep,
  beforeNext = null,
  beforeBack = null,
  nextLink = null,
  backLink = null,
  setActiveStep,
  cancelState,
  lock,
  submit,
  textNext=null,
  textBack=null
}) => {
  const [cancel, setCancel] = cancelState || [];
  const theme = useTheme();
  const isMdBreakpoint = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();

  const handleCancel = () => {
    // Redirect to the home page
    navigate('/');
  };

  return (
    <Box id="progress_bar"
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: isMdBreakpoint ? 'start' : 'center',
        alignItems: 'start',
        width: isMdBreakpoint ? '42.9%' : '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#ffe600',
          color: 'black',
          padding: '12px',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: useMediaQuery(theme.breakpoints.up('md')) ? '33.3%' : '30%' }}>
          {backLink ? (
            <NextButton beforeNext={lock ? null : () => beforeBack()} textValue={textBack||"GO BACK"} />
          ) : (
            <Typography sx={{ cursor: 'pointer' }} variant="h6" onClick={handleCancel}>
              CANCEL
            </Typography>
          )}
        </Box>
        <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: useMediaQuery(theme.breakpoints.up('md')) ? '33.3%' : '20%' }}>
          <Typography variant="h6" sx={{ cursor: 'default' }}>#{activeStep}/17</Typography>
        </Box>
        <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: useMediaQuery(theme.breakpoints.up('md')) ? '33.3%' : '20%' }}>
          <NextButton textValue={textNext||(submit ? 'SUBMIT' : 'NEXT')} beforeNext={lock ? null : () => { beforeNext && beforeNext()}} />
        </Box>
        {!isMdBreakpoint && (
          <>
            <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', marginLeft: '8px', marginRight: '8px' }} />
            <Box sx={{ display: 'flex', mx: 0, justifyContent: 'center', alignItems: 'center', width: '30%' }} onClick={() => { setCancel(false); }}>
              <LocationOnIcon />
              <Typography sx={{ cursor: 'pointer', textDecoration: 'underline' }} variant="h8">
                VIEW MAP
              </Typography>
            </Box>
          </>
        )}
      </Box>
      <Progress activeStep={activeStep} />
    </Box>
  );
};

export default ProgressBar;

