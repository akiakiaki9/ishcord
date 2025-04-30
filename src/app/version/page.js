import React from 'react'
import Navbar from '../components/Navbar'
import Version from './Version'
import Footer from '../components/Footer'

export default function page() {
    return (
        <div>
            <Navbar />
            <Version />
            <Footer />
        </div>
    )
};