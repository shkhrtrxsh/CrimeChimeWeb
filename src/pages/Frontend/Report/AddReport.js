import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { 
    Paper, 
    Button, 
    Stack, 
    Container } from '@mui/material'
import Map from './Map';
import ReportForm from './ReportForm';



const PaperStyle = styled(Paper)(({ theme }) => ({

}));
  

const AddReport = () => {    

    return (
        <PaperStyle>
            <Container>
                <Stack direction="row" spacing={2}>
                    <ReportForm />
                    <Map />
                </Stack>
            </Container>
            
            {/* <Map /> */}
        </PaperStyle>
    );
}

export default AddReport
