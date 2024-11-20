'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function FavoritesComp() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/favorites');
                setFavorites(response.data);
            } catch (error) {
                console.error('Ошибка при получении избранных вакансий:', error);
            }
        };
        fetchFavorites();
    }, []);

    return (
        <div className='layout'>
            <div className="favorites-blok">
                <h2>Избранные вакансии</h2>
                {favorites.length > 0 ? (
                    favorites.map((vacancy) => (
                        <div key={vacancy.id} className="vacancy-card">
                            <h3>{vacancy.title}</h3>
                            <p>Город: {vacancy.city}</p>
                            <p>Зарплата: {vacancy.salary} UZS</p>
                            <p>Категория: {vacancy.category}</p>
                        </div>
                    ))
                ) : (
                    <p>Нет избранных вакансий.</p>
                )}
            </div>
        </div>
    );
};