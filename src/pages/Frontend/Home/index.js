import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Paper, Button } from '@mui/material'
import Map from './Map';



const PaperStyle = styled(Paper)(({ theme }) => ({

}));
  

const Home = () => {    

    return (
        <PaperStyle>
            <Map />
        </PaperStyle>
    );
}

export default Home
