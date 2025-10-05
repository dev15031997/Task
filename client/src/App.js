import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Login from './Pages/Login';
import Error from './Pages/Error';
import Header from './Components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';

const App = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='*' element={<Error/>} />

        {/* protected Routes */}


      </Routes>
    </div>
  )
}

export default App