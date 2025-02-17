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
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import message from '../Message';


//VehicleFuelModal From VehicleEdit
const TransportCharges = ({ addTransportChargesModal, setAddTransportChargesModal }) => {
    TransportCharges.propTypes = {
        addTransportChargesModal: PropTypes.bool,
        setAddTransportChargesModal: PropTypes.func,
  };

  // All State Variable
  const { id } = useParams();
  const [costingsummarydetails, setCostingSummary] = useState();
  const [costingsummaryinsertdetails, setCostingSummaryInsertDetails] = useState({
    costing_summary_id: id,
    date: new Date().toISOString().slice(0,10)
  });

  //Setting Data in Vehicle Fuel
  const TransportChargeshandleInputs = (e) => {
    setCostingSummaryInsertDetails({
      ...costingsummaryinsertdetails,
      [e.target.name]: e.target.value,
    });
  };

  //Api call for getting Vehicle Fuel Data By ID
  const getTransportChargesById = () => {
    api
      .post('/projecttabcostingsummary/getTransportChargesById', { costing_summary_id: id })
      .then((res) => {
        setCostingSummary(res.data.data);
      })
      .catch(() => {
        message('Costing Summary Data Not Found', 'info');
      });
  };

  //Api call for Insert transport charges Data
  const insertTransportCharges= () => {
    if (costingsummaryinsertdetails.amount && costingsummaryinsertdetails.amount !=='') {
    api
      .post('/projecttabcostingsummary/insertTransportCharges', costingsummaryinsertdetails)
      .then((res) => {
        setCostingSummaryInsertDetails(res.data.data);
        message('Transport Charges Data Inserted Successfully', 'success');
      })
      .catch(() => {
        message('Transport Charges Data Not Found', 'info');
      });
    }
    else {
      message('Please fill all required fields', 'warning');
    }
  };

  // useEffect for Vehicle Fuel
  useEffect(() => {
    getTransportChargesById();
  }, [id]);

  return (
    <>
      <Modal size="md" isOpen={addTransportChargesModal} > 
        <ModalHeader>
          Add Transport Charges
          <Button
            color="secondary"
            onClick={() => {
                setAddTransportChargesModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <ModalHeader>Transport Charges</ModalHeader>
          <FormGroup>
            <Table bordered className="lineitem">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Amount<span className='required'> *</span></th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Date">
                    <Input
                      type="date"
                      name="date"
                      onChange={TransportChargeshandleInputs}
                      value={
                        costingsummaryinsertdetails && moment(costingsummaryinsertdetails.date).format('YYYY-MM-DD')
                      }
                    />
                  </td>
                  <td data-label="Amount">
                    <Input
                      type="text"
                      name="amount"
                      onChange={TransportChargeshandleInputs}
                      value={
                        costingsummaryinsertdetails &&
                        costingsummaryinsertdetails.amount
                      } 
                    />
                  </td>
                  <td data-label="Description">
                    <Input
                      type="text"
                      name="description"
                      onChange={TransportChargeshandleInputs}
                      value={
                        costingsummaryinsertdetails && costingsummaryinsertdetails.description
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
        </ModalBody>
        <ModalFooter>
          <Button
            className="shadow-none"
            onClick={() => {
                insertTransportCharges();
                setAddTransportChargesModal(false);
                
            }}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            onClick={() => {
                setAddTransportChargesModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TransportCharges;
