import axios from "axios";
import authHeader from "../services/authHeader";
import authHeaderAdmin from "../services/authHeaderAdmin";

const url = import.meta.env.VITE_APIURL

const urlUpload = "http://localhost:3000/upload"

export const getAllBooks = async (page, pageSize) => {
    const query = `
    
    {
        listBooks{
            id
            title
            author_id
            page
            quantity
        }
    }
    
    `

    try {

        const response = await axios.post(url, { query }, {
            headers: authHeader(),
            "Content-Type": "application/json"
        });

        return response.data.data.listBooks
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const getBook = async (id) => {
    const query = `
    
    {
        showBook(id: ${id}){
            id
            title
            cover
            quantity
            synopsis
            page
            author_id
            author{
                name
            }
            reviews{
                id
                user_id
                book_id
                body
                rating
                user{
                    username
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

        return response.data.data.showBook;

    } catch (error) {
        throw error;
    }
};

export const postBook = async (title, page, quantity, author_id, synopsis) => {

    const query = `
  
    mutation PostBook($title: String!, $page: Float!, $quantity: Float!, $author_id: Float!, $synopsis: String!){
      createBook(data: {
        title: $title
        page: $page
        quantity: $quantity
        author_id: $author_id
        synopsis: $synopsis
      }){
        id
      }
    }
  
    `;

    const variables = {
        title,
        page: parseInt(page),
        quantity: parseInt(quantity),
        author_id: parseInt(author_id),
        synopsis
    }

    try {
       const repsonse = await axios.post(url, { query, variables }, { headers: authHeaderAdmin() });

        console.log(repsonse)

    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const updateBook = async (id, title, page, quantity, author_id, synopsis) => {

    const query = `
  
    mutation UpdateBook( $id: Float!, $title: String, $page: Float, $quantity: Float, $author_id: Float, $synopsis: String){
      updatePartialBook(id: $id, data: {
        title: $title
        page: $page
        quantity: $quantity
        author_id: $author_id
        synopsis: $synopsis
      }){
        title
        page
        quantity
        author_id
        synopsis
      }
    }
  
    `;

    const variables = {
        id: parseInt(id),
        title,
        page : parseInt(page),
        quantity: parseInt(quantity),
        author_id: parseInt(author_id),
        synopsis,
    }

    try {
        const response = await axios.post(url, { query, variables }, { headers: authHeaderAdmin(),  "Content-Type": "application/json" });

    } catch (error) {
        throw error;
    }
}

export const updateBookCover = async (id, cover) => {


    try {
        const formData = new FormData();
        formData.append('cover', cover);
        formData.append('type', "book");
        formData.append('id', id);
    
        const response = await axios.post(`${urlUpload}`, formData, {
        
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

    const query = `
  
    mutation deleteBook($id: Float!){
      deleteBook(id: $id)
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