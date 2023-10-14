import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { errorNotify, successNotify } from "../Toastify/Toastify";
import { useNavigate } from "react-router-dom";


// context create 
const PropertyContext = createContext({});

// provider
const PropertyContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)               // normal loading
    const [isSearchLoading, setIsSearchLoading] = useState(false)               // normal loading
    const [propertyDetail, setPropertyDetail] = useState({})
    const [allClientsDetail, setAllClientsDetail] = useState([])
    const [contractDetail, setContractDetail] = useState([])
    const [allPropertyListing, setAllPropertyListing] = useState([])
    const [allPropertySearchListing, setAllPropertySearchListing] = useState([])
    const [searchProperties, setSearchProperties] = useState([{}])
    const [tableListing, setTableListing] = useState([])
    const [checkedProperties, setCheckedProperties] = useState([])
    const [isChecked, setIsChecked] = useState(false)
    const [allNotifications, setAllNotifications] = useState([])


    let [displayMapObj, setDisplayMapObj] = useState({})
    let [map, setMap] = useState()
    let [markers, setMarkers] = useState([])

    // delete checked properties
    const downloadAllCheckedProperties = async (propertyIdList) => {
        const apiUrl = 'https://sea-turtle-app-9x3dp.ondigitalocean.app/property/download-properties-excel';
        console.log('propertyIdList', propertyIdList)

        axios.post(apiUrl, { 'Ids': propertyIdList }, { responseType: 'blob' }) // Set responseType to 'blob' to receive binary data
            .then((response) => {
                successNotify("Downloading ... ")
                // Create a URL for the Blob
                const blobUrl = URL.createObjectURL(new Blob([response.data]));
                // Create a hidden anchor element
                const downloadLink = document.createElement('a');
                downloadLink.href = blobUrl;

                // Set the download attribute with the desired filename and extension
                downloadLink.setAttribute('download', 'property.xlsx'); // Change the filename and extension accordingly

                // Trigger a click event to initiate the download
                downloadLink.click();

                // Clean up by revoking the Blob URL
                URL.revokeObjectURL(blobUrl);
            })
            .catch((error) => {
                errorNotify("'Error downloading Excel file ❗")
                console.error();
            });
    }

    // delete checked properties
    const deleteAllCheckedProperties = async (propertyIdList) => {
        console.log('propertyIdList', propertyIdList)
        const response = await axios.patch(
            'https://sea-turtle-app-9x3dp.ondigitalocean.app/property/delete-properties', { 'Ids': propertyIdList },
            {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        return response
    }

    // notifications listing
    const getNotificationListing = async () => {
        let token = localStorage.getItem("token")
        const response = await axios.post(
            'https://sea-turtle-app-9x3dp.ondigitalocean.app/notification/get-notification-listing', {},
            {
                headers: {
                    'accept': 'application/json',
                    'authorization': token,
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = response.data.Data
        setAllNotifications([...data])
    }

    // properties check handler
    const isCheckedPropertyHandler = (e, Id, index) => {
        if (e.target.checked) {
            // console.log('✅ Checkbox is checked');
            setCheckedProperties([...checkedProperties, Id])
        } else {
            // remove id from array
            //   console.log('⛔️ Checkbox is NOT checked');
            let filteredIds = checkedProperties.filter(id => id !== Id)
            setCheckedProperties([...filteredIds])
        }
    }

    // get all properties listing
    const getAllPropertyListing = () => {
        setIsLoading(true)
        axios.post('https://sea-turtle-app-9x3dp.ondigitalocean.app/property/get-property-card-listing', {}, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setIsLoading(false)
            // successNotify("Property Fetch Successfully !")
            // console.log('response:- ',response.data.Data);
            setAllPropertyListing(response.data.Data)
        }).catch((error) => {
            setIsLoading(false)
            errorNotify(error.response.data.message)
            console.log(error.response.data.message);
        })

    }
    // property listing on a map
    const getAllPropertiesOnMap = async () => {
        setIsLoading(true)
        const response = await axios.post('https://sea-turtle-app-9x3dp.ondigitalocean.app/property/get-property-listing', {}, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const data = await response.data.Data
        setIsLoading(false)
        return data
    }

    // add property API
    const addProperty = (addPropertyObj) => {
        // https://sea-turtle-app-9x3dp.ondigitalocean.app/property/add-property
        setIsLoading(true)
        axios.post('https://sea-turtle-app-9x3dp.ondigitalocean.app/property/add-property', {
            ...addPropertyObj
        }, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setIsLoading(false)
            successNotify("Property Added Successfully")
            navigate("/home/map")
            console.log(response);
        }).catch((error) => {
            setIsLoading(false)
            errorNotify(error.response.data.message)
            console.log(error.response.data.message);
        })

    }

    // add property API
    const editProperty = (addPropertyObj) => {
        setIsLoading(true)
        axios.patch('https://sea-turtle-app-9x3dp.ondigitalocean.app/property/update-property', {
            ...addPropertyObj
        }, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setIsLoading(false)
            successNotify("Property Updated Successfully")
            navigate("/home/map")
            console.log(response);
        }).catch((error) => {
            setIsLoading(false)
            errorNotify(error.response.data.message)
            console.log(error.response.data.message);
        })

    }

    // get specific property detail
    const getPropertyDetailById = async (id) => {
        setIsLoading(true)
        try {
            const response = await axios.get(`https://sea-turtle-app-9x3dp.ondigitalocean.app/property/get-property/${id}`)
            const data = response.data
            // console.log('data:- ',data);
            let { Clients, Contracts, ...propertyDetails } = data

            setAllClientsDetail(Clients);
            setContractDetail(Contracts)
            setPropertyDetail(propertyDetails)

            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }

    // get properties by searching on map
    const getPropertyBySearching = (inputString) => {
        setIsSearchLoading(true)
        axios.post('https://sea-turtle-app-9x3dp.ondigitalocean.app/property/get-property-listing', { "Search": inputString }, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setIsSearchLoading(false)
            const propertyArray = response.data.Data
            console.log(propertyArray);
            // let transformedArray = propertyArray.map((property) => property.PropertyNo);
            let transformedArray = propertyArray.map((property) => {
                return {
                    id: property.Id,
                    propertyNo: property.PropertyNo,
                    latitude: property.Latitude,
                    longitude: property.Longitude
                }
            });
            setSearchProperties([...transformedArray])
        }).catch((error) => {
            setIsSearchLoading(false)
            errorNotify(error.response.data.message)
            console.log(error.response.data.message);
        })

    }

    // get property listing by searching
    const getPropertyListingBySearching = (body) => {
        setIsSearchLoading(true)
        axios.post('https://sea-turtle-app-9x3dp.ondigitalocean.app/property/get-property-card-listing', body, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setIsSearchLoading(false)
            const propertyArray = response.data.Data
            // console.log('propertyArray',propertyArray);
            // setAllPropertySearchListing([...propertyArray])
            setAllPropertyListing([...propertyArray]) // for listing on cards

        }).catch((error) => {
            setIsSearchLoading(false)
            errorNotify(error.response.data.message)
            console.log(error.response.data.message);
        })
    }

    // delete property API
    const deletePropertyDetails = async (id) => {
        setIsLoading(true)
        try {
            const response = await axios.delete(`https://sea-turtle-app-9x3dp.ondigitalocean.app/property/delete-property/${id}`)
            console.log('response:- ', response);
            setIsLoading(false)
            navigate("/home/listing")

        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }

    // get all property Listing for table
    const getAllPropertyListingForTable = async () => {
        setIsLoading(true)
        const response = await axios.post('https://sea-turtle-app-9x3dp.ondigitalocean.app/property/get-property-listing', {}, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const data = await response.data.Data
        setIsLoading(false)

        // transforming data for displaying listign in a table format
        let transformedPropertyArray = data.map((property) => {
            let tenantDetails = ""
            tenantDetails = property.Clients.filter((client) => {
                return client.Type === "Tenant"
            })
            return {
                ...property,
                TenantName: tenantDetails.length > 0 ? tenantDetails[0].Name : "",
                TenantContactNo: tenantDetails.length > 0 ? tenantDetails[0].Mobile : "",
            }
        })
        setTableListing([...transformedPropertyArray])
        // console.log('transformedPropertyArray:- ',transformedPropertyArray)
    }

    // Add/Edit Property Map
    // =======>>>> map functions

    // place marker where i will click 
    function placeMarkerAndPanTo(location, map) {
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            animation: google.maps.Animation.DROP
        });
        map.panTo(location);
        markers.push(marker);
    }

    // remove marker
    function deleteMarkers() {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];
    }

    // set pointers on map
    function setPointerOnMap(event) {
        let latitudeInput = document.querySelector(".add-property-map #latitude");
        let longitudeInput = document.querySelector(".add-property-map #longitude")

        let userClickLatitude = `${event.latLng.lat().toFixed(3)}`;
        let userClickLongitude = `${event.latLng.lng().toFixed(3)}`;

        // passing user click latitude and longitude position in their fields
        latitudeInput.value = userClickLatitude
        longitudeInput.value = userClickLongitude
        deleteMarkers(null);
        placeMarkerAndPanTo(event.latLng, map);
    }

    // initialize a map for add property page
    function initMap() {
        map = new google.maps.Map(document.getElementById("addPropertyMap"), {
            center: { lat: 23.6217269, lng: 58.2653982 }, // Al Mouj Muscat
            zoom: 14, // update this too
            mapTypeControl: true,
            mapTypeControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP,
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER,
            }
        });
        setMap(map)
        const styles = JSON.parse(`[{"featureType": "all","elementType": "geometry.fill","stylers": [{"weight": "2.00"}] }, { "featureType": "all", "elementType": "geometry.stroke", "stylers": [{ "color": "#9c9c9c" }] }, { "featureType": "all", "elementType": "labels.text", "stylers": [{ "visibility": "on" }] }, { "featureType": "administrative", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.locality", "elementType": "labels.text", "stylers": [{ "visibility": "on" }] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#777777" }] }, { "featureType": "administrative.neighborhood", "elementType": "labels.text.fill", "stylers": [{ "visibility": "on" }, { "color": "#777777" } ] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] }, { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [{ "color": "#eeeeee" }, { "weight": "1.00" } ] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{ "color": "#dddddd" }] }, { "featureType": "landscape.natural.landcover", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#d1dbd2" } ] }, { "featureType": "landscape.natural.terrain", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#d1dbd2" } ] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#ddddde" } ] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#d1dbd2" } ] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 } ] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "weight": "1" } ] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#777777" }] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }, { "visibility": "off" } ] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" } ] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "weight": "1.00" } ] }, { "featureType": "road.highway", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry.fill", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "weight": "0.75" } ] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "weight": "0.75" } ] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.line", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#a7a7a7" }, { "weight": "0.75" } ] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#46bcec" }, { "visibility": "on" } ] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#a5b7d3" }] }, { "featureType": "water", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#070707" }] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }] } ]`)
        map.setOptions({ styles });

        map.addListener('click', (event) => {
            setPointerOnMap(event)
        });
    }

    // zoom to a certain point
    const zoomOnMap = (map, lat, long) => {
        const place = { lat: lat, lng: long }
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(place);
        map.fitBounds(bounds);
    }

    // final object to send for global data
    let objToSend = {
        displayMapObj,
        setDisplayMapObj,
        addProperty,
        isLoading,
        setIsLoading,
        getAllPropertiesOnMap,
        getPropertyDetailById,
        propertyDetail,
        allClientsDetail,
        contractDetail,
        map,
        markers,
        initMap,
        placeMarkerAndPanTo,
        deleteMarkers,
        setPointerOnMap,
        editProperty,
        getAllPropertyListing,
        allPropertyListing,
        getPropertyBySearching,
        searchProperties,
        zoomOnMap,
        isSearchLoading,
        deletePropertyDetails,
        setAllPropertyListing,
        setIsSearchLoading,
        getPropertyListingBySearching,
        allPropertySearchListing,
        getAllPropertyListingForTable,
        tableListing,
        setTableListing,
        isCheckedPropertyHandler,
        checkedProperties,
        isChecked,
        setIsChecked,
        getNotificationListing,
        allNotifications,
        setAllNotifications,
        deleteAllCheckedProperties,
        setCheckedProperties,
        downloadAllCheckedProperties
    }
    return <PropertyContext.Provider value={objToSend}>{children}</PropertyContext.Provider>
}

export {
    PropertyContext,
    PropertyContextProvider
}