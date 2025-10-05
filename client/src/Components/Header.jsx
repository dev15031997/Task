import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" style={{ height: "60px" }}>
        <Container>
            <Navbar.Brand as={NavLink} to="/">Task</Navbar.Brand>
          <Nav className="me-auto">
           <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Mark Otto</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  )
}

export default Header