import { useState } from 'react'
import CustomConfirmTradeCardList from '../custom/CustomConfirmTradeCardList';

function TradeConfirmSection({userData, tradeData, BACKUP}) {
    const currentData = JSON.parse(localStorage.getItem("currentTradeData"));
    const [modalShow, setModalShow] = useState(false);
    const [modalCardInfo, setModalCardInfo] = useState([])//no data   
    const [tradeInfo, setTradeInfo] = useState({
        userdata: userData,
        request: "",
        cards: []
    })

    const selected_card = () => {
        setModalShow(true);
        setTradeInfo((prevState) => ({
            ...prevState,
            request: ""
        }));
    }


  return (
    <>
        <div>
            <div className="main-container">
                <p>TradeConfirmSection</p>
                <div>
                    <div>
                        <p>User: {currentData.from_user1.username}</p>
                        <div>Cards:{currentData.user1_cards.map((c, k)=> (
                            <div key={k}>
                                <h3>{c.name}</h3>
                            </div>
                            ))}
                        </div>
                        <p>Request: {currentData.user1_request}</p>
                    </div>

                    <div>
                        {modalCardInfo.length}
                        <button onClick={() => selected_card()}> select card </button>
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