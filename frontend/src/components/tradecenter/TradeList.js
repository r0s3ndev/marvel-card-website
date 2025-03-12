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

          <div className='table-div'>
            <table className='table-card'>
            <tr>
              <th>name</th>
              <th>user</th>
              <th>request</th>
              <th>img</th>
              <th>action</th>
            </tr>
              <tbody>
                {currentTradesAvailable && 
                  currentTradesAvailable.map((trade) => (
                    <tr>
                        <td>{trade.user1_cards[0].name}</td>
                        <td>{trade.from_user1.username}</td>
                        <td>{trade.user1_request}</td>
                        <td>
                          <img className="table-card-img" alt={trade.user1_cards[0].name} src={trade.user1_cards[0].thumbnail.path + "." + trade.user1_cards[0].thumbnail.extension}/>
                        </td>
                        <td><button>select</button></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

        </div>
      </div>
       
    </>
  )
}

export default TradeList