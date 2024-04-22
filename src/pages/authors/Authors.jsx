import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { getAllAuthors } from '../../requests/author';
import { toast } from 'react-toastify';

// Componentes
import Table from '../../components/Table';
import ValidateData from '../../components/validation/ValidateData';

const Authors = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5); // Número de itens por página
  const [totalPages, setTotalPages] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllAuthors();
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

  const titles = ['Nome'];

  return (
    <ValidateData data={data} message={'Não foi possível obter Autores'} >
      <div>
      <Table data={data} titles={titles} totalPages={totalPages} setPage={setPage} page={page} btnTitle={'Novo Autor'} tableTitle={'Autores'} />
      </div>
    </ValidateData>
  )
};

export default Authors;