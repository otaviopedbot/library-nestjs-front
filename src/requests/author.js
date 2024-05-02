import axios from "axios";
import authHeader from "../services/authHeader";
import authHeaderAdmin from "../services/authHeaderAdmin";

const url = import.meta.env.VITE_APIURL

export const getAllAuthors = async () => {

    const query = `
    
    {
        listAuthors{
            id
            name
        }
    }
    
    `

    try {

        const response = await axios.post(url, { query }, {
            headers: authHeader(),
            "Content-Type": "application/json"
        });

        return response.data.data.listAuthors

    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const getAuthor = async (id) => {

    const query = `
    
    {
        showAuthor(id: ${id}){
            id
            name
        }
    }
    
    `

    try {
        const response = await axios.post(url, { query },
            {
                headers: authHeader(),
                "Content-Type": "application/json"
            });

        return response.data.data.showAuthor;
    } catch (error) {
        throw error;
    }
};

export const postAuthor = async (name) => {

    const query = `
  
    mutation PostAuthor($name: String!){
      createAuthor(data: {
        name: $name
      }){
        name
      }
    }
  
    `;

    const variables = {
        name
    }

    try {
        await axios.post(url, { query, variables }, { headers: authHeaderAdmin() });
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const updateAuthor = async (id, name) => {

    const query = `
  
    mutation UpdateAuthor($name: String!, $id: Float!){
      updatePartialAuthor(id: $id, data: {
        name: $name
      }){
        name
      }
    }
  

    `;

    const variables = {
        id: parseInt(id),
        name
    }

    try {
        const response = await axios.post(url, { query, variables }, { headers: authHeaderAdmin(),  "Content-Type": "application/json" });

    } catch (error) {
        throw error;
    }
}

export const deleteAuthor = async (id) => {

    const query = `
  
    mutation deleteAuthor($id: Float!){
      deleteAuthor(id: $id)
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