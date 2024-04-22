import axios from "axios";
import authHeader from "../services/authHeader";
import authHeaderAdmin from "../services/authHeaderAdmin";

const url = import.meta.env.VITE_APIURL

export const getAllBooks = async (page, pageSize) => {
    try {
        let response = ''

        if (page && pageSize) {
            response = await axios.get(`${url}/books`, { headers: authHeader() });
        } else {
            response = await axios.get(`${url}/books`, { headers: authHeader() });
        }

        return response.data
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getBook = async (id) => {
    try {
        const response = await axios.get(`${url}/books/${id}`, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const postBook = async (title, page, quantity, author_id, synopsis) => {
    try {
        await axios.post(`${url}/books`, {
            'title': title,
            'page': Number(page),
            'quantity': Number(quantity),
            'author_id': Number(author_id),
            'synopsis': synopsis,
        }, { headers: authHeaderAdmin() });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateBook = async (id, title, page, quantity, author_id, synopsis) => {
    try {
        await axios.patch(`${url}/books/${id}`, {
            title,
            page: Number(page),
            quantity: Number(quantity),
            synopsis,
            author_id: Number(author_id),
        }, { headers: authHeaderAdmin() });
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export const updateBookCover = async (id, cover) => {


    try {
    
        const formData = new FormData();
        formData.append('cover', cover);
    
        const response = await axios.patch(`${url}/books/cover/${id}`, formData, {

        
          headers: {
            'Content-Type': 'multipart/form-data',
          },

          headers: authHeaderAdmin()


        });
    
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }


}

export const deleteBook = async (id) => {
    try {
        await axios.delete(`${url}/books/${id}`, { headers: authHeaderAdmin() });
    } catch (error) {
        console.log(error);
        throw error;
    }
}