import React from 'react'
import { IoShieldCheckmarkOutline } from "react-icons/io5";

export default function CompanyProfileComp() {
    return (
        <div className='companyprofile'>
            <div className="companyprofile-blok">
                <div className="companyprofile-blok__section-1">
                    <div className="companyprofile-blok__section-1__part">
                        <p>Бухара</p>
                    </div>
                    <div className="companyprofile-blok__section-1__part">
                        <p className='companyprofile-blok__section-1__part__b'>Вакансии</p>
                        <p className='companyprofile-blok__section-1__part__p' style={{ color: 'var(--blue-light-color' }}>
                            <span className='number-style'>5</span> вакансий
                        </p>
                    </div>
                    <div className="companyprofile-blok__section-1__part">
                        <p className='companyprofile-blok__section-1__part__b'>Сфера деятельности</p>
                        <p className='companyprofile-blok__section-1__part__p companyprofile-blok__section-1__part__p-1'>Медицина, фармацевтика, аптеки</p>
                    </div>
                    <div className="companyprofile-blok__section-1__part">
                        <p className='companyprofile-blok__section-1__part__b'>Контактный номер</p>
                        <p className='companyprofile-blok__section-1__part__p'><a href="tel:+998912369665">+998 91 236 96 65</a></p>
                    </div>
                </div>
                <div className="companyprofile-blok__section-2">
                    <div className="companyprofile-blok__section-2__part-1">
                        <h1>ООО VARICOS OFF BUXORO LASER CENTER</h1>
                        {/* <IoShieldCheckmarkOutline className='companyprofile-blok__section-2__part-1__icon' /> */}
                    </div>
                    <div className="companyprofile-blok__section-2__part-2">
                        <button className='companyprofile-blok__section-2__part-2__button'>О Компании</button>
                        <button className='companyprofile-blok__section-2__part-2__button'>Вакансии</button>
                    </div>
                    <div className="companyprofile-blok__section-2__part-3">
                        <p>клиника Varikoz Off</p>
                    </div>
                </div>
            </div>
        </div>
    )
};