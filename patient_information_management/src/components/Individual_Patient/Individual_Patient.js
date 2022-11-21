import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

function Individual_Patient(props)
{
    const location = useLocation();
//    console.log("location is " + location)
//    console.log(location)
    console.log(location.state.person)
    return (<h2>Individual Patient {location.state.person["firstName"]}</h2>)
}

export default Individual_Patient;