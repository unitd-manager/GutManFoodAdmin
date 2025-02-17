import React,{useEffect, useState} from 'react'
import { Row,Col,FormGroup,Button,Modal,ModalHeader,ModalBody,Form,Input,Label } from 'reactstrap';
import random from 'random';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types'
import moment from 'moment';
import message from '../Message'
import api from '../../constants/api'

function EditPc({editPcModal,setEditPcModal,pc,projectClaimId}) {
  EditPc.propTypes = {
    editPcModal: PropTypes.bool,
    setEditPcModal: PropTypes.func,
    pc:PropTypes.object,
    projectClaimId:PropTypes.any
  }

  const [claimItems, setClaimItems] = useState([]);
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
const getClaimLineItems=()=>{
  api.post('/claim/TabClaimPortalLineItemById',{project_id:id,project_claim_id:projectClaimId})
  .then((res)=>{
    setClaimItems(res.data.data);
  }).catch(()=>{
    message('unable to get products','error');
  })
}
//edit claim items
const editClaimLineItems=(elem)=>{
  elem.project_claim_id=projectClaimId;
  elem.project_id=id;
api.post('/claim/editTabClaimPortalLineItem',elem)
.then(() => {
message('Record editted successfully', 'success');
})
.catch(() => {
message('Unable to edit record.', 'error');
});
}

//Insert claim line items
const insertClaimLineItems=(elem)=>{
  elem.project_claim_id=projectClaimId;
  elem.project_id=id;
api.post('/claim/insertClaimLineItems',elem)
.then(() => {
message('Record created successfully', 'success');
})
.catch(() => {
message('Unable to edit record.', 'error');
});

}


function updateState(index,property,e){
 
  const updatedLineItems=[... claimItems];
const updatedObject = {...updatedLineItems[index], [property]: e.target.value};
updatedLineItems[index] = updatedObject;
setClaimItems(updatedLineItems);

};

  const insertOrEditClaimItems=()=>{
    claimItems.forEach((el)=>{
      if(el.claim_line_items_id){
        editClaimLineItems(el)
      }else{
        insertClaimLineItems(el)
      }
    })
    addLineItem.forEach((el)=>{
      if(el.title!==''&& el.amount){
        insertClaimLineItems(el)
      }
    })
  }

useEffect(()=>{
  getClaimLineItems();
},[])

  return (
    <>
    <Modal size="lg" isOpen={editPcModal}>
                <ModalHeader> Edit line Item </ModalHeader>
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
                            <Label>Date</Label>
                            <Input type="date" name="date"  value={moment(new Date()).format('YYYY-MM-DD')} />
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <FormGroup>
                            <Label>Project</Label>
                            <Input name="project"  type="text" value={pc && pc.title}/>
                            </FormGroup>
                        </Col>
                        {/* <Col md="4">
                            <FormGroup>
                            <Label>Claim Sequence</Label>
                            <Input name="claim_seq"  type="text"/>
                            </FormGroup>
                        </Col> */}
                            </Row>
                            <FormGroup>
                            <table className='lineitem' >
                
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Contract Amount</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
    
                    {claimItems && claimItems.map((item,index) => {
                                return (
                                  <tr key={item.id}>
                                    
                                    <td data-label="title">
                                      <Input
                                        defaultValue={item.title}
                                        type="textarea"
                                        name="title"
                                        onChange={(e)=>updateState(index,"title",e)}
                                      />
                                    </td>
                                  
                                    <td data-label="description">
                                      <Input defaultValue={item.description} type="textarea" name="description" 
                                      onChange={(e)=>updateState(index,"description",e)}/>
                                    </td>
                                    <td data-label="amount">
                                      <Input
                                        defaultValue={item.amount}
                                      
                                        type="text"
                                        name="amount"
                                        onChange={(e)=>updateState(index,"amount",e)}
                                      />
                                    </td>
                                    <td data-label="Status">
                                      <Input
                                        defaultValue={item.status}
                                        type="text"
                                        name="status"
                                        onChange={(e)=>updateState(index,"status",e)}
                                      />
                                    </td>
                                    
                                        
                                  </tr>
                                );
                              })}
                               {addLineItem && addLineItem.map((item,index) => {
                                return (
                                  <tr key={item.id}>
                                    
                                    <td data-label="title">
                                      <Input
                                        defaultValue={item.title}
                                        type="textarea"
                                        name="title"
                                        onChange={(e)=>updateState(index,"title",e)}
                                      />
                                    </td>
                                  
                                    <td data-label="description">
                                      <Input defaultValue={item.description} type="textarea" name="description" 
                                      onChange={(e)=>updateState(index,"description",e)}/>
                                    </td>
                                    <td data-label="amount">
                                      <Input
                                        defaultValue={item.amount}
                                      
                                        type="text"
                                        name="amount"
                                        onChange={(e)=>updateState(index,"amount",e)}
                                      />
                                    </td>
                                    <td data-label="Status">
                                      <Input
                                        defaultValue={item.status}
                                        type="text"
                                        name="status"
                                        onChange={(e)=>updateState(index,"status",e)}
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
                                    onClick={()=>{insertOrEditClaimItems();setEditPcModal(false)}}
                                    >
                                        Save & Continue
                                    </Button>
                                    <Button color="secondary" className='shadow-none' onClick={()=>{setEditPcModal(false) }}>Cancel</Button>
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

export default EditPc