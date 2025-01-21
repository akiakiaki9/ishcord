'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { MdEdit } from "react-icons/md";
import { useAuth } from '@/AuthContext';
import NoAuth from '@/app/components/NoAuth';

function ProfileSection({ label, value, onEdit }) {
    return (
        <div className="profile-blok__section">
            <p className='profile-blok__section-p1'>{label}:</p>
            <p className='profile-blok__section-p2'>{value}</p>
            <p className='profile-blok__section-p3'>
                <MdEdit className='profile-blok__section__icon' onClick={onEdit} />
            </p>
        </div>
    );
}

export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const { checkAccessToken, accessToken } = useAuth();
    const router = useRouter();

    const fetchUserData = async () => {
        setLoading(true);
        const isTokenValid = await checkAccessToken();
        if (!isTokenValid) {
            // router.push('/auth/login/');
            return;
        }

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user/', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setUser(response.data);
            setIsAuthorized(true);
        } catch (error) {
            console.error('Ошибка при загрузке данных пользователя:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveChanges = async () => {
        try {
            const response = await axios.patch('http://127.0.0.1:8000/api/user/', formData, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setUser(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Ошибка при обновлении данных пользователя:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const logout = () => {
        Cookies.remove('access');
        Cookies.remove('refresh');
        router.push('/auth/login');
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    if (loading) return <p>Загрузка...</p>;
    if (!isAuthorized) return <NoAuth />;
    if (!user) return null;

    return (
        <div className='layout'>
            <div className='profile'>
                <h1>{user.role === 'user' ? 'Мой профиль' : 'Профиль компании'}</h1>
                {isEditing ? (
                    <div>
                        <label>Имя:</label>
                        <input type="text" name="name" value={formData.name || ''} onChange={handleInputChange} />
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email || ''} onChange={handleInputChange} />
                        <button onClick={handleSaveChanges}>Сохранить изменения</button>
                        <button onClick={() => setIsEditing(false)}>Отменить</button>
                    </div>
                ) : (
                    <div className='profile-blok'>
                        <ProfileSection label="Имя" value={user.full_name} onEdit={() => setIsEditing(true)} />
                        <ProfileSection label="Почта" value={user.email} onEdit={() => setIsEditing(true)} />
                        <div className="profile-footer">
                            <p onClick={logout} className='profile-footer-p1'>Выйти из аккаунта</p>
                            <p className='profile-footer-p2'>Удалить аккаунт</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};