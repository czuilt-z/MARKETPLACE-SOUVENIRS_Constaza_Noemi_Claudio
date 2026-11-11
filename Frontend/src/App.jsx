import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import RutaPrivada from './components/RutaPrivada'
import { ROLES } from './api/utils'

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
import AdminUsers from './pages/AdminUsers'
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
        <Route element={<RutaPrivada />}>
          <Route path="/perfil" element={<Profile />} />
          <Route path="/mis-datos" element={<MyData />} />
        </Route>

        {/* Cualquier usuario con sesión puede comprar y vender */}
        <Route element={<RutaPrivada />}>
          <Route path="/carrito" element={<Cart />} />
          <Route path="/mis-publicaciones" element={<MyPublications />} />
          <Route path="/crear-publicacion" element={<CreatePublication />} />
          <Route path="/editar-publicacion/:id" element={<EditPublication />} />
        </Route>

        {/* Solo administrador */}
        <Route element={<RutaPrivada roles={[ROLES.ADMINISTRADOR]} />}>
          <Route path="/admin/usuarios" element={<AdminUsers />} />
        </Route>

        {/*rutas inexistentes*/}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
