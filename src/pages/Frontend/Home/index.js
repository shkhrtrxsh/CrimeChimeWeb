import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Paper, Button } from '@mui/material'
import HomeMap from './HomeMap';
// import MyGoogleMap from '../MyGoogleMap';



const PaperStyle = styled(Paper)(({ theme }) => ({

}));
  

const Home = () => {    

    return (
        <PaperStyle>
            <HomeMap />
        </PaperStyle>
    );
}

export default Home
