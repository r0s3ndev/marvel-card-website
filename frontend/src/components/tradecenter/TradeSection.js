import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import CustomTradeCardModal from '../custom/CustomTradeCardModal';
import { Badge } from 'react-bootstrap';

function TradeSection({userData}) {
  const [modalShow, setModalShow] = useState(false);
  const [card2Trade, setCard2Trade] = useState(() => {
    const cardData = localStorage.getItem("cardTrade");
    return cardData ? JSON.parse(cardData) : [];
  });
  
  const [modalCardInfo, setModalCardInfo] = useState([card2Trade]);


  const selected_card = () => {
    setModalShow(true);
    console.log(modalCardInfo);
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
              <p className='image-id'> {card2Trade.id}</p>
              <img className="card-img" alt={card2Trade.name} src={card2Trade.thumbnail.path + "." + card2Trade.thumbnail?.extension}/>
              <p className='image-text'> 
                {card2Trade.name.replace(/\s*\(.*$/, '')}<br/>
              </p>
            </div>

            <div>
              <label htmlFor='request'> Request: </label><br/>
              <input type='text'></input>
            </div>

            <div>
              <button>Post trade</button>
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
          />
        )}
       
      </div>
       
    </>
  )
}

export default TradeSection