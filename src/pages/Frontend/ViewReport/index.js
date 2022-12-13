import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { 
    Paper, 
    Button, 
    Stack, 
    Container } from '@mui/material'
import ViewReportMap from './ViewReportMap';



const PaperStyle = styled(Paper)(({ theme }) => ({

}));
  

const ViewReport = () => {    

    return (
        <ViewReportMap />
    );
}

export default ViewReport
