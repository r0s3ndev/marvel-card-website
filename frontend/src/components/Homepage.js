import React, { useState } from 'react'

// bootstrap react
import Carousel from 'react-bootstrap/Carousel';


function Homepage({logoutUser, userData}) {
  const [message, setMessage] = useState();

  console.log("userData -> ", userData);

  const handleShopClick = () => {
    console.log("shop clicked");
  }

 
  return (
    <>
      <div className='homepage-container'>
        
        <h1>Welcome {userData.username}</h1>
        <div className='card-trade-div'>
          <div>
            {/* favorite card & album - collectable card */}
            <h4>Your favvorite hero: </h4>
            <img alt={userData.favoriteHeroCard[0].name} src={userData.favoriteHeroCard[0].thumbnail.path + "." + userData.favoriteHeroCard[0].thumbnail.extension}/>
            <p>{userData.favoriteHeroCard.description ? userData.favoriteHeroCard.description : "no description available"}</p>
          </div>

          <div style={{backgroundColo:"blue", border: "1px solid black", width: "100%"}}>
            TRADE section
          </div>
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

    

      </div>
    
    </>
  )
}

export default Homepage