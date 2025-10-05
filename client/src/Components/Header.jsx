import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom'
import { useAuth } from '../Pages/UserContext'

const Header = () => {
  const [userauth] = useAuth(); 

  const renderNavLinks = () => {
    const role = userauth?.user?.role;

    if (role === 'admin') {
      return (
        <Nav>
          <Nav.Link as={NavLink} to="/sellers">Sellers</Nav.Link>
          <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
          <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
        </Nav>
      );
    }

    if (role === 'seller') {
      return (
        <Nav>
          <Nav.Link as={NavLink} to="/add-product">Add Product</Nav.Link>
          <Nav.Link as={NavLink} to="/my-products">My Products</Nav.Link>
          <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
        </Nav>
      );
    }

    // If not logged in
    return (
      <Nav>
        <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
      </Nav>
    );
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" style={{ height: "60px" }}>
      <Container>
        <Navbar.Brand as={NavLink} to="/">Task</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          {renderNavLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;
