import React from 'react'
import "./Footer.css"
import {LiaCopyrightSolid } from "react-icons/lia"

const Footer = () => {
  return (

    <section className='footer-section py-2'>
        <div className='text-center'>
            <p className='m-0'>Copyright <LiaCopyrightSolid size={20} /> Aaliyah International. <span className='fw-700'>Powered by Al Jury IT</span></p>
        </div>
    </section>
  )
}

export default Footer