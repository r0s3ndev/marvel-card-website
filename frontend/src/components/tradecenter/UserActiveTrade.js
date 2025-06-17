import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";


function UserActiveTrade({userData, tradeData, setUserData, BAKCUP}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const userActiveTrade = tradeData.filter(m => m.listing_owner.user._id === userData._id);
    const [tradeInfo, setTradeInfo] = useState({
    userdata: userData,
    request: "",
    cards: []
  })

    const deleteTrade = async (trade) => {
        console.log(trade);
        setLoading(true);
        try{
            const res = await axios.post("http://localhost:5000/users/delete_active_trade", {username: userData.username, trade: trade});
            if(res.status === 200){
                console.log("done");
                // setUserData(prev => ({ ...prev, ...res.data.user}));
                setTimeout(()=>{
                    setLoading(false);
                    navigate("/user_trade");
                }, 1000);
            } else {
                console.error(res);
            }
        } catch (error) {
            console.error("Error deleting card: Exception: " + error);
        }
    }

    const acceptTrade = async (bidderTradeId, trade) => {
        try{
            const res = await axios.post("http://localhost:5000/users/accept_trade_offer", {bidderTradeId: bidderTradeId, trade: trade});
            if(res.status === 200){
                console.log("done");
                setTimeout(()=>{
                    setLoading(false);
                    navigate("/user_trade");
                }, 1000);
            }
        } catch (error) {
            console.error("Error while accepting the offer: Exception: " + error);
        }
    }

  return (
    <div className="main-container">
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
        {userActiveTrade > 0 ? (
            <p> no current active trade</p>
        ) : 
        (
           <div>
            {userActiveTrade.map((trade, i) => (
                <div key={i}>
                    <h2>Status: {trade.status}</h2>
                    <h2>Cards: 
                        {trade.listing_owner.card.map((card, j) => (
                            <div key={j}>
                                <p>{card.name}</p>
                            </div> 
                        ))}
                    </h2>
                    <h2>Your Request: {trade.listing_owner.request}</h2>
                    <button onClick={() => deleteTrade(trade)}> delete </button>
                    {trade.bidder_user.map((info, i) => (
                        <div key={i}>
                            <hr/>
                            <h2>Bidder: {info.userdata.username}</h2>
                            Offer:
                            <div> {info.cards.map((card, j) => 
                                <div key={j}>
                                    <h2>{card.name}</h2>
                                </div>
                            )}
                            <button onClick={() => acceptTrade(info.trade_id, trade)}> accept </button>
                            

                            </div>
                           
                        </div>
                    ))}
                    
                    <hr/>
                </div>
            ))}
           </div>
        )}

    </div>
  )
}

export default UserActiveTrade