'use client';
import React, { useState, useEffect, useRef } from 'react';
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import axios from 'axios';
import { FaSearch, FaInfoCircle } from "react-icons/fa";
import Link from 'next/link';
import { IoIosArrowDown } from "react-icons/io";

export default function LayOutComp() {
  const [vacancies, setVacancies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [salary_from, setSalaryFrom] = useState('');
  const [salary_to, setSalaryTo] = useState('');
  const [format, setFormat] = useState('');
  const [schedule, setSchedule] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [uzbekistanAreaId, setUzbekistanAreaId] = useState(null);
  const [searchCityTerm, setSearchCityTerm] = useState('');
  const [showCityList, setShowCityList] = useState(false);
  const [sortNewFirst, setSortNewFirst] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSelectedCategory(localStorage.getItem('selectedCategory') || '');
      setSelectedCity(localStorage.getItem('selectedCity') || '');
      setSalaryFrom(localStorage.getItem('salary_from') || '');
      setSalaryTo(localStorage.getItem('salary_to') || '');
      setFormat(localStorage.getItem('format') || '');
      setSchedule(localStorage.getItem('schedule') || '');
      setSortNewFirst(localStorage.getItem('sortNewFirst') === 'true');
      setPage(parseInt(localStorage.getItem('currentPage')) || 1);
    }
  }, []);

  useEffect(() => {
    const fetchCategoriesAndCities = async () => {
      try {
        const categoriesRes = await axios.get('https://api.hh.ru/professional_roles');
        const categoriesData = categoriesRes.data?.categories || [];
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);

        const citiesRes = await axios.get('https://api.hh.ru/areas');
        const allAreas = citiesRes.data;

        const uzbekistan = allAreas.find((area) =>
          area.name.toLowerCase().includes('узбекистан')
        );

        if (uzbekistan) {
          setUzbekistanAreaId(uzbekistan.id);
          setCities(uzbekistan.areas || []);

          const savedCityId = localStorage.getItem('selectedCity');
          if (savedCityId) {
            const savedCity = uzbekistan.areas.find(city => city.id === savedCityId);
            if (savedCity) {
              setSearchCityTerm(savedCity.name);
            }
          }
        }
      } catch (error) {
        setCategories([]);
        setCities([]);
      }
    };

    fetchCategoriesAndCities();
  }, []);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const areaId = selectedCity || uzbekistanAreaId;

        const params = {
          page: page - 1,
          per_page: 20,
          area: areaId,
          order_by: sortNewFirst ? 'publication_time' : undefined,
        };

        if (selectedCategory) params.professional_role = selectedCategory;
        if (salary_from) params.salary_from = salary_from;
        if (salary_to) params.salary_to = salary_to;
        if (format) params.employment = format;
        if (schedule) params.schedule = schedule;
        if (searchTerm) params.text = searchTerm;

        const { data } = await axios.get('https://api.hh.ru/vacancies', { params });

        setVacancies(data.items || []);
        setTotalPages(Math.ceil((data.found || 0) / 10));
      } catch (error) {
        console.error('Ошибка при загрузке вакансий.');
      }
    };

    if (selectedCity || uzbekistanAreaId) {
      fetchVacancies();
    }
  }, [
    page,
    selectedCategory,
    salary_from,
    salary_to,
    format,
    schedule,
    searchTerm,
    selectedCity,
    uzbekistanAreaId,
    sortNewFirst,
  ]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    localStorage.setItem('currentPage', newPage); // Сохраняем текущую страницу в localStorage
  };

  const handleResetFilters = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    setSelectedCategory('');
    setSelectedCity('');
    setSalaryFrom('');
    setSalaryTo('');
    setFormat('');
    setSchedule('');
    setSortNewFirst(false);
    setPage(1); // Сбрасываем страницу на 1
  };

  const handleSortNewFirst = () => {
    const newState = !sortNewFirst;
    setSortNewFirst(newState);
    localStorage.setItem('sortNewFirst', newState);
  };

  const handleSalaryFromChange = (e) => {
    const value = e.target.value;
    setSalaryFrom(value);
    localStorage.setItem('salary_from', value);
  };

  const handleSalaryToChange = (e) => {
    const value = e.target.value;
    setSalaryTo(value);
    localStorage.setItem('salary_to', value);
  };

  const currencySymbols = { RUR: '₽', RUB: '₽', USD: '$', EUR: '€', UZS: 'сум', };

  return (
    <div className="layout">
      <div className="vacancy">
        <div className="filters">
          <div className="filters-blok">
            <div className="filters-blok__section-1">
              <input
                type="search"
                placeholder="Поиск по вакансиям"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="filters-blok__section-1__icon" />
            </div>
            <div className="filters-blok__section-2">
              <div className='filters-blok__section-2__part-1'>
                <input
                  type="number"
                  placeholder="Зарплата от"
                  value={salary_from}
                  onChange={handleSalaryFromChange}
                />
                <input
                  type="number"
                  placeholder="Зарплата до"
                  value={salary_to}
                  onChange={handleSalaryToChange}
                />
              </div>
              <div className='filters-blok__section-2__part-2'>
                <button onClick={handleSortNewFirst} className={`filters-blok__section-2__part-2__button ${sortNewFirst ? 'active' : ''}`}>
                  Сначала новые
                </button>
                <div>
                  <input
                    type="text"
                    placeholder="Поиск города"
                    value={searchCityTerm}
                    onChange={(e) => {
                      setSearchCityTerm(e.target.value);
                      setShowCityList(true);
                    }}
                    onFocus={() => setShowCityList(true)}
                    onBlur={() => setTimeout(() => setShowCityList(false), 200)}
                  />
                  <IoIosArrowDown className='filters-blok__section-2__icon' />
                </div>
                {showCityList && (
                  <ul className="city-dropdown" ref={dropdownRef}>
                    <li onClick={() => {
                      setSelectedCity('');
                      setSearchCityTerm('');
                      localStorage.setItem('selectedCity', '');
                      setShowCityList(false);
                    }}
                    >
                      Все города
                    </li>
                    {cities.filter(city => city.name.toLowerCase().includes(searchCityTerm.toLowerCase()))
                      .map(city => (
                        <li
                          key={city.id}
                          onClick={() => {
                            setSelectedCity(city.id);
                            setSearchCityTerm(city.name);
                            localStorage.setItem('selectedCity', city.id);
                            setShowCityList(false);
                          }}
                        >
                          {city.name}
                        </li>
                      ))
                    }
                  </ul>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
      {vacancies.length === 0 ? (
        <p className='no-info'>Нет вакансий по этому городу</p>
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