import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Layout/Loader/Loader";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, loadUser } from "../../actions/authAction";
import { useHistory } from "react-router";
import "./Login.css";

const Login=({})=>
{

  const history = useHistory();
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.login
  );

  

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      dispatch(loadUser());
      history.push("/chat");
    }
  }, [  error, isAuthenticated, history  ]);

return (

  <Container>

    {loading ? (<Loader />):(
      <Row>

      <Col md={6} className="login__bg"></Col>

      <Col md={6}>

        <Form style={{ paddingTop: "200px", paddingLeft: "50px" }} onSubmit={loginSubmit}>

          <h1 className="text-center">Login</h1>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email"
              onChange={(e) => setLoginEmail(e.target.value)} />            
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" 
              onChange={(e) => setLoginPassword(e.target.value)} />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Submit
          </Button>

        </Form>

        <p className="text-center">

          Don’t have an account ?  

          <Link to="/signup" style={{ color: 'Blue', textDecoration: 'inherit'}}>  Sign Up </Link>

          now

        </p> 

      </Col>      

    </Row>
    )}    

  </Container>

);
}

export default Login;
