// FIX THE MESSAGE in "send_trade".
// FIX "send_trade": onChange must resmove the text error.

import React, { useState } from 'react';
import CustomTradeCardModal from '../custom/CustomTradeCardModal';
import { Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router';

function TradeCreateSection({userData, create_trade, BACKUP}) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [card2Trade, setCard2Trade] = useState(() => {
    const cardData = localStorage.getItem("cardTrade");
    return cardData ? JSON.parse(cardData) : [];
  });
  const [modalCardInfo, setModalCardInfo] = useState([card2Trade]);
  const [tradeInfo, setTradeInfo] = useState({
    userdata: userData,
    request: "",
    cards: []
  })

  const handleRequest = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
      setTradeInfo((prevState) => ({
          ...prevState,
          [name]: value,
          cards: prevState.cards === modalCardInfo ? prevState.cards : modalCardInfo
      }));
  }

  const selected_card = () => {
    setModalShow(true);
    setTradeInfo((prevState) => ({
      ...prevState,
      request: ""
  }));
  }

  const send_trade = () => {
    if(tradeInfo.request === "") {
      setMessage("Type \"none\" if you have no specific request!");
    } else {
      setMessage("")
      create_trade(tradeInfo);
      setTimeout(()=>{
        navigate("/card_album");
      }, 2000);
    }
  }

  return (
    <>
      <div>
        <div className="main-container">
          <h1>Create a trade</h1>
          <a href='/card_album'> Select more card</a>
          <h2> Card selected 
            {modalCardInfo.length > 1 && 
              (<>
                <Badge pill bg="danger">
                  {modalCardInfo.length }
                </Badge>
              </>)
            }
            
          </h2>

          <div className='trade-main-div'>
            <div className='image-div' onClick={() => selected_card()}>
              <p className='image-id'> {card2Trade.species}</p>
              <img className="card-img" alt={card2Trade.name} src={card2Trade.image ? card2Trade.image : BACKUP.IMG}/>
              <p className='image-text'> 
                {card2Trade.name.replace(/\s*\(.*$/, '')}<br/>
              </p>
            </div>

            <div>
              <label htmlFor='request'> Request: </label><br/>
              <input type='text' id="request" name="request" value={tradeInfo.request} onChange={handleRequest}></input>
              <br/>{message && message}
            </div>

            <div>
              <button onClick={send_trade}>Post trade</button>
            </div>
          </div>
        </div>

        {card2Trade && (  
          <CustomTradeCardModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            modalCardInfo={modalCardInfo}
            userData={userData}
            setModalCardInfo={setModalCardInfo}
            BACKUP={BACKUP}
          />
        )}
       
      </div>
       
    </>
  )
}

export default TradeCreateSection