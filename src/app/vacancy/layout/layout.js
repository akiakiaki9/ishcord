import React from 'react';
import axios from 'axios';
import LayOutComp from './LayOutComp';

export default async function LayOut() {
    try {
        const res = await axios.get('http://127.0.0.1:8000/vacansies');
        const data = res.data;
        return (
            <div>
                <LayOutComp data={data} />
            </div>
        );
    } catch (error) {
        console.error('Ошибка при получении данных:', error.message);
        return (
            <div>
                <p>Ошибка при загрузке данных.</p>
            </div>
        );
    }
};