import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postRent } from '../../requests/rent';

//componentes:
import Card from '../../components/Card'
import Check from '../../components/buttons/Check'
import Return from '../../components/buttons/Return'
import { toast } from 'react-toastify';
import InputField from '../../components/InputField';
import ValidateAdmin from '../../components/validation/ValidateAdmin';


const CreateRents = () => {

  const [user_id, setUser_id] = useState("")
  const [book_id, setBook_id] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const saveRent = async (e) => {
    e.preventDefault()

    if (user_id === '' || book_id === '') {
      toast.warn('Preencha todos os campos corretamente')
      return;
    }

    try {
      setIsLoading(true)
      await postRent(user_id, book_id)
      toast.success(`Aluguel cadastrado com sucesso`);
      navigate('/rents')
      setIsLoading(false)
    } catch (error) {
      toast.error(`Erro ao cadastrar Aluguel: ${error.response.data.message}`);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };


  return (

    <ValidateAdmin>

<div className='grid grid-cols-1 grid-rows-1 h-screen'>
      <div className='flex justify-center items-center'>

      <Card title={'Novo Aluguel'}>

        <form onSubmit={saveRent}>

          <InputField label={"ID do Cliente"} type={"number"} name={"user_id"} value={user_id} onChange={(e) => setUser_id(e.target.value)} />

          <InputField label={"ID do Livro"} type={"number"} name={"book_id"} value={book_id} onChange={(e) => setBook_id(e.target.value)} />

          {/* botões */}

          {!isLoading && (

            <Check />

          )}

          <Link to={'/rents'}>
            <Return />
          </Link>

        </form>

      </Card>

      </div>
      </div>

    </ValidateAdmin>
  )
}

export default CreateRents