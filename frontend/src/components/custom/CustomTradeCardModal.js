import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function CustomTradeCardModal({show, onHide, modalCardInfo, userData, tradeData, onCreateTradeData, setOnCreateTradeData, setModalCardInfo, BACKUP}) {
    const [availableCards, setAvailableCards] = useState(userData.cards);
    const activeTrade = tradeData.map(trade => trade._id);
    const userActiveTrade = userData.activeTrade.map(c => c);
    const filteredCards = activeTrade.filter(id => !userActiveTrade.includes(id));
    console.log("equal?", filteredCards);
    const sortedCards = onCreateTradeData.length > 0 ? [
        ...availableCards.filter(card => card.name === onCreateTradeData[0].name), // Extract the selected card
        ...availableCards.filter(card => card.name !== onCreateTradeData[0].name && !filteredCards.includes(card.name)),  // Append the rest
        // ...availableCards.filter(card => card.name !== onCreateTradeData[0].name)
      ] : 
    availableCards ;

    const handleChecboxChange = (e, card) => {
      console.log(card);
    }

    return (
        <Modal
          show={show}
          onHide={onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Select more heroes 
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
                <div className='table-div'>
                    
                {onCreateTradeData.length}
                    <table className='table-card'>
                        <tbody>
                            {sortedCards.map((card, i) => (
                                <tr key={i} className={modalCardInfo[0].id === card.id ? "selected-card" : ""}>
                                    <td>{card.species}</td>
                                    <td>{card.name}</td>
                                    <td>
                                        <img className="table-card-img" alt={card.name} src={card.image ? card.image : BACKUP.IMG}/>
                                        <input onChange={(e)=>handleChecboxChange(e, card)} type='checkbox' checked={modalCardInfo.some((c) => c.id === card.id ? "checked" : null)} disabled={modalCardInfo[0].id === card.id ? "disabled" : null}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
            </div>
            
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onHide}>Select</Button>
          </Modal.Footer>
        </Modal>
      );
}

export default CustomTradeCardModal