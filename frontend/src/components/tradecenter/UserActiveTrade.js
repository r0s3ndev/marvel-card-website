import axios from 'axios';
import { useNavigate } from "react-router";

//ADD MODAL TO SHOW CARD INFO
function UserActiveTrade({userData, tradeData, BAKCUP}) {
    const navigate = useNavigate();
    const userActiveTrade = tradeData.filter(m => m.listing_owner.user._id === userData._id);

    const deleteTrade = async (trade) => {
        console.log(trade);
        try{
            const res = await axios.post("http://localhost:5000/users/delete_active_trade", {username: userData.username, trade: trade});
            if(res.status === 200){
                console.log("done deleting");
                setTimeout(()=>{
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
                    navigate("/user_trade");
                }, 1000);
            }
        } catch (error) {
            console.error("Error while accepting the offer: Exception: " + error);
        }
    }

  return (
    <div className="homepage-container">
        <div className='album-text'>
            <h1>Active Trade</h1>
            <a href='/card_album'> Back &rarr;</a>
        </div>
        <div className="user-active-trade-div">
            {userActiveTrade > 0 ? (
                <p> no current active trade</p>
            ) : 
            (
            <div className="active-trade-inner-div">
                {userActiveTrade.map((trade, i) => (
                    <div className="active-trade-box" key={i}>
                        <div>
                            <p>Status: <span className="trade-status">{trade.status}</span></p>
                            <p>Cards: 
                                {trade.listing_owner.card.map((card, j) => (
                                    <div key={j}>
                                        <li>{card.name}</li>
                                    </div> 
                                ))}
                            </p>
                            <p>Your Request: {trade.listing_owner.request}</p>
                            <button className="button button3" onClick={() => deleteTrade(trade)}> delete </button>
                        </div>
                        {trade.bidder_user.length > 0 ? trade.bidder_user.map((info, i) => (
                            <div key={i}>
                                <p>Bidder: {info.userdata.username}</p>
                                <p>Offer:</p>
                                <div> 
                                    {info.cards.map((card, j) => 
                                        <div key={j}>
                                            <p>{card.name}</p>
                                        </div>
                                    )}
                                    <button className="button button5" onClick={() => acceptTrade(info.trade_id, trade)}> accept </button>
                                </div>
                            </div>
                        )) : (<div> <span className="bidder-status">No Bidder</span></div>)}
                    </div>
                ))}
            </div>
            )}
        </div>

    </div>
  )
}

export default UserActiveTrade