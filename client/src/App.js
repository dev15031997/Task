import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login';
import Error from './Pages/Error';
import CreateSeller from './Pages/CreateSeller';
import SellerList from './Pages/SellerList';
import ProductList from './Pages/ProductList';
import AddProduct from './Pages/AddProduct';
import Products from './Pages/Products';
import Header from './Components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';
import ProtectedRoute from './Routes/ProtectedRoute';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Error />} />

        {/* protected Routes Admin */}
        <Route
          path='/admin/create-seller'
          element={
            <ProtectedRoute requiredRole="admin">
              <CreateSeller />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/sellers'
          element={
            <ProtectedRoute requiredRole="admin">
              <SellerList />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/products'
          element={
            <ProtectedRoute requiredRole="admin">
              <Products />
            </ProtectedRoute>
          }
        />

        {/* protected Routes Seller */}
        <Route
          path='/seller/add-product'
          element={
            <ProtectedRoute requiredRole="seller">
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path='/seller/my-products'
          element={
            <ProtectedRoute requiredRole="seller">
              <ProductList />
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  )
}

export default App