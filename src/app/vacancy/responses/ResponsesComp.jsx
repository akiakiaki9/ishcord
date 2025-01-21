'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import NoAuth from '@/app/components/NoAuth';
import { useAuth } from '@/AuthContext';
import { useRouter } from 'next/navigation';

export default function ResponsesComp() {
    const [responses, setResponses] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const { checkAccessToken, accessToken } = useAuth();
    const router = useRouter();

    const isAuth = async () => {
        const accessToken = Cookies.get('access');
        const refreshToken = Cookies.get('refresh');

        if (!accessToken && !refreshToken) {
            setIsAuthenticated(false);
        }
    }

    const fetchResponses = async () => {
        const isTokenValid = await checkAccessToken();
        if (!isTokenValid) {
            // router.push('/auth/login/');
            return;
        }
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/vacancy/responses/', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setResponses(response.data);
        } catch (error) {
            console.error('Ошибка при получении откликов:', error);
        }
    };

    const handleRemoveResponse = async (responseId) => {
        const isTokenValid = await checkAccessToken();
        if (!isTokenValid) {
            // router.push('/auth/login/');
            return;
        }

        try {
            await axios.delete(`http://127.0.0.1:8000/api/responses/delete/${responseId}/`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setResponses(responses.filter((response) => response.id !== responseId));
        } catch (error) {
            console.error('Ошибка при удалении отклика:', error);
        }
    };

    // Загружаем отклики при монтировании
    useEffect(() => {
        fetchResponses();
        isAuth(); // Проверка авторизации при монтировании
    }, []);

    if (!isAuthenticated) {
        return <NoAuth />;
    }

    return (
        <div className='layout'>
            <div className='application-blok'>
                {responses.length > 0 ? (
                    <>
                        <h2>Мои отклики</h2>
                        {responses.map((response) => (
                            <div key={response.id} className="application-card">
                                <h3>{response.vacancyTitle}</h3>
                                <button onClick={() => handleRemoveResponse(response.id)}>
                                    Удалить
                                </button>
                            </div>
                        ))}
                    </>
                ) : (
                    <p>Нет откликов.</p>
                )}
            </div>
        </div>
    );
};