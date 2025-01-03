import React, { useState } from 'react'
import { useNavigate } from 'react-router';

// bootstrap react
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';


function Homepage({logoutUser, userData}) {
  const navigate = useNavigate();
  const [message, setMessage] = useState();

  console.log("userData -> ", userData);

  const handleShopClick = () => {
    console.log("shop clicked");
  }

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

          <div>
            {/* favorite card & album - collectable card */}
            <h4>Your favvorite hero: </h4>
            <img alt={userData.favoriteHeroCard[0].name} src={userData.favoriteHeroCard[0].thumbnail.path + "." + userData.favoriteHeroCard[0].thumbnail.extension}/>
            <p>{userData.favoriteHeroCard.description ? userData.favoriteHeroCard.description : "no description available"}</p>
          </div>

          <div className='carousel-shop-div' onClick={handleShopClick}>
            {/* shop section */}
            <Carousel fade>
              <Carousel.Item className='carousel-item'>
                <img alt="1st_image" src="http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784.jpg" text="SHOP" />
                <Carousel.Caption>
                  <h3>Buy booster to get more hero</h3>
                  <p>
                    SHOP
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item className='carousel-item'>
                <img alt="2nd_image" src='http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16.jpg' text="SHOP" />
                <Carousel.Caption>
                  <h3>Buy booster to get more hero</h3>
                  <p>
                    SHOP
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item className='carousel-item'>
                <img alt="3rd_image" src='http://i.annihil.us/u/prod/marvel/i/mg/9/30/535feab462a64.jpg' text="SHOP" />
                <Carousel.Caption>
                <h3>Buy booster to get more hero</h3>
                  <p>
                    SHOP
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>

          </div>

          <div>
            {/* Trade section */}

          </div>

        </div>
    
      </div>
         
    
    </>
  )
}

export default Homepage