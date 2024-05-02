import axios from "axios";
import authHeader from "../services/authHeader";
import authHeaderAdmin from "../services/authHeaderAdmin";

const url = import.meta.env.VITE_APIURL

export const getAllRents = async () => {

    const query = `
    
    {
        listRents{
            id
            user_id
            book_id
            createdAt
        }
    }
    
    `

    try {

        const response = await axios.post(url, { query }, {
            headers: authHeader(),
            "Content-Type": "application/json"
        });

        return response.data.data.listRents

    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const getRent = async (id) => {

    const query = `
    
    {
        showRent(id: ${id}){
            id
            book_id
            book{
                title
            }
            user{
                complete_name
            }
            user_id
            createdAt
            updatedAt

        }
    }
    
    `

    try {

        const response = await axios.post(url, { query },
            {
                headers: authHeader(),
                "Content-Type": "application/json"
            });

        return response.data.data.showRent;


    } catch (error) {
        throw error;
    }
};

export const postRent = async (user_id, book_id) => {

    const query = `
  
    mutation PostRent($user_id: Float!, $book_id: Float!){
      createRent(data: {
        user_id: $user_id
        book_id: $book_id
      }){
        id
      }
    }
  
    `;

    const variables = {
        user_id: parseInt(user_id),
        book_id: parseInt(book_id)
    }

    try {
        await axios.post(url, { query, variables }, { headers: authHeaderAdmin() });
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const updateRent = async (id, user_id, book_id) => {

    const query = `
  
    mutation UpdateRent($id: Float!, $book_id: Float, $user_id: Float){
      updatePartialRent(id: $id, data: {
        book_id: $book_id,
        user_id: $user_id
      }){
        id
      }
    }
  
    `;

    const variables = {
        id: parseInt(id),
        user_id: parseInt(user_id),
        book_id: parseInt(book_id)
    }

    try {
        const response = await axios.post(url, { query, variables }, { headers: authHeaderAdmin(),  "Content-Type": "application/json" });

        console.log(response)

        return response.data.data.UpdateRent

    } catch (error) {

        throw error;
    }
};

export const FinishRent = async (id) => {

    const query = `
  
    mutation FinishRent($id: Float!){
      finishRent(id: $id)
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
};