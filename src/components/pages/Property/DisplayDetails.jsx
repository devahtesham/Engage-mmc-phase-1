import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import PropertyBgImg from "../../../assets/img/detail-2.jpg"
import "./DisplayDetails.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PropertyContext } from '../../../context/PropertyContext'
import { successNotify } from '../../../Toastify/Toastify'


const DisplayDetails = () => {

    const {downloadAllCheckedProperties, getPropertyDetailById, propertyDetail, allClientsDetail, contractDetail, deletePropertyDetails } = useContext(PropertyContext)
    const { id } = useParams();
    useEffect(() => {
        getPropertyDetailById(id)
    }, [])

    let owners = [];
    let tenants = [];
    let agents = [];
    allClientsDetail.filter((client) => {
        if (client.Type === "Owner") {
            owners.push(...owners, client)
        } else if (client.Type === "Tenant") {
            tenants.push(...tenants, client)
        } else {
            agents.push(...agents, client)
        }
    })

    // delete property
    const deletePropertyHandler = () => {
        deletePropertyDetails(id)
    }

    // download file
    const downloadFileHandler = () => {
        // downloadAllCheckedProperties([+id]).then((response) => {
        //     console.log('response:- ',response)
        //     if (response.data) {
        //         successNotify("Downloading ... ")
        //     }
        // })
        downloadAllCheckedProperties([+id])
    }


    return (
        <div className='display-detail-sec'>
            {/* property image */}
            <section>
                <div className='property-bg-img'>
                    <img src={PropertyBgImg} alt="" />
                </div>
            </section>
            <Container>
                {/* property Details */}
                <section className='property-details mt-5'>
                    <Row className='mb-4 mt-3'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h1 className='m-0 side-heading'>Property Details:</h1>
                            <button onClick={downloadFileHandler} className='btn btn-main-clr text-white delete-property-btn text-white'>
                                Download as CSV
                            </button>
                        </div>
                    </Row>
                    <Row className=' align-items-center'>
                        {/* Property Detail */}
                        {
                            propertyDetail.PropertyNo !== "" && (
                                <Col lg={3} className='b-4'>
                                    <div className='rs-ref-no d-flex align-items-center gap-3 my-3 '>
                                        <h6 className='mb-0'>Property No:</h6>
                                        <span>{propertyDetail.PropertyNo}</span>
                                    </div>
                                </Col>
                            )
                        }
                        {/* Door No */}
                        {
                            propertyDetail.DoorNo !== "" && (
                                <Col lg={3} className='b-4'>
                                    <div className='property-no d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>Door No:</h6>
                                        <span>{propertyDetail.DoorNo}</span>
                                    </div>
                                </Col>

                            )
                        }
                        {/* Number Of Bedrooms */}
                        {
                            propertyDetail.NumOfBedroom !== "" && (
                                <Col lg={3} className='b-4'>
                                    <div className='door-no d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>Number Of Bedrooms:</h6>
                                        <span>{propertyDetail.NumOfBedroom}</span>
                                    </div>
                                </Col>
                            )
                        }

                        {/* Number of Bathrooms */}
                        {
                            propertyDetail.NumOfBathroom !== "" && (
                                <Col lg={3} className='b-4'>
                                    <div className='tenant-name d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>Number Of Bathrooms:</h6>
                                        <span>{propertyDetail.NumOfBathroom}</span>
                                    </div>
                                </Col>

                            )
                        }
                        {/* Number Of AC */}
                        {
                            propertyDetail.NumOfAC !== "" && (
                                <Col lg={3} className='b-4'>
                                    <div className='tenant-mobile d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>Number Of AC:</h6>
                                        <span>{propertyDetail.NumOfAC}</span>
                                    </div>
                                </Col>

                            )
                        }
                        {/* Number of Water Heater */}
                        {
                            propertyDetail.NumOfWaterHeater !== "" && (
                                <Col lg={3} className='b-4'>
                                    <div className='tenant-email d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>Num Of Water Heater:</h6>
                                        <span>{propertyDetail.NumOfWaterHeater}</span>
                                    </div>
                                </Col>
                            )
                        }

                        {/* Swimming Pool */}
                        {
                            propertyDetail.HasSwimmingPool !== "" && (
                                <Col lg={3} className='b-4'>
                                    <div className='tenant-whatsapp d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>Swimming Pool:</h6>
                                        <span>{String(propertyDetail.HasSwimmingPool)}</span>
                                    </div>
                                </Col>
                            )
                        }

                        {/* Community */}
                        {
                            propertyDetail.Community !== "" && (
                                <Col lg={3} className='b-4'>
                                    <div className='owner-name d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>Community:</h6>
                                        <span>{propertyDetail.Community}</span>
                                    </div>
                                </Col>
                            )
                        }

                        {/* Master Project  */}
                        {
                            propertyDetail.MasterProject !== "" && (
                                <Col lg={3} className='b-4'>
                                    <div className='owner-mobile d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>Master Project:</h6>
                                        <span>{propertyDetail.MasterProject}</span>
                                    </div>
                                </Col>

                            )
                        }

                        {/* latitude */}
                        {
                            propertyDetail.Latitude !== "" && (
                                <Col lg={3} className='b-4'>
                                    <div className='owner-mobile d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>Latitude:</h6>
                                        <span>{propertyDetail.Latitude}</span>
                                    </div>
                                </Col>

                            )
                        }

                        {/* longitude */}
                        {
                            propertyDetail.Longitude !== "" && (
                                <Col lg={3} className='b-4'>
                                    <div className='owner-mobile d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>Longitude:</h6>
                                        <span>{propertyDetail.Longitude}</span>
                                    </div>
                                </Col>

                            )
                        }

                        {/* location */}
                        {
                            propertyDetail.Location !== "" && (
                                <Col lg={3} className='b-4'>
                                    <div className='owner-mobile d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>Location:</h6>
                                        <span>{propertyDetail.Location}</span>
                                    </div>
                                </Col>

                            )
                        }

                        {/* Description */}
                        {
                            propertyDetail.Description !== "" && (
                                <Col lg={3} className='b-4'>
                                    <div className='owner-mobile my-3'>
                                        <h6 className='mb-2'>Description:</h6>
                                        <div className='detail-description'>
                                            <p className='m-0'>{propertyDetail.Description}</p>
                                        </div>
                                    </div>
                                </Col>


                            )
                        }
                    </Row>
                </section>

                {/* owner detail */}
                {
                    owners.length > 0 && owners.map((client, index) => (
                        <section key={client.Id} className="owner-details mt-5">
                            <div className='d-flex justify-content-start'><h1 className='m-0 side-heading mb-2'>{client.Type}</h1></div>
                            <Row className='mt-3'>
                                <Col lg={3} className='b-4'>
                                    <div className='si-no d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>{client.Type} Name:</h6>
                                        <span>{client.Name}</span>
                                    </div>
                                </Col>
                                <Col lg={3} className='b-4'>
                                    <div className='si-no d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>{client.Type} Email:</h6>
                                        <span>{client.Email}</span>
                                    </div>
                                </Col>
                                <Col lg={3} className='b-4'>
                                    <div className='si-no d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>{client.Type} Mobile:</h6>
                                        <span>{client.Mobile}</span>
                                    </div>
                                </Col>
                                <Col lg={3} className='b-4'>
                                    <div className='si-no d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>{client.Type} Whatsapp:</h6>
                                        <span>{client.Whatsapp}</span>
                                    </div>
                                </Col>
                            </Row>
                        </section>

                    ))
                }

                {/* Tenant detail */}
                {
                    tenants.length > 0 && tenants.map((client, index) => (
                        <section key={client.Id} className="tenant-details mt-5">
                            <div className='d-flex justify-content-start'><h1 className='m-0 side-heading mb-2'>{client.Type}</h1></div>
                            <Row className='mt-3'>
                                <Col lg={3} className='b-4'>
                                    <div className='si-no d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>{client.Type} Name:</h6>
                                        <span>{client.Name}</span>
                                    </div>
                                </Col>
                                <Col lg={3} className='b-4'>
                                    <div className='si-no d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>{client.Type} Email:</h6>
                                        <span>{client.Email}</span>
                                    </div>
                                </Col>
                                <Col lg={3} className='b-4'>
                                    <div className='si-no d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>{client.Type} Mobile:</h6>
                                        <span>{client.Mobile}</span>
                                    </div>
                                </Col>
                                <Col lg={3} className='b-4'>
                                    <div className='si-no d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>{client.Type} Whatsapp:</h6>
                                        <span>{client.Whatsapp}</span>
                                    </div>
                                </Col>
                            </Row>
                        </section>

                    ))
                }

                {/* Agent detail */}
                {
                    agents.length > 0 && agents.map((client, index) => (
                        <section key={client.Id} className="agent-details mt-5">
                            <div className='d-flex justify-content-start'><h1 className='m-0 side-heading mb-2'>{client.Type}</h1></div>
                            <Row className='mt-3'>
                                <Col lg={3} className='b-4'>
                                    <div className='si-no d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>{client.Type} Name:</h6>
                                        <span>{client.Name}</span>
                                    </div>
                                </Col>
                                <Col lg={3} className='b-4'>
                                    <div className='si-no d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>{client.Type} Email:</h6>
                                        <span>{client.Email}</span>
                                    </div>
                                </Col>
                                <Col lg={3} className='b-4'>
                                    <div className='si-no d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>{client.Type} Mobile:</h6>
                                        <span>{client.Mobile}</span>
                                    </div>
                                </Col>
                                <Col lg={3} className='b-4'>
                                    <div className='si-no d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>{client.Type} Whatsapp:</h6>
                                        <span>{client.Whatsapp}</span>
                                    </div>
                                </Col>
                            </Row>
                        </section>

                    ))
                }

                {/* Contract Details */}
                {
                    contractDetail.length > 0 && contractDetail.map((amc, index) => (
                        <section key={amc.Id} className="agent-details mt-5">
                            <div className='d-flex justify-content-start'><h1 className='m-0 side-heading mb-2'>AMC {index + 1}</h1></div>
                            <Row className='mt-3'>
                                <Col lg={3} className='b-4'>
                                    <div className='si-no d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>AMC Type:</h6>
                                        <span>{amc.Type}</span>
                                    </div>
                                </Col>
                                <Col lg={3} className='b-4'>
                                    <div className='si-no d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>Start Date (yyy-mm-dd): </h6>
                                        <span>{amc.StartDate}</span>
                                    </div>
                                </Col>
                                <Col lg={3} className='b-4'>
                                    <div className='si-no d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>End Date (yyy-mm-dd): </h6>
                                        <span>{amc.EndDate}</span>
                                    </div>
                                </Col>
                                <Col lg={3} className='b-4'>
                                    <div className='si-no d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>AMC Status</h6>
                                        <span>{amc.Status}</span>
                                    </div>
                                </Col>
                                <Col lg={3} className='b-4'>
                                    <div className='si-no d-flex align-items-center gap-3 my-3'>
                                        <h6 className='mb-0'>Visiting Cycle</h6>
                                        <span>{amc.VisitingCycle}</span>
                                    </div>
                                </Col>
                            </Row>
                        </section>

                    ))
                }



                <div className='d-flex justify-content-between align-items-center my-5 '>
                    <button className='btn btn-2 text-white delete-property-btn text-white' onClick={deletePropertyHandler}>
                        Delete Property Details
                    </button>
                    <button className='btn btn-main-clr text-white'>
                        <Link to={`/home/editDetails/${id}`} className='text-white'>Edit Property Details</Link>
                    </button>
                </div>
            </Container>

        </div>
    )
}

export default DisplayDetails