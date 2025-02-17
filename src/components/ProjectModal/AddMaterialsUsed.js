import React,{useState,useEffect} from 'react';
import { Row,Col,FormGroup,Input,Button,Modal,ModalHeader,ModalBody, ModalFooter, } from 'reactstrap';
import {  Link,useParams } from 'react-router-dom';
import * as $ from "jquery";
import random from 'random'
import PropTypes from 'prop-types'
import Select from 'react-select';
import api from '../../constants/api';
import message from '../Message';

const AddMaterialsUsed = ({addMaterialsUsed,setAddMaterialsUsed}) => {
 
  const {id} = useParams()
    AddMaterialsUsed.propTypes = {
        addMaterialsUsed: PropTypes.bool,
        setAddMaterialsUsed: PropTypes.func
  }
  // Logic for Add New Item Row

  const [addMoreItem, setMoreItem] = useState(
    [{
      "id": random.int(0,9999).toString(),
      "itemId":'',
      "title":"",
      "product_type":"",
      "qty_in_stock": "",
      "uom": "",
      "qty": "",
      "description":"",
    },{
      "id": random.int(0,9999).toString(),
      "itemId":'',
      "title":"",
      "product_type":"",
      "qty_in_stock": "",
      "uom": "",
      "qty": "",
      "description":"",
    },{
      "id": random.int(0,9999).toString(),
      "itemId":'',
      "title":"",
      "product_type":"",
      "qty_in_stock": "",
      "uom": "",
      "qty": "",
      "description":"",
    }]
  )

  const [tabMaterialsPurchased, setTabMaterialsPurchased] = useState();

  const AddNewLineItem = () => {
    //setMoreItem(addMoreItem + 1)
    setMoreItem([...addMoreItem,{
      "id": random.int(0,9999).toString(),
      "itemId":'',
      "title":"",
      "product_type":"",
      "qty_in_stock": "",
      "uom": "",
      "qty": "",
      "description":""
    }])
  } 

// const calculateTotal = () => {
//   const oldArray = addMoreItem
//    let totalValue = 0
//    const result = [];
//    $(".lineitem tbody tr").each(function() {
//      const allValues = {}; 
//      $(this).find("input").each(function() {
      
//          const fieldName = $(this).attr("name");
        
//          allValues[fieldName] = $(this).val();
//          allValues.totalprice = allValues.qty * allValues.unitprice
         
//      });
//      result.push(allValues);
//  })  
//  result.forEach(obj=>{
//    if(obj.id){
// /* eslint-disable */

//       // const objId = parseInt(obj.id)
      
//        const foundObj = oldArray.find(el => el.id === obj.id)
//        if(foundObj){
//            obj.item = foundObj.item
//            obj.itemId = foundObj.itemId
//        }
      
//    }

//  })
//  console.log(result)
//  result.forEach(e=>{
//    if(e.totalprice)
//    {
//      totalValue += parseFloat(e.totalprice)
//    }
//  })

//  setMoreItem(result)
//  setTotalAmount(totalValue)
//  }

    // Materials Purchased

        const TabMaterialsPurchased = () => {
          api.get('/purchaseorder/TabPurchaseOrderLineItem')
        .then((res) => {
          const items = res.data.data
          const finaldat = []
          items.forEach(item=>{
              finaldat.push({ 
                value: item.product_id, 
                label: item.title, 
                type: item.product_type, 
                stock: item.qty_in_stock
              })
          })
          setTabMaterialsPurchased(finaldat)
          console.log('materials',res.data.data)
          console.log('finalmaterials',finaldat)
        })
        .catch(()=>{
          message("Tab Material Used not found","info")
        })
        }

        const addMultipleMaterial = () =>{

          // console.log("all pushed data",[...addMoreItem])
          const oldArray = addMoreItem

          const result = [];
          $(".lineitem tbody tr").each(() => {
            const allValues = {}; 
            $(this).find("input").each(() => {
                const fieldName = $(this).attr("name");
              
                allValues[fieldName] = $(this).val();
                
            });
            if(allValues.qty !== ''){
                result.push(allValues);
            }
          })  
          
        result.forEach(obj=>{
         
          if(obj.id){
            /* eslint-disable */
              const foundObj = oldArray.find(el => el.id === obj.id)
              
              if(foundObj){
                 obj.title = foundObj.title
                  obj.product_type = foundObj.product_type
                  obj.product_id = foundObj.itemId
                  // obj.qty = obj.qty
                  // obj.uom = foundObj.uom
              }
          }
        })
        result.forEach(materialRow=>{
          submitData(materialRow)
        })
        }
        const submitData = (itemObj) => {
          api.post('/projecttabmaterialusedportal/insertProjectMaterials',{
            project_id:id
            ,title: itemObj.title
            , quantity:itemObj.qty
            , amount: parseInt(itemObj.qty) * parseInt(itemObj.uom)
            , description: itemObj.description
            , product_id:itemObj.product_id
            , unit:itemObj.uom
            , creation_date:"2022-10-18 18:43:37"
            , modification_date: "2022-10-18 18:43:37"
            , created_by:1
            , modified_by:1
            , status:"Used"
            , material_used_date: "2022-10-18 18:43:37"
            , part_no: ""
            , viresco_factory: 1
          })
          .then((res) => {
           console.log(res)
            
          })

        }
        useEffect(() => {
          TabMaterialsPurchased();
      }, [])

      const onchangeItem = (str,itemId) =>{
       
        const element = addMoreItem.find(el => el.id === itemId)
        console.log(element)
        element.title = str.label
        element.itemId = str.value
        element.product_type = str.type
        element.qty_in_stock = str.stock
        setMoreItem([...addMoreItem])  
        
    }

  return (
    <>

           <Modal size="xl" isOpen={addMaterialsUsed}>
              <ModalHeader>Add Materials</ModalHeader>
              
              <ModalBody>
                  <FormGroup>
                    <Row>
                      <Col md="12" className='mb-4'>
                        <Row>
                          <Col md="3">
                            <Button color="primary" 
                            className='shadow-none'
                            type='button'
                            onClick={()=>{AddNewLineItem()}}
                            >Add Materials</Button>
                          </Col>
                          {/* <Col md="3">
                            <b> Discount : </b>
                          </Col>
                          <Col md="3">
                            <b>Total Amount: </b>
                          </Col> */}
                        </Row>
                      </Col>
                    </Row>
                  <table className='lineitem' >
                    
                    <thead>
                      <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Type</th>
                        <th scope="col">Stock</th>
                        <th scope="col">UoM</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Remarks</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>

                    {addMoreItem.map((item) => {
                            return (
                              <tr key={item.id}>
                                  <td data-label="Item" >

                                  <Select
                                    key={item.id}
                                    defaultValue={{value:item.itemId,label:item.title}}
                                    onChange={(e)=>{
                                        onchangeItem(e,item.id)
                                    }}
                                    options={tabMaterialsPurchased}
                                  />
                                  </td>
                                  <td data-label="product_type"> 
                                    {item.product_type}
                                    </td>
                                    <td data-label="stock">
                                      {item.qty_in_stock}
                                       </td>
                                    <td data-label="uom"><Input type="number" name="uom" defaultValue={item.uom} /></td>
                                    <td data-label="qty"><Input type="number" name="qty" defaultValue={item.qty} /></td>
                                    <td data-label="Remarks"><Input type="text" name="description" defaultValue={item.description} /></td>
                                    <td data-label="Action"><Link to=""><Input type='hidden' defaultValue={item.id} name="id" ></Input><span>Clear</span></Link></td>
                              </tr>
                              );
                            })}

                    </tbody>
                  </table>
                  </FormGroup>
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" type='button' className='shadow-none' onClick={()=>{addMultipleMaterial()}}>Submit</Button>
                  <Button color="secondary" className='shadow-none' onClick={()=>{setAddMaterialsUsed(false)}}>Cancel</Button>
              </ModalFooter>
          </Modal>
    </>
  )
}

export default AddMaterialsUsed