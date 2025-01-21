'use client';
import React, { useState, useEffect } from 'react';
import { IoClose, IoShieldCheckmarkOutline } from "react-icons/io5";
import axios from 'axios';
import { FaSearch, FaFilter } from "react-icons/fa";
import Link from 'next/link';
import ApplyToVacancy from '../apply/ApplyToVacancy';
import AddFavorite from './AddFavorite';
import { MdFavoriteBorder } from 'react-icons/md';

export default function LayOutComp() {
  const [vacancies, setVacancies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(localStorage.getItem('selectedCategory') || '');
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('selectedCity') || '');
  const [salary_from, setSalaryFrom] = useState(localStorage.getItem('salary_from') || '');
  const [salary_to, setSalaryTo] = useState(localStorage.getItem('salary_to') || '');
  const [age_from, setAgeFrom] = useState(localStorage.getItem('age_from') || '');
  const [age_to, setAgeTo] = useState(localStorage.getItem('age_to') || '');
  const [time_from, setTimeFrom] = useState(localStorage.getItem('time_from') || '');
  const [time_to, setTimeTo] = useState(localStorage.getItem('time_to') || '');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [genders, setGenders] = useState([]);
  const [formats, setFormats] = useState([]);
  const [format, setFormat] = useState(localStorage.getItem('format') || '');
  const [schedules, setSchedules] = useState([]);
  const [schedule, setSchedule] = useState(localStorage.getItem('schedule') || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [resetMessage, setResetMessage] = useState(false);

  useEffect(() => {
    const fetchCategoriesAndCities = async () => {
      try {
        const [categoriesRes, citiesRes, gendersRes, formatsRes, schedulesRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/categories'),
          axios.get('http://127.0.0.1:8000/api/cities'),
          axios.get('http://127.0.0.1:8000/api/genders/'),
          axios.get('http://127.0.0.1:8000/api/formats/'),
          axios.get('http://127.0.0.1:8000/api/schedules/')
        ]);

        setCategories(categoriesRes.data);
        setCities(citiesRes.data);
        setGenders(gendersRes.data);
        setFormats(formatsRes.data);
        setSchedules(schedulesRes.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных для фильтрации:', error);
      }
    };
    fetchCategoriesAndCities();
  }, []);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/vacancies/', {
          params: {
            category: selectedCategory,
            city: selectedCity,
            salary_from: salary_from,
            salary_to: salary_to,
            time_from: time_from,
            time_to: time_to,
            gender: genders,
            age_from: age_from,
            age_to: age_to,
            format: format,
            schedule: schedule,
          },
        });
        setVacancies(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке вакансий:', error);
      }
    };
    fetchVacancies();
  }, [selectedCategory, selectedCity, salary_from, salary_to, age_from, age_to, genders, time_from, time_to, format, schedule]);

  const handleSaveFilters = () => {
    localStorage.setItem('selectedCategory', selectedCategory);
    localStorage.setItem('selectedCity', selectedCity);
    localStorage.setItem('salary_from', salary_from);
    localStorage.setItem('salary_to', salary_to);
    localStorage.setItem('age_from', age_from);
    localStorage.setItem('age_to', age_to);
    localStorage.setItem('time_from', time_from);
    localStorage.setItem('time_to', time_to);
    localStorage.setItem('format', format);
    localStorage.setItem('schedule', schedule);
    setSuccessMessage(true);
    setIsModalOpen(false);
  };

  const handleResetFilters = () => {
    localStorage.clear();
    setSelectedCategory('');
    setSelectedCity('');
    setSalaryFrom('');
    setSalaryTo('');
    setAgeFrom('');
    setAgeTo('');
    setTimeFrom('');
    setTimeTo('');
    setFormat('');
    setSchedule('');
    setResetMessage(true);
  };

  return (
    <div className="layout">
      <div className="vacancy">
        <div className="filters">
          <div className="filters-blok">
            <div className="filters-blok__section-1">
              <input type="search" placeholder='Поиск' />
              <FaSearch className='filters-blok__section-1__icon' />
            </div>
            <div className='filters-blok__section-2' onClick={() => setIsModalOpen(true)}>
              <p>Фильтры</p>
              <FaFilter className='filters-blok__section-2__icon' />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="filters-modal">
          <div className="filters-modal__content">
            <div className="filters-modal-blok">
              <div className="filters-blok__content__header">
                <h3>Фильтры</h3>
                <IoClose className='filters-modal__close' onClick={() => setIsModalOpen(false)} />
              </div>
              <div className="filters-modal__section filters-modal__section-1">
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="">Категория</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.title}</option>
                  ))}
                </select>
                <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                  <option value="">Город</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>{city.title}</option>
                  ))}
                </select>
                <select value={genders} onChange={(e) => setGenders(e.target.value)}>
                  <option value="">Пол</option>
                  {genders.map((item) => (
                    <option key={item} value={item}>{item.title}</option>
                  ))}
                </select>
              </div>
              <div className="filters-modal__section filters-modal__section-2">
                <select value={format} onChange={(e) => setFormat(e.target.value)}>
                  <option value="">Формат работы</option>
                  {formats.map((format) => (
                    <option key={format} value={format}>{format.title}</option>
                  ))}
                </select>
                <select value={schedule} onChange={(e) => setSchedule(e.target.value)}>
                  <option value="">График работы</option>
                  {schedules.map((schedule) => (
                    <option key={schedule} value={schedule}>{schedule.title}</option>
                  ))}
                </select>
              </div>
              <div className="filters-modal__section">
                <div>
                  <label>Зарплата от:</label>
                  <input type="number" value={salary_from} onChange={(e) => setSalaryFrom(e.target.value)} placeholder="Минимальная зарплата" />
                </div>
                <div>
                  <input type="number" value={salary_to} onChange={(e) => setSalaryTo(e.target.value)} placeholder="Максимальная зарплата" />
                </div>
              </div>
              <div className="filters-modal__section">
                <div>
                  <label>Возраст от:</label>
                  <input type="number" value={age_from} onChange={(e) => setAgeFrom(e.target.value)} placeholder="Возраст от" min={16} max={60} />
                  <div>
                    <input type="number" value={age_to} onChange={(e) => setAgeTo(e.target.value)} placeholder="Возраст до" min={16} max={60} />
                  </div>
                </div>
              </div>
              <div className="filters-modal__section">
                <div>
                  <label>Время от:</label>
                  <input type="number" value={time_from} onChange={(e) => setTimeFrom(e.target.value)} placeholder="Время от" />
                </div>
                <div>
                  <input type="number" value={time_to} onChange={(e) => setTimeTo(e.target.value)} placeholder="Время до" />
                </div>
              </div>
              <div className="filters-modal__footer">
                <button className='filter-modal__footer__button1' onClick={handleSaveFilters}>Сохранить фильтры</button>
                <button className='filter-modal__footer__button2' onClick={handleResetFilters}>Сбросить</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {vacancies.length === 0 ? (
        <div className='vacancy__cards'>
          <div className="vacancy__card">
            <div className="vacancy__card__header">
              <Link href='/'><h3>Собиратель голосов общественного мнения</h3></Link>
            </div>
            <div className="vacancy__card__section-1">
              <p>3 000 000 - 5 000 000 UZS</p>
            </div>
            <div className="vacancy__card__section-2">
              <div className="vacancy__card__section-2__part">
                <Link href='/'><p>ООО СВОИ</p></Link>
                <IoShieldCheckmarkOutline className='vacancy__card__section-2__icon' />
              </div>
            </div>
            <div className="vacancy__card__footer">
              <button className='vacancy__button'>Откликнуться</button>
              <p>Ташкент</p>
            </div>
            <div className="vacancy__card__footer-2">
              <p>Добавлено в 20:00 25 декабря</p>
              <MdFavoriteBorder className='vacancy__card__header__icon' />
            </div>
          </div>
          <div className="vacancy__card">
            <div className="vacancy__card__header">
              <Link href='/'><h3>Собиратель голосов общественного мнения</h3></Link>
            </div>
            <div className="vacancy__card__section-1">
              <p>3 000 000 - 5 000 000 UZS</p>
            </div>
            <div className="vacancy__card__section-2">
              <div className="vacancy__card__section-2__part">
                <Link href='/'><p>ООО СВОИ</p></Link>
                <IoShieldCheckmarkOutline className='vacancy__card__section-2__icon' />
              </div>
            </div>
            <div className="vacancy__card__footer">
              <button className='vacancy__button'>Откликнуться</button>
              <p>Ташкент</p>
            </div>
            <div className="vacancy__card__footer-2">
              <p>Добавлено в 20:00 25 декабря</p>
              <MdFavoriteBorder className='vacancy__card__header__icon' />
            </div>
          </div>
          <div className="vacancy__card">
            <div className="vacancy__card__header">
              <Link href='/'><h3>Собиратель голосов общественного мнения</h3></Link>
            </div>
            <div className="vacancy__card__section-1">
              <p>3 000 000 - 5 000 000 UZS</p>
            </div>
            <div className="vacancy__card__section-2">
              <div className="vacancy__card__section-2__part">
                <Link href='/'><p>ООО СВОИ</p></Link>
                <IoShieldCheckmarkOutline className='vacancy__card__section-2__icon' />
              </div>
            </div>
            <div className="vacancy__card__footer">
              <button className='vacancy__button'>Откликнуться</button>
              <p>Ташкент</p>
            </div>
            <div className="vacancy__card__footer-2">
              <p>Добавлено в 20:00 25 декабря</p>
              <MdFavoriteBorder className='vacancy__card__header__icon' />
            </div>
          </div>
          <div className="vacancy__card">
            <div className="vacancy__card__header">
              <Link href='/'><h3>Собиратель голосов общественного мнения</h3></Link>
            </div>
            <div className="vacancy__card__section-1">
              <p>3 000 000 - 5 000 000 UZS</p>
            </div>
            <div className="vacancy__card__section-2">
              <div className="vacancy__card__section-2__part">
                <Link href='/'><p>ООО СВОИ</p></Link>
                <IoShieldCheckmarkOutline className='vacancy__card__section-2__icon' />
              </div>
            </div>
            <div className="vacancy__card__footer">
              <button className='vacancy__button'>Откликнуться</button>
              <p>Ташкент</p>
            </div>
            <div className="vacancy__card__footer-2">
              <p>Добавлено в 20:00 25 декабря</p>
              <MdFavoriteBorder className='vacancy__card__header__icon' />
            </div>
          </div>
        </div>
      ) : (
        vacancies.map((vacancy) => (
          <div key={vacancy.id} className="vacancy__card">
            <div className="vacancy__card__header">
              <Link href={`/vacancy/${vacancy.id}`}><h3>{vacancy.title}</h3></Link>
              <AddFavorite disabled={!isAuthorized} data={vacancy} />
            </div>
            <div className="vacancy__card__section-1">
              <p>Зарплата: {vacancy.salary_from} - {vacancy.salary_to} UZS</p>
            </div>
            <div className="vacancy__card__section-2">
              <div className="vacancy__card__section-2__part">
                <Link href={`/vacancy/employeer/${vacancy.id}`}><p>ООО СВОИ</p></Link>
                <IoShieldCheckmarkOutline className='vacancy__card__section-2__icon' />
              </div>
              <div className="vacancy__card__section-2__part">
                <p>{vacancy.city}</p>
              </div>
              <div className="vacancy__card__footer">
                <ApplyToVacancy data={vacancy} disabled={!isAuthorized} />
              </div>
            </div>
          </div>
        ))
      )}
      {successMessage && (
        <div className="successMessage">
          <p>Фильтры сохранены!</p>
          <div className="successMessage-bar"></div>
        </div>
      )}
      {resetMessage && (
        <div className="errormessage">
          <p>Фильтры сброшены!</p>
          <div className="errormessage-bar"></div>
        </div>
      )}
    </div>
  );
};