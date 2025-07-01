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

  console.log("TradeList tradeData issue -->", tradeData);

  return (
    <>
      <div>
        <div className="homepage-container">
          <div className='album-text'>
            <h1>Available Trade</h1>
            <a href='/user_trade'> Your Active Trade &rarr;</a>
          </div>


          <div className='trade-list-div'>
            <a href='/card_album'> 	&larr; Create a trade</a>
            <div className='trade-grid-div'>
              <div>| USERNAME |</div>
              <div>| CARD NAME |</div>
              <div>| REQUEST |</div>
              <div>| AMOUNT |</div>
              <div>| ACTION |</div>
            </div>
            {tradeData && 
              tradeData.filter(trade => trade.listing_owner.user._id !== currentUserId).map(trade => (
                <Accordion defaultActiveKey="1" key={trade._id}>
                  <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <div className='trade-accordion-div'>
                          
                          <div>
                            <h5>{trade.listing_owner.user.username}</h5>
                          </div>
                          <div>
                            <h5>{trade.listing_owner.card[0].name}</h5>
                          </div>
                          <div>
                            <h5>{trade.listing_owner.request}</h5>
                          </div>
                          <div>
                            <img className="table-card-img" alt={trade.listing_owner.card[0].name} src={trade.listing_owner.card[0].image ? trade.listing_owner.card[0].image : BACKUP.IMG}/>
                            {trade.listing_owner.card.length}
                          </div>
                          <div>
                            <button className='button button4' onClick={() => open_trade_page(trade)}>select</button>
                          </div>
                        </div>  
                    </Accordion.Header>
                      
                    
                    <Accordion.Body>
                      {trade.listing_owner.card.map((c, j) => (
                        <>
                          <div className='trade-accordion-body-div' key={j}>
                            <div>
                              <img
                                className="card-img"
                                alt={c.name}
                                src={`${c.image ? c.image : BACKUP.IMG}`}
                              />
                            </div>
                            <div style={{"width" : "800px"}}>
                              <p>description: <br/>{c.description ? c.description : BACKUP.DESC}</p>
                              <p>Species: <br/>{c.species }</p>
                              <p>Gender: <br/>{c.gender }</p>
                              <p>House: <br/>{c.house ? c.house : "ND" }</p>
                            </div>
                          </div>
                          
                          
                          <p>=======================================================================================================================================================</p>
                        </>
                      ))}
                    </Accordion.Body>
                            
                      
                  </Accordion.Item>
                </Accordion>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default TradeList