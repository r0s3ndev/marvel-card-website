import axios from 'axios';
import { useState } from 'react';
import CustomTradeCardModal from '../custom/CustomTradeCardModal';
import { Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router';

function TradeCreateSection({userData, tradeData, BACKUP}) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalCardInfo, setModalCardInfo] = useState([tradeData]);
  const [tradeInfo, setTradeInfo] = useState({
    userdata: userData,
    request: "",
    cards: []
  })

  const handleRequest = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
      setTradeInfo((prevState) => ({
          ...prevState,
          [name]: value,
          cards: prevState.cards === modalCardInfo ? prevState.cards : modalCardInfo
      }));
  }

  const selected_card = () => {
    setModalShow(true);
    setTradeInfo((prevState) => ({
      ...prevState,
      request: ""
  }));
  }

  const send_trade = async () => {
    if(tradeInfo.request === "") {
      setMessage("Type \"none\" if you have no specific request!");
    } else {
      setMessage("");
      try{
        const res = await axios.post("http://localhost:5000/users/create_trade", tradeInfo);
        if(res.status === 201){
          setTimeout(()=>{
            navigate("/card_album");
          }, 2000);
        }
      } catch (error) {
        console.error("Error while creating the trade; Exception: " + error);
      }
    }
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
              <p className='image-id'> {tradeData.species}</p>
              <img className="card-img" alt={tradeData.name} src={tradeData.image ? tradeData.image : BACKUP.IMG}/>
              <p className='image-text'> 
                {tradeData.name}<br/>
              </p>
            </div>

            <div>
              <label htmlFor='request'> Request: </label><br/>
              <input type='text' id="request" name="request" value={tradeInfo.request} onChange={handleRequest}></input>
              <br/>{message && message}
            </div>

            <div>
              <button onClick={send_trade}>Post trade</button>
            </div>
          </div>
        </div>

        {tradeData && (  
          <CustomTradeCardModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            modalCardInfo={modalCardInfo}
            userData={userData}
            setModalCardInfo={setModalCardInfo}
            BACKUP={BACKUP}
          />
        )}
       
      </div>
       
    </>
  )
}

export default TradeCreateSection