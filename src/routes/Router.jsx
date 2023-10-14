import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/pages/Home/Home'
import Login from '../components/pages/Login/Login'
import { DisplayDetails, EditDetails, AddProperty } from '../components/pages/Property'
import DisplayMap from '../components/pages/Property/Map/DisplayMap'
import CardListing from '../components/pages/Property/CardListing'
import AllPropertyListing from '../components/pages/Property/AllPropertyListing'
import PrivateRoute from '../PrivateRoutes/PrivateRoute'



const Router = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route element={<PrivateRoute />}>
                    <Route path='/home' element={<Home />}>
                        <Route path='map' element={<DisplayMap />} />
                        <Route path='addProperty' element={<AddProperty />} />
                        <Route path='listing' element={<AllPropertyListing />} />
                        <Route path='displayDetails/:id' element={<DisplayDetails />} />
                        <Route path='editDetails/:id' element={<EditDetails />} />
                    </Route>
                </Route>
            </Routes>
        </>
    )
}

export default Router