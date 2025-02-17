import React,{useEffect, useState} from 'react'
import { Row,Col,FormGroup,Input,Button,Modal,ModalHeader,ModalBody,Label,Form } from 'reactstrap';
import PropTypes from 'prop-types'
import moment from 'moment';
import api from '../../constants/api';
import message from '../Message';


const EditPoModal = ({editPo, setEditPo,data}) => {

    EditPoModal.propTypes = {
        editPo: PropTypes.bool,
        setEditPo: PropTypes.func,
        data: PropTypes.array
      }

    const[ editMaterialTabPurchaseOrder, setEditMaterialTabPurchaseOrder ] = useState();
    const [ getSupplierValue, setGetSupplierValue] = useState()


          //Get Supplier
        const getSupplier = () => {
            api.get('/purchaseorder/suppliers')
            .then((res)=>{
            setGetSupplierValue(res.data.data)
          })
        }


    const GetPoData = () => {
        api.post('/purchaseorder/getPurchaseOrderById',{purchase_order_id:data[0].purchase_order_id})
        .then((res) => {
            setEditMaterialTabPurchaseOrder(res.data.data[0])
           
       })
       .catch(()=>{
         message("","info")
       })
    }

    const handleInputs = (e) => {
    setEditMaterialTabPurchaseOrder({...editMaterialTabPurchaseOrder, [e.target.name]: e.target.value}) 
    console.log("Fetched Data",editMaterialTabPurchaseOrder)
    }

       const UpdateData = () => {

        api.post('/purchaseorder/editTabPurchaseOrder',editMaterialTabPurchaseOrder)
            .then(() => {
                message('Record editted successfully','success')
                setTimeout(()=>{
                    window.location.reload()
                  },300);
            })
            .catch(()=>{
            message(" Record Not editted successfully","info")
            })   
      }

        useEffect(() => {
           setEditMaterialTabPurchaseOrder(data);
            getSupplier()
           GetPoData();
        }, [data])


  return (
    <>
         <Modal size="lg" isOpen={editPo}>
            <ModalHeader> Edit Purchase Order </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Form>
                        <FormGroup>

                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                    <Label>Supplier</Label>

                                    <Input type="select" name='supplier_id' 
                                        onChange={handleInputs}
                                        value={editMaterialTabPurchaseOrder && editMaterialTabPurchaseOrder.supplier_id}     
                                    >
                                        <option defaultValue="selected">Please Select</option>
                                        {getSupplierValue && getSupplierValue.map((res)=>{
                                            return <option key={res.supplier_id} value={res.supplier_id} >{res.company_name}</option>
                                        })}

                                    </Input>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                    <Label>PO Date</Label>
                                    <Input type="date" name="po_date" 
                                    defaultValue={moment(editMaterialTabPurchaseOrder && editMaterialTabPurchaseOrder.po_date).format('YYYY-MM-DD')}
                                    onChange={handleInputs}
                                    />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                    <Label>Delivery To</Label>
                                    <Input type="text" name="delivery_to" 
                                    defaultValue={editMaterialTabPurchaseOrder && editMaterialTabPurchaseOrder.delivery_to}
                                    onChange={handleInputs}
                                     />
                                    </FormGroup>
                                </Col>
                                
                            </Row>
                            
                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                    <Label>Delivery Date</Label>
                                    <Input type="date" name="delivery_date" 
                                    defaultValue={moment(editMaterialTabPurchaseOrder && editMaterialTabPurchaseOrder.delivery_date).format('YYYY-MM-DD') }
                                    onChange={handleInputs}
                                    />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                    <Label>Delivery Contact</Label>
                                    <Input type="text" name="contact" 
                                    defaultValue={editMaterialTabPurchaseOrder && editMaterialTabPurchaseOrder.contact }
                                    onChange={handleInputs}
                                    />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                    <Label>Mobile</Label>
                                        <Input type="text" name="mobile" 
                                        defaultValue={editMaterialTabPurchaseOrder && editMaterialTabPurchaseOrder.mobile }
                                        onChange={handleInputs}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                    <Label>Payment</Label>
                                    <Input type="text" name="payment" 
                                    defaultValue={editMaterialTabPurchaseOrder && editMaterialTabPurchaseOrder.payment }
                                    onChange={handleInputs}
                                    />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                    <Label>Shipping method</Label>
                                        <Input type="text" name="shipping_method" 
                                        defaultValue={editMaterialTabPurchaseOrder && editMaterialTabPurchaseOrder.shipping_method }
                                        onChange={handleInputs}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label>Project</Label>
                                        <Input type="text" name="project"
                                         defaultValue={editMaterialTabPurchaseOrder && editMaterialTabPurchaseOrder.project }
                                         onChange={handleInputs}
                                         />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <FormGroup>
                                    <Label>PaymentTerms</Label>
                                    <Input type="textarea" name="payment_terms" 
                                    defaultValue={editMaterialTabPurchaseOrder && editMaterialTabPurchaseOrder.payment_terms }
                                    onChange={handleInputs}
                                    />
                                </FormGroup>
                            </Row>

                        
                            <Row>
                            <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                                <Button type="button" className="btn mr-2 shadow-none" color="primary"
                                onClick={()=>{UpdateData() }}
                                >
                                    Save & Continue
                                </Button>
                                <Button color="secondary" className='shadow-none' onClick={()=>{setEditPo(false) }}>Cancel</Button>
                            </div>
                            </Row>

                        </FormGroup> 
                    </Form>
                </FormGroup>
            </ModalBody>
        </Modal>
       
</>
  )
}


export default EditPoModal