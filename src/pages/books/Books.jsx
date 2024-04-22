import React, { useState, useEffect } from 'react';
import { getAllBooks } from '../../requests/book';
import { toast } from 'react-toastify';

//componentes:
import Table from '../../components/Table';
import ValidateData from '../../components/validation/ValidateData'

const Books = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5); // Número de itens por página
  const [totalPages, setTotalPages] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBooks();

        console.log(response)

        setTotalPages(Math.ceil(response.length/pageSize))
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const slicedData = response.slice(startIndex, endIndex);
        setData(slicedData);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchData();
  }, [page, pageSize]);

  const titles = ['Título', 'Autor ID', 'Paginas', 'quantidade'];

  return (

    <ValidateData data={data} message={'Não foi possivel obter Livros'}>

      <Table data={data} titles={titles} tableTitle={'Livros'} btnTitle={'Novo Livro'} totalPages={totalPages} setPage={setPage} page={page} />

    </ValidateData>

  );
};

export default Books;