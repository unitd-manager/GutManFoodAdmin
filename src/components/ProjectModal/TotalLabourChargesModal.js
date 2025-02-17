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
const LabourChargesModal = ({ addTotalLabourChargesModal, setAddLabourChargesModal }) => {
    LabourChargesModal.propTypes = {
        addTotalLabourChargesModal: PropTypes.bool,
        setAddLabourChargesModal: PropTypes.func,
        
  };

  // All State Variable
  const { id } = useParams();
  const [labourchargesdetails, setLabourChargesDetails] = useState();
  //const [gTotal, setGtotal] = useState(0);
  const [labourchargesinsertdetails, setLabourChargesInsertDetails] = useState({
    costing_summary_id: id,
    date: new Date().toISOString().slice(0,10)
  });

  //Setting Data in Vehicle Fuel
  const labourchargeshandleInputs = (e) => {
    labourchargesinsertdetails({
      ...labourchargesinsertdetails,
      [e.target.name]: e.target.value,
    });
  };

  //Api call for getting Vehicle Fuel Data By ID
  const getLabourChargesById = () => {
    api
      .post('/projecttabcostingsummary/getOtherChargesById', { costing_summary_id: id })
      .then((res) => {
        setLabourChargesDetails(res.data.data);
        
        
      })
      .catch(() => {
        message('Labour charges Data Not Found', 'info');
      });
  };

  //Api call for Insert transport charges Data
  const insertLabourCharges = () => {
    if (labourchargesinsertdetails.amount && labourchargesinsertdetails.amount !=='') {
    api
      .post('/projecttabcostingsummary/insertOtherCharges', labourchargesinsertdetails)
      .then((res) => {
        setLabourChargesInsertDetails(res.data.data);
        message('Labour Charges Data Inserted Successfully', 'success');
      })
      .catch(() => {
        message('Labour Charges Data Not Found', 'info');
      });
    }
    else {
      message('Please fill all required fields', 'warning');
    }
  };

  // useEffect for Vehicle Fuel
  useEffect(() => {
    getLabourChargesById();
  }, [id]);

  return (
    <>
      <Modal size="md" isOpen={addTotalLabourChargesModal} > 
        <ModalHeader>
          Add Actual Charges
          <Button
            color="secondary"
            onClick={() => {
                setAddLabourChargesModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <ModalHeader>Labour Charges </ModalHeader>
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
                      onChange={labourchargeshandleInputs}
                      value={
                        labourchargesinsertdetails && moment(labourchargesinsertdetails.date).format('YYYY-MM-DD')
                      }
                    />
                  </td>
                  <td data-label="Amount">
                    <Input
                      type="text"
                      name="amount"
                      onChange={labourchargeshandleInputs}
                      value={
                        labourchargesinsertdetails &&
                        labourchargesinsertdetails.amount
                      } 
                    />
                  </td>
                  <td data-label="Description">
                    <Input
                      type="text"
                      name="description"
                      onChange={labourchargeshandleInputs}
                      value={
                        labourchargesinsertdetails && labourchargesinsertdetails.description
                      }
                    />
                  </td>
                </tr>
                {labourchargesdetails &&
                  labourchargesdetails.map((e) => {
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
                insertLabourCharges();
                setAddLabourChargesModal(false);
                
            }}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            onClick={() => {
                setAddLabourChargesModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default LabourChargesModal;
