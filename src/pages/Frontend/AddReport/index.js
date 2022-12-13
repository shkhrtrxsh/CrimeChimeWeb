import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { 
    Paper, 
    Button, 
    Stack, 
    Container } from '@mui/material'
import AddReportMap from './AddReportMap';



const PaperStyle = styled(Paper)(({ theme }) => ({

}));
  

const AddReport = () => {    

    return (
        <AddReportMap />
    );
}

export default AddReport
