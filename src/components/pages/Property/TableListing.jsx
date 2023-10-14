import React, { useContext, useEffect, useRef, useState, forwardRef } from 'react'
import { Container, Form, InputGroup, Table } from 'react-bootstrap'
import ListingWrapper from './ListingWrapper/ListingWrapper'
import "./TableListing.css"
import { CustomCheckBox } from '../../bootstrap'
import { PropertyContext } from '../../../context/PropertyContext'
import { Link } from 'react-router-dom'
import Loader from '../../Loader/Loader'

const TableListing = (props) => {

  // const ref = forwardRef();

  const { isLoading, getAllPropertyListingForTable, tableListing, isCheckedPropertyHandler, setIsChecked, isChecked } = useContext(PropertyContext)

  useEffect(() => {
    getAllPropertyListingForTable()
  }, [])

  // handle check
  const propertyCheckHandler = (e, Id, index) => {
    isCheckedPropertyHandler(e, Id, index)
  };

  // for uncheck all checked boxes
  const Unchecked = () => {
    console.log('total checked:- ', ref.current.length)
    for (let i = 0; i < ref.current.length; i++) {
      ref.current[i].checked = false;
    }
  }

  return (
    <>
      <ListingWrapper>
        <section>
          {
            isLoading ? <Loader />:<>
              {
                tableListing.length < 1 ? <h1 className='mt-5 text-main-clr text-center'>No property Added !</h1> :(
                <Table bordered className='property-listing-table'>
                  <thead className='listing-table-header'>
                    <tr>
                      <th></th>
                      <th>RS Ref No</th>
                      <th>Location</th>
                      <th>Contract Type</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Contract Status</th>
                      <th>Contact No</th>
                      <th>Tenant Name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      tableListing.map((property, index) => (
                        <tr key={index}>
                          <td>
                            <CustomCheckBox
                              value={isChecked}
                              onChange={(e) => { propertyCheckHandler(e, property.Id, index) }}
                            // ref={ref}
                            />
                          </td>
                          <td>{property.Id}</td>
                          <td>{property.Location}</td>
                          <td>
                            {property.Contracts.length > 0 ? property.Contracts[0].Type : "-"}
                          </td>
                          <td>{property.Contracts.length > 0 ? property.Contracts[0].StartDate : "-"}</td>
                          <td>{property.Contracts.length > 0 ? property.Contracts[0].EndDate : "-"}</td>
                          <td className={`${property.Contracts.length > 0 && property.Contracts[0].Status === 'Active' ? "active" : ""}`}>{property.Contracts.length > 0 ? property.Contracts[0].Status : "-"}</td>
                          <td>{property.TenantContactNo ? property.TenantContactNo : "-"}</td>
                          <td>{property.TenantName ? property.TenantName : "-"}</td>
                          <td>
                            <button className='btn btn-main-clr text-white fs-14'>
                              <Link to={`/home/displayDetails/${property.Id}`} className='text-white fw-700 fs-14'>More Detail</Link>
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
                )
              }
            </>
          }
        </section>
      </ListingWrapper>
    </>
  )
}

export default TableListing