import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import { logout } from "../../../actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const Navigation=({ isAuthenticated, user })=>
{
  const dispatch = useDispatch();

  function logoutUser() {

    dispatch(logout());    
    
    
    setTimeout(() => {
      window.location.href = '/';
    }, "2000");

  }

return (
  <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
        <Link to="/chat" style={{ color: 'inherit', textDecoration: 'inherit'}}>ChatApp</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          

          {

            isAuthenticated &&
            

              <NavDropdown title={user.name} id="basic-nav-dropdown">            
              
              <NavDropdown.Item onClick={logoutUser} >
                Logout
              </NavDropdown.Item>


            </NavDropdown>

          }  
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
);
}

export default Navigation;
