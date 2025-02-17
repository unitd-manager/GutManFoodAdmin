import React,{useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Form,FormGroup,Input,Button, Modal, ModalBody, ModalFooter, ModalHeader,Label } from 'reactstrap';
import api from '../../constants/api';
import message from '../Message';

function ReturnStockModal({returnStockModal,setReturnStockModal,returnItem}) {
    ReturnStockModal.propTypes = {
        returnStockModal: PropTypes.bool,
        setReturnStockModal: PropTypes.func,
        returnItem:PropTypes.object
      }
const[returnObj,setReturnObj]=useState({
  po_product_id:'',
  product_id:"",
  stock:'',
  qty:''
})
const[product,setProduct]=useState({})



      const handleQty = (e) => {
        
        returnObj.product_id = returnItem.product_id;
        returnObj.qty = e.target.value;
    
        setReturnObj({
          po_product_id:returnItem.po_product_id,
          product_id:  returnItem.product_id,
         qty:e.target.value,
        });
      };
     
      //get line items
const getProduct=()=>{
  api.post('/product/getProduct',{product_id:returnItem.product_id})
  .then((res)=>{
    setProduct(res.data.data);
  }).catch(()=>{
    message('unable to get products','error');
  })
}

   const MaterialsReturnToStock = () => {
      if(returnObj.qty<=returnItem.quantity){
       returnItem.quantity-=returnObj.qty;
             api.post('/projecttabmaterialusedportal/editTabMaterialUsedPortal',returnItem)
          .then(() => {
            product.qty_in_stock +=returnObj.qty
            api.post('/product/edit-ProductQty', product)
            .then(() => {
                api
                  .post('/inventory/editInventoryStock', product)
                  .then(() => {
                    message('Quantity updated in inventory successfully.', 'success');
                  })
                  .catch(() => {
                    // console.log('Network connection error.');
                    message('unable to update quantity in inventory.', 'danger');
                  });
                // console.log('elem', elem);
                message('Quantity added successfully.', 'success');
              })
              .catch(() => {
                // console.log('Network connection error.');
                message('unable to add quantity.', 'danger');
              });
           
          })
          .catch(()=>{
          message(" Materials Transferred Data not found","info")
          })    
        } else{
alert(`Please Enter the quantity less than ${returnItem.qty}`)
        }
  }
useEffect(()=>{
getProduct()

},[])

  return (
    <div>
<Modal isOpen={returnStockModal}>
    <ModalHeader>Return To Stock</ModalHeader>
    <ModalBody>
        <Form>
    <FormGroup>
                    <Label>Enter Return Quantity</Label>
                    <Input type="text" name="qty" 
                    onChange={(e)=>{handleQty(e)}}
                    />
                  </FormGroup>
                  </Form>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" className='shadow-none' onClick={()=>MaterialsReturnToStock()}> Submit </Button>
      <Button color="secondary" className='shadow-none' onClick={()=>{setReturnStockModal(false)}}> Cancel </Button>
    </ModalFooter>
</Modal>
    </div>
  )
}

export default ReturnStockModal