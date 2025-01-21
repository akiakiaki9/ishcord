'use client'
import { useAuth } from '@/AuthContext'
import axios from 'axios'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function ForgotComp() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { checkAccessToken, accessToken } = useAuth();

    // шаг 1 отправка почты
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/forgot-password/email/',
                { email: email },
                { headers: { 'Content-Type': 'application/json' } });

            Cookies.set('access', response.data.access, { path: '/' });
            Cookies.set('refresh', response.data.refresh, { path: '/' });
            setStep(2);
        } catch (error) {
            console.error('Ошибка при отправки почты:', error.response?.data || error.message);
            setError('Ошибка при отправки почты');
        } finally {
            setIsLoading(false);
        }
    };

    // шаг 2 отправка кода подтверждения
    const handleConfirmationSubmit = async (e) => {
        e.preventDefault();

        const isTokenValid = await checkAccessToken();
        if (!isTokenValid) {
            router.push('/auth/login/');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/users/forgot-password/code/', {
                email: email,
                code: confirmationCode,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (response.data.success) {
                setStep(3);
            } else {
                setError('Не правильный код подтверждения');
            }
        } catch (error) {
            console.error('Ошибка кода подтверждения:', error.response?.data || error.message);
            setError('Ошибка кода подтверждения');
        } finally {
            setIsLoading(false);
        }
    };

    // Шаг 3: Регистрация
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        const isTokenValid = await checkAccessToken();
        if (!isTokenValid) {
            router.push('/auth/login/');
            return;
        }

        try {
            const response = await axios.put('http://127.0.0.1:8000/api/users/signup/register/', {
                password: password,
                confirm_password: confirmPassword
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

            Cookies.set('access', response.data.access, { path: '/' });
            Cookies.set('refresh', response.data.refresh, { path: '/' });
            Cookies.set('userId', response.data.user_id, { path: '/' });
            router.push('/');
        } catch (error) {
            console.error('Ошибка регистрации:', error.response?.data || error.message);
            setError('Ошибка регистрации');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='registration'>
            <div className="registration-blok">
                <div className="registration-blok__section-1">
                    <Link href="/"><img src="/images/logo.PNG" alt="IshCord Logo" /></Link>
                </div>
                <div className="registration-blok__section-2">
                    <div>
                        {step === 1 && (
                            <form onSubmit={handleEmailSubmit} className="signup-form">
                                <div className="register-header">
                                    <h1>Восстановить пароль</h1>
                                    <p>Введите почту для восстановления пароля</p>
                                </div>
                                {error && <p className='message'>{error}</p>}
                                <div className="signup-form__section">
                                    <div className="signup-form__section-part">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="signup-form__section">
                                    <button type='submit' disabled={isLoading}>{isLoading ? 'Загрузка...' : 'Отправить'}</button>
                                </div>
                            </form>
                        )}
                        {step === 2 && (
                            <form onSubmit={handleConfirmationSubmit}>
                                <div className="register-header">
                                    <h1>Введите код подтверждения</h1>
                                    <p>На вашу почту был отправлен код подтверждения</p>
                                </div>
                                {error && <p className='message'>{error}</p>}
                                <div className="signup-form__section">
                                    <label>Код Подтверждения</label>
                                    <input
                                        type="number"
                                        name="code"
                                        value={confirmationCode}
                                        onChange={(e) => setConfirmationCode(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="signup-form__section">
                                    <button type='submit' disabled={isLoading}>{isLoading ? 'Загрузка...' : 'Подтвердить'}</button>
                                </div>
                            </form>
                        )}
                        {step === 3 && (
                            <form onSubmit={handleSubmit}>
                                <div className="register-header">
                                    <h1>Введите новый пароль</h1>
                                    <p>Введите новый пароль</p>
                                </div>
                                {error && <p className='message'>{error}</p>}
                                <div className="signup-form__section">
                                    <div className="signup-form__section-part">
                                        <label>Пароль</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            minLength={8}
                                        />
                                    </div>
                                </div>
                                <div className="signup-form__section">
                                    <div className="signup-form__section-part">
                                        <label>Подтвердите Пароль</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            minLength={8}
                                        />
                                    </div>
                                </div>
                                <div className="signup-form__section">
                                    <button type='submit' disabled={isLoading}>{isLoading ? 'Загрузка...' : 'Подтвердить'}</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};