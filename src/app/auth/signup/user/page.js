'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useAuth } from '@/AuthContext';
import VideoBg from '@/app/components/VideoBg';
import { FcGoogle } from 'react-icons/fc';

export default function SignUpUser() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [step, setStep] = useState(1);
    const [error, setError] = useState(null);
    const [confirmationCode, setConfirmationCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { checkAccessToken, accessToken } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEmailSubmit = async (e) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/signup/confirm-email/', {
                email: formData.email
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            Cookies.set('access', response.data.access, { path: '/' });
            Cookies.set('refresh', response.data.refresh, { path: '/' });
            setStep(2);
        } catch (error) {
            console.error('Ошибка отправки email:', error.response?.data || error.message);
            setError('Ошибка отправки email.');
        }
    };

    const handleCodeSubmit = async (e) => {
        e.preventDefault();

        const isTokenValid = await checkAccessToken();
        if (!isTokenValid) {
            router.push('/auth/login/');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/signup/confirm-code/', {
                email: formData.email,
                code: confirmationCode
            }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (response.data.success) {
                setStep(3);
            } else {
                setError('Неверный код подтверждения');
            }
        } catch (error) {
            setError('Сетевая ошибка. Пожалуйста, попробуйте снова.');
        }
    };

    const handleRegisterSubmit = async (e) => {
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
            const response = await axios.post('http://127.0.0.1:8000/api/users/signup/register/', {
                full_name: formData.fullName,
                email: formData.email,
                password: formData.password,
                confirm_password: formData.confirmPassword
            });

            Cookies.set('access', response.data.access, { path: '/' });
            Cookies.set('refresh', response.data.refresh, { path: '/' });
            Cookies.set('userId', response.data.user_id, { path: '/' });
            router.push('/vacancy');
        } catch (error) {
            console.error('Ошибка регистрации:', error.response?.data || error.message);
            setError('Ошибка регистрации.');
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
                        <p className='login-blok__section-1__p2'>Уже есть аккаунт? <Link href="/auth/login">Войти</Link></p>
                    </div>
                    <div className="login-blok__section-2">
                        {step === 1 && (
                            <form onSubmit={handleEmailSubmit} className='login-form'>
                                <h1>Регистрация</h1>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                <div className="login-form__section">
                                    <div className='login-form__section-part'>
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
                                    <button type="submit" disabled={isLoading}>{isLoading ? 'Загрузка' : 'Отправить'}</button>
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
                            <form onSubmit={handleCodeSubmit} className='login-form'>
                                <h2>Подтверждение</h2>
                                {error && <p style={{ color: 'red' }}>{error}</p>}

                                <div className='login-form__section'>
                                    <label>Введите код подтверждения</label>
                                    <input
                                        type="text"
                                        value={confirmationCode}
                                        onChange={(e) => setConfirmationCode(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="login-blok__section">
                                    <button type="submit" disabled={isLoading}>{isLoading ? 'Загрузка' : 'Подтвердить'}</button>
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
                            <form onSubmit={handleRegisterSubmit} className='login-form'>
                                <h2>Завершение регистрации</h2>
                                {error && <p style={{ color: 'red' }}>{error}</p>}

                                <div className="login-form__section">
                                    <div className='login-form__section-part'>
                                        <label>Полное Имя</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                            minLength={2}
                                            maxLength={30}
                                        />
                                    </div>
                                    <div className='login-form__section-part'>
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className='login-form__section-part'>
                                        <label>Пароль</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className='login-form__section-part'>
                                        <label>Подтвердить пароль</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="login-form__section">
                                        <p>Уже есть аккаунт? <Link href="/auth/login">Войти</Link></p>
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
    );
};