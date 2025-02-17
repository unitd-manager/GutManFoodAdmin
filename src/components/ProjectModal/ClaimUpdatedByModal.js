import React from 'react'
import { Row,Col,Button,Modal,ModalHeader,ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types'

function ClaimUpdatedByModal({claimUpdatedByModal,setClaimUpdatedByModal,data}) {
    ClaimUpdatedByModal.propTypes = {
        claimUpdatedByModal: PropTypes.bool,
        setClaimUpdatedByModal: PropTypes.func,
        data:PropTypes.object
      }
  return (
    <>
         <Modal isOpen={claimUpdatedByModal}>
        <ModalHeader>Updated By
        <Button color="secondary" onClick={()=>{setClaimUpdatedByModal(false)}}> X </Button>
        </ModalHeader>
        
        <ModalBody>
            <Row>
                <Col md="6"><span>Created By/Creation Date</span></Col>
                <Col md="6"><span>Modified By/Modification Date</span></Col>
            </Row>
            <Row>
                <Col md="6"><span>{data.created_by}/{data.creation_date}</span></Col>
                <Col md="6"><span>{data.modified_by}/{data.modification_date}</span></Col>
            </Row>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" className='shadow-none' onClick={()=>{setClaimUpdatedByModal(false)}}>Submit</Button>
            <Button color="secondary" className='shadow-none' onClick={()=>{setClaimUpdatedByModal(false)}}>Cancel</Button>
        </ModalFooter>
        </Modal>
    </>
    
  )
}

export default ClaimUpdatedByModal