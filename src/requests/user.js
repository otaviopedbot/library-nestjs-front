import axios from "axios";
import authHeader from "../services/authHeader";
import authHeaderAdmin from "../services/authHeaderAdmin";

const url = import.meta.env.VITE_APIURL

export const getAllUsers = async () => {
    try {

        const response = await axios.get(`${url}/users`, { headers: authHeader() });
        return response.data
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getUser = async (id) => {
    try {
        const response = await axios.get(`${url}/users/${id}`, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateUser = async (id, complete_name, username, phone, address, email, password, details) => {
    try {
        await axios.patch(`${url}/users/${id}`, {
            complete_name,
            username,
            phone: phone,
            address,
            email,
            password,
            details
        }, {


            headers: authHeader()
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateUserImage = async (id, image) => {
    try {

        const formData = new FormData();
        formData.append('image', image);

        const response = await axios.patch(`${url}/users/image/${id}`, formData, {

            headers: {
                'Content-Type': 'multipart/form-data',
            },

            headers: authHeaderAdmin()

        });
        return response.data

    } catch (error) {
        console.log(error);
        throw error;
    }


}

export const deleteUser = async (id) => {
    try {
        await axios.delete(`${url}/users/${id}`, { headers: authHeader() });
    } catch (error) {
        console.log(error);
        throw error;
    }
}