import React, { Fragment, useEffect, useState } from 'react'
import CustomAvailableTrade from '../custom/CustomAvailableTrade';
import Accordion from 'react-bootstrap/Accordion';


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
                            <img onClick={() => open_trade_modal(trade)} className="table-card-img" alt={trade.user1_cards[0].name} src={trade.user1_cards[0].thumbnail.path + "." + trade.user1_cards[0].thumbnail.extension}/>
                            {trade.user1_cards.length}
                          </p>
                          <a href='£'>select</a>
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
                        </Accordion.Body>
                            
                      
                  </Accordion.Item>
                </Accordion>
              ))
            }
      
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