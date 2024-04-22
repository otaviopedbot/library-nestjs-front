import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllUsers } from '../../requests/user'

//componentes:
import Table from '../../components/Table';
import ValidateData from '../../components/validation/ValidateData';
import ValidateAdmin from '../../components/validation/ValidateAdmin'

const Users = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5); // Número de itens por página
  const [totalPages, setTotalPages] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUsers();
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

  const titles = ['Nome', 'telefone', 'Username', 'email']

  return (

    <ValidateAdmin>
      <ValidateData data={data} message={"Não foi possivel obter Clientes/usuários"}>

      <Table data={data} titles={titles} tableTitle={'Usuários / Clientes'} btnTitle={'Novo usuário'} totalPages={totalPages} setPage={setPage} page={page} />

      </ValidateData>
    </ValidateAdmin>

  );
};

export default Users;
