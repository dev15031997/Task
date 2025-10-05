import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className='w-100' style={{ maxWidth: '400px' }}>
          <h1 className="text-center mb-4">Login</h1>

          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
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