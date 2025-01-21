'use client'
import { useAuth } from '@/AuthContext';
import { useRouter } from 'next/navigation';
import React from 'react'
import { MdFavoriteBorder } from "react-icons/md";

export default function AddFavorite({ data }) {
    const { checkAccessToken, accessToken } = useAuth();
    const [successMessage, setSuccessMessage] = useState(false);
    const router = useRouter();

    const handleAddToFavorites = async () => {
        const isTokenValid = await checkAccessToken();
        if (!isTokenValid) {
            router.push('/auth/login/');
            return;
        }
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/vacancies/favorites/${data.id}/`, {
                headers: { Authorization: `Bearer: ${accessToken}` }
            });
            if (response.data.success) {
                setSuccessMessage(true);

                setTimeout(() => {
                    setSuccessMessage(false);
                }, 5000);
            }
        } catch (error) {
            console.error('Ошибка при добавлении вакансии в избранное:', error);
        }
    };

    return (
        <div>
            {successMessage && (
                <div className="successMessage">
                    <p>Successfully added to cart!</p>
                    <div className="successMessage-bar"></div>
                </div>
            )}
            <MdFavoriteBorder
                className='vacancy__card__header__icon'
                onClick={handleAddToFavorites}
            />
        </div>
    )
};