import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function CustomTradeCardModal({show, onHide, modalCardInfo, userData}) {
    const [availableCards, setAvailableCards] = useState(userData.cards);
    console.log(userData.cards);
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
              Select more heroes (max: other 2)
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
                <div className='table-div'>
                    <table className='table-card'>
                        <tbody>
                            {availableCards.map((card, i) => (
                                <tr key={i++}>
                                    <td>{card.id}</td>
                                    <td>{card.name}</td>
                                    <td>
                                        <img className="modal-card-img" alt={card.name} src={card.thumbnail.path + "." + card.thumbnail.extension}/>
                                        <input type='checkbox'/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
            </div>
            
          </Modal.Body>
          <Modal.Footer>
            <Button >Select</Button>
            <Button onClick={onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
}

export default CustomTradeCardModal