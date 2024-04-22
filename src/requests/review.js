import axios from "axios";
import authHeader from "../services/authHeader";
import authHeaderAdmin from "../services/authHeaderAdmin";

const url = import.meta.env.VITE_APIURL

export const postReview = async (book_id, user_id, body, rating) => {
    try {
        await axios.post(`${url}/reviews`, {
            'book_id': book_id,
            'user_id': user_id,
            'body': body,
            'rating': Number(rating),
        }, { headers: authHeader() });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateReview = async (bookId, userId, body, rating) => {
    try {
        await axios.put(`${url}/books/${bookId}/reviews/${reviewId}`, {
            'userId': userId,
            'body': body,
            'rating': rating,
        }, { headers: authHeader() });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteReview = async (id) => {
    try {
        await axios.delete(`${url}/reviews/${id}`, { headers: authHeader() });
    } catch (error) {
        console.log(error);
        throw error;
    }
}