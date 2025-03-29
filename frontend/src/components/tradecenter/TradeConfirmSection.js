import React, { useState } from 'react'
import CustomTradeCardModal from '../custom/CustomTradeCardModal';
import CustomConfirmTradeCardList from '../custom/CustomConfirmTradeCardList';

function TradeConfirmSection({userData, confirmTradeData, BACKUP}) {
    const [currentData, setCurrentData] = useState(confirmTradeData);
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
                        <p>User: {confirmTradeData.from_user1.username}</p>
                        <div>Cards:{confirmTradeData.user1_cards.map((c, k)=> (
                            <div key={k}>
                                <h3>{c.name}</h3>
                            </div>
                            ))}
                        </div>
                        <p>Request: {confirmTradeData.user1_request}</p>
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
            />
          
        </div>
    </>
  )
}

export default TradeConfirmSection