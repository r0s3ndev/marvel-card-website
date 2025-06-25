import { useEffect, useState } from 'react';
import CustomCardModal from '../custom/CustomCardModal';
import { useNavigate } from 'react-router';
import axios from 'axios';
function UserAlbum({userData, setUserData, tradeData, setOnCreateTradeData, BACKUP}) {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [modalCardInfo, setModalCardInfo] = useState();
  const userCards = userData.cards;
  const currentUserId = userData._id;
  const sortedCards = userCards.sort((a, b) => a.id - b.id);

  useEffect(()=>{
    localStorage.removeItem("onCreateTradeData");
  }, []);

  const selected_card = (card) => {
    setModalShow(true);
    setModalCardInfo(card);
  }


  const sellCard = async (c_id) => {
    try{
      const isCardBeingBidded = tradeData.some(trade => trade.bidder_user.some(user => user.cards.some(card => card.id === c_id && user.userdata._id === currentUserId)));
      const isCardBeingTraded = tradeData.some(trade => trade.listing_owner.card.some(card => card.id === c_id && trade.listing_owner.user._id === currentUserId));
      if(isCardBeingBidded || isCardBeingTraded){
        const userConfirm = window.confirm("The card is being traded, by selling it, it will remove the trade. Continue?");
        if(userConfirm){
          const res = await axios.post("http://localhost:5000/users/sell_card", {c_id: c_id, username : userData.username, isCardTraded:true});
          if(res.status === 200){
            setUserData(prev => ({ ...prev, ...res.data.updatedData}));
          }
        } else {
          console.log("not confirmed");
        }
      } else {
          const res = await axios.post("http://localhost:5000/users/sell_card", {c_id: c_id, username : userData.username, isCardTraded:false});
          if(res.status === 200){
            setUserData(prev => ({ ...prev, ...res.data.updatedData}));
          }
      }

    } catch (error) {
        console.error("Error while selling card; Exception: " + error);
    }
  }

  const selected_card_to_trade = (card) => {
    localStorage.setItem("onCreateTradeData", JSON.stringify([card]));
    setOnCreateTradeData([card]);

    setTimeout(()=> {
      navigate("/trade_create_section");
    }, 1000)
  }

  return (
    <>
        <div>
            <div className='homepage-container'>
              <div className='album-text'>
                <h1>Your cards ({sortedCards.length}):</h1>
                <a href='/user_trade'> Active trades &rarr;</a>
              </div>
              <div>
                <div className='user-album-div'>
                  {sortedCards.map((c, i) => (
                    <div key={i++} className='album-single-card'>
                      <div className='image-div' onClick={() => selected_card(c)}>
                        <p className='image-id'>{c.species}</p>
                        <img className="card-img" alt={c.name} src={c.image ? c.image : BACKUP.IMG}/>
                        <p className='image-text'>
                          {c.name.replace(/\s*\(.*$/, '')} <br/>
                        </p>
                      </div>
                      <div>
                        <button className='button button3' onClick={()=>sellCard(c.id)}> Sell</button>
                        <button className='button button4' onClick={()=>selected_card_to_trade(c)} disabled={tradeData.some(trade => trade.listing_owner.card.some(card => card.id === c.id && trade.listing_owner.user._id === currentUserId))}> Trade</button>
                      </div>
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