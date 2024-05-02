import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, updateUser, deleteUser, updateUserImage } from '../../requests/user';
import AuthService from "../../services/authService";
import { toast } from 'react-toastify';
import Swal from "sweetalert2";

// Components
import ValidateUser from '../../components/validation/ValidateUser';
import Card from '../../components/Card';
import Check from '../../components/buttons/Check';
import Return from '../../components/buttons/Return';
import InputField from '../../components/InputField';
import Delete from '../../components/buttons/Delete';

const EditProfile = () => {
    const user = AuthService.getCurrentUser();
    const id = user.user.id;
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState();
    const navigate = useNavigate();
    const configConfirmation = {
        title: "Tem certeza?",
        text: "Não é possível reverter esta ação. O usuário será deletado para sempre!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, deletar usuário!"
    };

    const [complete_name, setComplete_name] = useState();
    const [username, setUsername] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [details, setDetails] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await updateUser(id, complete_name, username, phone, address, email, password, details);

            if (image){
                await updateUserImage(id, image);
            }
            
            toast.success('Perfil editado com sucesso, entre novamente para ver as modificações');
            setIsLoading(false);
            navigate('/profile/');
        } catch (error) {
            toast.error(error.response.data.message[0]);
            setIsLoading(false);
        }
    };

    const removeUser = async () => {
        const confirmation = await Swal.fire(configConfirmation);

        if (confirmation.isConfirmed) {
            try {
                await deleteUser(id);
                AuthService.Logout();
                navigate('/');
                toast.success(`Usuário ${profile.username} descadastrado`);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }
        }
    };

    return (
        <ValidateUser>
            <div className='grid grid-cols-1 grid-rows-1 h-screen mt-20 mb-20'>
                <div className='flex justify-center items-center'>
                    <Card title={'Editar Perfil'}>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <InputField type="text" label="Nome completo" name="complete_name" onChange={(e) => setComplete_name(e.target.value)} />
                            <InputField type="text" label="Username" name="username" onChange={(e) => setUsername(e.target.value)} />
                            <InputField type="email" label="E-mail" name="email" onChange={(e) => setEmail(e.target.value)} />
                            <InputField type="password" label="Senha" name="password" onChange={(e) => setPassword(e.target.value)} />
                            <InputField type="text" label="Telefone" name="phone" onChange={(e) => setPhone(e.target.value)} />
                            <InputField type="text" label="Endereço" name="address" onChange={(e) => setAddress(e.target.value)} />
                            <InputField
                                label={'Imagem'}
                                type={'file'}
                                name={'image'}
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                            <InputField type="text" label="Sobre" name="details" onChange={(e) => setDetails(e.target.value)} />
                            {!isLoading && <Check />}
                            <Link to={'/profile'}>
                                <Return />
                            </Link>
                            <span onClick={() => removeUser()}>
                                <Delete />
                            </span>
                        </form>
                    </Card>
                </div>
            </div>
        </ValidateUser>
    );
};

export default EditProfile;
