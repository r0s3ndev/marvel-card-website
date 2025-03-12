import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function CustomTradeCardModal({show, onHide, modalCardInfo, userData, setModalCardInfo}) {
    const [availableCards, setAvailableCards] = useState(userData.cards);
    const [checkbox, setCheckbox] = useState(true);
    const sortedCards = modalCardInfo.length > 0 ? [
        ...availableCards.filter(card => card.name === modalCardInfo[0].name), // Extract the selected card
        ...availableCards.filter(card => card.name !== modalCardInfo[0].name)  // Append the rest
    ] : 
    availableCards ;


    const handleChecboxChange = (e, card) => {
      setModalCardInfo((prev) => 
          prev.some((i) => i.id === card.id) 
            ? prev.filter((i) => i.id !== card.id)
            : [...prev, card]
      );
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
                    
                {modalCardInfo.length}
                    <table className='table-card'>
                        <tbody>
                            {sortedCards.map((card, i) => (
                                <tr key={i} className={modalCardInfo[0].id === card.id ? "selected-card" : ""}>
                                    <td>{card.id}</td>
                                    <td>{card.name}</td>
                                    <td>
                                        <img className="table-card-img" alt={card.name} src={card.thumbnail.path + "." + card.thumbnail.extension}/>
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