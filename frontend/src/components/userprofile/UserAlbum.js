import { useEffect, useState } from 'react';
import CustomCardModal from '../custom/CustomCardModal';
import { useNavigate } from 'react-router';
import axios from 'axios';
function UserAlbum({userData, setUserData, tradeData, setOnCreateTradeData, BACKUP}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalCardInfo, setModalCardInfo] = useState();
  const userCards = userData.cards;
  const sortedCards = userCards.sort((a, b) => a.id - b.id);

  useEffect(()=>{
    localStorage.removeItem("onCreateTradeData");
  }, []);

  const selected_card = (card) => {
    setModalShow(true);
    setModalCardInfo(card);
  }

  const sellCard = async (c_id) => {
    setLoading(true);
    try{
      const res = await axios.post("http://localhost:5000/users/sell_card", {c_id: c_id, username : userData.username, amount: 1});
      if(res.status === 200){
        setUserData(prev => ({ ...prev, ...res.data.updatedData}));
        setTimeout(()=>{
            setLoading(false);
            console.log(res.data.message);
        }, 1000);
      }
    } catch (error) {
        console.error("Error while selling card; Exception: " + error);
    }
  }

  const selected_card_to_trade = (card) => {
    setOnCreateTradeData([card]);

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
              {loading && (
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
                        <p className='image-id'>{c.species}</p>
                        <img className="card-img" alt={c.name} src={c.image ? c.image : BACKUP.IMG}/>
                        <p className='image-text'>
                          {c.name.replace(/\s*\(.*$/, '')} <br/>
                        </p>
                      </div>

                      <button onClick={()=>sellCard(c.id)}> Sell</button>
                      {/* for disabled button --> tradeData.forEach(trade => trade.listing_owner.card.some(card =>  card.id === c.id)) */}
                      <button onClick={()=>selected_card_to_trade(c)} disabled={false}> Trade</button>
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