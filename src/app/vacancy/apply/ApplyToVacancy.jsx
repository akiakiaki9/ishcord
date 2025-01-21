'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/AuthContext';

export default function ApplyToVacancy({ data }) {
    const router = useRouter();
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { checkAccessToken, accessToken } = useAuth();

    const handleApply = async (e) => {
        e.preventDefault();

        const isTokenValid = await checkAccessToken();
        if (!isTokenValid) {
            router.push('/auth/login/');
            return;
        }

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/vacancy/apply/${data.id}/`, {
                message: message
            }, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setMessage('');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Ошибка при отправке отклика:', error);
        }
    };

    return (
        <div>
            <button
                onClick={() => setIsModalOpen(true)}
                className='vacancy__button'>Откликнуться
            </button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={() => setIsModalOpen(false)}>
                            &times;
                        </button>
                        <h3>Отклик на вакансию: {data.name}</h3>
                        <form onSubmit={handleApply}>
                            <div>
                                <label htmlFor="coverLetter">Сопроводительное письмо (желательно):</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Напишите сопроводительное письмо..."
                                />
                            </div>
                            <button type="submit">Отправить</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};