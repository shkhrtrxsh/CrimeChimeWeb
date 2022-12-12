// routes
import Router from './routes';
import { useState } from 'react';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {useJsApiLoader } from '@react-google-maps/api';
import './style.css'

// ----------------------------------------------------------------------

export default function App() {

  const [libraries] = useState(['places'])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyApoj80RTzWkAIc_eswUmPogeoufErlNaw",
    libraries: libraries,
  })

    if (!isLoaded) {
        return 'is loaded'
    }

  return (
    <ThemeProvider>
      <ToastContainer />
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
