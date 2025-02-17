import React from 'react';
import { Row,Col,FormGroup,Input,Button,Modal,ModalHeader,ModalBody, ModalFooter,Label } from 'reactstrap';
import PropTypes from 'prop-types'

const DuctingCostModal = ({addDuctingCostModal,setAddDuctingCostModal}) => {

    DuctingCostModal.propTypes = {
        addDuctingCostModal: PropTypes.bool,
        setAddDuctingCostModal: PropTypes.func
      }

  return (
    <>
        <Modal isOpen={addDuctingCostModal}>
        <ModalHeader>Add Actual Charges</ModalHeader>
        
        <ModalBody>
            <h5>Ducting Cost</h5>
            <FormGroup>
                <Row>
                <Col md="12" className='mb-4'>
                    <Row>
                        <FormGroup>
                            <Row>
                                <Label sm="2">Date</Label>
                                <Col sm="10">
                                <Input type="date" name="product_name" />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                    <Label sm="2">Amount</Label>
                                <Col sm="10">
                                <Input type="text" name="product_type"/>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                    <Label sm="2">Description</Label>
                                <Col sm="10">
                                <Input type="text" name="product_type"/>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Row>
                </Col>
                </Row>
            </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" className='shadow-none' onClick={()=>{setAddDuctingCostModal(false)}}>Submit</Button>
            <Button color="secondary" className='shadow-none' onClick={()=>{setAddDuctingCostModal(false)}}>Cancel</Button>
        </ModalFooter>
        </Modal>
    </>
  )
}

export default DuctingCostModal