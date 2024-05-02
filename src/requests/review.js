import axios from "axios";
import authHeader from "../services/authHeader";
import authHeaderAdmin from "../services/authHeaderAdmin";

const url = import.meta.env.VITE_APIURL

export const postReview = async (book_id, user_id, body, rating) => {

    const query = `
  
    mutation PostReview($book_id: Float!, $user_id: Float!, $body: String!, $rating: Float!){
      createReview(data: {
        book_id: $book_id
        user_id: $user_id
        body: $body
        rating: $rating
      }){
        id
      }
    }
  
    `;

    const variables = {
        book_id: parseInt(book_id), 
        user_id: parseInt(user_id),
        body,
        rating: parseInt(rating)
    }

    try {
        await axios.post(url, { query, variables }, { headers: authHeaderAdmin() });
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const deleteReview = async (id) => {
    
    const query = `
  
    mutation deleteReview($id: Float!){
      deleteReview(id: $id)
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