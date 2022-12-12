import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker} from '@react-google-maps/api';
import { alpha, styled, useTheme } from '@mui/material/styles';
import {
    Stack,
    Container,
    Typography,
    Card,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSelector, useDispatch } from 'react-redux';
import { getReportByArea } from 'src/store/api/report';
import * as Yup from 'yup';
import "yup-phone";

import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import { SaveButton } from 'src/components/Button';
import { DRAWER_WIDTH, APPBAR_MOBILE, APPBAR_DESKTOP} from 'src/constants/theme'
import UploadImage from 'src/components/UploadImage';
import GoogleAutoComplete from 'src/components/GoogleMap/GoogleAutoComplete';



const containerStyle = {
    width: '100%',
    height: `calc(100vh - ${APPBAR_DESKTOP}px)`
};

const PaperStyle = styled(Card)(({ theme }) => ({
    // padding:'.5rem',
    boxShadow: `${theme.shadows[3]} !important`,
    borderRadius: Number(theme.shape.borderRadius),
    '& .MuiPaper-root.MuiPaper-elevation': {
        boxShadow: 'none'
    }
}));

const ImageIcon = styled('img')(({ theme }) => ({
    width: '25px'
}));

const CrimeFormControl = styled(FormControl)(({ theme }) => ({
    '& .MuiSelect-select.MuiSelect-outlined': {
        // padding: '10.5px 14px'
    },
    '& .MuiSelect-select.MuiSelect-outlined .MuiListItemIcon-root': {
        float: 'left',
        minWidth: '40px',
        marginTop: '5px'
    }
}));

const ContentStyle = styled('div')(({ theme }) => ({
    width: 480,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
}));

const HeaderStyle = styled('div')(({ theme }) => ({
    margin: '2rem 2rem .6rem 2rem'
}));


const DetailReport = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();


}

export default DetailReport;