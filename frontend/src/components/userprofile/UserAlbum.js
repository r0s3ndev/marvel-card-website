import React, { useEffect, useState } from 'react'

function UserAlbum({updatedData, userData, sell_card_for_credits}) {
  const cards = userData.cards;
  const [localCards, setlLcalCards] = useState(userData.cards);
  const sortedCards = localCards.sort((a, b) => a.id - b.id);

  useEffect(()=>{
    setlLcalCards(userData.cards);
  }, [userData])

  const sellCard = (c_id) => {
    
    sell_card_for_credits(c_id);
  }

  const tradeCard = (c_id) => {
    console.log("trade card id", c_id)
  }

  return (
    <>
        <div>
            <div className='main-container'>
              <button>select</button>
              {/* cardi list  */}
              
              {updatedData && (
                  <div className='loading-overlay-cardPack'>
                      <div className="loader">
                          <div className="circle"></div>
                          <div className="circle"></div>
                          <div className="circle"></div>
                          <div className="circle"></div>
                      </div>
                  </div>
              )}
              <div>
                <div className='user-album-div'>
                  {sortedCards.map((c, i) => (
                    <div key={i++}>
                      <div className='image-div'>
                        <p className='image-id'>{c.id}</p>
                        <img className="card-img" alt={c.name} src={c.thumbnail.path + "." + c.thumbnail.extension}/>
                        <p className='image-text'>
                          {c.name.replace(/\s*\(.*$/, '')} <br/>
                        </p>
                      </div>

                      <button onClick={()=>sellCard(c.id)}> Sell</button>
                      <button onClick={()=>tradeCard(c.id)}> Trade</button>
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