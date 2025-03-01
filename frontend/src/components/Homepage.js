import React, { useState } from 'react'

// bootstrap react
import Carousel from 'react-bootstrap/Carousel';


function Homepage({logoutUser, userData}) {
  const [message, setMessage] = useState();
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
            <a href='/card_album'>
              <img alt={userData.favoriteHeroCard[0].name} src={userData.favoriteHeroCard[0].thumbnail.path + "." + userData.favoriteHeroCard[0].thumbnail.extension}/>
              <p>{userData.favoriteHeroCard.description ? userData.favoriteHeroCard.description : "no description available"}</p>
            </a>
          </div>

          <div style={{backgroundColo:"blue", border: "1px solid black", width: "100%"}}>
            TRADE section
          </div>
        </div>

        

    

      </div>
    
    </>
  )
}

export default Homepage