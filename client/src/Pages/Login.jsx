import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {useAuth} from './UserContext'

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [userauth,setuserauth]=useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:4000/api/user/login', {
        email: data.email,
        password: data.password
      })

      if (res.data.status === 200) {
        setuserauth({...userauth,user:res.data.user,token:res.data.token})
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data))
        navigate('/')
      }
      else {
        alert('Login Failed')
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Incorrect email or password');
      } else {
        alert('Something went wrong. Please try again.');
      }
    }

  }

  const setUser = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setData((val) => {
      return {
        ...val,
        [name]: value
      }
    })
  }


  return (
    <>
      <div className="d-flex justify-content-center py-4">
        <div className='w-100' style={{ maxWidth: '500px' }}>
          <h1 className="text-center mb-4">Login</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={data.email} onChange={setUser} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={data.password} onChange={setUser} />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Login