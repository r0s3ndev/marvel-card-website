import React, { Fragment, useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router';




function TradeList({get_trade, setConfirmTradeData, BACKUP}) {
  const navigate = useNavigate();

  const [currentTradesAvailable, setCurrentTradesAvailable] = useState([]);
  
  useEffect(()=>{
    const getTrade = async () =>{
      const res = await get_trade();
      setCurrentTradesAvailable(res.data);
    }

    getTrade()
  }, []);

  const open_trade_page = (data) => {
    setConfirmTradeData(data);
    setTimeout(()=> {
      navigate("/trade_confirm_section");
    }, 1000);
  } 
  
  return (
    <>
      <div>
        <div className="main-container">
          <h1>Available Trade</h1>
          <a href='/card_album'> Select card</a>

            {currentTradesAvailable && 
              currentTradesAvailable.map((trade, i) => (
                <Accordion defaultActiveKey="1" key={i}>
                  <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        {/* <div className='accordion-div'> */}
                          <h5>{trade.user1_cards[0].name}</h5>
                          <p>{trade.from_user1.username}</p>
                          <p>{trade.user1_request}</p>
                          <p>
                            <img className="table-card-img" alt={trade.user1_cards[0].name} src={trade.user1_cards[0].thumbnail.path + "." + trade.user1_cards[0].thumbnail.extension}/>
                            {trade.user1_cards.length}
                          </p>
                        {/* </div>   */}
                    </Accordion.Header>
                      
                    
                        <Accordion.Body>
                          {trade.user1_cards.map((c, j) => (
                            <div key={j}>
                              <div>
                                <img
                                  className="card-img"
                                  alt={c.name}
                                  src={`${c.thumbnail.path}.${c.thumbnail.extension}`}
                                />
                              </div>
                              <div>
                                <p>{c.description ? c.description : BACKUP.DESC}</p>
                              </div>
                            </div>
                          ))}
                          
                        <button onClick={() => open_trade_page(trade)}>select</button>
                        </Accordion.Body>
                            
                      
                  </Accordion.Item>
                </Accordion>
              ))
            }
      
        </div>
  
      </div>
       
    </>
  )
}

export default TradeList