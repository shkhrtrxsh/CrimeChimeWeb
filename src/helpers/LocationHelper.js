import React, { useState, useEffect, useRef } from 'react';

export const CurrentLocationCoordinates = () => {

    const [position, setPosition] = useState({
        lat: positionLatitude,
        lng: positionLongitude
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

    useEffect(() => {
        if(position.lat === positionLatitude && position.lng === positionLongitude){
            setTimeout(function(){
                setPosition(currentLocation)
                // console.log("GPS with time out")
            },500)

            // console.log("GPS")
            
        }

    }, [currentLocation])

    useEffect(() => {
        if(currentLocation.lat === 0 && currentLocation.lng === 0){
            setTimeout(function(){
                setPosition({
                    lat: positionLatitude,
                    lng: positionLongitude
                })
                // console.log("No GPS with time out")
            },1000)
            
            // console.log('No GPS')
        }
    }, [])

    return position;
}

export const positionLatitude = -26.2041028;

export const positionLongitude = 28.0473051;


export const mapSettings =  {
    // zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
}