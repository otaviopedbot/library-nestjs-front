import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getBook, updateBook, updateBookCover } from '../../requests/book';
import { toast } from 'react-toastify';

// Componentes
import Card from '../../components/Card';
import Check from '../../components/buttons/Check';
import Return from '../../components/buttons/Return';
import InputField from '../../components/InputField';
import ValidateData from '../../components/validation/ValidateData';
import ValidateAdmin from '../../components/validation/ValidateAdmin';

const EditBooks = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [cover, setCover] = useState(null);
  const [book, setBook] = useState({
    title: '',
    page: '',
    quantity: '',
    author_id: '',
    bookshelve_id: '',
    synopsis: '',
  });


  useEffect(() => {
    const showBook = async () => {
      try {
        const data = await getBook(id);
        setBook({
          title: data.title,
          page: data.page,
          quantity: data.quantity,
          author_id: data.author_id,
          synopsis: data.synopsis
        });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    showBook();
  }, [id]);

  const editBook = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await updateBook(
        id,
        book.title,
        book.page,
        book.quantity,
        book.author_id,
        book.synopsis,
      );
      await updateBookCover(id, cover)

      toast.success(`Livro ${book.title} editado com sucesso`);
      navigate(`/books/${id}`);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <ValidateData data={book} message={'Livro não encontrado'}>
      <ValidateAdmin>
        <div className="grid grid-cols-1 grid-rows-1 h-screen">
          <div className="flex justify-center items-center">
            <Card title={'Editar Livro'}>
              <form onSubmit={editBook} encType="multipart/form-data">
                
                <InputField
                  label={'Título'}
                  type={'text'}
                  name={'title'}
                  value={book.title}
                  onChange={(e) => setBook({ ...book, title: e.target.value })}
                />
                <InputField
                  label={'Sinópse'}
                  type={'textarea'}
                  name={'synopsis'}
                  value={book.synopsis}
                  onChange={(e) => setBook({ ...book, synopsis: e.target.value })}
                />
                <InputField
                  label={'Capa'}
                  type={'file'}
                  name={'cover'}
                  value={cover}
                  onChange={(e) => setCover(e.target.files[0])}
                />
                <InputField
                  label={'Páginas'}
                  type={'number'}
                  name={'page'}
                  value={book.page}
                  onChange={(e) => setBook({ ...book, page: e.target.value })}
                />
                <InputField
                  label={'Quantidade'}
                  type={'number'}
                  name={'quantity'}
                  value={book.quantity}
                  onChange={(e) => setBook({ ...book, quantity: e.target.value })}
                />
                <InputField
                  label={'ID do Autor'}
                  type={'number'}
                  name={'author_id'}
                  value={book.author_id}
                  onChange={(e) => setBook({ ...book, author_id: e.target.value })}
                />

                {/* Botões */}
                {!isLoading && <Check />}
                <Link to={`/books/${id}`}>
                  <Return />
                </Link>
              </form>
            </Card>
          </div>
        </div>
      </ValidateAdmin>
    </ValidateData>
  );
};

export default EditBooks;
