import axios from 'axios';
import { useState } from 'react';
import CustomTradeCardModal from '../custom/CustomTradeCardModal';
import { Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router';

function TradeCreateSection({userData, tradeData, onCreateTradeData, setOnCreateTradeData, BACKUP}) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [tradeInfo, setTradeInfo] = useState({
    userdata: userData,
    request: "",
    cards: []
  })

  console.log(onCreateTradeData)

  const handleRequest = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setMessage("");
      setTradeInfo((prevState) => ({
          ...prevState,
          [name]: value,
          cards: prevState.cards === onCreateTradeData ? prevState.cards : onCreateTradeData
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
        <div className="homepage-container">
          <div className='album-text'>
            <h1>Create a trade</h1>
            <a href='/card_album'> Change card &rarr;</a>
          </div>

          <div className='trade-main-div'>
            <div className='image-div' onClick={() => selected_card()}>
              <p className='image-id'> {onCreateTradeData[0].species}</p>
              <img className="card-img" alt={onCreateTradeData[0].name} src={onCreateTradeData[0].image ? onCreateTradeData[0].image : BACKUP.IMG}/>
              <p className='image-text'> 
                {onCreateTradeData[0].name}<br/>
              </p>
            </div>
            <h2> 
              {onCreateTradeData.length > 1 && 
                (<>
                  <Badge className='counter-text' pill bg="danger">
                    {onCreateTradeData.length}
                  </Badge>
                </>)
              }
            </h2>

            <div className='request-trade-div'>
              <label htmlFor='request'> Request: </label><br/>
              <input size="40" type='text' id="request" name="request" value={tradeInfo.request} onChange={handleRequest}></input>
              <br/>
              {message && message}
              <br/>
              <button className='button button5' onClick={send_trade}>Post trade</button>
            </div>
          </div>
        </div>

        {tradeData && (  
          <CustomTradeCardModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            userData={userData}
            onCreateTradeData={onCreateTradeData}
            setOnCreateTradeData={setOnCreateTradeData}
            BACKUP={BACKUP}
          />
        )}
       
      </div>
       
    </>
  )
}

export default TradeCreateSection