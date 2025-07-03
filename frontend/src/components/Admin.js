import axios from 'axios';
import { useEffect, useState } from 'react';
import { Badge, Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router';



function Admin() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [shopData, setShopData] = useState({
        credit: "",
        cid:"c1",
        pack: "",
        pid: "p1",
    });


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

    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value);
        setMessage("");
        const {name, value} = e.target;
        setShopData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    
    const sendAdminRequest = async () => {
        if(shopData.credit === "" && shopData.pack === ""){
            setMessage("Fields cannot be empty");
        }
        const res = await axios.post("http://localhost:5000/users/make-special-offers", shopData);


    }
        



  return (
    <>
        <Navbar data-bs-theme="dark" className="navbar" sticky="top">
            <Container>
                <Navbar.Brand href="/homepage">PWM-Project -  ADMIN </Navbar.Brand>
                <Nav className="me-auto">
                    {/* <Nav.Link href="/profile"> PROFILE</Nav.Link> */}
                    <Nav.Link href="/user_settings"> SETTINGS</Nav.Link>  
                    <Nav.Link href="/homepage"></Nav.Link>
                </Nav>
                
                <Navbar.Collapse className="justify-content-end"> 
                    <Navbar.Text>
                    {/* Credits: {localCredits} */}
                    </Navbar.Text>
                    <Button style={{marginLeft: "10px"}} variant="dark" onClick={handleLogout}>LOGOUT</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <div>
            <div className='shop-banner'>
                    <h1>ADMIN CUSTOM SHOP </h1>
            </div>
            <div className='admin-main-div'>
                <div className='admin-inner-div'>
                    <label htmlFor="credit">Credit:</label><br/>
                    <input style={{ width: '300px' }} type="number" id="credit" name="credit" onChange={handleOnChange}/><br/>
                    <select name="cid" onChange={handleOnChange}>
                        <option value="c1" >credit1</option>
                        <option value="c2" >credit2</option>
                        <option value="c3" >credit3</option>
                    </select>
                </div>
                <br/>

                <div className='admin-inner-div'>
                    <label htmlFor="pack">Packs Price:</label><br/>
                    <input style={{ width: '300px' }} type="number" id="pack" name="pack" onChange={handleOnChange}/><br/>
                    <select name="pid" onChange={handleOnChange}>
                        <option value="p1" >pack1</option>
                        <option value="p2" >pack2</option>
                        <option value="p3" >pack3</option>
                    </select>
                </div>
                <br/>
                <div className='admin-inner-div'>
                    <button className="button button4" onClick={sendAdminRequest}>submit</button>
                </div>

                <p>{message ? <span className='admin-msg'>{message}</span> : "Insert value and select which data you want to update!"}</p>
            </div>
        </div>
    </>
  )
}

export default Admin