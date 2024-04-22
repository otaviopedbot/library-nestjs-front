import React, { useState, useEffect } from 'react';
import { getUser, deleteUser } from '../../requests/user';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import Swal from "sweetalert2";

//componentes:
import Card from '../../components/Card';
import Return from '../../components/buttons/Return'
import Edit from '../../components/buttons/Edit'
import Delete from '../../components/buttons/Delete'
import ValidateData from '../../components/validation/ValidateData';
import ValidateAdmin from '../../components/validation/ValidateAdmin';


const ViewCustomers = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const configConfirmation = {
    title: "Tem certeza?",
    text: "Não é possivel reverter esta ação!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, deletar!"
  }

  useEffect(() => {

    const showUser = async () => {
      try {
        const result = await getUser(id);
        setData(result);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    showUser();

  }, [id]);


  const removeCustomer = async () => {
    const confirmation = await Swal.fire(configConfirmation);

    if (confirmation.isConfirmed) {
      try {
        await deleteUser(id);
        navigate('/users')
        toast.warn(`Usuário/Cliente ${data.name} removido com sucesso`)
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error)
      }
    }

  };


  return (

    <ValidateAdmin>
      <ValidateData data={data} message={'Usuário/cliente não encontrado'}>

      <div className='grid grid-cols-1 grid-rows-1 h-screen'>
      <div className='flex justify-center items-center'>

        <Card title={'Detalhes do Cliente'}>

          <ul className="max-w space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400" key={data.id}>
            <li>ID: {data.id}</li>
            <li>Nome: {data.complete_name}</li>
            <li>Telefone: {data.phone}</li>
            <li>E-mail: {data.email}</li>
            <li>Endereço: {data.address}</li>
            <li>Criado em: {data.createdAt}</li>
            <li>Editado em: {data.updatedAt}</li>
          </ul>

          {/* botões: */}


          <Link to={'/users'}>
            <Return />
          </Link>

        </Card>

        </div>
        </div>

      </ValidateData>
    </ValidateAdmin>

  );
}

export default ViewCustomers;
