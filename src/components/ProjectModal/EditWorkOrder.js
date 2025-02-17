
import React, { useEffect, useState } from 'react';
import { Row,Col,FormGroup,Input,Button,Modal,ModalHeader,ModalBody, ModalFooter,Label,Form } from 'reactstrap';
import moment from 'moment';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../views/form-editor/editor.scss';
import PropTypes from 'prop-types'
import { id } from 'date-fns/locale';
import message from '../Message';
import api from '../../constants/api';


const EditWorkOrder = ({workData,editWorkOrderModal, setEditWorkOrderModal}) => {

    EditWorkOrder.propTypes = {
        workData:PropTypes.object,
        editWorkOrderModal: PropTypes.bool,
        setEditWorkOrderModal: PropTypes.func,
       
      };
    
      const[subcon,setCSubCon] = useState(null);
      const[workinsert,setWorkInsert] = useState({
        project_id:id
      });
      
      const handleInputs = (e) => {
      setWorkInsert({ ...workinsert, [e.target.name]: e.target.value });
  };
  const getSubCon = () => {
    api
      .get('/projecttabsubconworkorder/getSubCon')
      .then((res) => {
        setCSubCon(res.data.data);
      })
      .catch(() => {
        message('SubCon not found', 'info');
      });
  };
        //Logic for edit data in db
  const editWorkOrderData = () => {
   
      api
        .post('/projecttabsubconworkorder/editWorkOrderPortal', workinsert)
        .then(() => {
          message('Record editted successfully', 'success');
        //   window.location.reload();
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
   
  };
  useEffect(() => {
  

    // editContactById();
    setWorkInsert(workData);
    getSubCon();
  }, [workData]);

  return (
    <div>
    
        <Modal size="xl" isOpen={editWorkOrderModal} >
            <ModalHeader>
                Edit Work Order Display
                <Button color="secondary" className='shadow-none' onClick={()=>{setEditWorkOrderModal(false)}}> X </Button>
            </ModalHeader>
            
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Row>
                        <Col md="3">
                <FormGroup>
                  <Label>Sub Con</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={workinsert && workinsert.sub_con_id}
                    name="sub_con_id"
                  >
                    <option value="" selected>
                      Please Select
                    </option>
                    {subcon &&
                      subcon.map((e) => {
                        return <option value={e.sub_con_id}>{e.company_name}</option>;
                      })}
                  </Input>
                </FormGroup>
              </Col>

                            <Col md="3">
                                <FormGroup>
                                    <Label>Date</Label>
                                    <Input type="date" onChange={handleInputs}
                                     value={workinsert && moment(workinsert.work_order_date,'YYYY-MM-DD').format('YYYY-MM-DD')}
                                     name="work_order_date" />
                                </FormGroup>
                            </Col>

                            <Col md="3">
                                <FormGroup>
                                    <Label>Due Date</Label>
                                    <Input type="date" onChange={handleInputs}
                                     value={workinsert && moment(workinsert.work_order_due_date,'YYYY-MM-DD').format('YYYY-MM-DD')}
                                     name="work_order_due_date"/>
                                </FormGroup>
                            </Col>
                            
                            <Col md="3">
                                <FormGroup>
                                    <Label>Completed Date</Label>
                                    <Input type="date"onChange={handleInputs}
                                     value={workinsert && moment(workinsert.completed_date,'YYYY-MM-DD').format('YYYY-MM-DD')} 
                                     name="completed_date" />
                                </FormGroup>
                            </Col>

                        </Row>

                        <Row>

                            <Col md="3">
                                <FormGroup>
                                    <Label>Status </Label>
                                    <Input type="select"onChange={handleInputs}
                                     value={workinsert && workinsert.status} 
                                     name="status">
                                        <option value="New">New</option>
                                        <option value="Cancelled">Cancelled</option>
                                        <option selected="selected" value="Confirmed">Confirmed</option>
                                        <option value="Hold">Hold</option>
                                    </Input>
                                </FormGroup>
                            </Col>

                            <Col md="3">
                                <FormGroup>
                                    <Label>Project Location</Label>
                                    <Input type="text" onChange={handleInputs}
                                     value={workinsert && workinsert.project_location}
                                     name="project_location" />
                                </FormGroup>
                            </Col>

                            <Col md="3">
                                <FormGroup>
                                    <Label>Project Reference</Label>
                                    <Input type="text" onChange={handleInputs}
                                     value={workinsert && workinsert.project_reference}
                                     name="project_reference" />
                                </FormGroup>
                            </Col>

                            <Col md="3">
                                <FormGroup>
                                    <Label>Quotation Reference</Label>
                                    <Input  type="text" onChange={handleInputs}
                                     value={workinsert && workinsert.quote_reference}
                                     name="quote_reference"/>
                                </FormGroup>
                            </Col>

                        </Row>

                        <Row>

                            
                        <Col md="3">
                                <FormGroup>
                                    <Label>Quotation Date</Label>
                                    <Input  type="date" onChange={handleInputs}
                                     value={workinsert && workinsert.quote_date}
                                     name="quote_date"/>
                                </FormGroup>
                            </Col>

                        </Row>

                        <Row>

                            <Col md="12">
                                <FormGroup>
                                    <Label>Terms & Condition</Label>
                                    <Input  type="textarea" onChange={handleInputs}
                                      value={workinsert && workinsert.terms_condition} 
                                     name="terms_condition"/>
                                </FormGroup>
                            </Col>

                        </Row>
                        
                    </FormGroup> 
                </Form>
            </ModalBody>
            <ModalFooter>
          <Row>
            <div className="pt-3 mt-3 d-flex align-items-center gap-2">
              <Button
                color="primary"
                onClick={() => {
                    editWorkOrderData();
                }}
              >
                Submit
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                    setEditWorkOrderModal(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Row>
        </ModalFooter>
        </Modal>
       
</div>
  )
}

export default EditWorkOrder