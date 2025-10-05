import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Login from './Pages/Login';
import Error from './Pages/Error';
import Header from './Components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='*' element={<Error/>} />

        {/* protected Routes */}


      </Routes>
    </div>
  )
}

export default App