import React, { useState, useEffect } from 'react';
import { getAllAuthors } from '../../requests/author';
import { toast } from 'react-toastify';
import AuthService from "../../services/authService"

//componentes:
import Table from '../../components/Table';
import ValidateData from '../../components/validation/ValidateData';

const Authors = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5); // Número de itens por página
  const [totalPages, setTotalPages] = useState(0);
  const user = AuthService.getCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllAuthors(page, pageSize);
        setData(response.data);
        setTotalPages(Math.ceil(response.total_items / pageSize));
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchData();
  }, [page, pageSize]);

  const titles = ['Nome'];

  return (

    <div className="mt-24">

      <ValidateData data={data} message={"Não foi possivel obter autores"} >

        <h1>Lista de autores</h1>

        {user && user.user.is_admin == 1 && (
          <div className="mt-5">
            <Link to={'create'}>
              <CustomBlue title={'Novo autor'} />
            </Link>
          </div>
        )}

        <Table data={data} titles={titles} totalPages={totalPages} setPage={setPage} page={page} />

      </ValidateData >

    </div>

  )
};

export default Authors;