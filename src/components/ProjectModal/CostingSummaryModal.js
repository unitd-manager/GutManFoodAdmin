import React, { useState, useEffect } from 'react';
import {
  FormGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
  Form,
  Card,
  CardBody,
  Row,
  Col,
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import message from '../Message';

//VehicleFuelModal From VehicleEdit
const CostingSummaryModal = ({ addCostingSummaryModal, setAddCostingSummaryModal, type,getCostingbySummary }) => {
  CostingSummaryModal.propTypes = {
    addCostingSummaryModal: PropTypes.bool,
    setAddCostingSummaryModal: PropTypes.func,
    type: PropTypes.string,
    getCostingbySummary:PropTypes.func
  };

  // All State Variable
  const { id } = useParams();
  const [costingsummarydetails, setCostingSummaryDetails] = useState();
  //const [transportcharges, setTransportCharges] = useState();
  //const [othercharges, setOtherCharges] = useState();
  const [costingsummaryinsertdetails, setCostingSummaryInsertDetails] = useState({
    project_id: id,
    title: type,
    date: new Date().toISOString().slice(0, 10)
  });

  //Setting Data in Vehicle Fuel
  const CostingSummaryhandleInputs = (e) => {
    setCostingSummaryInsertDetails({
      ...costingsummaryinsertdetails,
      [e.target.name]: e.target.value,
    });
  };
  

  //Api call for getting Vehicle Fuel Data By ID
  const getsummaryChargesById = () => {
    api
      .post('/projecttabcostingsummary/getCostingSummaryChargesById', { project_id: id ,title: type })
      
      .then((res) => {
        setCostingSummaryDetails(res.data.data);
      })
      .catch(() => {
        message('Costing Summary Data Not Found', 'info');
      });
  };
  
    //Api call for Insert transport charges Data
  const insertCharges = () => {
    if (costingsummaryinsertdetails.amount && costingsummaryinsertdetails.amount !== '') {
      api
        .post('/projecttabcostingsummary/insertCostingCharges', costingsummaryinsertdetails)
        .then((res) => {
          setCostingSummaryInsertDetails(res.data.data);
          getsummaryChargesById();
          message('Costing summary Charges Data Inserted Successfully', 'success');
        })
        .catch(() => {
          message('Costing summary Charges Data Not Found', 'info');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  // useEffect for Vehicle Fuel
  useEffect(() => {
    getsummaryChargesById();
  }, [type, id]);

  return (
    <>
      <Modal size="md" isOpen={addCostingSummaryModal}>
        <ModalHeader>
          Add Charges
          <Button
            color="secondary"
            onClick={() => {
              setAddCostingSummaryModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <Form>
                    <FormGroup>
                      {type}
                      <br/>
                      <Table bordered className="lineitem">
                        <thead>
                          <tr>
                            <th scope="col">Date</th>
                            <th scope="col">
                              Amount<span className="required"> *</span>
                            </th>
                            <th scope="col">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td data-label="Date">
                              <Input
                                title="date"
                                name="date"
                                onChange={CostingSummaryhandleInputs}
                                value={
                                  costingsummaryinsertdetails &&
                                  moment(costingsummaryinsertdetails.date).format('YYYY-MM-DD')
                                }
                              />
                            </td>
                            <td data-label="Amount">
                              <Input
                                title="text"
                                name="amount"
                                onChange={CostingSummaryhandleInputs}
                                value={
                                  costingsummaryinsertdetails && costingsummaryinsertdetails.amount
                                }
                              />
                            </td>
                            <td data-label="Description">
                              <Input
                                title="text"
                                name="description"
                                onChange={CostingSummaryhandleInputs}
                                value={
                                  costingsummaryinsertdetails &&
                                  costingsummaryinsertdetails.description
                                }
                              />
                            </td>
                          </tr>
                          {costingsummarydetails &&
                            costingsummarydetails.map((e) => {
                              return (
                                <tr key={e.costing_summary_id}>
                                  <td data-label="Date">{e.date}</td>
                                  <td data-label="Amount">{e.amount}</td>
                                  <td data-label="Description">{e.description}</td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Button
            className="shadow-none"
            onClick={() => {
              insertCharges();
              getCostingbySummary();
              setAddCostingSummaryModal(false);
            }}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setAddCostingSummaryModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CostingSummaryModal;
