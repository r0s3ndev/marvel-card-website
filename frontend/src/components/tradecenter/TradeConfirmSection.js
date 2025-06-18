import { useEffect, useState } from 'react'
import CustomConfirmTradeCardList from '../custom/CustomConfirmTradeCardList';
import axios from 'axios';
import { useNavigate } from 'react-router';

function TradeConfirmSection({userData, BACKUP}) {
    const navigate = useNavigate();
    const currentData = JSON.parse(localStorage.getItem("currentTradeData"));
    const [errorMessage, setErrorMessage] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [modalCardInfo, setModalCardInfo] = useState([])//no data   
    const [tradeInfo, setTradeInfo] = useState({
        trade_id: currentData._id,
        userdata: userData,
        cards: []
    })

    useEffect(()=> {
        setTradeInfo((prevState) => ({
            ...prevState,
            cards: prevState.cards === modalCardInfo ? prevState.cards : modalCardInfo
        }));
    }, [modalCardInfo]);

    const open_modal = () => {
        setErrorMessage("");
        setModalShow(true);
    }

    const send_request_trade = async() => {
        if(tradeInfo.cards.length < 1){
            setErrorMessage("Cannot send the trade request: Missing card");
        } else {
            alert("You sure you want to send the request?");
            const res = await axios.post("http://localhost:5000/users/send_trade_offer", tradeInfo);
            if(res === 200){
                 setTimeout(()=>{
                    navigate("/trade_list");
                }, 2000);
            }
        }
    }

  return (
    <>
        <div>
            <div className="main-container">
                <p>TradeConfirmSection</p>
                <div>
                    <div>
                        <p>User: {currentData.listing_owner.user.username}</p>
                        <div>Cards:{currentData.listing_owner.card.map((c, k)=> (
                            <div key={k}>
                                <h3>{c.name}</h3>
                            </div>
                            ))}
                        </div>
                        <p>Request: {currentData.listing_owner.request}</p>
                    </div>
                    <hr/>
                    <div>
                        <p>Selected Card: {modalCardInfo.length} </p>
                        <div> Cards: {modalCardInfo.map((c, k) => (
                            <div key={k}>
                                <h3>{c.name}</h3>
                            </div>
                        ))}
                        </div>
                        <p>{errorMessage}</p>
                        <button onClick={() => open_modal()}> select card </button>
                        <button onClick={() => send_request_trade()}>send request trade</button>
                    </div>

                </div>
            </div>

            <CustomConfirmTradeCardList
                show={modalShow}
                onHide={() => setModalShow(false)}
                modalCardInfo={modalCardInfo}
                userData={userData}
                setModalCardInfo={setModalCardInfo}
                BACKUP = {BACKUP}
            />
          
        </div>
    </>
  )
}

export default TradeConfirmSection