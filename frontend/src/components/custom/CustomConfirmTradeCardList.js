import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function CustomConfirmTradeCardList({show, onHide, modalCardInfo, userData, setModalCardInfo, BACKUP}) {
    const availableCards = userData.cards;
    const excludeTradedCard = userData.activeTrade.flatMap(t => t.cards.map(ut => ut.name));
    const sortedCards = availableCards.filter(card => !excludeTradedCard.includes(card.name));

    const handleChecboxChange = (card) => {
        setModalCardInfo((prev) => 
          prev.some((i) => i.id === card.id) 
            ? prev.filter((i) => i.id !== card.id)
            : [...prev, card]
        );
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
                    {sortedCards.map((card, i) => (
                        <tr key={i} >
                            <td>{card.species}</td>
                            <td>{card.name}</td>
                            <td>
                                <img className="table-card-img" alt={card.name} src={card.image ? card.image : BACKUP.IMG}/>
                                <input onChange={()=>handleChecboxChange(card)} type='checkbox' checked={modalCardInfo.some((c) => c.id === card.id ? "checked" : null)}/>
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