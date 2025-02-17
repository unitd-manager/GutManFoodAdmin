import React, { useState } from 'react'
import { Row,Col,FormGroup,Label,Input,Button,Modal,ModalHeader,ModalBody, ModalFooter } from 'reactstrap';
// import moment from 'moment';
import PropTypes from 'prop-types'
import message from '../Message';
import api from '../../constants/api';

function EditClaimModal({editClaimModal,setEditClaimModal,pc}) {
  EditClaimModal.propTypes = {
    editClaimModal: PropTypes.bool,
    setEditClaimModal: PropTypes.func,
    pc:PropTypes.object
    }
    const [claimUpdate,setClaimUpdate]=useState({
        claim_no: pc.claim_no,
                project_id: pc.project_id,
                 project_claim_id: pc.project_claim_id,
                client_id: pc.client_id,
                project_title: pc.project_title,
                description: pc.description,
                po_quote_no: pc.po_quote_no,
                ref_no: pc.ref_no,
                claim_date: pc.claim_date,
                status: pc.status,
                amount: pc.amount,
                created_by: pc.created_by,
                creation_date:pc.creation_date,
                modified_by: pc.modified_by,
                modification_date: pc.modification_date,
                variation_order_submission: pc.variation_order_submission,
                value_of_contract_work_done: pc.value_of_contract_work_done,
                vo_claim_work_done: pc.vo_claim_work_done,
                claim_code: pc.claim_code,
                less_previous_retention: pc.less_previous_retention
    });
    //handle input change
    const handleInputs = (e) => {
        setClaimUpdate({...claimUpdate, [e.target.name]: e.target.value}) 
      }
//edit project claim
    const UpdateProjectClaim = () => {
        api.post('/claim/editTabClaimPortal',claimUpdate)
        .then(() => {
         message('Record editted successfully','success')
          setTimeout(()=>{
            // window.location.reload()
          },300);
        })
      }
  
  return (
    <>
      <Modal size="xl" isOpen={editClaimModal} >
    <ModalHeader>
            Edit Claim Display
        <Button color="secondary" onClick={()=>{setEditClaimModal(false)}}> X </Button>
    </ModalHeader>
    
    <ModalBody>
       <Row>
       <Col md="6">
                        <FormGroup>
                        <Label>Claim Date</Label>
                        <Input name="claim_date" type="date" value={claimUpdate && claimUpdate.claim_date} onChange={handleInputs} />
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                        <Label>Status</Label>
                        <Input name="status" type="select" value={claimUpdate && claimUpdate.status} onChange={handleInputs}>
                        <option>Please Select</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Claim Amount Received">Claim Amount Received</option>
                            <option value="Cancelled">Cancelled</option>
                        </Input>
                        </FormGroup>
                    </Col>
       </Row>
       <Row>
       <Col md="6">
                        <FormGroup>
                        <Label>Project Title</Label>
                        <Input name="project_title" type="text" value={claimUpdate && claimUpdate.project_title} onChange={handleInputs} />
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                        <Label>PO/Quote No</Label>
                        <Input name="po_quote_no" type="text" value={claimUpdate && claimUpdate.po_quote_no} onChange={handleInputs} />
                        </FormGroup>
                    </Col>
       </Row>
       <Row>
       <Col md="6">
                        <FormGroup>
                        <Label>Ref No</Label>
                        <Input name="ref_no" type="text" value={claimUpdate && claimUpdate.ref_no} onChange={handleInputs} />
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                        <Label>Contract Sum Amount</Label>
                        <Input name="amount" type="text" value={claimUpdate && claimUpdate.amount} onChange={handleInputs} />
                        </FormGroup>
                    </Col>
       </Row>
       <Row>
       <Col md="6">
                        <FormGroup>
                        <Label>Variation Order Submission</Label>
                        <Input name="variation_order_submission" type="text" value={claimUpdate && claimUpdate.variation_order_submission} onChange={handleInputs} />
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                        <Label>Value of Contract Work Done</Label>
                        <Input name="value_of_contract_work_done" type="text" value={claimUpdate && claimUpdate.value_of_contract_work_done} onChange={handleInputs} />
                        </FormGroup>
                    </Col>
       </Row>
       <Row>
       <Col md="6">
                        <FormGroup>
                        <Label>VO Claim Work Done</Label>
                        <Input name="vo_claim_work_done" type="text" value={claimUpdate && claimUpdate.vo_claim_work_done} onChange={handleInputs} />
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                        <Label>Less Previous Retention</Label>
                        <Input name="less_previous_retention" type="text" value={claimUpdate && claimUpdate.less_previous_retention} onChange={handleInputs} />
                        </FormGroup>
                    </Col>
       </Row>
       <Row>
       <Col md="12">
                        <FormGroup>
                        <Label>Work Description</Label>
                        <Input name="description" type="textarea" value={claimUpdate && claimUpdate.description} onChange={handleInputs} />
                        </FormGroup>
                    </Col>
                    
       </Row>
    </ModalBody>
    <ModalFooter>
        <Button color="primary" className='shadow-none' onClick={()=>{UpdateProjectClaim();setEditClaimModal(false)}}> Submit </Button>
        <Button color="secondary" className='shadow-none' onClick={()=>{setEditClaimModal(false)}}> Close </Button>
    </ModalFooter>
</Modal>
</>
  )
}

export default EditClaimModal