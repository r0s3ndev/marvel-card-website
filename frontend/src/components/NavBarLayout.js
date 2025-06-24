import { useContext, useEffect, useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { UserContext } from './UserProvider';
function NavBarLayout({children }) {
    const { userData } = useContext(UserContext);
    const username = userData.username.toUpperCase();
    const navigate = useNavigate();
    const [localCredits, setLocalCredits] = useState(userData?.credits || []);

    useEffect(()=> {
        setLocalCredits(userData.credits);
    }, [userData]);

    const handleLogout = async () => {
        try{
            const res = await axios.post("http://localhost:5000/users/logout", {}, {withCredentials: true});
            if(res.status === 200){
                setTimeout(() => {
                navigate('/login');
                }, "3000");
            }
        } catch (error) {
            console.error("Error while loggin out; Exception: " + error);
        }

    }
  return (
    <>
        <Navbar data-bs-theme="dark" className="navbar" sticky="top">
            <Container>
                <Navbar.Brand href="/homepage">PWM-Project </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/shop"> SHOP</Nav.Link>
                    <Nav.Link href="/trade_list"> TRADE</Nav.Link>
                    {/* <Nav.Link href="/profile"> PROFILE</Nav.Link> */}
                    <NavDropdown title="PROFILE" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/user_items">
                            ITEMS
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/card_album">ALBUM</NavDropdown.Item>
                        <NavDropdown.Item href="/user_settings">SETTINGS</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogout}>
                            LOGOUT
                        </NavDropdown.Item>
                    </NavDropdown>    
                    <Nav.Link href="/homepage"> {username}</Nav.Link>
                </Nav>
                
                <Navbar.Collapse className="justify-content-end"> 
                    <Navbar.Text>
                    Credits: {localCredits}
                    </Navbar.Text>
                    <Button style={{marginLeft: "10px"}} variant="dark" onClick={handleLogout}>LOGOUT</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <main>{children}</main>
    </>
  )
}

export default NavBarLayout