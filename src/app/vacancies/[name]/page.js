import React from 'react'
import Vacansies from './Vacancies'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import ScrollTop from '@/app/components/ScrollToTop'

export default function page() {
    return (
        <div>
            <Navbar />
            <Vacansies />
            <ScrollTop />
            <Footer />
        </div>
    )
};