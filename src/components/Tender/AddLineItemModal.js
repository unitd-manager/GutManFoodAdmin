import React,{useState } from 'react';
import { Row,Col,FormGroup,Input,Button,Modal,ModalHeader,ModalBody, ModalFooter, } from 'reactstrap';
import {  Link } from 'react-router-dom';
import * as $ from "jquery";
import PropTypes from 'prop-types'
import random from 'random'
import api from '../../constants/api';
import message from '../Message';

const AddLineItemModal = ({addLineItemModal,setAddLineItemModal,projectInfo}) => {
 

  AddLineItemModal.propTypes = {
    addLineItemModal: PropTypes.bool,
    setAddLineItemModal: PropTypes.func,
    projectInfo:PropTypes.object
  }
  // Logic for Add New Item Row

  const [addLineItem, setAddLineItem] = useState(
    [{
    "id":random.int(1,99),
    "uom": "",
    "qty": "",
    "unitprice": "",
    "totalprice": "",
    "remarks": "",
    "item":"",
    "description":""
},{
  "id":random.int(0,9999),
  "uom": "",
  "qty": "",
  "unitprice": "",
  "totalprice": "",
  "remarks": "",
  "item":"",
  "description":""
},{
  "id":random.int(0,9999),
  "uom": "",
  "qty": "",
  "unitprice": "",
  "totalprice": "",
  "remarks": "",
  "item":"",
  "description":""
},{
  "id":random.int(0,9999),
  "uom": "",
  "qty": "",
  "unitprice": "",
  "totalprice": "",
  "remarks": "",
  "item":"",
  "description":""
},{
  "id":random.int(0,9999),
  "uom": "",
  "qty": "",
  "unitprice": "",
  "totalprice": "",
  "remarks": "",
  "item":"",
  "description":""
}])
const [ totalAmount, setTotalAmount ] = useState(0);


  const AddNewLineItem = () => {
   
    setAddLineItem([...addLineItem,{
      "id": new Date().getTime().toString(),
      "uom": "",
      "qty": "",
      "unitprice": "",
      "totalprice": "",
      "remarks": "",
      "item":"",
      "description":""
  }])
  }

  // Get Line Item Values
  const addLineItemApi = (obj) =>{
    api.post('/tender/insertQuoteItems',{
      "description":obj.description,"amount":obj.totalprice, "amount_other":0, "item_type":"",  "title":obj.item, "quote_id":projectInfo.quote_id,
       "opportunity_id":projectInfo.opportunity_id, "actual_amount":0, 
     "supplier_amount":0, "quantity":obj.qty, "project_id":projectInfo.project_id, "created_by":"", "modified_by":"",
      "unit":obj.uom, "remarks":obj.remarks, "part_no":"", "nationality":"", "ot_rate":0, "ph_rate":0, 
     "scaffold_code":"", "erection":0, "dismantle":0, "unit_price":parseFloat(obj.unitprice), "drawing_number":"", "drawing_title":"", "drawing_revision":"",
    }).then(()=>{
      message('Line Item Added Successfully','sucess')
    }).catch(()=>{
      message('Cannot Add Line Items','error')
    })
  }
  const getAllValues = () => {

  const result = [];
    
    $(".lineitem tbody tr").each(()=> {
        const allValues = {}; 
        $(this).find("input").each(()=> {
            
            const fieldName = $(this).attr("name");
            allValues[fieldName] = $(this).val();
        });
        result.push(allValues);
    })  
    console.log(result)
    result.forEach(obj=>{
      if(obj.item !== '' && obj.totalprice){
        addLineItemApi(obj)
      }
    })
    setTotalAmount(0)
    setAddLineItem([{
      "id":random.int(1,99),
      "uom": "",
      "qty": "",
      "unitprice": "",
      "totalprice": "",
      "remarks": "",
      "item":"",
      "description":""
  },{
    "id":random.int(0,9999),
    "uom": "",
    "qty": "",
    "unitprice": "",
    "totalprice": "",
    "remarks": "",
    "item":"",
    "description":""
  },{
    "id":random.int(0,9999),
    "uom": "",
    "qty": "",
    "unitprice": "",
    "totalprice": "",
    "remarks": "",
    "item":"",
    "description":""
  },{
    "id":random.int(0,9999),
    "uom": "",
    "qty": "",
    "unitprice": "",
    "totalprice": "",
    "remarks": "",
    "item":"",
    "description":""
  },{
    "id":random.int(0,9999),
    "uom": "",
    "qty": "",
    "unitprice": "",
    "totalprice": "",
    "remarks": "",
    "item":"",
    "description":""
  }])
    setAddLineItemModal(false)
    
}

const calculateTotal = () => {
  
  let totalValue = 0
  const result = [];
  $(".lineitem tbody tr").each(()=> {
    const allValues = {}; 
    $(this).find("input").each(()=> {
        
        const fieldName = $(this).attr("name");
        allValues[fieldName] = $(this).val();
        allValues.totalprice = allValues.qty * allValues.unitprice
        
    });
    result.push(allValues);
})  
result.forEach(e=>{
  if(e.totalprice)
  {
    totalValue += parseFloat(e.totalprice)
  }
})
setAddLineItem(result)
setTotalAmount(totalValue)
}

// Clear row value
const ClearValue = (ind) => {
  setAddLineItem(current =>
    current.filter(obj => {
      return obj.id !== ind.id;
    }),
  );
  if(ind.totalprice){
    const finalTotal = totalAmount - parseFloat(ind.totalprice)
    setTotalAmount(finalTotal)
  }
}


  return (
    <>

           {/* Add Line Item Modal */}
           <Modal size="xl" isOpen={addLineItemModal}>
              <ModalHeader>Add Line Item
              <Button color="secondary" onClick={()=>{
                    setAddLineItemModal(false)
                  }}>X</Button>
              </ModalHeader>
              
              <ModalBody>
                  <FormGroup>
                    <Row>
                      <Col md="12" className='mb-4'>
                        <Row>
                          <Col md="3">
                            <Button color="primary" className='shadow-none'
                            type='button'
                            onClick={()=>{AddNewLineItem()}}
                            >Add Line Item</Button>
                          </Col>
                          <Col md="3">
                            <b> Discount : </b>
                          </Col>
                          <Col md="3">
                            <b>Total Amount: {totalAmount}  </b>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  <table className='lineitem border border-secondary rounded' >
                    
                    <thead>
                      <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Description	</th>
                        <th scope="col">UoM</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Remarks</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>

                      {addLineItem.map((item) => {
                            return (
                              <tr key={item.id}>
                                  <td data-label="Item"><Input defaultValue={item.item} type="text" name="item" /></td>
                                  <td data-label="Description"><Input defaultValue={item.description} type="text" name="description" /></td>
                                  <td data-label="UoM"><Input defaultValue={item.uom} type="text" name="uom" /></td>
                                  <td data-label="Qty"><Input defaultValue={item.qty} type="number" name="qty" /></td>
                                  <td data-label="Unit Price"><Input defaultValue={item.unitprice} onBlur={()=>{
                                    calculateTotal()
                                  }} type="number" name="unitprice" /></td>
                                  <td data-label="Total Price"><Input defaultValue={item.totalprice} type="text" name="totalprice" disabled/></td>
                                  <td data-label="Remarks"><Input defaultValue={item.remarks} type="text" name="remarks" /></td>
                                  <td data-label="Action"><Link to=""><Input type='hidden' name="id" defaultValue={item.id}></Input><span onClick={()=>{ClearValue(item)}}>Clear</span></Link></td>
                              </tr>
                              );
                          })}

                    </tbody>
                  </table>
                  </FormGroup>
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" className='shadow-none' type='button' onClick={()=>{
                    getAllValues()
                  }}>Submit</Button>
                  <Button color="secondary" className='shadow-none' onClick={()=>{
                    setAddLineItemModal(false)
                  }}>Cancel</Button>
              </ModalFooter>
          </Modal>
    {/* END Add Line Item Modal */}
    </>
  )
}

export default AddLineItemModal