import React, { useContext, useEffect, useRef, useState } from 'react'
import "./Map.css"
import Loader from '../../../Loader/Loader';
import { Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { BiSearch } from "react-icons/bi"
import { PropertyContext } from '../../../../context/PropertyContext';

const AddPropertyDetailsMap = () => {
    const [isMapShow, setIsMapShow] = useState(false);
    const {initMap} = useContext(PropertyContext);

    useEffect(() => {
        // Load the Google Maps API
        const script = document.createElement('script');
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCWBr0Oe8wbx8_a9pnY2ljNMY69YIff45g&libraries=places&callback=initMap";
        // script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        // Initialize the map in the callback function (initMap)

        setTimeout(() => {
            initMap(false,"","");
            setIsMapShow(true)
        }, 2500)


        return () => {
            // Clean up the script when the component unmounts
            document.head.removeChild(script);
        };
    }, []);


    


    return (
        <section>
            <div id="addPropertyMap"></div>
            {/* <div id="info-window">
                <h3 id="house-title"></h3>
                <p id="house-description"></p>
            </div> */}
            {
                !isMapShow && <Loader />
            }
        </section>
    )
}

export default AddPropertyDetailsMap