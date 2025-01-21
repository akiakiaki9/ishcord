'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { IoIosNotifications, IoMdInformationCircleOutline } from "react-icons/io";
import Link from 'next/link';
import { MdDeleteOutline } from "react-icons/md";
import NoAuth from '@/app/components/NoAuth';
import { IoClose } from 'react-icons/io5';

export default function Notifications() {
    const { checkAccessToken, accessToken } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const fetchNotifications = async () => {
        const isTokenValid = await checkAccessToken();
        if (!isTokenValid) {
            // router.push('/auth/login/');
            setIsAuthorized(false);
            return;
        }
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/vacancy/notifications/', {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setNotifications(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке уведомлений:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, [accessToken]);

    const handleDeleteNotifications = async (notificationId) => {
        const isTokenValid = await checkAccessToken();
        if (!isTokenValid) {
            // router.push('/auth/login/');
            setIsAuthorized(false);
            return;
        }
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/vacancy/notifications/delete/${notificationId}/`, {
                headers: { Authorization: `Bearer: ${accessToken}` }
            })
            setNotifications(prevNotifications =>
                prevNotifications.filter(notification => notification.id !== notificationId)
            );
        } catch (error) {
            console.error('Ошибка при удалении уведомлений:', error);
        }
    };

    // if (!isAuthorized) {
    //     return <NoAuth />;
    // };

    return (
        <div>
            <IoIosNotifications onClick={() => setIsModalOpen(true)} style={{ color: isModalOpen ? 'var(--blue-light-color)' : '#fff' }} className="navbar-blok__section__icon" />
            {isModalOpen && (
                <div className="notifications">
                    <div className="notifications__modal">
                        <div className="notifications-blok__header">
                            <h3>Уведомления</h3>
                            <IoClose onClick={() => setIsModalOpen(false)} className='notifications-blok__header__icon' />
                        </div>
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <div className="notifications-blok">
                                    <div key={index} className="notifications-blok__section">
                                        <div className="notifications-blok__section-part-1">
                                            <IoMdInformationCircleOutline className='notifications-blok__section-part-1__icon' />
                                        </div>
                                        <div className="notifications-blok__section-part-2">
                                            <Link href={notification.message.link} className='notifications-blok__section-part-2__a'>{notification.message}</Link>
                                            <Link href={notification.message.author.link} className='notifications-blok__section-part-2__a2'>{notification.message.author}</Link>
                                        </div>
                                        <div className="notifications-blok__section-part-3">
                                            <MdDeleteOutline
                                                onClick={() => handleDeleteNotifications(notification.id)}
                                                className='notifications-blok__section-part-3__icon'
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="notifications-blok">
                                <div className="notifications-blok__section">
                                    <div className="notifications-blok__section-part-1">
                                        <IoMdInformationCircleOutline className='notifications-blok__section-part-1__icon' />
                                    </div>
                                    <div className="notifications-blok__section-part-2">
                                        <Link href="/" className='notifications-blok__section-part-2__a'>Вам ответил работадатель</Link>
                                    </div>
                                    <div className="notifications-blok__section-part-3">
                                        <Link href="/" className='notifications-blok__section-part-3__span'>Akbar Soft</Link>
                                        <MdDeleteOutline
                                            className='notifications-blok__section-part-3__icon'
                                        />
                                    </div>
                                </div>
                                <div className="notifications-blok__section">
                                    <div className="notifications-blok__section-part-1">
                                        <IoMdInformationCircleOutline className='notifications-blok__section-part-1__icon' />
                                    </div>
                                    <div className="notifications-blok__section-part-2">
                                        <Link href="/" className='notifications-blok__section-part-2__a'>Отклик на вакансию "Торговый представитель"</Link>
                                    </div>
                                    <div className="notifications-blok__section-part-3">
                                        <Link href="/" className='notifications-blok__section-part-3__span'>Komfort Textil</Link>
                                        <MdDeleteOutline
                                            className='notifications-blok__section-part-3__icon'
                                        />
                                    </div>
                                </div>
                                <div className="notifications-blok__section">
                                    <div className="notifications-blok__section-part-1">
                                        <IoMdInformationCircleOutline className='notifications-blok__section-part-1__icon' />
                                    </div>
                                    <div className="notifications-blok__section-part-2">
                                        <Link href="/" className='notifications-blok__section-part-2__a'>Отклик на вакансию "Торговый представитель"</Link>
                                    </div>
                                    <div className="notifications-blok__section-part-3">
                                        <Link href="/" className='notifications-blok__section-part-3__span'>Komfort Textil</Link>
                                        <MdDeleteOutline
                                            className='notifications-blok__section-part-3__icon'
                                        />
                                    </div>
                                </div>
                                <div className="notifications-blok__section">
                                    <div className="notifications-blok__section-part-1">
                                        <IoMdInformationCircleOutline className='notifications-blok__section-part-1__icon' />
                                    </div>
                                    <div className="notifications-blok__section-part-2">
                                        <Link href="/" className='notifications-blok__section-part-2__a'>Отклик на вакансию "Торговый представитель"</Link>
                                    </div>
                                    <div className="notifications-blok__section-part-3">
                                        <Link href="/" className='notifications-blok__section-part-3__span'>Komfort Textil</Link>
                                        <MdDeleteOutline
                                            className='notifications-blok__section-part-3__icon'
                                        />
                                    </div>
                                </div>
                                <div className="notifications-blok__section">
                                    <div className="notifications-blok__section-part-1">
                                        <IoMdInformationCircleOutline className='notifications-blok__section-part-1__icon' />
                                    </div>
                                    <div className="notifications-blok__section-part-2">
                                        <Link href="/" className='notifications-blok__section-part-2__a'>Отклик на вакансию "Торговый представитель"</Link>
                                    </div>
                                    <div className="notifications-blok__section-part-3">
                                        <Link href="/" className='notifications-blok__section-part-3__span'>Komfort Textil</Link>
                                        <MdDeleteOutline
                                            className='notifications-blok__section-part-3__icon'
                                        />
                                    </div>
                                </div>
                                <div className="notifications-blok__section">
                                    <div className="notifications-blok__section-part-1">
                                        <IoMdInformationCircleOutline className='notifications-blok__section-part-1__icon' />
                                    </div>
                                    <div className="notifications-blok__section-part-2">
                                        <Link href="/" className='notifications-blok__section-part-2__a'>Отклик на вакансию "Торговый представитель"</Link>
                                    </div>
                                    <div className="notifications-blok__section-part-3">
                                        <Link href="/" className='notifications-blok__section-part-3__span'>Komfort Textil</Link>
                                        <MdDeleteOutline
                                            className='notifications-blok__section-part-3__icon'
                                        />
                                    </div>
                                </div>
                                <div className="notifications-blok__section">
                                    <div className="notifications-blok__section-part-1">
                                        <IoMdInformationCircleOutline className='notifications-blok__section-part-1__icon' />
                                    </div>
                                    <div className="notifications-blok__section-part-2">
                                        <Link href="/" className='notifications-blok__section-part-2__a'>Отклик на вакансию "Торговый представитель"</Link>
                                    </div>
                                    <div className="notifications-blok__section-part-3">
                                        <Link href="/" className='notifications-blok__section-part-3__span'>Komfort Textil</Link>
                                        <MdDeleteOutline
                                            className='notifications-blok__section-part-3__icon'
                                        />
                                    </div>
                                </div>
                                <div className="notifications-blok__section">
                                    <div className="notifications-blok__section-part-1">
                                        <IoMdInformationCircleOutline className='notifications-blok__section-part-1__icon' />
                                    </div>
                                    <div className="notifications-blok__section-part-2">
                                        <Link href="/" className='notifications-blok__section-part-2__a'>Отклик на вакансию "Торговый представитель"</Link>
                                    </div>
                                    <div className="notifications-blok__section-part-3">
                                        <Link href="/" className='notifications-blok__section-part-3__span'>Komfort Textil</Link>
                                        <MdDeleteOutline
                                            className='notifications-blok__section-part-3__icon'
                                        />
                                    </div>
                                </div>
                                <div className="notifications-blok__section">
                                    <div className="notifications-blok__section-part-1">
                                        <IoMdInformationCircleOutline className='notifications-blok__section-part-1__icon' />
                                    </div>
                                    <div className="notifications-blok__section-part-2">
                                        <Link href="/" className='notifications-blok__section-part-2__a'>Отклик на вакансию "Торговый представитель"</Link>
                                    </div>
                                    <div className="notifications-blok__section-part-3">
                                        <Link href="/" className='notifications-blok__section-part-3__span'>Komfort Textil</Link>
                                        <MdDeleteOutline
                                            className='notifications-blok__section-part-3__icon'
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
};