import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


function CustomConfirmTradeCardList({show, onHide, modalCardInfo, userData, setModalCardInfo}) {
    const [availableCards, setAvailableCards] = useState(userData.cards);
    const handleChecboxChange = (e, card) => {
        setModalCardInfo(prev => [...prev, card]);
    }

  return (
    <>
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Select card to trade
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>

            <table className='table-card'>
                <tbody>
                    {availableCards.map((card, i) => (
                        <tr key={i} >
                            <td>{card.id}</td>
                            <td>{card.name}</td>
                            <td>
                                <img className="table-card-img" alt={card.name} src={card.thumbnail.path + "." + card.thumbnail.extension}/>
                                <input onChange={(e)=>handleChecboxChange(e, card)} type='checkbox'/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            </Modal.Body>

            <Modal.Footer>
                <Button onClick={onHide}>Select</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default CustomConfirmTradeCardList