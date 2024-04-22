import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//paginas:
import Home from './pages/Home';

import Login from './pages/Login';
import Register from './pages/Register';

// usuários
import Users from './pages/users/Users';
import ShowUserAdmin from './pages/users/ShowUserAdmin';

import Profile from './pages/users/Profile';
import UserProfile from './pages/users/UserProfile';
import EditProfile from './pages/users/EditProfile';


import Authors from './pages/authors/Authors';
import CreateAuthors from './pages/authors/CreateAuthors';
import ViewAuthors from './pages/authors/ViewAuthors';
import EditAuthors from './pages/authors/EditAuthors';

import Books from './pages/books/Books';
import CreateBooks from './pages/books/CreateBooks';
import ViewBooks from './pages/books/ViewBooks';
import EditBooks from './pages/books/EditBooks';

import Rents from './pages/rents/Rents';
import CreateRents from './pages/rents/CreateRents';
import ViewRents from './pages/rents/ViewRents';
import EditRents from './pages/rents/EditRents';


//componentes:
import Navbar2 from './components/Navbar2'
import Footer from './components/Footer';


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar2 />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* authors */}
          <Route path="/authors" element={<Authors />} />
          <Route path="/authors/:id" element={<ViewAuthors />} />
          <Route path="/authors/create" element={<CreateAuthors />} />
          <Route path="/authors/:id/edit" element={<EditAuthors />} />

          {/* books */}
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<ViewBooks />} />
          <Route path="/books/create" element={<CreateBooks />} />
          <Route path="/books/:id/edit" element={<EditBooks />} />


          {/* Rents */}
          <Route path="/rents" element={<Rents />} />
          <Route path="/rents/:id" element={<ViewRents />} />
          <Route path="/rents/create" element={<CreateRents />} />
          <Route path="/rents/:id/edit" element={<EditRents />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* user */}

          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<ShowUserAdmin />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/profile/edit" element={<EditProfile />} />

        </Routes>

      </BrowserRouter>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce />

    </>

  )
}

export default App