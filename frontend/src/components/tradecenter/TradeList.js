import React, { useEffect, useState } from 'react'
import CustomAvailableTrade from '../custom/CustomAvailableTrade';

function TradeList({get_trade, BACKUP}) {
  const [currentTradesAvailable, setCurrentTradesAvailable] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState([]);
  
  useEffect(()=>{
    const getTrade = async () =>{
      const res = await get_trade();
      setCurrentTradesAvailable(res.data);
    }

    getTrade()
  }, []);

  const open_trade_modal = (data) => {
    setModalShow(true)
    setModalData([data]);
  } 
  
  return (
    <>
      <div>
        <div className="main-container">
          <h1>Available Trade</h1>
          <a href='/card_album'> Select card</a>

          <div className='table-div'>
            <table className='table-card'>
              <tbody>
                <tr>
                  <th>name</th>
                  <th>user</th>
                  <th>request</th>
                  <th>img</th>
                  <th>action</th>
                </tr>
                {currentTradesAvailable && 
                  currentTradesAvailable.map((trade) => (
                    <tr key={trade._id}>
                        <td>{trade.user1_cards[0].name}</td>
                        <td>{trade.from_user1.username}</td>
                        <td>{trade.user1_request}</td>
                        <td>
                          <img onClick={() => open_trade_modal(trade)} className="table-card-img" alt={trade.user1_cards[0].name} src={trade.user1_cards[0].thumbnail.path + "." + trade.user1_cards[0].thumbnail.extension}/>
                          {trade.user1_cards.length}
                        </td>
                        <td><button>select</button></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

        </div>

        {currentTradesAvailable && 
        (
          <CustomAvailableTrade
            show={modalShow}
            onHide={() => setModalShow(false)}
            modalCardInfo={modalData}
            BACKUP={BACKUP}
          />
        )}
      </div>
       
    </>
  )
}

export default TradeList