'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";
import VideoBg from '@/app/components/VideoBg';

export default function LogInComp() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/auth/login/', {
                email: formData.email,
                password: formData.password
            }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            Cookies.set('access', refreshResponse.data.access, { path: '/' });
            Cookies.set('refresh', refreshResponse.data.refresh, { path: '/' });
            Cookies.set('userId', refreshResponse.data.user_id, { path: '/' });
            router.push('/');
        } catch (error) {
            console.error(error);
            setError('Неверный email или пароль.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login">
            <div className="login__container">
                <div className="login-blok-1">
                    <VideoBg />
                </div>
                <div className="login-blok-2">
                    <div className="login-blok__section-1">
                        <p className='login-blok__section-1__p1'>Добро пожаловать в IshCord</p>
                        <p className='login-blok__section-1__p2'>Еще нет аккаунта? <Link href="/auth/signup">Зарегистрироваться</Link></p>
                    </div>
                    <div className="login-blok__section-2">
                        <form onSubmit={handleSubmit} className="login-form">
                            <h1>Вход</h1>
                            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                            <div className="login-form__section">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="login-form__section">
                                <label>Пароль</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="login-form__section">
                                <button type="submit" disabled={loading}>{loading ? 'Загрузка' : 'Войти'}</button>
                            </div>
                            <div className="login-form__footer">
                                <Link href="/auth/forgot-password">Забыли пароль?</Link>
                                <Link href="/">В Главное</Link>
                            </div>
                            <div className="login-form__google">
                                <FcGoogle className='login-form__google__icon' />
                                <p>Вход с Google</p>
                                <div></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};