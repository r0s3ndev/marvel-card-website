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
              <button>select</button>
              {/* cardi list  */}
              <div>
                <div className='user-album-div'>
                  {sortedCards.map((c, i) => (
                    <div key={i++}  className='image-div'>
                      <p className='image-id'>{c.id}</p>
                      <img className="card-img" alt={c.name} src={c.thumbnail.path + "." + c.thumbnail.extension}/>
                      <p className='image-text'>
                        {c.name.replace(/\s*\(.*$/, '')} <br/>
                        
                        {/* <button onClick={()=>sellCard(c.id)}> Sell</button>
                        <button > Trade</button> */}
                      </p>
                      
                    </div>
                  ))}
                </div>
              </div>
              
            </div>
        </div>
    </>
  )
}

export default UserAlbum