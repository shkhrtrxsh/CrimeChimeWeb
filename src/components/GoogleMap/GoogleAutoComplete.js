import React, { useState, useEffect, useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import {
    TextField,
} from '@mui/material';


const GoogleAutoComplete = (props) => {

    const [autocomplete, setAutocomplete] = useState(null);
    const [placeId, setPlaceId] = useState(null);
    const [address, setAddress] = useState(null);
    const [inputValue, setInputValue] = useState('')
    
    const [position, setPosition] = useState({
        lat: 0,
        lng: 0
    })

    const [currentLocation, setCurrentLocation] = useState({
        lat: 0,
        lng: 0
    })

    function showPosition(position) {
        setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
    }
    navigator.geolocation.getCurrentPosition(showPosition)

    const searchLocation = useRef()

    const onLoad = (auto) => {
        setAutocomplete(auto)
    }

    const onPlaceChanged = () => {
        const place = autocomplete.getPlace();
        if(place != null){
            console.log(place)
            setPosition({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            })
            
            setAddress(place.formatted_address)
            setPlaceId(place.place_id)
        }    
    }

    useEffect(() => {
        if(position.lat === 0 && position.lng === 0){
            setPosition(currentLocation)
        }

        setTimeout(function(){
            props.googleAutoComplete(position.lat, position.lng, placeId, address)
        }, 500)

        
    }, [position])

    // useEffect(() => {
    //     setInputValue(props.value)
    // }, [])

    const InputValueHandler = (e) => {
        // setTimeout(function(){  
        //     setInputValue(e.target.value)
        //     console.log(e.target.value)
        // }, 5000)
        
    }


    return (
        <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
        >
            <TextField
                id="outlined-basic"
                label="Search Location"
                variant="outlined"
                fullWidth
                ref={searchLocation}
                // value={inputValue}
                // onChange={InputValueHandler}
            />
        </Autocomplete>
    )
}

export default GoogleAutoComplete;