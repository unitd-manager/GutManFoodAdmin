import React, { useEffect,useState } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Form,
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import { id } from 'date-fns/locale';
import api from '../../constants/api';
import message from '../Message';

const EditQuotation = ({ editQuoteModal, setEditQuoteModal,quoteData}) => {
  
  
  EditQuotation.propTypes = {
    editQuoteModal: PropTypes.bool,
    setEditQuoteModal: PropTypes.func,
    quoteData:PropTypes.object
  };
  
  const [quotationeditDetails, setQuotationeditDetails] = useState({
    project_id:id
  });
  //const [quotationeditDetails, setQuotations] = useState();
 
  const handleQuoteInputs = (e) => {
    setQuotationeditDetails({ ...quotationeditDetails, [e.target.name]: e.target.value });
  };

 
  //Insert order for finance module
  const editQuotations = () => {
    api
      .post('/projecttabquote/TabQuote', quotationeditDetails)
      .then(() => {
        
        message('quote editted successfully.', 'success');
        
        
      })
      .catch(() => {
        message('Network connection error.');
      });
  };
  useEffect(() => {
    setQuotationeditDetails(quoteData);
  }, [quoteData]);
  return (
    <>
      <Modal size="lg" isOpen={editQuoteModal}>
        <ModalHeader>Edit Quote Display </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Form inline>
              <FormGroup>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label>Quote Date</Label>
                      <Input
                        type="date"
                        onChange={handleQuoteInputs}
                        value={
                          quotationeditDetails && moment(quotationeditDetails.quote_date).format('YYYY-MM-DD')
                        }
                        name="quote_date"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Quote Status</Label>
                      <Input disabled type="text" name="quote_status" onChange={handleQuoteInputs}
                        value={
                          quotationeditDetails && quotationeditDetails.quote_status
                        }
                         />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Discount</Label>
                      <Input type="text" name="discount"  onChange= {handleQuoteInputs}
                        value={
                          quotationeditDetails && quotationeditDetails.discount
                        }/>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label>Drawing Nos</Label>
                    </FormGroup>
                    <Input
                      className="form-check-input form-check-inline"
                      type="radio"
                      name="drawing_nos"
                      value="1"
                    />
                    <Label for="inlineradio1">yes</Label>{' '}
                    <Input
                      className="form-check-input form-check-inline"
                      type="radio"
                      name="drawing_nos"
                      value="0"
                    />
                    <Label for="inlineradio2">No</Label>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Project Location</Label>
                      <Input type="text" name="project_location"  onChange={handleQuoteInputs}
                        value={
                          quotationeditDetails && quotationeditDetails.project_location
                        }/>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Project Reference</Label>
                      <Input type="text" name="project_reference" onChange={handleQuoteInputs}
                        value={
                          quotationeditDetails && quotationeditDetails.project_reference
                        }/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label>Mode of Payment</Label>
                      <Input type="select" name="payment_method">
                        <option value="">Please Select</option>
                        <option value="15 days">15 days</option>
                        <option defaultValue="selected" value="40 days">
                          40 days
                        </option>
                        <option value="60 days">60 days</option>
                        <option value="COD">COD</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Ref No</Label>
                      <Input type="text" name="Ref_No" onChange={handleQuoteInputs}
                        value={
                          quotationeditDetails && quotationeditDetails.Ref_No
                        } />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Quote Revision</Label>
                      <Input type="text" name="revision" onChange={handleQuoteInputs}
                        value={
                          quotationeditDetails && quotationeditDetails.revision
                        } />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <FormGroup>
                    <Label>Terms & Condition</Label>
                    <Input type="textarea" name="terms_condition" onChange={handleQuoteInputs}
                        value={
                          quotationeditDetails && quotationeditDetails.terms_condition
                        } />
                  </FormGroup>
                </Row>

                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      type="button"
                      color="primary"
                      className="btn shadow-none mr-2"
                      onClick={() => {
                        
                        editQuotations();
                        
                        
                      }}
                    >
                      Save & Continue
                    </Button>
                    <Button
                      className="shadow-none"
                      color="secondary"
                      onClick={() => {
                        setEditQuoteModal(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Row>
              </FormGroup>
            </Form>
          </FormGroup>
        </ModalBody>
      </Modal>
    </>
  );
};

export default EditQuotation;
