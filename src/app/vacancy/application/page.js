import React from 'react'
import NavbarComp from '../navbar/NavbarComp'
import MenuComp from '../menu/MenuComp'
import ApplicationsComp from './ApplicationComp'

export default function Application() {
    return (
        <div>
            <NavbarComp />
            <MenuComp />
            <ApplicationsComp />
        </div>
    )
};