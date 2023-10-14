import React, { useContext, useEffect, useRef, useState } from 'react'
import "./Map.css"
import amcInactive from "../../../../assets/img/amcInactive.png"
import amcActive from "../../../../assets/img/amcActive.png"
import Loader from '../../../Loader/Loader';
import { Col, Container, Form, InputGroup, Row } from 'react-bootstrap';

import { PropertyContext } from '../../../../context/PropertyContext';

const DisplayMap = () => {
    const [isMapLoading, setIsMapLoading] = useState(false)    // specially for map
    const { getAllPropertiesOnMap, isLoading, setIsLoading, setDisplayMapObj } = useContext(PropertyContext)



    useEffect(() => {
        setIsMapLoading(true)
        // Load the Google Maps API
        const script = document.createElement('script');
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCWBr0Oe8wbx8_a9pnY2ljNMY69YIff45g&libraries=places&callback=initMap";
        // script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        // Initialize the map in the callback function (initMap)
        setTimeout(() => {
            setIsMapLoading(false)
            initMap();
        }, 2500)

        return () => {
            // Clean up the script when the component unmounts
            document.head.removeChild(script);
        };
    }, []);

    let map;

    // Initialize the map
    function initMap() {
        let houses = []
        let amcHouses = []
        getAllPropertiesOnMap()
            .then((response) => {
                if (response.length < 1) {
                    document.querySelector(".display-map").innerText = "";
                    document.querySelector(".display-map").innerHTML = `<h1 class="text-center mt-5">No Property Added !</h1>`;
                    return
                }
                response.forEach((house) => {
                    if (house.HasAMC) {
                        amcHouses.push(house)
                    } else {
                        houses.push(house)
                    }
                })

                map = new google.maps.Map(document.getElementById("map"), {
                    center: { lat: 23.6217269, lng: 58.2653982 }, // Al Mouj Muscat
                    zoom: 14, // update this too
                    mapTypeControl: false
                });

                const styles = JSON.parse(`[{
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [{
                "weight": "2.00"
            }]
        },
        {
            "featureType": "all",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#9c9c9c"
            }]
        },
        {
            "featureType": "all",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#777777"
            }]
        },
        {
            "featureType": "administrative.neighborhood",
            "elementType": "labels.text.fill",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "color": "#777777"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "color": "#f2f2f2"
            }]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [{
                    "color": "#eeeeee"
                },
                {
                    "weight": "1.00"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#dddddd"
            }]
        },
        {
            "featureType": "landscape.natural.landcover",
            "elementType": "geometry.fill",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "color": "#d1dbd2"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry.fill",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "color": "#d1dbd2"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "color": "#ddddde"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "color": "#d1dbd2"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{
                    "color": "#ffffff"
                },
                {
                    "weight": "1"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#777777"
            }]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [{
                    "color": "#ffffff"
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{
                "visibility": "simplified"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "color": "#ffffff"
                },
                {
                    "weight": "1.00"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "color": "#ffffff"
                },
                {
                    "weight": "0.75"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "color": "#ffffff"
                },
                {
                    "weight": "0.75"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry.fill",
            "stylers": [{
                    "visibility": "on"
                },
                {
                    "color": "#a7a7a7"
                },
                {
                    "weight": "0.75"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                    "color": "#46bcec"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#a5b7d3"
            }]
        },
        {
            "featureType": "water",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#070707"
            }]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#ffffff"
            }]
        }
                ]`)

                map.setOptions({ styles })

                // setting icons for simple and AMC houses
                const customMarkerIcons = {
                    house: {
                        url: amcInactive,
                        size: new google.maps.Size(40, 40),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(20, 40),
                    },
                    amcHouse: {
                        url: amcActive,
                        size: new google.maps.Size(40, 40),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(20, 40),
                    }
                };

                // console.log('houses:- ', houses);
                // console.log('amcHouses:- ', amcHouses);

                houses.forEach(house => {
                    let amcClients = ""
                    house.Clients.forEach((client) => {
                        amcClients += `
                            <div class="modal-property-details">
                                <div class="modal-heading">
                                    <h2>${client.Type} DETAILS</h2>
                                </div>
                                <div class="modal-description ms-3">
                                    <div class="mb-2 modal-description-feature"><span class="modal-description-label">Name: </span> <span class="modal-description-value">${client.Name}</span></div>
                                    <div class="mb-2 modal-description-feature"><span class="modal-description-label">Contact No: </span> <span class="modal-description-value">${client.Mobile}</span></div>
                                </div>
                            </div>
                        `
                    })
                    const marker = new google.maps.Marker({
                        position: { lat: house.Latitude, lng: house.Longitude },
                        map: map,
                        title: house.PropertyNo,
                        animation: google.maps.Animation.DROP,
                        icon: customMarkerIcons.house
                    });

                    // Create an info window for each marker
                    const infoWindow = new google.maps.InfoWindow({
                        content: `
                                <div id="info-content">
                                    <div class="modal-property-details">
                                        <div class="modal-heading">
                                            <h2>PROPERTY DETAILS</h2>
                                            <div>
                                                <a href="/home/editDetails/${house.Id}" class="map-modal-edit-btn"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 5.63l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 000-1.41z"></path></svg></a>
                                            </div>
                                        </div>
                                        <div class="modal-description ms-3">
                                            <div class="mb-2 modal-description-feature"><span class="modal-description-label">Property ID: </span> <span class="modal-description-value">${house.PropertyNo}</span></div>
                                            <div class="mb-2 modal-description-feature"><span class="modal-description-label">Door No: </span> <span class="modal-description-value">${house.DoorNo}</span></div>
                                        </div>
                                    </div>
                                    ${amcClients}
                                    <div class="text-end mb-2 me-2">
                                        <a href="/home/displayDetails/${house.Id}" class='modal-more-detail-text'>More Detail</a>
                                    </div>
                                </div>
                                `
                    });

                    // Show info window when marker is clicked
                    marker.addListener("click", () => {
                        let extraModal = document.querySelectorAll(".gm-style-iw.gm-style-iw-c");
                        if (extraModal.length > 0) {
                            extraModal.forEach((modal) => {
                                modal.remove()
                            })
                        }
                        infoWindow.open(map, marker);
                    });
                });

                amcHouses.forEach(house => {
                    let amcClients = ""
                    let amcDetails = ""
                    house.Clients.forEach((client) => {
                        amcClients += `
                            <div class="modal-property-details">
                                <div class="modal-heading">
                                    <h2>${client.Type} DETAILS</h2>
                                </div>
                                <div class="modal-description ms-3">
                                    <div class="mb-2 modal-description-feature"><span class="modal-description-label">Name: </span> <span class="modal-description-value">${client.Name}</span></div>
                                    <div class="mb-2 modal-description-feature"><span class="modal-description-label">Contact No: </span> <span class="modal-description-value">${client.Mobile}</span></div>
                                </div>
                            </div>
                        `
                    })

                    let amc = house.Contracts[0]

                    amcDetails = `
                            <div class="modal-property-details">
                                <div class="modal-heading">
                                    <h2>AMC DETAILS</h2>
                                </div>
                                <div class="modal-description ms-3">
                                    <div class="mb-2 modal-description-feature"><span class="modal-description-label">Start Date: </span> <span class="modal-description-value">${amc.StartDate}</span></div>
                                    <div class="mb-2 modal-description-feature"><span class="modal-description-label">End Date: </span> <span class="modal-description-value">${amc.EndDate}</span></div>
                                </div>
                            </div>
                        `



                    const marker = new google.maps.Marker({
                        position: { lat: house.Latitude, lng: house.Longitude },
                        map: map,
                        title: house.PropertyNo,
                        animation: google.maps.Animation.DROP,
                        icon: customMarkerIcons.amcHouse
                    });

                    // Create an info window for each marker
                    const infoWindow = new google.maps.InfoWindow({
                        content: `  
                                <div id="info-content">
                                    <div class="modal-property-details">
                                        <div class="modal-heading">
                                            <h2>PROPERTY DETAILS</h2>
                                            <div>
                                                <a href="/home/editDetails/${house.Id}" class="map-modal-edit-btn"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 5.63l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 000-1.41z"></path></svg></a>
                                            </div>
                                        </div>
                                        <div class="modal-description ms-3">
                                            <div class="mb-2 modal-description-feature"><span class="modal-description-label">Property ID: </span> <span class="modal-description-value">${house.PropertyNo}</span></div>
                                            <div class="mb-2 modal-description-feature"><span class="modal-description-label">Door No: </span> <span class="modal-description-value">${house.DoorNo}</span></div>
                                        </div>
                                    </div>
                                    ${amcClients}  
                                    ${amcDetails}
                                    <div class="text-end mb-2 me-2">
                                        <a href="/home/displayDetails/${house.Id}" class='modal-more-detail-text'>More Detail</a>
                                    </div>
                                </div>
                            `
                    });

                    // Show info window when marker is clicked
                    marker.addListener("click", () => {
                        let extraModal = document.querySelectorAll(".gm-style-iw.gm-style-iw-c");
                        if (extraModal.length > 0) {
                            extraModal.forEach((modal) => {
                                modal.remove()
                            })
                        }
                        infoWindow.open(map, marker);
                    });
                });

                setDisplayMapObj(map)
                // console.log('map',typeof map);
            })
            .catch((error) => {
                setIsLoading(false)
                console.log(error);
            })

        // // Add markers for each house
    }

    return (
        <>
            <section className='display-map mt-3'>
                <div id="map" className='w-100 h-100'></div>
                {
                    isLoading || isMapLoading && <Loader />
                }
            </section>
        </>
    )
}

export default DisplayMap