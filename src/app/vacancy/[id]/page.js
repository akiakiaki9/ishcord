"use client"
import React from 'react'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import VacancyDetail from './VacancyDetail'

export default function page() {

    return (
        <div>
            <Navbar />
            <VacancyDetail />
            <Footer />
        </div>
    )
};