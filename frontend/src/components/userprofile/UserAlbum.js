import React, { useState } from 'react'

function UserAlbum({userData, BACKUP}) {
  
  const cards = userData.favoriteHeroCard;
  return (
    <>
        <div>
            <div className='main-container'>
              <h1> Available cards </h1>
              {/* cardi list  */}
              {cards.map((c) => (
                <div key={c.id} style={{border: "solid"}}>
                  <p>{c.id}</p>
                  <p>{c.name}</p>
                  <p>{c.desc ? c.desc : BACKUP.DESC}</p>
                </div>
                
              ))}
              
            </div>
        </div>
    </>
  )
}

export default UserAlbum