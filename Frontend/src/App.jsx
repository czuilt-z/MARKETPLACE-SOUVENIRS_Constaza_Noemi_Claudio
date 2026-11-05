import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import MyData from './pages/MyData'
import MyPublications from './pages/MyPublications'
import CreatePublication from './pages/CreatePublication'
import EditPublication from './pages/EditPublication'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Páginas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/productos/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />

        {/* Páginas privadas */}
        <Route path="/carrito" element={<Cart />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/mis-datos" element={<MyData />} />
        <Route path="/mis-publicaciones" element={<MyPublications />} />
        <Route path="/crear-publicacion" element={<CreatePublication />} />
        <Route path="/editar-publicacion/:id" element={<EditPublication />} />

        {/*rutas inexistentes*/}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
