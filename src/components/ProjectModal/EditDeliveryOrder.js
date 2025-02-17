import React, { useState,useEffect } from 'react'
import { Input,Button,Modal,ModalHeader,ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types'
import message from '../Message';
import api from '../../constants/api';

const EditDeliveryOrder = ({editDeliveryOrder, setEditDeliveryOrder,data
  }) => {

    EditDeliveryOrder.propTypes = {
        editDeliveryOrder: PropTypes.bool,
        setEditDeliveryOrder: PropTypes.func,
        data: PropTypes.string
      }

      const[ deliveryHistory, setDeliveryHistory] = useState();

      const TabDeliveryOrderHistory = () => {
        api.post('/projecttabdeliveryorder/TabDeliveryOrderHistory',{delivery_order_id:data})
        .then((res)=>{
          setDeliveryHistory(res.data.data)
         message('Delivery Order Item Inserted','success')
        
        }).catch(()=>{
          message('Unable to add Delivery Order Item','error')
        })

       }
       //edit delivery items
const editDeliveryProducts=()=>{
  deliveryHistory.forEach((el)=>{
    api.post('/purchaseorder/editDelieryOrderHistory',el)
    .then(() => {
      message('Record editted successfully', 'success');
    })
    .catch(() => {
      message('Unable to edit record.', 'error');
    });
  })
}

//handle inputs
function updateState(index,property,e){
 
  const copyDeliverOrderProducts=[... deliveryHistory];
const updatedObject = {...copyDeliverOrderProducts[index], [property]: e.target.value};
copyDeliverOrderProducts[index] = updatedObject;
setDeliveryHistory(copyDeliverOrderProducts);

};
      
      useEffect(()=>{
        TabDeliveryOrderHistory(data)      
      },[data])

  return (
    <>
        <Modal size="xl" isOpen={editDeliveryOrder} >
            <ModalHeader>
                    Edit Delivery Order
                <Button color="secondary" onClick={()=>{setEditDeliveryOrder(false)}}> X </Button>
            </ModalHeader>
            
            <ModalBody>
                <table className='lineitem' >
                    
                    <thead>
                      <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Status</th>
                        <th scope="col">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>

                      {deliveryHistory && deliveryHistory.map((res,index)=>{
                        return(
                          <>
                            <tr>
                              <td data-label="Item"><Input disabled type="text" name="item" value={res.item_title}/></td>
                              <td data-label="UoM"><Input type="text" name="quantity"  value={res.quantity} onChange={(e)=>updateState(index,"quantity",e)}/></td>
                              <td data-label="Status">
                                <Input type="select" name="status" value={res.status} onChange={(e)=>updateState(index,"status",e)}>
                                  <option value="">Please Select</option>
                                  <option defaultValue="selected" value="1">In Progress</option>
                                  <option value="2">Delivered</option>
                                  <option value="3">On-hold</option>
                                  <option value="4">Cancelled</option>
                                </Input>
                              </td>
                              <td data-label="Remarks"><Input type="text" name="remarks" value={res.remarks} onChange={(e)=>updateState(index,"remarks",e)}></Input></td>
                            </tr>
                          </>
                        )
                      })}
                        
                    </tbody>
                  </table>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" className='shadow-none' onClick={()=>{editDeliveryProducts();setEditDeliveryOrder(false)}}> Submit </Button>
                <Button color="secondary" className='shadow-none' onClick={()=>{setEditDeliveryOrder(false)}}> Close </Button>
            </ModalFooter>
        </Modal>
       
</>
  )
}

export default EditDeliveryOrder