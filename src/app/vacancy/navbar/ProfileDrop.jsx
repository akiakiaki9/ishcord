'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { CgProfile } from "react-icons/cg";
import Cookies from 'js-cookie';

export default function ProfileDrop() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleOutsideClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
        }
    };

    const logout = () => {
        Cookies.remove('access');
        Cookies.remove('refresh');
        router.push('/');
    };

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isDropdownOpen]);

    return (
        <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
            <CgProfile
                className="navbar-blok__section__icon"
                onClick={toggleDropdown}
                style={{ fontSize: '24px', cursor: 'pointer' }}
            />
            {isDropdownOpen && (
                <div className="dropdown">
                    <ul>
                        <li className='dropdown__li-1'><Link href='/vacancy/profile/'>Профиль</Link></li>
                        <li className='dropdown__li-2' onClick={logout}>Выход</li>
                    </ul>
                </div>
            )}
        </div>
    );
};