'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import Cookies from 'js-cookie'; // Импортируем библиотеку для работы с куки

export default function LogInComp() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('https://127.0.0.1:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Сохраняем токен в куки
                Cookies.set('auth_token', data.token, { expires: 7, secure: true, httpOnly: true }); // Токен будет действителен 7 дней
                // Перенаправляем на страницу вакансий
                window.location.href = '/vacancy';
            } else {
                // Если ошибка, выводим сообщение
                setError(data.message || 'Неверный email или пароль.');
            }
        } catch (err) {
            setError('Ошибка сервера. Попробуйте позже.');
        }
    };

    return (
        <div className='registration'>
            <div className="registration-blok">
                <div className="registration-blok__section-1">
                    <Link href="/"><img src="/images/logo.PNG" alt="" /></Link>
                </div>
                <div className="registration-blok__section-2">
                    <form onSubmit={handleSubmit} className='login-form'>
                        <h1>Вход</h1>
                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <div className='login-form__section'>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='login-form__section'>
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
                            <button type="submit">Войти</button>
                        </div>
                        <div className="login-form__section">
                            <p>Еще не зарегистрирован? <Link href="/sign-up">Зарегистрируйся</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};