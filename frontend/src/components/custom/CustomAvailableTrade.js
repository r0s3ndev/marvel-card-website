import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CustomAvailableTrade({show, onHide, userData, modalCardInfo, BACKUP}) {
    const [modalShow, setModalShow] = useState(false);
    const [currentUserCardList, setCurrentUserCardList] = useState(userData.cards);
    const [selectedCardInfo, setSelectedCardInfo] = useState(modalCardInfo.from_user1);
    const [selectedCardList, setSelectedCardList] = useState(modalCardInfo.user1_cards);

  console.log(modalCardInfo);
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
                        <p>Select card to trade </p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{display: "Flex"}}>
                    <div>
                        <p>User: {selectedCardInfo.username}</p>
                        <p>Request: {modalCardInfo.user1_request}</p>
                        <p>Cards: {selectedCardList[0].name}</p>
                    </div>

                    <div>
                        <button>Select card </button>
                    </div>
                </Modal.Body>
            </Modal>


            

        </>
    )
}

export default CustomAvailableTrade