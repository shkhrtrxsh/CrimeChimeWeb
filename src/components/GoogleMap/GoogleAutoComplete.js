import React, { useState, useEffect, useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { positionLatitude, positionLongitude } from 'src/helpers/LocationHelper';
import axios from 'axios';
import {
    TextField,
} from '@mui/material';


const GoogleAutoComplete = (props) => {

    const [autocomplete, setAutocomplete] = useState(null);
    const [placeId, setPlaceId] = useState(null);
    const [address, setAddress] = useState(null);
    const [inputValue, setInputValue] = useState("")
    const [allPlaceData, setAllPlaceData] = useState(null)
    const [position, setPosition] = useState({
        lat: positionLatitude,
        lng: positionLongitude
    })

    const [currentLocation, setCurrentLocation] = useState({
        lat: positionLatitude,
        lng: positionLongitude
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
        console.log(auto)
        setAutocomplete(auto)
    }

    const onPlaceChanged = () => {
        const place = autocomplete.getPlace();
        if(place != null){
            setAllPlaceData(place)
            // place.geometry.viewport.Ia.hi
            // place.geometry.viewport.Ia.lo
            // place.geometry.viewport.Wa.hi
            // place.geometry.viewport.Wa.lo
            setPosition({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            })
            
            setAddress(place.formatted_address)
            setPlaceId(place.place_id)
            setInputValue(place.formatted_address)
            console.log(position)
        }    
    }

    useEffect(() => {
        if(position.lat === positionLatitude && position.lng === positionLongitude){
            setPosition(currentLocation)
        }

        setTimeout(function(){
            props.googleAutoComplete(position.lat, position.lng, placeId, address, allPlaceData)
        }, 500)
    }, [position])


    useEffect(() => {
        if(props.formattedAddress !== null){
            setInputValue(props.formattedAddress)
            setAddress(props.formattedAddress)
        }
    }, [props.formattedAddress])

    useEffect(() => {
        if(props.formattedAddress !== null){
            setInputValue(props.oldAddress)
            setAddress(props.oldAddress)
        }
    }, [props.oldAddress])

    const InputValueHandler = (e) => {
            setInputValue(e.target.value)
            console.log(e.target.value)
        
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
                value={inputValue}
                onChange={InputValueHandler}
            />
        </Autocomplete>
    )
}

export default GoogleAutoComplete;