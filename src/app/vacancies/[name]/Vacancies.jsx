"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';
import { FaInfoCircle } from 'react-icons/fa';

export default function Vacancies() {
    const params = useParams();
    const roleName = decodeURIComponent(params?.name || '');
    const [roleId, setRoleId] = useState(null);
    const [vacancies, setVacancies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (!roleName) return;

        const fetchRoleId = async () => {
            try {
                const { data } = await axios.get('https://api.hh.ru/professional_roles');
                const allRoles = data.categories.flatMap(cat => cat.roles);
                const matchedRole = allRoles.find(role => role.name.toLowerCase() === roleName.toLowerCase());

                if (matchedRole) {
                    setRoleId(matchedRole.id);
                    setNotFound(false);
                } else {
                    setNotFound(true);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Ошибка при получении ролей:", error);
                setNotFound(true);
                setLoading(false);
            }
        };

        fetchRoleId();
    }, [roleName]);

    useEffect(() => {
        if (!roleId) return;

        const fetchVacancies = async () => {
            try {
                setLoading(true);

                const citiesRes = await axios.get('https://api.hh.ru/areas');
                const allAreas = citiesRes.data;

                const uzbekistan = allAreas.find((area) =>
                    area.name.toLowerCase().includes('узбекистан')
                );

                if (!uzbekistan) {
                    console.error("Не удалось найти Узбекистан в списке областей.");
                    setNotFound(true);
                    setLoading(false);
                    return;
                }

                const { data } = await axios.get(`https://api.hh.ru/vacancies`, {
                    params: {
                        professional_role: roleId,
                        area: uzbekistan.id,
                        page: page - 1,
                        per_page: 20,
                    }
                });

                setVacancies(data.items);
                setTotalPages(data.pages);
            } catch (error) {
                console.error("Ошибка при загрузке вакансий:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVacancies();
    }, [roleId, page]);

    const handlePageChange = (newPage) => {
        if (newPage !== page && newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    if (notFound) {
        return <div>Роль “{roleName}” не найдена.</div>;
    }

    if (loading) {
        return <div className='loading'><div className='loading-spinner'></div></div>;
    }

    const currencySymbols = { RUR: '₽', RUB: '₽', USD: '$', EUR: '€', UZS: 'сум', };

    return (
        <div className='layout'>
            <div className="vacancies">
                <div className="vacancies-blok">
                    <Link href='/vacancy'>Все вакансии</Link>
                    <p>/</p>
                    <h3>{roleName}</h3>
                </div>
            </div>
            {vacancies.length === 0 ? (
                <p className='no-info'>Нет вакансий</p>
            ) : (
                <div className="vacancy__cards">
                    {vacancies.map((vacancy) => (
                        <div key={vacancy.id} className="vacancy__card">
                            <div className="vacancy__card__header">
                                <Link href={`/vacancy/${vacancy.id}`}>
                                    <h3>{vacancy.name}</h3>
                                </Link>
                            </div>
                            <div className="vacancy__card__section-1">
                                <p>Зарплата: {vacancy.salary
                                    ? vacancy.salary.from && vacancy.salary.to
                                        ? `${vacancy.salary.from.toLocaleString()} - ${vacancy.salary.to.toLocaleString()} ${currencySymbols[vacancy.salary.currency] || vacancy.salary.currency}`
                                        : vacancy.salary.from
                                            ? `${vacancy.salary.from.toLocaleString()} ${currencySymbols[vacancy.salary.currency] || vacancy.salary.currency}`
                                            : vacancy.salary.to
                                                ? `${vacancy.salary.to.toLocaleString()} ${currencySymbols[vacancy.salary.currency] || vacancy.salary.currency}`
                                                : 'Не указано'
                                    : 'Не указано'}
                                </p>
                            </div>
                            <div className="vacancy__card__section-2">
                                <div className="vacancy__card__section-2__part">
                                    <Link href={`/employer/${vacancy.employer.id}`} rel="noopener noreferrer">
                                        {vacancy.employer.name}
                                    </Link>
                                    <IoShieldCheckmarkOutline className='vacancy__card__section-2__icon' />
                                </div>
                                <div className="vacancy__card__section-2__part"><p>{vacancy.area.name}</p></div>
                            </div>
                            <div className="vacancy__card__footer">
                                <a href={vacancy.alternate_url} target="_blank" rel="noopener noreferrer">
                                    <button className="vacancy__button">Отклик в hh</button>
                                </a>
                                <Link href={`vacancy/${vacancy.id}`}><FaInfoCircle className='vacancy__card__footer__icon' /></Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="pagination">
                <button onClick={() => handlePageChange(Math.max(page - 1, 1))} disabled={page === 1}>Назад</button>
                <button onClick={() => handlePageChange(1)} className={page === 1 ? 'active' : ''}>1</button>
                {page > 3 && <span>...</span>}
                {Array.from({ length: 5 }, (_, i) => {
                    const pageNumber = page - 2 + i;
                    if (pageNumber > 1 && pageNumber < totalPages) {
                        return (
                            <button key={pageNumber} onClick={() => handlePageChange(pageNumber)} className={page === pageNumber ? 'active' : ''}>
                                {pageNumber}
                            </button>
                        );
                    }
                    return null;
                })}
                {page < totalPages - 2 && <span>...</span>}
                {totalPages > 1 && (
                    <button onClick={() => handlePageChange(totalPages)} className={page === totalPages ? 'active' : ''}>
                        {totalPages}
                    </button>
                )}
                <button onClick={() => handlePageChange(Math.min(page + 1, totalPages))} disabled={page === totalPages}>След</button>
            </div>
        </div>
    );
};
