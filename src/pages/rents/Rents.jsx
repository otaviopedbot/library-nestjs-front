import React, { useState, useEffect } from 'react';
import { getAllRents } from '../../requests/rent';
import { toast } from 'react-toastify';

//componentes:
import Table from '../../components/Table';
import ValidateData from '../../components/validation/ValidateData';
import ValidateAdmin from '../../components/validation/ValidateAdmin'

const Rents = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5); // Número de itens por página
  const [totalPages, setTotalPages] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllRents();
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

  const titles = ['ID do Usuário/cliente', 'ID do livro', 'Criado em'];

  return (

    <ValidateAdmin>
      <ValidateData data={data} message={"Não foi possivel obter Aluguéis"}>

      <Table data={data} titles={titles} tableTitle={'Aluguéis'} btnTitle={'Novo aluguel'} totalPages={totalPages} setPage={setPage} page={page} />

      </ValidateData>
    </ValidateAdmin>

  );
};

export default Rents;