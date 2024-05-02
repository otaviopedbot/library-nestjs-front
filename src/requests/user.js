import axios from "axios";
import authHeader from "../services/authHeader";
import authHeaderAdmin from "../services/authHeaderAdmin";

const url = import.meta.env.VITE_APIURL

export const getAllUsers = async () => {

    const query = `
    
    {
        listUsers{
            id
            complete_name
            phone
            username
            email
        }
    }
    
    `

    try {

        const response = await axios.post(url, { query }, {
            headers: authHeader(),
            "Content-Type": "application/json"
        });

        return response.data.data.listUsers

    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const getUser = async (id) => {

    const query = `
    
    {
        showUser(id: ${id}){
            id
            complete_name
            username
            image
            email
            phone
            details
            address
            createdAt
            updatedAt
            favorites{
                id
                book_id
                book{
                    title
                }
            }
        }
    }
    
    `

    try {
        const response = await axios.post(url, { query },
            {
                headers: authHeader(),
                "Content-Type": "application/json"
            });

        return response.data.data.showUser;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (id, complete_name, username, phone, address, email, password, details) => {
   
    const query = `
  
    mutation UpdateUser($id: Float!, $complete_name: String, $username: String, $phone: String, $address: String, $email: String, $password: String, $details: String){
      updatePartialUser(id: $id, data: {
        complete_name: $complete_name
        username: $username
        phone: $phone
        address: $address
        email: $email
        password: $password
        details: $details
      }){
        username
      }
    }

    `;

    const variables = {
        id: parseInt(id),
        complete_name,
        username,
        phone,
        address,
        email,
        password,
        details,
    }

    try {
        const response = await axios.post(url, { query, variables }, { headers: authHeaderAdmin(),  "Content-Type": "application/json" });

        console.log(response)

    } catch (error) {
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

    const query = `
  
    mutation deleteUser($id: Float!){
      deleteUser(id: $id)
    }

    `;

    const variables = {
        id: parseInt(id),
    }


    try {
        await axios.post(url, {query, variables},  { headers: authHeaderAdmin() });
    } catch (error) {
        throw error;
    }
}