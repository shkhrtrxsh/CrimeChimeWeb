import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
// const ScriptLoaded = require("../../docs/ScriptLoaded").default;

const mapContainerStyle = {
  height: "400px",
  width: "800px"
}

const center = {
  lat: 38.685,
  lng: -115.234
}

const AutoComplete = () => {
    const [autocomplete, setAutocomplete] = useState(null);
    // const [onLoad, setOnLoad] = useState(null);
    // const [onPlaceChanged, setOnPlaceChanged] = useState(null);
//   constructor (props) {
//     super(props)

//     this.autocomplete = null

//     this.onLoad = this.onLoad.bind(this)
//     this.onPlaceChanged = this.onPlaceChanged.bind(this)
//   }

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete)
    console.log('autocomplete: ', autocomplete)
  }

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      console.log(autocomplete.getPlace())
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

    return (
    <LoadScript
        googleMapsApiKey="AIzaSyApoj80RTzWkAIc_eswUmPogeoufErlNaw"
    >
        <GoogleMap
          id="searchbox-example"
          mapContainerStyle={mapContainerStyle}
          zoom={2.5}
          center={center}
        >
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
          />
            {/* <input
              type="text"
              placeholder="Customized your placeholder"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px"
              }}
            /> */}
          {/* </Autocomplete> */}
        </GoogleMap>
    </LoadScript>
    )
}

export default AutoComplete