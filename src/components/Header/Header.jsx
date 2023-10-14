import React, { useContext, useDeferredValue, useEffect, useRef, useState } from 'react'
import { Col, Container, Form, InputGroup, Row, } from 'react-bootstrap'
import { BsBellFill } from "react-icons/bs"
import { CheckBoxComp } from '../bootstrap'
import "./Header.css"
import { NavLink, useNavigate } from "react-router-dom"
import { successNotify } from '../../Toastify/Toastify'
import { BiSearch } from "react-icons/bi"
import CompanyLogo from "../../assets/img/logo.png"
import { BiLoaderAlt } from "react-icons/bi"
import SearchLoader from '../Loader/SearchLoader'
import { PropertyContext } from '../../context/PropertyContext'

const Header = () => {

    const {allNotifications,setAllNotifications, getPropertyBySearching, isSearchLoading, searchProperties, displayMapObj, zoomOnMap,getNotificationListing } = useContext(PropertyContext)
    const [searchPropertyInput, setSearchPropertyInput] = useState("")
    const [isSearchModalShow, setIsSearchModalShow] = useState(false)
    const searchModalRef = useRef()
    const navigate = useNavigate()
    let [isShowNotifications, setIsShowNotifications] = useState(false)

    useEffect(()=>{
        getNotificationListing()
    },[])

    // for optimizing renders on every key 
    const optimizedText = useDeferredValue(searchPropertyInput)

    // logout
    const logoutHandler = () => {
        successNotify("Logout Successfully ! 🔒")
        localStorage.removeItem("token");
        navigate("/")

    }

    // for notifications
    const clearAllNotificationsHandler = () => {
        setAllNotifications([])
        setIsShowNotifications(false)
    }


    // function for search property
    const searchPropertyHandler = (e) => {
        let value = e.target.value;
        setSearchPropertyInput(value)
        if (value.length > 0) {
            setIsSearchModalShow(true)
            getPropertyBySearching(optimizedText)        // search api calling
        } else {
            setIsSearchModalShow(false)
        }

    }

    // for getting latitude and longitude
    const getLatLong = (index, lat, long) => {
        zoomOnMap(displayMapObj, lat, long)
        setIsSearchModalShow(false)
        setSearchPropertyInput("")
    }

    // for hiding search property
    let pagePath = window.location.pathname
    let visibility = ""
    if (pagePath.includes("/home/map")) {
        visibility = true
    } else {
        visibility = false
    }



    return (
        <>
            <Container fluid className='header '>
                <Row className='align-items-end justify-content-between px-4 py-2'>
                    {/* logo*/}
                    <Col xl={4} className=''>
                        <div className="logo-header d-flex align-items-center gap-3">
                            <div>
                                <img src={CompanyLogo} alt="logo" />
                            </div>
                            <div className='d-flex flex-column'>
                                <span className='fw-bolder company-name'>MAINTENANCE</span>
                                <span className='fw-bolder company-name'>MANAGEMENT</span>
                                <span className='fw-bolder company-name'>SYSTEM</span>
                            </div>
                        </div>
                    </Col>

                    {/* Navigation */}
                    <Col xl={4}>
                        <nav>
                            <ul className='list-unstyled m-0 d-flex align-items-center gap-5'>
                                <li className='li'>
                                    <NavLink to={"/home/map"} className="fw-700">MAP</NavLink>
                                </li>
                                <li className='li'>
                                    <NavLink to={"/home/addProperty"} className="fw-700">ADD PROPERTY</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/home/listing"} className="fw-700">PROPERTY LISTING</NavLink>
                                </li>

                            </ul>
                        </nav>
                    </Col>

                    <Col xl={4}>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className={`property-search-box-container ${!visibility ? "hidden" : ""}`}>
                                <InputGroup className="property-search-input">
                                    <Form.Control
                                        placeholder="Search ..."
                                        aria-label="Search"
                                        aria-describedby=""
                                        className='search'
                                        onChange={searchPropertyHandler}
                                        value={searchPropertyInput}
                                    />
                                    <span className='property-search-icon'><BiSearch size={20} /></span>
                                </InputGroup>
                                <div className='search-suggession-wrapper'>
                                    <div className={`search-suggession-inner ${!isSearchModalShow && "hidden"}`} ref={searchModalRef}>
                                        {
                                            isSearchLoading ? (
                                                <div className='w-100 h-100 d-flex justify-content-center align-items-center text-white'>
                                                    <div className='d-flex align-items-center gap-2'>
                                                        <SearchLoader /> <h6 className='m-0 loader-text'>Searching ...</h6>
                                                    </div>
                                                </div>
                                            )
                                                : (
                                                    <div className='h-100 '>
                                                        {
                                                            searchProperties.length > 0 ? searchProperties.map((property, index) => (
                                                                <h6 key={index} className='c-pointer property-names m-0' onClick={() => {
                                                                    getLatLong(index, property.latitude, property.longitude)
                                                                }}  >property No: {property.propertyNo}</h6>

                                                            )) : <div className='d-flex justify-content-center align-items-center h-100'><h6 className='text-white'>No Result Found !</h6></div>
                                                        }
                                                    </div>
                                                )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='notification-bell- cursor-pointer'>
                                <BsBellFill color='#000' fontSize={20} onClick={() => setIsShowNotifications(!isShowNotifications)} />
                                <div className='notifications-container'>
                                    <div className={`notifications py-3 px-2 ${isShowNotifications ? " " : "hide-notifications"}`}>
                                        <div className='notification-inner'>
                                            {
                                                allNotifications.length < 1 ? <h2 className='mt-5 text-center text-white'>Empty !</h2>:(
                                                    allNotifications.map((notification,index)=>(
                                                        <div key={index} className=' mb-3 notification px-2 read'>
                                                            <h6>{notification.Title}: </h6>
                                                            <p className='mb-0'>{notification.Body}</p>
                                                            <div className='text-end'>
                                                                <h6 className='mt-2 mb-0 fw-700 fs-14'>{new Date(notification.CreatedAt).toLocaleString()}</h6>
                                                            </div>
                                                        </div>
                                                    ))
                                                )
                                            }
                                            {/* <div className=' mb-2 notification px-2 read'>
                                                <h6 className='mb-0'>This message has read</h6>
                                            </div>
                                            <div className=' mb-2 notification px-2 read'>
                                                <h6 className='mb-0'>This message has read</h6>
                                            </div>
                                            <div className=' mb-2 notification px-2 read'>
                                                <h6 className='mb-0'>This message has read</h6>
                                            </div>
                                            <div className=' mb-2 notification px-2 read'>
                                                <h6 className='mb-0'>This message has read</h6>
                                            </div>
                                            <div className=' mb-2 notification px-2 read'>
                                                <h6 className='mb-0'>This message has read</h6>
                                            </div>
                                            <div className=' mb-2 notification px-2 read'>
                                                <h6 className='mb-0'>This message has read</h6>
                                            </div>
                                            <div className=' mb-2 notification px-2 read'>
                                                <h6 className='mb-0'>This message has read</h6>
                                            </div>
                                            <div className=' mb-2 notification px-2 read'>
                                                <h6 className='mb-0'>This message has read</h6>
                                            </div> */}
                                        </div>
                                        <div className='notification-footer'>
                                            <span className='modal-more-detail-text me-2' onClick={clearAllNotificationsHandler}>Clear All</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <button className='btn btn-primary btn-main-clr' onClick={logoutHandler}>Logout</button>
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default Header