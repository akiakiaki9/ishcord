'use client'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { MdDeleteOutline } from 'react-icons/md';

export default function FavoritesDelete({ vacancy, onRemove }) {
    const router = useRouter();
    const [favorites, setFavorites] = useState([]);

    const handleRemoveVacancy = async (vacancyId) => {
        const accessToken = Cookies.get('access');
        const refreshToken = Cookies.get('refresh');

        if (!accessToken) {
            if (!refreshToken) {
                return;
            }

            try {
                const refreshResponse = await axios.post('http://127.0.0.1:8000/api/login/refresh/', {
                    refresh: refreshToken
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });

                Cookies.set('access', refreshResponse.data.access, { path: '/' });
            } catch (refreshError) {
                console.error('Ошибка обновления токена:', refreshError.response?.data || refreshError.message);
                router.push('/auth/login');
                return;
            }
        }

        try {
            await axios.delete(`http://127.0.0.1:8000/favorites/${vacancyId}/delete`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            onRemove();
            setFavorites(favorites.filter((vacancy) => vacancy.id !== vacancyId));
        } catch (error) {
            onError('Ошибка при удалении вакансии');
            console.error('Ошибка при удалении вакансии:', error);
        }
    };

    return (
        <div>
            <MdDeleteOutline className='vacancy__card__header__icon__delete' onClick={() => handleRemoveVacancy(vacancy.id)} />
        </div>
    )
};