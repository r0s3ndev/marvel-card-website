import React, { useEffect, useState } from 'react';
import CustomCardModal from '../custom/CustomCardModal';
import { useNavigate } from 'react-router';
function UserAlbum({select_card_to_trade, updatedData, userData, sell_card_for_credits, BACKUP}) {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [modalCardInfo, setModalCardInfo] = useState();
  const [localCards, setlLcalCards] = useState(userData.cards);
  const sortedCards = localCards.sort((a, b) => a.id - b.id);

  useEffect(()=>{
    setlLcalCards(userData.cards);
  }, [userData])

  const selected_card = (card) => {
    setModalShow(true);
    setModalCardInfo(card);
  }

  const sellCard = (c_id) => {
    sell_card_for_credits(c_id);
  }

  const selected_card_to_trade = (card) => {
    select_card_to_trade(card);

    setTimeout(()=> {
      navigate("/trade_create_section");
    }, 1000)
  }

  return (
    <>
        <div>
            <div className='main-container'>
              <h1>Your album:</h1>
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
                    <div key={i++} >
                      <div className='image-div' onClick={() => selected_card(c)}>
                        <p className='image-id'>{c.id}</p>
                        <img className="card-img" alt={c.name} src={c.thumbnail.path + "." + c.thumbnail.extension}/>
                        <p className='image-text'>
                          {c.name.replace(/\s*\(.*$/, '')} <br/>
                        </p>
                      </div>

                      <button onClick={()=>sellCard(c.id)}> Sell</button>
                      <button onClick={()=>selected_card_to_trade(c)}> Trade</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {modalCardInfo && (  
              <CustomCardModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                modalCardInfo={modalCardInfo}
                BACKUP={BACKUP}
              />
            )}
          
        </div>
    </>
  )
}

export default UserAlbum