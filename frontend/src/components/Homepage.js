import React, { useState } from 'react'
import { useNavigate } from 'react-router';

// bootstrap react
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';


function Homepage({logoutUser, userData}) {
  const navigate = useNavigate();
  const [message, setMessage] = useState();

  console.log("userData -> ", userData);

  const handleLogout = async () => {
    const res = await logoutUser();
    if(res.status === 200){
      setMessage("loggin out...");
      setTimeout(() => {
        navigate('/login');
      }, "3000");
}
  }
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">AFSE - PWM Project</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/shop"> SHOP</Nav.Link>
              <Nav.Link href="#profile"> PROFILE</Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Credits: {userData.credits}
              </Navbar.Text>
              <Button style={{marginLeft: "10px"}} variant="outline-secondary" onClick={handleLogout}>logout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className='homepage-container'>
        <div>

          <h1>Welcome {userData.username}</h1>
          
        </div>
    
      </div>
         
    
    </>
  )
}

export default Homepage