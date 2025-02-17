import React from 'react'
import { Card, CardBody,Row,Col,Button,Modal,ModalHeader,ModalBody, ModalFooter, } from 'reactstrap';
import PropTypes from 'prop-types'


const ViewQuoteLogModal = ({quotationsModal,setquotationsModal}) => {

    ViewQuoteLogModal.propTypes = {
        quotationsModal: PropTypes.bool,
        setquotationsModal: PropTypes.func,
      }
      
  return (
    <>
        <Modal size="lg" isOpen={quotationsModal}>
            <ModalHeader>Quote History</ModalHeader>
            <ModalBody>
                <Row>
                <Col md="12">
                <Card>
                    <CardBody>
                    
                    </CardBody>
                </Card>
                </Col>
                </Row>  
            </ModalBody>
            <ModalFooter>
                <Button color="primary" className='shadow-none' onClick={()=>{setquotationsModal(false)}}> Submit </Button>
                <Button color="secondary" className='shadow-none' onClick={()=>{setquotationsModal(false)}}> Cancel </Button>
            </ModalFooter>
        </Modal> 
    </>
  )
}

export default ViewQuoteLogModal