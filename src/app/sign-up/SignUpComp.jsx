'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import Cookies from 'js-cookie'; // Импортируем библиотеку для работы с куки

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    city: '',
    email: '',
  });

  const [step, setStep] = useState(1); // 1 - регистрация, 2 - ввод кода
  const [error, setError] = useState(null);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [serverCode, setServerCode] = useState('');

  const cities = ['Ташкент', 'Самарканд', 'Бухара', 'Фергана', 'Другая страна'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('https://127.0.0.1:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.alreadyRegistered) {
          setError('Вы уже зарегистрированы. Попробуйте войти в систему.');
        } else {
          setServerCode(data.confirmationCode); // Получаем код с сервера
          Cookies.set('confirmation_code', data.confirmationCode, { expires: 1 }); // Сохраняем код в куки на 1 дней
          setStep(2); // Переходим к вводу кода
        }
      } else {
        setError(data.message || 'Ошибка при регистрации.');
      }
    } catch (err) {
      setError('Не удалось отправить данные. Попробуйте снова.');
    }
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();

    const storedCode = Cookies.get('confirmation_code'); // Читаем код из куки
    if (confirmationCode === storedCode) {
      window.location.href = '/vacancy'; // Перенаправляем на CRM-страницу
    } else {
      setError('Неверный код подтверждения.');
    }
  };

  return (
    <div className="registration">
      <div className="registration-blok">
        <div className="registration-blok__section-1">
          <Link href="/"><img src="/images/logo.PNG" alt="" /></Link>
        </div>
        <div className="registration-blok__section-2">
          <div>
            {step === 1 && (
              <form onSubmit={handleSubmit} className='signup-form'>
                <h1>Регистрация</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className="signup-form__section">
                  <div className='signup-form__section-part'>
                    <label>Ф.И.О</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      minLength={3}
                      maxLength={30}
                    />
                  </div>

                  <div className='signup-form__section-part'>
                    <label>Возраст</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      min={16}
                      max={80}
                    />
                  </div>
                </div>

                <div className="signup-form__section">
                  <div className='signup-form__section-part'>
                    <label>Город</label>
                    <select name="city" value={formData.city} onChange={handleChange} required>
                      <option value="" disabled>Выберите город</option>
                      {cities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <div className='signup-form__section-part'>
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

                <div className="signup-blok__section">
                  <button type="submit">Зарегистрироваться</button>
                </div>

                <div className="signup-form__section">
                  <p>Уже есть аккаунт? <Link href="/log-in">Войти</Link></p>
                </div>

              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleCodeSubmit} className='signup-form'>
                <h2>Подтверждение</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className='signup-form__section'>
                  <label>Введите код подтверждения</label>
                  <input
                    type="text"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    required
                  />
                </div>

                <div className="signup-blok__section">
                  <button type="submit">Подтвердить</button>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};