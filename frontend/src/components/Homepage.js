import React from 'react'

function Homepage({userData}) {
  return (
    <>
      <div className='main-container'>
        
        <h1>Welcome {userData.username}</h1>
        <div className='homepage-main-div'>

          <div>
            <h4>Your cards: </h4>
            <div className='image-div'>
              <a href='/card_album'>
                <p className='image-id'>{userData.cards[0].id}</p>
                <img className="card-img" alt={userData.cards[0].name} src={userData.cards[0].thumbnail.path + "." + userData.cards[0].thumbnail.extension}/>
                <p className='image-text' >{userData.cards[0].name}</p>
              </a>
            </div>
          </div>

          <div>
            <a href='/trade_list'>
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