import React, { useEffect, useState } from 'react'

function TradeList({get_trade}) {
  const [currentTradesAvailable, setCurrentTradesAvailable] = useState([]);
  useEffect(()=>{
    const getTrade = async () =>{
      const res = await get_trade();
      setCurrentTradesAvailable(res.data);
    }

    getTrade()
  }, [])
  

  return (
    <>
      <div>
        <div className="main-container">
          <h1>Available Trade</h1>
          <a href='/card_album'> Select card</a>

          <div className='user-album-div'>
            {currentTradesAvailable && 
              currentTradesAvailable.map((trade) => (
                <div key={trade._id}>
                  <p>trade from {trade.from_user1.username}</p>
                  <div className='image-div'>
                    <p className='image-id'>{trade.user1_cards[0].id}</p>
                    <img className="card-img" alt={trade.user1_cards[0].name} src={trade.user1_cards[0].thumbnail.path + "." + trade.user1_cards[0].thumbnail.extension}/>
                    <p className='image-text'>
                      {trade.user1_cards[0].name.replace(/\s*\(.*$/, '')} <br/>
                    </p>
                  </div>
                  <p>request: {trade.user1_request}</p>
                  
                </div>
              ))
            }
          </div>

        </div>
      </div>
       
    </>
  )
}

export default TradeList