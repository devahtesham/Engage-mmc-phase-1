import React, { useContext, useEffect, useRef, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap"
import { ButtonComp, DetailDescription, DropDownComp, InputComp } from '../../bootstrap'
import { AiOutlinePlus } from "react-icons/ai"
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import "./EditDetails.css"
import { CLIENTS } from '../../../data'
import { errorNotify, successNotify } from '../../../Toastify/Toastify'
import AddPropertyDetailsMap from './Map/AddPropertyDetailsMap'
import { PropertyContext } from '../../../context/PropertyContext'
import Loader from '../../Loader/Loader'
import { useParams } from 'react-router-dom'

const EditDetails = () => {

    const { getPropertyDetailById, propertyDetail, allClientsDetail, contractDetail, isLoading, editProperty } = useContext(PropertyContext)
    const { id } = useParams();

    // states for dealing clients
    let [clientsQuantity, setClientsQuantity] = useState([])    // for Click to Edit button
    const [allClients, setAllClients] = useState([])     // adding actual clients after click on add buton 

    // for getting AMC details
    let [amcQuantity, setAmcQuantity] = useState([])
    let [allAmc, setAllAmc] = useState([])

    useEffect(() => {
        getPropertyDetailById(id);
    }, []);


    // effect for property details
    useEffect(() => {
        setPropertyDetails({ ...propertyDetail })
    }, [propertyDetail])




    // effect function for clients
    useEffect(() => {
        setAllClients([...allClientsDetail])
    }, [allClientsDetail])

    // effect function for AMC
    useEffect(() => {
        setAllAmc([...contractDetail])
    }, [contractDetail])

    // for getting property details
    let [propertyDetails, setPropertyDetails] = useState({
        PropertyNo: '',
        DoorNo: '',
        NumOfBedroom: '',
        NumOfBathroom: '',
        NumOfAC: '',
        NumOfWaterHeater: '',
        HasSwimmingPool: '',
        Community: '',
        MasterProject: '',
        Location: '',
        Description: '',
        Latitude: '',
        Longitude: '',
    })
    console.log(propertyDetails);

    // function for add client by clicking on Add button
    const addClientHandler = () => {
        // setIsShowClient(true)
        setAllClients([
            ...allClients,
            {
                Name: "",
                Mobile: "",
                Email: "",
                Whatsapp: "",
                Type: "Owner"
            }
        ])
    }

    // function for add AMC by clicking on Add AMC Button
    const addAmcHandler = () => {
        // setIsShowClient(true)
        setAllAmc([
            ...allAmc,
            {
                Type: "",
                Status: "",
                VisitingCycle: "",
                StartDate: "",
                EndDate: "",
                Description: "",
            },
        ])
    }



    // handle property details data
    const propertyDetailsHandler = (e) => {
        let { value, name } = e.target;
        if (name == "NumOfBedroom" || name == "NumOfBathroom" || name == "NumOfAC" || name == "NumOfWaterHeater") {
            value = +value
        }

        if (name === "HasSwimmingPool") {
            if (value === "true") {
                value = true
            } else if (value === "false") {
                value = false
            }
        }

        setPropertyDetails({
            ...propertyDetails,
            [name]: value
        })
    }

    // ========== START: CLIENT FUNCTIONS ===============
    // function for displaying data w.r.t dropdown value
    const clientDropDownHandler = (value, index) => {
        let selectedClient = CLIENTS.filter((element) => {
            return element.Type === value
        })

        let transformedClient = {
            ...allClients[index],
            Type: selectedClient[0].Type
        }

        allClients.splice(index, 1, transformedClient)
        console.log('allClients', allClients);
        setAllClients([...allClients])
    }

    const editClientHandler = (index) => {

        // do nothing but UI Enhancement
        let allSections = document.querySelectorAll('.client-section-form');
        let currentForm = allSections[index]; // current form which i submitted !
        let submitBtn = currentForm.querySelector("#click-to-edit");
        submitBtn.innerText = "Click To Edit";
        submitBtn.removeAttribute("disabled");
        currentForm.querySelectorAll(".data-field").forEach((field) => {
            field.classList.remove('readOnly')
        })
        let editClientBtn = currentForm.querySelector("#edit-btn");
        editClientBtn.classList.add("disable");

        // remove index from state to keep record at final submit time
        clientsQuantity.splice(index, 1);
        setClientsQuantity([...clientsQuantity])
    }

    // delete client 
    const deleteClientHandler = (index) => {
        allClients.splice(index, 1);
        setAllClients([...allClients])
    }

    // submit client data 
    const clientSubmitHandler = (e, index, client) => {
        e.preventDefault();
        let allSections = document.querySelectorAll('.client-section-form');
        let currentForm = allSections[index]; // current form which i submitted !

        // getting the current client object 
        let { Name: clientName, Email: clientEmail, Mobile: clientMobile, Whatsapp: clientWhatsapp } = allClients[index]

        // checking validations on client fields
        if (!clientName || !clientEmail || !clientMobile || !clientWhatsapp) {
            errorNotify("Fill the Required Fileds❗")
            return
        }

        // do nothing but UI Enhancement
        let submitBtn = currentForm.querySelector("#click-to-edit");
        submitBtn.setAttribute("disabled", "disabled");   // disable Click to Edit button
        submitBtn.innerText = "Edit Successfully"
        successNotify(`${client} Added Successfully`)

        let editClientBtn = currentForm.querySelector("#edit-btn");
        if (editClientBtn.className.includes("disable")) {
            editClientBtn.classList.remove("disable")
        }
        currentForm.querySelectorAll(".data-field").forEach((field) => {
            field.classList.add('readOnly')
        })

        // add index in state to keep record at final submit time
        setClientsQuantity([...clientsQuantity, index])

    }
    // ========== END: CLIENT FUNCTIONS ===============

    // ========== START: AMC FUNCTIONS ===============
    const amcSubmitHandler = (e, index, client) => {
        e.preventDefault();
        let allSections = document.querySelectorAll('.amc-form');
        let currentForm = allSections[index]; // current form which i submitted !

        // getting the current client object 
        let { StartDate, EndDate, Status, Type, VisitingCycle } = allAmc[index]

        // checking validations on client fields
        if (!StartDate || !EndDate || !Status || !Type || !VisitingCycle) {
            errorNotify("Fill the Required Field❗")
            return
        }

        // do nothing but UI Enhancement
        let submitBtn = currentForm.querySelector("#click-to-edit-amc");
        submitBtn.setAttribute("disabled", "disabled");   // disable Click to Edit button
        submitBtn.innerText = "Edit Successfully"
        successNotify(`AMC Added Successfully`)

        let editClientBtn = currentForm.querySelector("#edit-btn-amc");
        if (editClientBtn.className.includes("disable")) {
            editClientBtn.classList.remove("disable")
        }
        currentForm.querySelectorAll(".data-field").forEach((field) => {
            field.classList.add('readOnly')
        })

        // add index in state to keep record at final submit time
        setAmcQuantity([...amcQuantity, index])

    }

    const amcChangeHandler = (e, index) => {
        let { value, name } = e.target

        let objToUpdated = allAmc[index];
        let updatedObj = {
            ...objToUpdated,
            [name]: value
        }

        allAmc.splice(index, 1, { ...updatedObj })
        setAllAmc([...allAmc])
    }

    const editAmcHandler = (index) => {
        // do nothing but UI Enhancement
        let allSections = document.querySelectorAll('.amc-form');
        let currentForm = allSections[index]; // current form which i submitted !
        let submitBtn = currentForm.querySelector("#click-to-edit-amc");
        submitBtn.innerText = "Click To Edit";
        submitBtn.removeAttribute("disabled");
        currentForm.querySelectorAll(".data-field").forEach((field) => {
            field.classList.remove('readOnly')
        })
        let editAmcBtn = currentForm.querySelector("#edit-btn-amc");
        editAmcBtn.classList.add("disable");

        // remove index from state to keep record at final submit time
        amcQuantity.splice(index, 1);
        setAmcQuantity([...amcQuantity])
    }

    // delete client 
    const deleteAmcHandler = (index) => {
        allAmc.splice(index, 1);
        setAllAmc([...allAmc])
    }

    // ========== END: AMC FUNCTIONS ===============


    // function calls for click on final Add details button
    const addDetailsHandler = () => {
        // validation
        let {
            PropertyNo,
            DoorNo,
        } = propertyDetails;

        let isOwnerExist;
        if (allClients.length > 0) {
            let filteredResponse = allClients.filter((client) => {
                return client.Type === 'Owner'
            })
            if (filteredResponse.length < 1) {
                isOwnerExist = false
            } else {
                isOwnerExist = true
            }

        }
        if (!isOwnerExist) {
            errorNotify("Owner is Required❗");
            return
        } else if (!PropertyNo || !DoorNo) {
            errorNotify("Fill the Required Fields ❗");
            return
        }

        // check that user click on a button named Click to Edit (for clients)??
        if (allClients.length !== clientsQuantity.length) {
            errorNotify("Please Press Click To Edit Button to Edit Successfully ❗");
            return
        }

        // check that user click on a button named Click to Edit (for AMC)??
        if (allAmc.length !== amcQuantity.length) {
            errorNotify("Please Press Click To Edit Button to Edit Successfully ❗");
            return
        }

        // ============ validations

        // validate the latitude and longitude
        let {Latitude,Longitude, NumOfBedroom, NumOfBathroom, NumOfAC, NumOfWaterHeater, HasSwimmingPool } = propertyDetails
        
        if (Latitude === 0 && Longitude === 0) {
            errorNotify("Latitude & Longitude are required Fields❗");
            return
        }


        // converting their value in number form if they are empty string ""
        let transformedProperty = {
            ...propertyDetails
        }
        if (NumOfBedroom === "") {
            transformedProperty = {
                ...transformedProperty,
                NumOfBedroom: 0
            }
        }

        if (NumOfBathroom === "") {
            transformedProperty = {
                ...transformedProperty,
                NumOfBathroom: 0
            }
        }

        if (NumOfAC === "") {
            transformedProperty = {
                ...transformedProperty,
                NumOfAC: 0
            }
        }

        if (NumOfWaterHeater === "") {
            transformedProperty = {
                ...transformedProperty,
                NumOfWaterHeater: 0
            }
        }

        if (HasSwimmingPool === "") {
            transformedProperty = {
                ...transformedProperty,
                HasSwimmingPool: false
            }
        }



        let objToSend = {
            ...transformedProperty,                 // for property details
            Clients: allClients,                // for all clients details
            Contracts: allAmc                   // for all AMC Details
        }
        console.log('objToSend:- ', objToSend);

        // function for post request to edit property 
        editProperty(objToSend)

        // >>>>>>>> set all the states and value to the default state

        // property details
        setPropertyDetails({
            PropertyNo: "",
            DoorNo: "",
            NumOfBedroom: "",
            NumOfBathroom: "",
            NumOfAC: "",
            NumOfWaterHeater: "",
            HasSwimmingPool: "",
            Community: "",
            MasterProject: "",
            Location: "",
            Description: "",
            Latitude: '',
            Longitude: '',
        })

        // clients
        setAllClients([])
        setClientsQuantity([])

        // AMC
        setAllAmc([])
        setAmcQuantity([])

    }

    // clients info handler
    const clientInfoChangeHandler = (e, index) => {
        let { value, name } = e.target
        let objToUpdate = allClients[index]

        let updatedObj = {
            ...objToUpdate,
            [name]: value
        }
        allClients.splice(index, 1, updatedObj)
        setAllClients([...allClients])

        console.log(allClients);
    }

    return (
        <>
            <Container>
                {/* property details */}
                <section className='mt-5'>
                    <div className='d-flex justify-content-center my-5'><h1 className='text-center mb-4 main-heading'>Edit Your Details !.</h1></div>
                    <Row className='mb-3'>
                        <Col sm={12}>
                            <div className='d-flex justify-content-start mb-2'><h1 className='side-heading m-0'>Property Details</h1></div>
                        </Col>
                    </Row>
                    <Row className='align-items-center'>
                        <Col lg={3}>
                            <div className='property-no'>
                                <InputComp value={propertyDetails.PropertyNo} required={true} label={"Property No: *"} type={"text"} placeholder={"Property No"} controlId={"floatingInput-3"} name="PropertyNo" onChange={propertyDetailsHandler} />
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className='door-no'>
                                <InputComp value={propertyDetails.DoorNo} required={true} label={"Door No: *"} type={"text"} placeholder={"Door No"} controlId={"floatingInput-4"} name="DoorNo" onChange={propertyDetailsHandler} />
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className='bedrooms'>
                                <InputComp value={propertyDetails.NumOfBedroom} label={"No of Bedrooms: "} type={"number"} placeholder={"No of Bedrooms"} controlId={"floatingInput-4"} name="NumOfBedroom" onChange={propertyDetailsHandler} />
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className='bathrooms'>
                                <InputComp value={propertyDetails.NumOfBathroom} label={"No of Bathrooms:"} type={"number"} placeholder={"No of Bathrooms"} controlId={"floatingInput-4"} name="NumOfBathroom" onChange={propertyDetailsHandler} />
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className='ac'>
                                <InputComp value={propertyDetails.NumOfAC} label={"No of AC:"} type={"number"} placeholder={"No of AC"} controlId={"floatingInput-4"} name="NumOfAC" onChange={propertyDetailsHandler} />
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className='water-heater'>
                                <InputComp value={propertyDetails.NumOfWaterHeater} label={"No of Water Heater:"} type={"number"} placeholder={"No of Water Heater"} controlId={"floatingInput-4"} name="NumOfWaterHeater" onChange={propertyDetailsHandler} />
                            </div>
                        </Col>

                        <Col lg={3}>
                            <div className='swimming-pool'>
                                <DropDownComp value={propertyDetails.HasSwimmingPool} options={['Has Swimming Pool', 'true', 'false']} name="HasSwimmingPool" onChange={propertyDetailsHandler} />,
                            </div>
                        </Col>

                        <Col lg={3}>
                            <div className='community'>
                                <InputComp value={propertyDetails.Community} label={"Community:"} type={"text"} placeholder={"Community"} controlId={"floatingInput-5"} name="Community" onChange={propertyDetailsHandler} />
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className='master-project'>
                                <InputComp value={propertyDetails.MasterProject} label={"Master Project:"} type={"text"} placeholder={"Master Project"} controlId={"floatingInput-6"} name="MasterProject" onChange={propertyDetailsHandler} />
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className='location'>
                                <InputComp value={propertyDetails.Location} label={"Location:"} type={"text"} placeholder={"Location"} controlId={"floatingInput-7"} name="Location" onChange={propertyDetailsHandler} />
                            </div>
                        </Col>

                        <Col lg={5}>
                            <div className='description'>
                                <DetailDescription value={propertyDetails.Description} controlId={"descriptionBox-1"} label={"Description (optional)"} name="Description" onChange={propertyDetailsHandler} placeholder={"Description (optional)"} className="" />
                            </div>
                        </Col>

                    </Row>

                    {/* Add property map */}
                    <Row className='justify-content-between align-items-center my-5'>
                        <Col md={8}>
                            <AddPropertyDetailsMap />
                        </Col>
                        <Col md={4}>
                            <div className='add-property-map'>
                                <InputComp value={propertyDetails.Latitude} id="latitude" label={"Latitude: "} type={"text"} placeholder={"Latitude"} controlId={"floatingInput-22"} name="Latitude" />
                                <InputComp value={propertyDetails.Longitude} id="longitude" label={"Longitude: "} type={"text"} placeholder={"Longitude"} controlId={"floatingInput-33"} name="Longitude" />
                            </div>
                        </Col>
                    </Row>
                </section>

                {/* client section */}
                <section className='mb-4 mt-5 d-flex align-items-center justify-content-between'>
                    <div className='d-flex justify-content-start mb-2'><h1 className='side-heading m-0'>Add Client</h1></div>
                    <button className='btn btn-secondary btn-2' onClick={addClientHandler}>Add Client <AiOutlinePlus /></button>
                </section>
                {
                    allClients.map((client, index) => (
                        <div key={index} className='client-section client mb-5'>
                            <form onSubmit={(e) => {
                                clientSubmitHandler(e, index, client.Type)
                            }} className='client-section-form'>
                                <Row className='mb-3 justify-content-between align-items-center'>
                                    <Col sm={4}>
                                        <h3 className='m-0 fw-bold'>Select Client</h3>
                                    </Col>
                                    <Col sm={3}>
                                        <DropDownComp className="data-field" value={client.Type} options={["Owner", "Tenant", "Agent"]} onChange={(e) => { clientDropDownHandler(e.target.value, index) }} />
                                    </Col>
                                </Row>

                                <section className='' >
                                    <Row className='mb-3'>
                                        <Col sm={12}>
                                            <h4>{client.Type} Details</h4>
                                        </Col>
                                    </Row>
                                    <Row className='align-items-center'>
                                        <Col lg={3}>
                                            <div className={`${client.Type}-name data-field`}>
                                                <InputComp onChange={(e) => {
                                                    clientInfoChangeHandler(e, index, client.Type)
                                                }} label={`${client.Type} Name: *`} type={"text"} placeholder={`${client.Type} Name`} controlId={""} name={'Name'} value={client.Name} />
                                            </div>
                                        </Col>
                                        <Col lg={3}>
                                            <div className={`${client.Type}-mobile data-field`}>
                                                <InputComp onChange={(e) => {
                                                    clientInfoChangeHandler(e, index, client.Type)
                                                }} label={`${client.Type} Mobile: *`} type={"number"} placeholder={`${client.Type} Mobile`} controlId={""} name={'Mobile'} value={client.Mobile} />
                                            </div>
                                        </Col>
                                        <Col lg={3}>
                                            <div className={`${client.Type}-email data-field`}>
                                                <InputComp onChange={(e) => {
                                                    clientInfoChangeHandler(e, index, client.Type)
                                                }} label={`${client.Type} Email: *`} type={"email"} placeholder={`${client.Type} Email`} controlId={""} name={'Email'} value={client.Email} />
                                            </div>
                                        </Col>
                                        <Col lg={3}>
                                            <div className={`${client.Type}-whatsApp data-field`}>
                                                <InputComp onChange={(e) => {
                                                    clientInfoChangeHandler(e, index, client.Type)
                                                }} label={`${client.Type} WhatsApp: *`} type={"number"} placeholder={`${client.Type} WhatsApp`} controlId={""} name={'Whatsapp'} value={client.Whatsapp} />
                                            </div>
                                        </Col>

                                    </Row>
                                </section>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <button type='submit' className='btn btn-primary btn-main-clr' id='click-to-edit'>Click To Edit</button>
                                    <div className='me-2'>
                                        <button id='edit-btn' className='edit-btn disable' type='button'>
                                            <span className='me-3' onClick={() => { editClientHandler(index) }}  >
                                                <MdModeEditOutline size={25} />
                                            </span>
                                        </button>

                                        <button id='delete-btn' className='delete-btn' type='button'>
                                            <span onClick={() => { deleteClientHandler(index) }} >
                                                <MdDelete size={25} />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    ))
                }

                {/* AMC Details */}
                <section className='mb-4 mt-5 d-flex align-items-center justify-content-between'>
                    <div className='d-flex justify-content-start'><h1 className='m-0 side-heading'>Add AMC</h1></div>
                    <button className='btn btn-secondary btn-2' onClick={addAmcHandler}>Add AMC <AiOutlinePlus /></button>
                </section>

                {
                    allAmc.map((amc, index) => (
                        <div key={index} className='client-section client mb-5'>
                            <form className='amc-form' onSubmit={(e) => {
                                amcSubmitHandler(e, index, amc)
                            }}>
                                <Row className='align-items-center'>
                                    <Row className='justify-content-between align-items-center py-2'>
                                        <Col lg={3}>
                                            <div className='contract-type data-field'>
                                                <DropDownComp onChange={(e) => { amcChangeHandler(e, index) }} value={amc.Type} className="mb-3" options={["Contract Type *", "MEP", "Pest", "Clean", "Pool", "Others"]} name="Type" />
                                            </div>
                                        </Col>

                                        <Col lg={3}>
                                            <div className='contract-status data-field'>
                                                <DropDownComp onChange={(e) => { amcChangeHandler(e, index) }} value={amc.Status} className="mb-3" options={["Contract Status *", "InActive", "Active", "Expired", "Terminated"]} name="Status" />
                                            </div>
                                        </Col>

                                        <Col lg={3}>
                                            <div className='visiting-cycle align-self-lg-start data-field'>
                                                <DropDownComp onChange={(e) => { amcChangeHandler(e, index) }} value={amc.VisitingCycle} className="mb-3" options={["Visiting Cycle *", "Yearly", "Monthly", "Weekly"]} name="VisitingCycle" />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className='justify-content-between align-items-center py-2'>
                                        <Col lg={4}>
                                            <div className='start-date data-field'>
                                                <InputComp onChange={(e) => { amcChangeHandler(e, index) }} label="Start Date: *" type={"date"} placeholder={"Start Date"} controlId={"floatingInput-2"} name="StartDate" value={amc.StartDate} />
                                            </div>
                                        </Col>
                                        <Col lg={4}>
                                            <div className='end-date data-field'>
                                                <InputComp onChange={(e) => { amcChangeHandler(e, index) }} label="End Date: *" type={"date"} placeholder={"End Date"} controlId={"floatingInput-2"} name="EndDate" value={amc.EndDate} />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Col lg={5}>
                                        <div className='description data-field'>
                                            <DetailDescription onChange={(e) => { amcChangeHandler(e, index) }} controlId={"descriptionBox-2"} label={"Description (optional)"} name="Description" placeholder={"Description (optional)"} className="" value={amc.Description ?? ''} />
                                        </div>
                                    </Col>

                                    <div className='mt-3 d-flex justify-content-between align-items-center'>
                                        <button id='click-to-edit-amc' type='submit' className='btn btn-primary btn-main-clr'>Click To Edit</button>
                                        <div className='me-2'>
                                            <button id='edit-btn-amc' className='edit-btn disable' type='button'>
                                                <span className='me-3' onClick={() => { editAmcHandler(index) }}  >
                                                    <MdModeEditOutline size={25} />
                                                </span>
                                            </button>

                                            <button id='delete-btn' className='delete-btn' type='button'>
                                                <span onClick={() => { deleteAmcHandler(index) }} >
                                                    <MdDelete size={25} />
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </Row>
                            </form>
                        </div>

                    ))

                }


                <Row>
                    <Col lg={12} className='text-end mb-5'>
                        <ButtonComp variant={"outline-primary"} className="btn-main-clr text-white" btnText={"Edit Details"} onClick={addDetailsHandler} />
                    </Col>
                </Row>


            </Container>
            {
                isLoading && <Loader />
            }
        </>
    )
}

export default EditDetails