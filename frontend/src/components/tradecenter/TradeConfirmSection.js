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
            if(res.status === 200){
                 setTimeout(()=>{
                    navigate("/trade_list");
                }, 1000);
            }
        }
    }

  return (
    <>
        <div>
            <div className="homepage-container">
                <div className='album-text'>
                    <h1>Manda richiesta</h1>
                    <a href='/trade_list'> Back &rarr;</a>
                </div>
                <div className="user-send-trade-request-div">
                    <div>
                        <h2>USER OWNER: {currentData.listing_owner.user.username}</h2>
                        <h2>Cards:{currentData.listing_owner.card.map((c, k)=> (
                            <div key={k}>
                                <li>{c.name}</li>
                            </div>
                            ))}
                        </h2>
                        <h2>Owner request: {currentData.listing_owner.request}</h2>
                    </div>
                    <hr/>
                    <div>
                        <h2>Selected Card: {modalCardInfo.length} </h2>
                        <h2> Cards: {modalCardInfo.map((c, k) => (
                            <div key={k}>
                                <li>{c.name}</li>
                            </div>
                        ))}
                        </h2>
                        <p>{errorMessage}</p>
                        <button className='button button4' onClick={() => open_modal()}> select card </button>
                        <button className='button button5' onClick={() => send_request_trade()}>send request trade</button>
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