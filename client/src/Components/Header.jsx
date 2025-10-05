import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom'
import { useAuth } from '../Pages/UserContext'

const Header = () => {
  const [userauth,setuserauth] = useAuth(); 

  // Logout
  const logout=()=>{
    setuserauth({...userauth,user:null,token:""});
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const renderNavLinks = () => {
    const role = userauth?.user?.role;

    // menu based on roles
    if (role === 'admin') {
      return (
        <Nav>
          <Nav.Link as={NavLink} to="/admin/create-seller">Create Seller</Nav.Link>
          <Nav.Link as={NavLink} to="/admin/sellers">Sellers</Nav.Link>
          <Nav.Link as={NavLink} to="/admin/products">Products</Nav.Link>
          <Nav.Link as={NavLink}  onClick={logout}>Logout</Nav.Link>
        </Nav>
      );
    }

    if (role === 'seller') {
      return (
        <Nav>
          <Nav.Link as={NavLink} to="/seller/add-product">Add Product</Nav.Link>
          <Nav.Link as={NavLink} to="/seller/my-products">My Products</Nav.Link>
          <Nav.Link as={NavLink} onClick={logout}>Logout</Nav.Link>
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
