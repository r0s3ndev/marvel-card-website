import React from 'react'

function Homepage({userData}) {
  return (
    <>
      <div className='main-container'>
        
        <h1>Welcome {userData.username}</h1>
        <div className='homepage-main-div'>

          <div>
            <h4>Your cards: </h4>
            <div>
              <a href='/card_album'>
                <img className="homepage-img" alt={userData.favoriteHeroCard[0].name} src={userData.favoriteHeroCard[0].thumbnail.path + "." + userData.favoriteHeroCard[0].thumbnail.extension}/>
                <p>{userData.favoriteHeroCard.description ? userData.favoriteHeroCard.description : "no description available"}</p>
              </a>
            </div>
          </div>

          <div>
            <a href='/trade_section'>
              <div style={{backgroundColo:"blue", border: "1px solid black", width: "100%"}}>
                TRADE section
              </div>
            </a>
          </div>

        </div>
      </div>
    </>
  )
}

export default Homepage