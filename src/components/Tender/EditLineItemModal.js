import React,{useState} from 'react';
import {Row,Col, Modal,ModalHeader,ModalBody,FormGroup,Label,Input,Button,ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types'
import api from '../../constants/api';
import message from '../Message';


const EditLineItemModal = ({editLineModal,setEditLineModal,FetchLineItemData}) =>

    {
        EditLineItemModal.propTypes = {
            editLineModal: PropTypes.bool,
            setEditLineModal: PropTypes.func,
            FetchLineItemData: PropTypes.object,     
    }
    
    const [lineItemData,setLineItemData] = useState(null);

    const handleData = (e) => {
        setLineItemData({...lineItemData, [e.target.name]:e.target.value});
    }

    const UpdateData = () => {

        //console.log('editline item',lineItemData)

        api.post('/tender/edit-TabQuoteLine',lineItemData)
        .then((res)=> {
          console.log('edit Line Item',res.data.data)
            message('Edit Line Item Udated Successfully.','success')
            window.location.reload()
        }).catch(()=>{
            message('Unable to edit quote. please fill all fields','error')
        })

    }


   React.useEffect(() => {
    setLineItemData(FetchLineItemData)
   }, [FetchLineItemData])
   

  return (
    <>
        <Modal isOpen={editLineModal}>
            <ModalHeader>Line Items</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Row>
                        <Label sm="2">Title</Label>
                        <Col sm="10">
                        <Input type="textarea" name="title" defaultValue={lineItemData && lineItemData.title} onChange={handleData} />
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Label sm="2">Description</Label>
                        <Col sm="10">
                        <Input type="textarea" name="description" defaultValue={lineItemData && lineItemData.description} onChange={handleData}/>
                        </Col>
                    </Row> 
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Label sm="2">Qty</Label>
                        <Col sm="10">
                        <Input type="text" name="quantity" defaultValue={lineItemData && lineItemData.quantity} onChange={handleData}/>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Label sm="2">UoM</Label>
                        <Col sm="10">
                        <Input type="text" name="unit" defaultValue={lineItemData && lineItemData.unit} onChange={handleData} />
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup> 
                    <Row>
                        <Label sm="2">Unit Price</Label>
                        <Col sm="10">
                        <Input type="text" name="unit_price" defaultValue={lineItemData && lineItemData.unit_price} onChange={handleData}/>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Label sm="2">Total Price</Label>
                        <Col sm="10">
                        <Input type="text" name="amount" defaultValue={lineItemData && lineItemData.amount} onChange={handleData}/>
                        </Col>
                    </Row>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" className='shadow-none' type="button" onClick={UpdateData}> Save & Continue </Button>
                <Button color="secondary" className='shadow-none' onClick={()=>{setEditLineModal(false) }}> Cancel </Button>
            </ModalFooter>
        </Modal>
    </>
  )
}

export default EditLineItemModal