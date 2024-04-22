import axios from "axios";
import authHeader from "../services/authHeader";
import authHeaderAdmin from "../services/authHeaderAdmin";

const url = import.meta.env.VITE_APIURL

export const postFavorite = async (user_id, book_id) => {
    try {
        await axios.post(`${url}/favorites`, {
            'user_id': Number(user_id),
            'book_id': Number(book_id),
        }, { headers: authHeader() });
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const deleteFavorite = async (book_id) => {
    try {
        await axios.delete(`${url}/favorites/${book_id}`, { headers: authHeader() });
    } catch (error) {
        console.log(error);
        throw error;
    }
}