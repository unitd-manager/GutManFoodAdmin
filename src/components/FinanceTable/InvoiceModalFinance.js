// import React, {  useEffect,useState } from 'react';
// import { Card, CardBody, CardTitle, Row, Col, Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import PropTypes from 'prop-types'
// import { Link ,useParams} from 'react-router-dom';
// import * as $ from "jquery";
// import random from 'random'
// import api from '../../constants/api';
// import message from '../Message';

// const InvoiceModalFinance = ({ editInvoiceModal,editModal,setEditModal,}) => {
//   InvoiceModalFinance.propTypes = {
//     editInvoiceModal: PropTypes.object,
//     editModal: PropTypes.bool,
//     setEditModal: PropTypes.func, 
//   }
//   //All state variable
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [invoiceData, SetInvoiceData] = useState(null);
//   const {id} =useParams()
//     //Add Line Item
//     const [addLineItem, setAddLineItem] = useState(
//       [{
//         "id": random.int(1, 99),
//         "unit": "",
//         "qty": "",
//         "unit_price": "",
//         "total_cost": "",
//         "remarks": "",
//         "item_title": "",
//         "description": ""
//       }])
//     const AddNewLineItem = () => {
//       setAddLineItem([...addLineItem,{
//         "id": new Date().getTime().toString(),
//         "uom": "",
//         "qty": "",
//         "unitprice": "",
//         "total_cost": "",
//         "remarks": "",
//         "item":"",
//         "description":""
//     }])
//     }
// //setting value in invoiceData
//   const handleInputs = (e) => {
//     SetInvoiceData({...invoiceData, [e.target.name]:e.target.value});
//  }
//  //getting data from invoice id
//   const getInvoice = () => {
//     api.post('/invoice/getInvoiceByInvoiceId', {invoice_id:id})
//       .then((res) => {
//         SetInvoiceData(res.data.data)
//       })
//   }
//   //get invoice line item
//   const getLineItem = (invoiceId) => {
//     api.post('/invoice/getInvoiceLineItemsById',{invoice_id:invoiceId})
//     .then((res)=> {
//       setAddLineItem(res.data.data)
//         console.log(res.data.data)   
//     }).catch(()=>{
//       message("Line Items not found","info")
//     })
//   }
//   //Edit invoice
//   const editInvoice = () => {
//     invoiceData.invoice_amount = totalAmount + 70
//     invoiceData.order_id = id
//     api.post('/finance/editInvoicePortalDisplay', invoiceData)
//       .then(() => {
//        message('Invoice edited successfully.','success')
//         window.location.reload()
//       })
//       .catch(() => {
//         console.log('Network connection error.')
//       })
//   }

//   //Add line item API
//   const addLineItemApi = (obj) => {
//     api.post('/finance/insertInvoiceItem', {
//       "description": obj.description, "amount": obj.total_cost, "item_title": "", 
//       "cost_price": 0, "qty": obj.qty,  "created_by": "", "modified_by": "",
//       "unit": obj.unit, "remarks": obj.remarks, "s_no": "", "model": "", "vat": 0, "discount_percentage": 0,
//       "item_code_backup": "", "erection": 0, "dismantle": 0, "unit_price": parseFloat(obj.unit_price),
//     }).then(() => {
//       message('Line Item Added Successfully', 'sucess')
//     }).catch(() => {
//       message('Cannot Add Line Items', 'error')
//     })
//   }
//   const getAllValues = () => {
//     const result = [];
//     $(".lineitem tbody tr").each(function () {
//       const allValues = {};
//       $(this).find("input").each(function () {
//         const fieldName = $(this).attr("name");
//         allValues[fieldName] = $(this).val();
//       });
//       result.push(allValues);
//     })
//     console.log(result)
//     result.forEach(obj => {
//       if (obj.item !== '' && obj.total_cost) {
//         addLineItemApi(obj)
//       }
//     })
//     setTotalAmount(0)
//     setAddLineItem([{
//       "id": random.int(1, 99),
//       "unit": "",
//       "qty": "",
//       "unit_price": "",
//       "total_cost": "",
//       "remarks": "",
//       "item_title": "",
//       "description": ""
//     }])
//   }
//   //Calculation for Invoice Item
//   const calculateTotal = () => {
//     let totalValue = 0
//     const result = [];
//     $(".lineitem tbody tr").each(function () {
//       const allValues = {};
//       $(this).find("input").each(function () {
//         const fieldName = $(this).attr("name");
//         allValues[fieldName] = $(this).val();
//         allValues.total_cost = allValues.qty * allValues.unit_price
//       });
//       result.push(allValues);
//     })
//     result.forEach(e => {
//       if (e.total_cost) {
//         totalValue += parseFloat(e.total_cost)
//       }
//     })
//     setAddLineItem(result)
//     setTotalAmount(totalValue)
//   }
//   // Clear row value
//   const ClearValue = (ind) => {
//     setAddLineItem(current =>
//       current.filter(obj => {
//         return obj.id !== ind.id;
//       }),
//     );
//     if (ind.total_cost) {
//       const finalTotal = totalAmount - parseFloat(ind.total_cost)
//       setTotalAmount(finalTotal)
//     }
//   }
//   useEffect(()=>{
//     getLineItem(id);
//     getInvoice();
//     SetInvoiceData(editInvoiceModal);
//   },[editInvoiceModal])
//   return (
//     <>
//       <Modal size="xl" isOpen={editModal}>
//         <ModalHeader>Create Invoice
//           <Button color="secondary" onClick={() => { setEditModal(false) }}>
//             X
//           </Button>
//         </ModalHeader>
//         <ModalBody>
//           <Row>
//             <Col md="12">
//               <Card>
//                 <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
//                   Create Invoice
//                 </CardTitle>
//                 <CardBody>
//                   <Form>           
//                     <Card>
//                       <Row>
//                         <Row>
//                           <Col md="3">
//                             <Button color="primary"
//                               type='button' onClick={() => { AddNewLineItem() }}>Add Line Item</Button>
//                           </Col>
//                           <Col md="3">
//                             <Button color="primary"
//                               type='button' onClick={() => { '/AddMoreDetail' }}>Add More Detail</Button>
//                           </Col>
//                         </Row>
//                         <Row>
//                         <Col md="4">
//                           <FormGroup>
//                             <Label>Invoice Code</Label>
//                             <Input type="text"
//                             value={invoiceData && invoiceData.invoice_code} onChange={handleInputs}
//                               name="invoice_code" />
//                           </FormGroup>
//                         </Col>
//                         <Col md="4">
//                           <FormGroup>
//                             <Label>Discount</Label>
//                             <Input type="text"
//                              value={invoiceData && invoiceData.discount}
//                               name="discount" />
//                           </FormGroup>
//                         </Col>
//                        <Col md="4">
//                           <FormGroup>
//                             <Label>Quote Code</Label>
//                             <Input type="text"
//                               value={invoiceData && invoiceData.quote_code}
//                               name="quote_code" />
//                           </FormGroup>
//                         </Col>
//                         <Col md="4">
//                           <FormGroup>
//                             <Label>PO Number</Label>
//                             <Input type="text"
//                              value={invoiceData && invoiceData.po_number}
//                               name="po_number" />
//                           </FormGroup>
//                         </Col>
//                         <Col md="4">
//                           <FormGroup>
//                             <Label>Project Location</Label>
//                             <Input type="text"
//                               value={invoiceData && invoiceData.project_location}
//                               name="project_location" />
//                           </FormGroup>
//                         </Col>
//                         <Col md="4">
//                           <FormGroup>
//                             <Label>Project Reference</Label>
//                             <Input type="text"
//                               value={invoiceData && invoiceData.project_reference}
//                               name="project_reference" />
//                           </FormGroup>
//                         </Col>
//                         <Col md="4">
//                           <FormGroup>
//                             <Label>Invoice date</Label>
//                             <Input type="date"
//                              value={invoiceData && invoiceData.createInvoice_date}
//                               name="invoice_date" />
//                           </FormGroup>
//                         </Col>
//                         <Col md="4">
//                           <FormGroup>
//                             <Label>Code</Label>
//                             <Input type="text"
//                             value={invoiceData && invoiceData.code}
//                               name="code" />
//                           </FormGroup>
//                         </Col>
//                         <Col md="4">
//                           <FormGroup>
//                             <Label>SO Ref Number</Label>
//                             <Input type="text"
//                              value={invoiceData && invoiceData.so_ref_no}
//                               name="so_ref_no" />
//                           </FormGroup>
//                         </Col>

//                         <Col md="4">
//                           <FormGroup>
//                             <Label>Site Code</Label>
//                             <Input type="text"
//                             value={invoiceData && invoiceData.site_code}
//                               name="site_code" />
//                           </FormGroup>
//                         </Col>

//                         <Col md="4">
//                           <FormGroup>
//                             <Label>Attention</Label>
//                             <Input type="text"
//                           value={invoiceData && invoiceData.attention}
//                               name="attention" />
//                           </FormGroup>
//                         </Col>
//                         <Col md="4">
//                           <FormGroup>
//                             <Label>Reference</Label>
//                             <Input type="textarea"
//                             value={invoiceData && invoiceData.reference}
//                               name="reference" />
//                           </FormGroup>
//                         </Col>
//                         <Col md="8">
//                           <FormGroup>
//                             <Label>Invoice Terms</Label>
//                             <Input type="text"
//                                value={invoiceData && invoiceData.invoice_terms}
//                               name="invoice_terms" />
//                           </FormGroup>
//                         </Col>
//                         </Row>
//                         <Card>
//                           <table className='lineitem' >
//                             <thead>
//                               <tr>
//                                 <th scope="col">Item</th>
//                                 <th scope="col">Description	</th>
//                                 <th scope="col">UoM</th>
//                                 <th scope="col">Qty</th>
//                                 <th scope="col">Unit Price</th>
//                                 <th scope="col">Total Price</th>
//                                 <th scope="col">Remarks</th>
//                                 <th scope="col"></th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {addLineItem.map((item) => {
//                                 return (
//                                   <tr key={item.id}>
//                                     <td data-label="Item"><Input defaultValue={item.item} type="text" name="item_title" /></td>
//                                     <td data-label="Description"><Input defaultValue={item.description} type="text" name="description" /></td>
//                                     <td data-label="UoM"><Input defaultValue={item.unit} type="text" name="unit" /></td>
//                                     <td data-label="Qty"><Input defaultValue={item.qty} type="number" name="qty" /></td>
//                                     <td data-label="Unit Price"><Input defaultValue={item.unit_price} onBlur={() => {
//                                       calculateTotal()
//                                     }} type="number" name="unit_price" /></td>
//                                     <td data-label="Total Price"><Input defaultValue={item.total_cost} type="text" name="total_cost" disabled /></td>
//                                     <td data-label="Remarks"><Input defaultValue={item.remarks} type="text" name="remarks" /></td>
//                                     <td data-label="Action"><Link to=""><Input type='hidden' name="id" defaultValue={item.id}></Input><span onClick={() => { ClearValue(item) }}>Clear</span></Link></td>
//                                   </tr>
//                                 );
//                               })}
//                             </tbody>
//                           </table>
//                         </Card>
//                         <ModalFooter>
//                           <Button color="primary" onClick={() => {
//                             editInvoice();
//                             getAllValues();
//                           }} > Submit </Button>
//                           <Button color="secondary" onClick={() => {
//                             setEditModal(false)
//                           }}>
//                             Cancel
//                           </Button>
//                         </ModalFooter>
//                       </Row>
//                     </Card>
//                   </Form>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </ModalBody>
//       </Modal>


//     </>
//   )
// }

// export default InvoiceModalFinance;