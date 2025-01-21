'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(Cookies.get('access') || null);
    const [refreshToken, setRefreshToken] = useState(Cookies.get('refresh') || null);

    // Функция для обновления access токена
    const refreshAccessToken = async () => {
        if (refreshToken) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/login/refresh/', {
                    refresh: refreshToken,
                }, {
                    headers: { 'Content-Type': 'application/json' },
                });

                const newAccessToken = response.data.access;
                setAccessToken(newAccessToken);
                Cookies.set('access', newAccessToken, { path: '/' });
            } catch (error) {
                console.error('Ошибка обновления токена:', error.response?.data || error.message);
            }
        }
    };

    // Проверка токена (для использования в других местах)
    const checkAccessToken = async () => {
        if (!accessToken) {
            if (refreshToken) {
                await refreshAccessToken();
            } else {
                // Если нет токенов, можно вернуть false
                return false;
            }
        }
        return true;
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, checkAccessToken, refreshAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);