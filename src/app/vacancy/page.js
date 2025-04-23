import React from 'react'
import LayOutComp from './layout/LayOutComp'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function page() {
  return (
    <div>
      <Navbar />
      <LayOutComp />
      <Footer />
    </div>
  )
};