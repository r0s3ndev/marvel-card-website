import React, { useState } from 'react'

function UserAlbum({userData, BACKUP}) {
  const cards = userData.cards;
  const sortedCards = cards.sort((a, b) => a.id - b.id);

  const sellCard = (c_id) => {
    console.log("sell ccard id", c_id)
  }
  return (
    <>
        <div>
            <div className='main-container'>
              <h1> Available cards </h1>
              {/* cardi list  */}
              {sortedCards.map((c, i) => (
                <div key={i++} style={{border: "solid"}}>
                  <p>{c.id}</p>
                  <p>{c.name}</p>
                  <p>{c.desc ? c.desc : BACKUP.DESC}</p>
                  <button onClick={()=>sellCard(c.id)}> Sell</button>
                  <button > Trade</button>
                </div>
                
              ))}
              
            </div>
        </div>
    </>
  )
}

export default UserAlbum