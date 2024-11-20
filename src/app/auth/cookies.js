import Cookies from "js-cookie";

export const isAuthorized = () => {
    return !!Cookies.get("access_token"); // Проверяем наличие токена в куках
};