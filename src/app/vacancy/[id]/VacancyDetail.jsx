'use client'
import React, { useEffect, useState } from 'react';
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function VacancyDetail() {
  const params = useParams();
  const id = params?.id;
  const [vacancy, setVacancy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchVacancyData = async () => {
      try {
        const response = await axios.get(`https://api.hh.ru/vacancies/${id}`);
        setVacancy(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке вакансии:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancyData();
  }, [id]);

  function formatDate(publishedAt) {
    const now = new Date();
    const publishedDate = new Date(publishedAt);
    const timeDifference = now.getTime() - publishedDate.getTime();

    const options = { hour: '2-digit', minute: '2-digit', hour12: false };

    const isYesterday = timeDifference < 24 * 60 * 60 * 1000 && now.getDate() - publishedDate.getDate() === 1;

    if (isYesterday) {
      return `Опубликовано вчера в ${publishedDate.toLocaleTimeString('ru-RU', options)}`;
    }

    if (timeDifference > 24 * 60 * 60 * 1000) {
      return `Опубликовано ${publishedDate.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}`;
    }

    if (publishedDate.getFullYear() < now.getFullYear()) {
      return `Опубликовано ${publishedDate.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}`;
    }

    return '';
  };

  const currencySymbols = {
    RUR: '₽',
    RUB: '₽', // иногда может быть RUB
    USD: '$',
    EUR: '€',
    UZS: 'сум',
  };

  if (loading) {
    return <div className='loading'><div className='loading-spinner'></div></div>;
  }
  if (!vacancy) {
    return <div className='loading'><p>Вакансия не найдена</p></div>;
  }

  return (
    <div>
      <div className='vacancy-detail'>
        <div className="vacancy-detail-blok">
          <div className="vacancy-detail-blok__section-1">
            <div className="vacancy-detail-blok__section-1__card">
              <div className="vacancy-detail-blok__section-1__card__header">
                <p>{formatDate(vacancy.published_at)}</p>
                <h1>{vacancy.name}</h1>
              </div>
              <div className="vacancy-detail-blok__section-1__card__section-1">
                <p className='vacancy-detail-blok__section-1__card__section-1-p2'>{vacancy.area.name}</p>
                {vacancy.address && (
                  <p className='vacancy-detail-blok__section-1__card__section-1-p3'>
                    {vacancy.address.raw}
                  </p>
                )}
                <p className='vacancy-detail-blok__section-1__card__section-1-p1'>
                  Зарплата: {vacancy.salary
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
              <div className="vacancy-detail-blok__section-1__card__section-2">
                <p>Требуемый опыт работы: <span>{vacancy.experience_required || 'Не требуется'}</span></p>
                <p>Формат работы: <span>{vacancy.schedule?.name || 'Не указано'}</span></p>
                <p>Рабочие часы: <span>{vacancy.working_hours?.name || 'Не указано'}</span></p>
                <p>Выплата: <span>{vacancy.salary_range?.frequency?.name || 'Не указано'}</span></p>
              </div>
              <div className="vacancy-detail-blok__section-1__card__footer">
                <a href={`https://hh.ru/vacancy/${vacancy.employer.id}`}><button className='vacancy__button'>Отклик в hh</button></a>
              </div>
            </div>
            <div className="vacancy-detail-blok__section-1__description">
              <h3>Подробно:</h3>
              <br />
              <p className='vacancy-detail-blok__section-1__description-p1'
                dangerouslySetInnerHTML={{ __html: vacancy.description || 'Описание не указано' }} />
            </div>
          </div>
          <div className="vacancy-detail-blok__section-2">
            <div className="vacancy-detail-blok__section-2__card">
              <Link href={`/employer/${vacancy.employer.id}`}>
                <img src={vacancy.employer.logo_urls?.original || '/images/user.webp'} alt={vacancy.employer.name} />
                <div className="vacancy-detail-blok__section-2__card__container">
                  <h3>{vacancy.employer.name}</h3>
                  <IoShieldCheckmarkOutline className='vacancy-detail-blok__section-2__card__icon' />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};