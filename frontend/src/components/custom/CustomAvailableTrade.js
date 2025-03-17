import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CustomAvailableTrade({show, onHide, modalCardInfo, userData, BACKUP}) {
    const [currentUserCardList, setCurrentUserCardList] = useState(userData.cards);

  
    console.log(modalCardInfo);
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
                    <p>Select card to trade </p>
                </Modal.Title>
            </Modal.Header>
                {/* {modalCardInfo && modalCardInfo.map((card, i) => (
                
                    <Modal.Body key={i}>
                        <div>
                            <div>
                                {console.log(card)}
                                
                            </div>
                            
                        </div>
                    </Modal.Body>
                
                ))} */}

            <Modal.Body>
                <div>
                    <div className='table-div'>
                        
                        <table className='table-card'>
                            <tbody>
                                {currentUserCardList.map((card, i) => (
                                    
                                    <tr key={i}>
                                        <td>{card.id}</td>
                                        <td>{card.name}</td>
                                        <td>
                                            <img className="table-card-img" alt={card.name} src={card.thumbnail.path + "." + card.thumbnail.extension}/>
                                            <input  type='checkbox' />
                                        </td>
                                     </tr>
                                ))}
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default CustomAvailableTrade