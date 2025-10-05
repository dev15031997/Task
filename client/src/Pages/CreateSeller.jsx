import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const CreateSeller = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    password: "",
    cpassword: ""
  });

  const [skills, setSkills] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { name, password, cpassword, email, phone } = data;

    if (name === "") {
      alert('Please enter the Name')
    } else if (email === "") {
      alert('Please enter your Email')
    } else if (!email.includes('@')) {
      alert('Enter Valid Email')
    } else if (phone === "") {
      alert('Please enter your Mobile number')
    } else if (password === "") {
      alert('Password cannot be empty')
    } else if (password.length < 5) {
      alert('Password must be 5 characters')
    } else if (cpassword === "") {
      alert('Confirm password cannot be empty')
    } else if (password !== cpassword) {
      alert('Password do not match')
    } else {
      try {
        const res = await axios.post('http://localhost:4000/api/user/create-seller', {
          name: data.name,
          email: data.email,
          phone: data.phone,
          country: data.country,
          state: data.state,
          password: data.password,
          cpassword: data.cpassword,
          skills: skills 
        })

        if (res.data.status === 201) {
          navigate('/admin/sellers')
        }
        else {
          alert('Error creating seller')
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert('Seller creation failed');
        } else {
          alert('Something went wrong. Please try again.');
        }
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
        <div className='w-100' style={{ maxWidth: '800px' }}>
          <h1 className="text-center mt-3">Create Seller</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" name="name" value={data.name} onChange={setUser} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={data.email} onChange={setUser} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control type="text" placeholder="Contact number" name="phone" value={data.phone} onChange={setUser} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" placeholder="Country" name="country" value={data.country} onChange={setUser} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicState">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="State" name="state" value={data.state} onChange={setUser} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSkills">
              <Form.Label>Skills</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter skills separated by commas(,)"
                onChange={(e) => {
                  const input = e.target.value;
                  const skillArray = input.split(',').map(skill => skill.trim()).filter(skill => skill !== "");
                  setSkills(skillArray);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={data.password} onChange={setUser} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmpassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm password" name="cpassword" value={data.cpassword} onChange={setUser} />
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

export default CreateSeller