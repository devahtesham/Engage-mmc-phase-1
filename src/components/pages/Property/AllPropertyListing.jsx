import React, { useContext, useDeferredValue, useState } from 'react'
import CardListing from './CardListing'
import TableListing from './TableListing'
import "./AllPropertyListing.css"
import { BiSearch } from "react-icons/bi"
import { Container, Card, Row, Col, InputGroup, Form } from 'react-bootstrap'
import { HiOutlineFilter } from "react-icons/hi";
import { HiMiniArrowsUpDown } from "react-icons/hi2"
import { FiDownload } from "react-icons/fi"
import { RiDeleteBack2Fill } from "react-icons/ri"
import { ImTable2 } from "react-icons/im"
import { GiHamburgerMenu } from "react-icons/gi"
import ListingWrapper from './ListingWrapper/ListingWrapper'
import { PropertyContext } from '../../../context/PropertyContext'
import { errorNotify, successNotify } from '../../../Toastify/Toastify'
import { DropDownComp } from '../../bootstrap'

const AllPropertyListing = () => {
    const [searchPropertyInput, setSearchPropertyInput] = useState("")
    const [isCardDisplay, setIsCardDisplay] = useState(false)
    const {getPropertyListingBySearching, checkedProperties, getAllPropertyListingForTable, deleteAllCheckedProperties, setCheckedProperties, downloadAllCheckedProperties } = useContext(PropertyContext)

    // for download all check properties
    const downloadAllPropertiesHandler = () => {
        if (checkedProperties.length < 1) {
            errorNotify("Select atleast 1 property ❗")
        } else {
            // FOR DELETE
            downloadAllCheckedProperties(checkedProperties)
            setCheckedProperties([])

            // uncheck all the checked proiperties  < ======= > CHECK IF NEEDED OR NOT AFTER HITTING AGAIN LISTING API < ========= >
            document.querySelectorAll(".property-checkbox").forEach((input) => {
                if (input.checked) {
                    input.checked = false
                }
            })
        }
    }

    // for delete all check properties
    const deleteAllPropertiesHandler = () => {
        if (checkedProperties.length < 1) {
            errorNotify("Select atleast 1 property ❗")
        } else {
            // FOR DELETE
            // console.log('Hit API and pass this array',checkedProperties)
            deleteAllCheckedProperties(checkedProperties).then((response) => {
                if (response.data) {
                    successNotify("Property deleted successfully !")
                    // FOR RENDERING UI AGAIN 
                    getAllPropertyListingForTable()
                    setCheckedProperties([])
                }
            })


            // uncheck all the checked proiperties  < ======= > CHECK IF NEEDED OR NOT AFTER HITTING AGAIN LISTING API < ========= >
            // document.querySelectorAll(".property-checkbox").forEach((input)=>{
            //     if(input.checked){
            //         input.checked = false
            //     }
            // })
        }
    }

    // search property
    // for optimizing renders on every key 
    const optimizedText = useDeferredValue(searchPropertyInput)


    const searchPropertyHandler = (e) => {
        let value = e.target.value;
        setSearchPropertyInput(value)
        if (value.length > 0) {
            // search api calling
            getPropertyListingBySearching({ "Search": optimizedText })
        } else {
            getPropertyListingBySearching({})
        }
    }
    return (
        <>
            {/* ----------- TOP BAR ----------- */}
            <ListingWrapper>
                <div className='top-bar-container'>
                    <Row className='justify-content-between'>
                        <Col md={7}>
                            <div className='d-flex align-items-center gap-3 mt-2 ms-4'>
                                <div className={`property-search-box-container`}>
                                    <InputGroup className="property-search-input">
                                        <Form.Control
                                            placeholder="Search ..."
                                            aria-label="Search"
                                            aria-describedby=""
                                            className='search'
                                            onChange={searchPropertyHandler}
                                            value={searchPropertyInput}
                                        />
                                    </InputGroup>
                                </div>
                                <div className={`property-search-box-container`}>
                                    {/* Project, Tenant, Agent, Owner, Mobile */}
                                    <DropDownComp value="" options={['Project', 'Tenant', 'Agent', 'Owner', 'Mobile']} name="" onChange="" />
                                </div>
                                <span className=''><BiSearch size={20} color='#e60c0b' /></span>
                            </div>
                        </Col>
                        {/* icons */}
                        <Col md={4} >
                            <div className='top-bar-icon-container d-flex justify-content-between align-items-center'>
                                <div className='top-bar-icon-btn filter-btn'>
                                    <HiOutlineFilter size={21} color='#737373' />
                                </div>
                                <div className='top-bar-icon-btn sort-btn'>
                                    <HiMiniArrowsUpDown size={21} color='#737373' />
                                </div>
                                <div className='top-bar-icon-btn download-btn' onClick={downloadAllPropertiesHandler}>
                                    <FiDownload size={21} color='#737373' />
                                </div>
                                <div className='top-bar-icon-btn delete-all-btn' onClick={deleteAllPropertiesHandler}>
                                    <RiDeleteBack2Fill size={21} color='#737373' />
                                </div>
                                <div className='top-bar-icon-btn swapping-btn' onClick={() => setIsCardDisplay(!isCardDisplay)}>
                                    {
                                        !isCardDisplay ? <ImTable2 size={21} color='#737373' /> : <GiHamburgerMenu size={21} color='#737373' />
                                    }

                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </ListingWrapper>
            {
                isCardDisplay ? <CardListing /> : <TableListing />
            }
        </>
    )
}

export default AllPropertyListing