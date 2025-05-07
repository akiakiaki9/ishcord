"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

export default function Shapka() {
    const [categories, setCategories] = useState([]);
    const [openCategoryIndex, setOpenCategoryIndex] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        fetch("https://api.hh.ru/professional_roles")
            .then(res => res.json())
            .then(data => {
                setCategories(data.categories);
            })
            .catch(err => console.error("Ошибка загрузки категорий:", err));

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseEnter = (index) => {
        if (!isMobile) {
            setOpenCategoryIndex(index);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            setOpenCategoryIndex(null);
        }
    };

    const handleTouchClick = (index) => {
        if (isMobile) {
            setOpenCategoryIndex(prevIndex => prevIndex === index ? null : index);
        }
    };

    return (
        <div className="shapka">
            <div className="shapka-blok">
                <div className="dropdown">
                    {categories.map((category, index) => (
                        <div
                            key={category.id}
                            className="dropdown-item"
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleTouchClick(index)}
                        >
                            <div
                                className="dropdown-header"
                                style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                            >
                                <span>{category.name}</span>
                                <IoIosArrowDown
                                    style={{ transform: openCategoryIndex === index ? "rotate(180deg)" : "rotate(0)", transition: "0.3s" }}
                                />
                            </div>
                            {openCategoryIndex === index && (
                                <ul className="subcategory-list">
                                    {category.roles.map(role => (
                                        <li key={role.id} className="subcategory-item">
                                            <Link href={`/vacancies/${encodeURIComponent(role.name)}`}>
                                                {role.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <br />
            <br />
            <div className="shapka-blok">
                <Link href='/vacancy/tashkent' className='shapka-blok__a'>Ташкент</Link>
                <Link href='/vacancy/andijan' className='shapka-blok__a'>Андижан</Link>
                <Link href='/vacancy/bukhara' className='shapka-blok__a'>Бухара</Link>
                <Link href='/vacancy/samarkand' className='shapka-blok__a'>Самарканд</Link>
                <Link href='/vacancy/fergana' className='shapka-blok__a'>Фергана</Link>
                <Link href='/vacancy/namangan' className='shapka-blok__a'>Наманган</Link>
                <Link href='/vacancy/gulistan' className='shapka-blok__a'>Гулистан</Link>
                <Link href='/vacancy/jizakh' className='shapka-blok__a'>Джизак</Link>
                <Link href='/vacancy/navoi' className='shapka-blok__a'>Навои</Link>
                <Link href='/vacancy/karshi' className='shapka-blok__a'>Карши</Link>
                <Link href='/vacancy/termez' className='shapka-blok__a'>Термез</Link>
                <Link href='/vacancy/urgench' className='shapka-blok__a'>Ургенч</Link>
                <Link href='/vacancy/nukus' className='shapka-blok__a'>Нукус</Link>
            </div>
            <style jsx>{`
                .shapka {
                    padding: 20px;
                    background-color: #f0f0f0;
                    border-bottom: 1px solid #ccc;
                }

                .shapka-blok {
                    display: flex;
                    justify-content: start;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .dropdown {
                    display: flex;
                    justify-content: start;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .dropdown-item {
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    overflow: visible;
                    position: relative;
                }

                .dropdown-header {
                    padding: 10px 15px;
                    background-color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .dropdown-header span {
                    min-width: 150px;
                }

                .subcategory-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    background-color: #f9f9f9;
                    border: 1px solid #ccc;
                    border-top: none;
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    z-index: 10;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    max-height: 300px; /* Установите желаемую максимальную высоту */
                    overflow-y: auto; /* Добавляем вертикальную прокрутку при необходимости */
                }

                .subcategory-item {
                    padding: 10px 20px;
                    cursor: pointer;
                }

                .subcategory-item:hover {
                    background-color: #eee;
                }

                @media (max-width: 768px) {
                    .subcategory-item {
                        font-size: 90%;
                    }
                    .dropdown-header span {
                        font-size: 90%;
                    }
                }
            `}</style>
        </div>
    );
};