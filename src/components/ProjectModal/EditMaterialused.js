import React,{useState,useEffect} from 'react'
import { Row,Col,FormGroup,Input,Button,Modal,ModalHeader,ModalBody, ModalFooter,Label,Card, CardBody, Form } from 'reactstrap';
import PropTypes from 'prop-types'
import moment from 'moment';
import api from '../../constants/api';


const EditMaterialused = ({editMaterialsUsed,setEditMaterialsUsed,FetchMaterialsUsed}) => {

    EditMaterialused.propTypes = {
        editMaterialsUsed: PropTypes.bool,
        setEditMaterialsUsed: PropTypes.func,
        FetchMaterialsUsed: PropTypes.object
      }

      const [editMaterialsUsedData, setEditMaterialsUsedData] = useState(null);


      const handleEditMaterialsUsedInputs = (e) => {
        setEditMaterialsUsedData({...editMaterialsUsedData, [e.target.name]:e.target.value});
      }
  
      const EditMaterialusedData = () => {

        api.post('/projecttabmaterialusedportal/editTabMaterialUsedPortal',editMaterialsUsedData)
        .then(()=> {
            setEditMaterialsUsedData(false);
            window.location.reload()
       })
     }

    useEffect(() => {

        setEditMaterialsUsedData(FetchMaterialsUsed);

    }, [FetchMaterialsUsed])
    
  return (
    <div>  
        
<Modal isOpen={editMaterialsUsed} >
    <ModalHeader>Edit Material Used</ModalHeader>
    <ModalBody>
      <Row>
      <Col md="12">
        <Card>
          <CardBody>
            <Form>
              <Row>
              <Col md="12">
                <FormGroup>
                  <Label>Date</Label>
                  <Input type="date" name="date" 
                  defaultValue={moment(editMaterialsUsedData && editMaterialsUsedData.creation_date).format('YYYY-MM-DD')}
                  onChange={handleEditMaterialsUsedInputs}
                  />
                    
                </FormGroup>
              </Col>
                <Col md="12">
                  <FormGroup>
                    <Label>Description</Label>
                    <Input type="text" name="description" 
                    defaultValue={editMaterialsUsedData && editMaterialsUsedData.title}
                    onChange={handleEditMaterialsUsedInputs}
                    />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label>Type</Label>
                    <Input type="text" name="title" readonly="readonly"
                    defaultValue={editMaterialsUsedData && editMaterialsUsedData.product_type}
                    onChange={handleEditMaterialsUsedInputs}
                    />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label>Stock</Label>
                    <Input type="text" name="stock" readonly="readonly"
                    defaultValue={editMaterialsUsedData && editMaterialsUsedData.qty_in_stock}
                    onChange={handleEditMaterialsUsedInputs}
                    />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label>UoM</Label>
                    <Input type="text" name="uom" 
                    defaultValue={editMaterialsUsedData && editMaterialsUsedData.unit}
                    onChange={handleEditMaterialsUsedInputs}
                    />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label>Quantity</Label>
                    <Input type="number" name="quantity" 
                    defaultValue={editMaterialsUsedData && editMaterialsUsedData.quantity} 
                    onChange={handleEditMaterialsUsedInputs}
                    />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label>Remarks</Label>
                    <Input type="text" name="remarks" 
                    defaultValue={editMaterialsUsedData && editMaterialsUsedData.description}
                    onChange={handleEditMaterialsUsedInputs}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
      </Row>  
    </ModalBody>
    <ModalFooter>
      <Button color="primary" className='shadow-none' onClick={()=>{EditMaterialusedData()}}> Submit </Button>
      <Button color="secondary" className='shadow-none' onClick={()=>{setEditMaterialsUsed(false)}}> Cancel </Button>
    </ModalFooter>
  </Modal></div>
  )
}

export default EditMaterialused