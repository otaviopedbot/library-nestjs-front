import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from "../services/authService"

//componentes:
import Card from '../components/Card'
import Check from '../components/buttons/Check'
import Return from '../components/buttons/Return'
import { toast } from 'react-toastify';
import InputField from '../components/InputField'

const Login = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [complete_name, setComplete_name] = useState("")
  const [password, setPassword] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();

    if (username === '' || complete_name === '' || email === '' || password === '' || phone === '' || address === '') {
      toast.warn('Preencha todos os campos corretamente')
      return;
    }

    try {

      await AuthService.Register( complete_name, username, email, password, address, phone ).then(
        () => {
          setIsLoading(true)
          toast.success(`Usuário cadastrado com sucesso`);
          navigate('/')
          setIsLoading(false)
        },
        (error) => {
          toast.error(`Erro ao cadastrar Usuário: ${error.response.data.message}`);
          console.log(error)
          setIsLoading(false)
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div className='grid grid-cols-1 grid-rows-1 h-screen'>
      <div className='flex justify-center items-center'>

        <Card title={'Cadastro'}>


          <form onSubmit={handleRegister}>

            <InputField label={"Nome completo"} type={"text"} name={"complete_name"} value={complete_name} onChange={(e) => setComplete_name(e.target.value)} />

            <InputField label={"Username"} type={"text"} name={"username"} value={username} onChange={(e) => setUsername(e.target.value)} />

            <InputField label={"E-mail"} type={"email"} name={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />

            <InputField label={"Telefone"} type={"text"} name={"phone"} value={phone} onChange={(e) => setPhone(e.target.value)} />

            <InputField label={"Endereço"} type={"text"} name={"address"} value={address} onChange={(e) => setAddress(e.target.value)} />

            <InputField label={"Senha"} type={"password"} name={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />


            {/* botões */}

            {!isLoading && (

              <Check />

            )}

            <Link to={'/login'}>
              <Return />
            </Link>

          </form>

        </Card>

      </div>
    </div>
  )
}

export default Login