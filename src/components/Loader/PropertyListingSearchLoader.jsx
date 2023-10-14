import React from 'react'
import "./PropertyListingSearchLoader.css"
const PropertyListingSearchLoader = () => {
    return (
        <div className="searching-loader-wrapper">
            <div className='d-flex align-items-center gap-3 text-white'>
                <span className="search-loader"></span>
                <h4 className='m-0 loader-text'>Searching ...</h4>
            </div>
        </div>
    )
}

export default PropertyListingSearchLoader