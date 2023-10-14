import React, { useContext, useDeferredValue, useEffect, useRef, useState } from 'react'
import { CardComp } from '../../bootstrap'
import { Container, Col, Row, InputGroup, Form } from "react-bootstrap"
import { PROPERTY__LISTING } from '../../../data'
import { PropertyContext } from '../../../context/PropertyContext'
import Loader from "../../Loader/Loader"
import { useNavigate } from 'react-router-dom'
import { BiSearch } from "react-icons/bi"
import SearchLoader from '../../Loader/SearchLoader'
import "./PropertyListing.css"
import { successNotify } from '../../../Toastify/Toastify'
import PropertyListingSearchLoader from '../../Loader/PropertyListingSearchLoader'


const CardListing = () => {
    const {allPropertySearchListing, getPropertyListingBySearching, getAllPropertyListing, allPropertyListing, isSearchLoading, deletePropertyDetails, setAllPropertyListing } = useContext(PropertyContext);
    const [searchPropertyInput, setSearchPropertyInput] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        getAllPropertyListing()
    }, [])

    // for optimizing renders on every key 
    const optimizedText = useDeferredValue(searchPropertyInput)


    const searchPropertyHandler = (e) => {
        let value = e.target.value;
        setSearchPropertyInput(value)
        if (value.length > 0) {
            // search api calling
            getPropertyListingBySearching({ "Search": optimizedText })
        }else{
            getPropertyListingBySearching({})
        }
    }

    const deletePropertyHandler = (Id, index) => {
        successNotify("Property Deleted Successfully")
        // for delete property form db
        deletePropertyDetails(Id)

        // for ui
        allPropertyListing.splice(index, 1);
        setAllPropertyListing([...allPropertyListing])
    }

    return (
        <Container>
            <Row className={`property-card-listing mt-5 ${allPropertyListing.length < 1 ? "h-100-vh" : ""}`}>
                {
                    isSearchLoading ? <PropertyListingSearchLoader /> : (
                        <>
                            {
                                allPropertyListing.length > 0 ? allPropertyListing.map((property, index) => (
                                    <Col lg={3} key={property.Id} className='mb-4'>
                                        <CardComp item={property} onDeleteBtn={() => { deletePropertyHandler(property.Id, index) }} />
                                    </Col>
                                )):<h1 className="text-center">No Property Added !</h1>
                            }
                        </>
                    )
                }
            </Row>
        </Container>
    )
}

export default CardListing