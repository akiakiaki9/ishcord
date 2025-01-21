'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import FavoritesDelete from './FavoritesDelete';
import NoAuth from '@/app/components/NoAuth';
import Link from 'next/link';
import { useAuth } from '@/AuthContext';
import { MdFavorite } from "react-icons/md";

export default function FavoritesComp() {
    const [favorites, setFavorites] = useState([]);
    const [isAuthorization, setIsAuthorization] = useState(!!Cookies.get('access'));
    const router = useRouter();
    const { checkAccessToken, accessToken } = useAuth();

    const fetchFavorites = async () => {
        const isTokenValid = await checkAccessToken();
        if (!isTokenValid) {
            // router.push('/auth/login/');
            return;
        }

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/favorites/', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setFavorites(response.data);
        } catch (error) {
            console.error('Ошибка при получении избранных вакансий:', error);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <div className='layout'>
            <div className="favorites">
                {isAuthorization ? (
                    favorites.length > 0 ? (
                        <>
                            <div className="favorites-header">
                                <h2>Избранные вакансии</h2>
                                <MdFavorite />
                            </div>
                            <div className="favorites-blok">
                                {favorites.map((vacancy) => (
                                    <div className="vacancy__card" key={vacancy.id}>
                                        <div className="vacancy__card__header">
                                            <Link href={`/vacancy/${vacancy.id}`}><h3>Собиратель голосов общественного мнения</h3></Link>
                                            <FavoritesDelete
                                                vacancy={vacancy}
                                                onRemove={() => setFavorites(favorites.filter(fav => fav.id !== vacancy.id))}
                                            />
                                        </div>
                                        <div className="vacancy__card__section-1">
                                            <p>3 000 000 - 5 000 000 UZS</p>
                                        </div>
                                        <div className="vacancy__card__section-2">
                                            <div className="vacancy__card__section-2__part">
                                                <p>ООО СВОИ</p>
                                                <IoShieldCheckmarkOutline className='vacancy__card__section-2__icon' />
                                            </div>
                                            <div className="vacancy__card__section-2__part">
                                                <p>Ташкент</p>
                                            </div>
                                        </div>
                                        <div className="vacancy__card__footer">
                                            <button className='vacancy__button'>Откликнуться</button>
                                        </div>
                                        <p className='favorites__footer__p'>Добавлено в {vacancy.createdAt}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div>
                            <p>Нет избранных</p>
                        </div>
                    )
                ) : (
                    <div>
                        <div className="favorites-header">
                            <h2>Избранные вакансии</h2>
                            <MdFavorite />
                        </div>
                        <div className="favorites-blok">
                            <div className="vacancy__card">
                                <div className="vacancy__card__header">
                                    <Link href="/"><h3>Собиратель голосов общественного мнения</h3></Link>
                                    <FavoritesDelete />
                                </div>
                                <div className="vacancy__card__section-1">
                                    <p>3 000 000 - 5 000 000 UZS</p>
                                </div>
                                <div className="vacancy__card__section-2">
                                    <div className="vacancy__card__section-2__part">
                                        <Link href='/'><p>ООО СВОИ</p></Link>
                                        <IoShieldCheckmarkOutline className='vacancy__card__section-2__icon' />
                                    </div>
                                    <div className="vacancy__card__section-2__part">
                                        <p className='vacancy__card__footer-p'>Ташкент</p>
                                    </div>
                                </div>
                                <div className="vacancy__card__footer">
                                    <button className='vacancy__button'>Откликнуться</button>
                                </div>
                                <p className='favorites__footer__p'>Добавлено в 20:00</p>
                            </div>
                            <div className="vacancy__card">
                                <div className="vacancy__card__header">
                                    <Link href="/"><h3>Собиратель голосов общественного мнения</h3></Link>
                                    <FavoritesDelete />
                                </div>
                                <div className="vacancy__card__section-1">
                                    <p>3 000 000 - 5 000 000 UZS</p>
                                </div>
                                <div className="vacancy__card__section-2">
                                    <div className="vacancy__card__section-2__part">
                                        <Link href='/'><p>ООО СВОИ</p></Link>
                                        <IoShieldCheckmarkOutline className='vacancy__card__section-2__icon' />
                                    </div>
                                    <div className="vacancy__card__section-2__part">
                                        <p className='vacancy__card__footer-p'>Ташкент</p>
                                    </div>
                                </div>
                                <div className="vacancy__card__footer">
                                    <button className='vacancy__button'>Откликнуться</button>
                                </div>
                                <p className='favorites__footer__p'>Добавлено в 20:00</p>
                            </div>
                            <div className="vacancy__card">
                                <div className="vacancy__card__header">
                                    <Link href="/"><h3>Собиратель голосов общественного мнения</h3></Link>
                                    <FavoritesDelete />
                                </div>
                                <div className="vacancy__card__section-1">
                                    <p>3 000 000 - 5 000 000 UZS</p>
                                </div>
                                <div className="vacancy__card__section-2">
                                    <div className="vacancy__card__section-2__part">
                                        <Link href='/'><p>ООО СВОИ</p></Link>
                                        <IoShieldCheckmarkOutline className='vacancy__card__section-2__icon' />
                                    </div>
                                    <div className="vacancy__card__section-2__part">
                                        <p className='vacancy__card__footer-p'>Ташкент</p>
                                    </div>
                                </div>
                                <div className="vacancy__card__footer">
                                    <button className='vacancy__button'>Откликнуться</button>
                                </div>
                                <p className='favorites__footer__p'>Добавлено в 20:00</p>
                            </div>
                            <div className="vacancy__card">
                                <div className="vacancy__card__header">
                                    <Link href="/"><h3>Собиратель голосов общественного мнения</h3></Link>
                                    <FavoritesDelete />
                                </div>
                                <div className="vacancy__card__section-1">
                                    <p>3 000 000 - 5 000 000 UZS</p>
                                </div>
                                <div className="vacancy__card__section-2">
                                    <div className="vacancy__card__section-2__part">
                                        <Link href='/'><p>ООО СВОИ</p></Link>
                                        <IoShieldCheckmarkOutline className='vacancy__card__section-2__icon' />
                                    </div>
                                    <div className="vacancy__card__section-2__part">
                                        <p className='vacancy__card__footer-p'>Ташкент</p>
                                    </div>
                                </div>
                                <div className="vacancy__card__footer">
                                    <button className='vacancy__button'>Откликнуться</button>
                                </div>
                                <p className='favorites__footer__p'>Добавлено в 20:00</p>
                            </div>
                            <div className="vacancy__card">
                                <div className="vacancy__card__header">
                                    <Link href="/"><h3>Собиратель голосов общественного мнения</h3></Link>
                                    <FavoritesDelete />
                                </div>
                                <div className="vacancy__card__section-1">
                                    <p>3 000 000 - 5 000 000 UZS</p>
                                </div>
                                <div className="vacancy__card__section-2">
                                    <div className="vacancy__card__section-2__part">
                                        <Link href='/'><p>ООО СВОИ</p></Link>
                                        <IoShieldCheckmarkOutline className='vacancy__card__section-2__icon' />
                                    </div>
                                    <div className="vacancy__card__section-2__part">
                                        <p className='vacancy__card__footer-p'>Ташкент</p>
                                    </div>
                                </div>
                                <div className="vacancy__card__footer">
                                    <button className='vacancy__button'>Откликнуться</button>
                                </div>
                                <p className='favorites__footer__p'>Добавлено в 20:00</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};