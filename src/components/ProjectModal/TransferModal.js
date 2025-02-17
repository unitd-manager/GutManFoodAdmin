import React,{useEffect, useState} from 'react'
import { Row,Col,FormGroup,Button,Modal,ModalHeader,ModalBody,Form,Input } from 'reactstrap';
import random from 'random';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types'
import message from '../Message'
import api from '../../constants/api'

function TransferModal({transferModal,setTransferModal,transferItem}) {
  TransferModal.propTypes = {
    transferModal: PropTypes.bool,
    setTransferModal: PropTypes.func,
    transferItem:PropTypes.object
   
  }

  const[project,setProject]=useState([])
  const [addLineItem, setAddLineItem] = useState([
    {
      id: random.int(1, 99),
      title: '',
        description: '',
        amount: '',
        status: '',
    },
  ]);
  const AddNewLineItem = () => {
    setAddLineItem([
      ...addLineItem,
      {
        id: new Date().getTime().toString(),
        title: '',
        description: '',
        amount: '',
        status: '',
      },
    ]);
  };

  const{id}=useParams()
 
//get line items
const getProjects=()=>{
  api.get('/project/getProjects')
  .then((res)=>{
    setProject(res.data.data);
  }).catch(()=>{
    message('unable to get products','error');
  })
}


//Insert claim line items
const insertTransferItems=(elem)=>{
  elem.product_id=transferItem.product_id;
  elem.from_project_id=id;
api.post('/projecttabmaterialstransferredportal/insertstock_transfer',elem)
.then(() => {
  transferItem.qty-=elem.quantity
  api.post('/purchaseorder/editTabPurchaseOrderLineItem',transferItem)
  .then(() => {
  message('Record created successfully', 'success');
  })
  .catch(() => {
  message('Unable to edit record.', 'error');
  });
message('Record created successfully', 'success');
})
.catch(() => {
message('Unable to edit record.', 'error');
});

}


function updateState(index,property,e){
 
  const updatedLineItems=[... addLineItem];
const updatedObject = {...updatedLineItems[index], [property]: e.target.value};
updatedLineItems[index] = updatedObject;
setAddLineItem(updatedLineItems);

};

  const insertOrEditClaimItems=()=>{
    let transQuantity=0;
    addLineItem.forEach((elem)=>{
      transQuantity +=elem.quantity
    })
    if(transQuantity<=transferItem.qty){
    addLineItem.forEach((el)=>{
      insertTransferItems(el)
      
    })
  }else{
    alert(`Please Enter the Quantity less than ${transferItem.qty}`)
  }
  }

useEffect(()=>{
 getProjects()
},[])

  return (
    <>
    <Modal size="lg" isOpen={transferModal}>
                <ModalHeader> Transfer to Other Projects</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Form>
                            <Row>
                            <Col md="3">
                            <FormGroup>
                           <Button onClick={()=>AddNewLineItem}>Add More Items</Button>
                           
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                          <span>Total Quantity:{transferItem && transferItem.qty}</span>
                           
                            </FormGroup>
                        </Col>
                            </Row>
                            <FormGroup>
                            <table className='lineitem' >
                
                <thead>
                  <tr>
                    <th scope="col">Client</th>
                    <th scope="col">Project Name</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
     {addLineItem && addLineItem.map((item,index) => {
                                return (
                                  <tr key={item.id}>
                                    
                                  <td data-label="title">
                                    <Input
                                      defaultValue={item.client}
                                      type="text"
                                      name="client"
                                      onChange={(e)=>updateState(index,"client",e)}
                                    />
                                  </td>
                                
                                  <td data-label="Project Name">
                                    <Input defaultValue={item.project_id} type="select" name="to_project_id" 
                                    onChange={(e)=>updateState(index,"to_project_id",e)}>
                                      <option value=''> </option>
                                      {project&&project.map((e)=>{
                                       return <option value={e.project_id}>{e.title}</option>
                                      })
                                      
     }
                                    </Input>
                                  </td>
                                  <td data-label="Stock">
                                    {item.qty}
                                  </td>
                                  <td data-label="Quantity">
                                    <Input
                                      defaultValue={item.quantity}
                                      type="text"
                                      name="quantity"
                                      onChange={(e)=>updateState(index,"quantity",e)}
                                    />
                                  </td>
                                  
                                      
                                </tr>
                                );
                              })}
                </tbody>
              </table>
                            
                                <Row>
                                <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                                    <Button type="button" className="btn mr-2 shadow-none" color="primary"
                                    onClick={()=>{insertOrEditClaimItems();setTransferModal(false)}}
                                    >
                                        Save & Continue
                                    </Button>
                                    <Button color="secondary" className='shadow-none' onClick={()=>{setTransferModal(false) }}>Cancel</Button>
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

export default TransferModal