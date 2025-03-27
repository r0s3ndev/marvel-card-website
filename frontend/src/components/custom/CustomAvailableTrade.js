import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CustomAvailableTrade({show, onHide, userData, modalCardInfo, BACKUP}) {
    const [currentUserCardList, setCurrentUserCardList] = useState(userData.cards);
    const [selectedCardInfo, setSelectedCardInfo] = useState(modalCardInfo.from_user1);
    const [selectedCardList, setSelectedCardList] = useState(modalCardInfo.user1_cards);
    const [cardToTrade, setCardToTrade] = useState();

    const selectedCard = (data) => {
        console.log(data);
    }

  console.log(cardToTrade);
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
                        <label htmlFor="cards">Select card </label><br/>
                        <select name="cards" id="cards">
                            {currentUserCardList.map((card, key) => (
                                <option key={key} value={card} onChange={() => selectedCard(card)}>{card.name}</option>
                            ))}
                        </select>
                        {cardToTrade}

                        
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CustomAvailableTrade