import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router';

function TradeList({userData, tradeData, BACKUP}) {
  const navigate = useNavigate();
  const currentUserId = userData._id;
  
  const open_trade_page = (data) => {
    localStorage.setItem("currentTradeData", JSON.stringify(data));
    setTimeout(()=> {
      navigate("/trade_confirm_section");
    }, 1000);
  };


  return (
    <>
      <div>
        <div className="main-container">
          <h1>Available Trade</h1>
          <a href='/card_album'> Select card</a>
            {tradeData && 
              tradeData.filter(trade => trade.listing_owner.id !== currentUserId).map(trade => (
                <Accordion defaultActiveKey="1" key={trade._id}>
                  <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <div className='accordion-div'>
                          <h5>{trade.user1_cards[0].name}</h5>
                          <p>{trade.from_user1.username}</p>
                          <p>{trade.user1_request}</p>
                          <p>
                            <img className="table-card-img" alt={trade.user1_cards[0].name} src={trade.user1_cards[0].image ? trade.user1_cards[0].image : BACKUP.IMG}/>
                            {trade.user1_cards.length}
                          </p>
                        </div>  
                    </Accordion.Header>
                      
                    
                        <Accordion.Body>
                          {trade.user1_cards.map((c, j) => (
                            <div key={j}>
                              <div>
                                <img
                                  className="card-img"
                                  alt={c.name}
                                  src={`${c.image ? c.image : BACKUP.IMG}`}
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