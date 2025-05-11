import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function CustomCardModal({show, onHide, modalCardInfo, BACKUP}) {
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
              {modalCardInfo.species}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='modal-container'>
                <div style={{flexGrow: 1}}>
                    <img className="card-img" alt={modalCardInfo.name} src={modalCardInfo.image ? modalCardInfo.image : BACKUP.IMG}/>
                </div>
                <div style={{flexGrow: 2, margin: "15px"}}>
                    <h4>{modalCardInfo.name}</h4>
                    <p>
                        {modalCardInfo.description ? modalCardInfo.description : BACKUP.DESC}
                    </p>
                </div>
            </div>
            
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
}

export default CustomCardModal