import axios from "axios";
import authHeader from "../services/authHeader";
import authHeaderAdmin from "../services/authHeaderAdmin";

const url = import.meta.env.VITE_APIURL

export const getAllRents = async () => {
    try {
        const response = await axios.get(`${url}/rents`, { headers: authHeader() });

        return response.data
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getRent = async (id) => {
    try {
        const response = await axios.get(`${url}/rents/${id}`, { headers: authHeaderAdmin() });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const postRent = async (customer_id, book_id) => {
    try {
        await axios.post(`${url}/rents`, {
            'customer_id': customer_id,
            'book_id': book_id,
        }, { headers: authHeaderAdmin() });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateRent = async (id,customer_id, book_id) => {
    try {
        await axios.put(`${url}/rents/${id}`, {
            'customer_id': customer_id,
            'book_id': book_id,
        }, { headers: authHeaderAdmin() });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteRent = async (id) => {
    try {
        await axios.delete(`${url}/rents/${id}`, { headers: authHeaderAdmin() });
    } catch (error) {
        console.log(error);
        throw error;
    }
};