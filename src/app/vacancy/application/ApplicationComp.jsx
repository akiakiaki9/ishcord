'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ApplicationsComp() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/applications');
                setApplications(response.data);
            } catch (error) {
                console.error('Ошибка при получении откликов:', error);
            }
        };

        fetchApplications();
    }, []);

    return (
        <div className='layout'>
            <div className='application-blok'>
                <h2>Мои отклики</h2>
                {applications.length > 0 ? (
                    applications.map((application) => (
                        <div key={application.id} className="application-card">
                            <h3>{application.vacancyTitle}</h3>
                            <p>Сопроводительное письмо: {application.coverLetter}</p>
                        </div>
                    ))
                ) : (
                    <p>Нет откликов.</p>
                )}
            </div>
        </div>
    );
};