import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Layout/Loader/Loader";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register, loadUser } from "../../actions/authAction";
import { useHistory } from "react-router";

import "./Register.css";

const Register=({  })=>
{

  const history = useHistory();
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.register
  );

  const [name, setName] = useState();

  const [email, setEmail] = useState();

  const [password, setPassword] = useState();

  

  const registerSubmit = (e) => {

    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    
    dispatch(register(myForm));

  }; 

  useEffect(() => {
    if (error) {
      
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      dispatch(loadUser());
      history.push("/chat");
    }
  }, [dispatch, error, history, isAuthenticated]);
  
return (

  <Container>

  {loading ? (<Loader />):(<Row>

<Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">

  <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={registerSubmit}>

    <h1 className="text-center">Create account</h1>
    

    <Form.Group className="mb-3">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder="Enter name" name="name"
       onChange={(e) => setName(e.target.value)}/>    
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" name="email"
        onChange={(e) => setEmail(e.target.value)} />            
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" name="password" 
        onChange={(e) => setPassword(e.target.value)} />
    </Form.Group>
    
    <Button variant="primary" type="submit">
      Submit
    </Button>

  </Form>

</Col>

<Col md={5} className="signup__bg"></Col>

</Row>)}

    

  </Container>

);
}

export default Register;