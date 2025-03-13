import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CustomAvailableTrade({show, onHide, modalCardInfo, BACKUP}) {

    // if(modalCardInfo.length > 0){
    //     console.log(modalCardInfo[0].user1_cards[0]);
    // }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {modalCardInfo && modalCardInfo.map((card, i) => (
            <div key={i}>
                <Modal.Body>
                    <div>
                        <div>
                            {card.user1_cards.map((c, j) => (
                                <div key={j}>
                                    <div>
                                        <img className="card-img" alt={c.name} src={c.thumbnail.path + "." + c.thumbnail.extension}/>
                                    </div>
                                    <div>
                                        <p>
                                            {c.description ? c.description  : BACKUP.DESC}
                                        </p>
                                    </div> 
                                </div>
                            ))}
                            
                        </div>
                      
                    </div>
                
                </Modal.Body>
            </div>
            ))}
        </Modal>
    )
}

export default CustomAvailableTrade