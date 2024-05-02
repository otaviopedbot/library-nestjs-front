import axios from "axios";
import authHeader from "../services/authHeader";
import authHeaderAdmin from "../services/authHeaderAdmin";

const url = import.meta.env.VITE_APIURL

export const postFavorite = async (user_id, book_id) => {

  const query = `
  
    mutation PostFavorite($user_id: Float!, $book_id: Float!){
      createFavorite(data: {
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
    const response = await axios.post(url, { query, variables }, { headers: authHeaderAdmin() });

    console.log(response)
  } catch (error) {

    console.log(error)

    throw error;
  }
};

export const deleteFavorite = async (user_id, book_id) => {

  const query = `
  
    mutation deleteFavorite($book_id: Float!, $user_id: Float!){
      deleteFavorite(book_id: $book_id, user_id: $user_id)
    }

  `;

  const variables = {
    book_id: parseInt(book_id),
    user_id: parseInt(user_id)
  }

  try {
    const response = await axios.post(url, { query, variables }, { headers: authHeaderAdmin() });

    console.log(response)

  } catch (error) {
    throw error;
  }

}