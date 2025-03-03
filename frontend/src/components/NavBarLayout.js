import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
function NavBarLayout({credits, userData, logoutUser, children }) {
    const navigate = useNavigate();
    const [localCredits, setLocalCredits] = useState(credits);

    useEffect(()=> {
        setLocalCredits(userData.credits);
    }, [userData]);

    const handleLogout = async () => {
        const res = await logoutUser();
        if(res.status === 200){
            setTimeout(() => {
            navigate('/login');
            }, "3000");
        }
    }
  return (
    <>
        <Navbar bg="dark" data-bs-theme="dark" sticky="top">
            <Container>
                <Navbar.Brand href="#home">PWM-Project</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/homepage"> HOME</Nav.Link>
                    <Nav.Link href="/shop"> SHOP</Nav.Link>
                    <Nav.Link href="/profile"> PROFILE</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end"> 
                    <Navbar.Text>
                    Credits: {localCredits}
                    </Navbar.Text>
                    <Button style={{marginLeft: "10px"}} variant="outline-secondary" onClick={handleLogout}>logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <main>{children}</main>
    </>
  )
}

export default NavBarLayout