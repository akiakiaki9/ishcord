'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAuth } from '@/AuthContext';
import VideoBg from '@/app/components/VideoBg';
import { FcGoogle } from 'react-icons/fc';

export default function SignUpComp() {
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        address: '',
        phone: '',
        email: '',
    });
    const { checkAccessToken, accessToken } = useAuth();
    const [step, setStep] = useState(1);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Шаг 1: Отправка email
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/signup/',
                { email: formData.email },
                { headers: { 'Content-Type': 'application/json' } });

            Cookies.set('access', response.data.access, { path: '/' });
            Cookies.set('refresh', response.data.refresh, { path: '/' });
            setStep(2);
        } catch (error) {
            console.error('Ошибка отправки почты:', error.response?.data || error.message);
            setError('Ошибка отправки кода подтверждения');
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
            const response = await axios.post('http://127.0.0.1:8000/api/users/verify/', {
                email: formData.email,
                code: formData.confirmationCode,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (response.data.success) {
                setStep(3);
            } else {
                setError('Неправильный код подтверждения');
            }
        } catch (error) {
            console.error('Ошибка кода подтверждения:', error.response?.data || error.message);
            setError('Ошибка при подтверждения кода');
        } finally {
            setIsLoading(false);
        }
    };

    // Шаг 3: Регистрация
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        const isTokenValid = await checkAccessToken();
        if (!isTokenValid) {
            router.push('/auth/login/');
            return;
        }

        try {
            const response = await axios.put('http://127.0.0.1:8000/api/users/signup/register', {
                email: formData.email,
                fullname: formData.name,
                password: formData.password,
                confirm_password: formData.confirmPassword,
                role: 'company'
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
            router.push('/vacancy')
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
            setError('Ошибка регистрации');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login">
            <div className='login__container'>
                <div className='login-blok-1'>
                    <VideoBg />
                </div>
                <div className="login-blok-2">
                    <div className="login-blok__section-1">
                        <p className='login-blok__section-1__p1'>Добро пожаловать в IshCord</p>
                        <p className='login-blok__section-1__p2'>Уже есть аккаунт? <Link href="/auth/signup">Войти</Link></p>
                    </div>
                    <div className="login-blok__section-2">
                        {step === 1 && (
                            <form onSubmit={handleEmailSubmit} className="login-form">
                                <h1>Регистрация</h1>
                                {error && <p style={{ color: 'red' }}>{error}</p>}

                                <div className="login-form__section">
                                    <div className="login-form__section-part">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="login-blok__section">
                                    <button type="submit" disabled={isLoading}>{isLoading ? 'Загрузка...' : 'Отправить'}</button>
                                </div>
                                <div className="login-form__footer">
                                    <Link href="/">В Главное</Link>
                                </div>
                                <div className="login-form__google">
                                    <FcGoogle className='login-form__google__icon' />
                                    <p>Регистрация с Google</p>
                                    <div></div>
                                </div>
                            </form>
                        )}
                        {step === 2 && (
                            <form onSubmit={handleConfirmationSubmit} className="login-form">
                                <h2>Введите код подтверждения</h2>
                                {error && <p style={{ color: 'red' }}>{error}</p>}

                                <div className="login-form__section">
                                    <label>На вашу почту был отправлен код подтверждения</label>
                                    <input
                                        type="text"
                                        value={confirmationCode}
                                        onChange={(e) => setConfirmationCode(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="login-blok__section">
                                    <button type="submit" disabled={isLoading}>{isLoading ? 'Загрузка...' : 'Подтвердить'}</button>
                                </div>
                                <div className="login-form__footer">
                                    <Link href="/">В Главное</Link>
                                </div>
                                <div className="login-form__google">
                                    <FcGoogle className='login-form__google__icon' />
                                    <p>Регистрация с Google</p>
                                    <div></div>
                                </div>
                            </form>
                        )}
                        {step === 3 && (
                            <form onSubmit={handleSubmit} className="login-form">
                                <h2>Заполните данные компании</h2>
                                {error && <p style={{ color: 'red' }}>{error}</p>}

                                <div className="login-form__section">
                                    <div className="login-form__section-part">
                                        <label>Название</label>
                                        <input
                                            type="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="login-form__section-part">
                                        <label>Почта</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="login-form__section">
                                    <div className="login-form__section-part">
                                        <label>Пароль</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="login-form__section-part">
                                        <label>Пароль</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="login-blok__section">
                                    <button type="submit" disabled={isLoading}>{isLoading ? 'Загрузка...' : 'Завершить'}</button>
                                </div>
                                <div className="login-form__footer">
                                    <Link href="/">В Главное</Link>
                                </div>
                                <div className="login-form__google">
                                    <FcGoogle className='login-form__google__icon' />
                                    <p>Регистрация с Google</p>
                                    <div></div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};