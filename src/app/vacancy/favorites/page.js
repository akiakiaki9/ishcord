import React from 'react'
import NavbarComp from '../navbar/NavbarComp'
import MenuComp from '../menu/MenuComp'
import FavoritesComp from './FavoritesComp'

export default function Favorites() {
    return (
        <div>
            <NavbarComp />
            <MenuComp />
            <FavoritesComp />
        </div>
    )
}
