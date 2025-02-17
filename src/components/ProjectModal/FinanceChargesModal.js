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
const FinanceChargesModal = ({ addFinanceChargesModal, setAddFinanceChargesModal }) => {
    FinanceChargesModal.propTypes = {
        addFinanceChargesModal: PropTypes.bool,
        setAddFinanceChargesModal: PropTypes.func,
        
  };

  // All State Variable
  const { id } = useParams();
  const [financechargesdetails, setFinanceChargesDetails] = useState();
  //const [gTotal, setGtotal] = useState(0);
  const [financechargesinsertdetails, setFinanceChargesInsertDetails] = useState({
    costing_summary_id: id,
    date: new Date().toISOString().slice(0,10)
  });

  //Setting Data in Vehicle Fuel
  const OfficeOverheadshandleInputs = (e) => {
    financechargesinsertdetails({
      ...financechargesinsertdetails,
      [e.target.name]: e.target.value,
    });
  };

  //Api call for getting Vehicle Fuel Data By ID
  const getFinanceChargesById = () => {
    api
      .post('/projecttabcostingsummary/getOtherChargesById', { costing_summary_id: id })
      .then((res) => {
        setFinanceChargesDetails(res.data.data);
        
        
      })
      .catch(() => {
        message('Costing Summary Data Not Found', 'info');
      });
  };

  //Api call for Insert transport charges Data
  const insertFinanceCharges= () => {
    if (financechargesinsertdetails.amount && financechargesinsertdetails.amount !=='') {
    api
      .post('/projecttabcostingsummary/insertOtherCharges', financechargesinsertdetails)
      .then((res) => {
        setFinanceChargesInsertDetails(res.data.data);
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
    getFinanceChargesById();
  }, [id]);

  return (
    <>
      <Modal size="md" isOpen={addFinanceChargesModal} > 
        <ModalHeader>
          Add Actual Charges
          <Button
            color="secondary"
            onClick={() => {
                setAddFinanceChargesModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <ModalHeader>Finance Charges </ModalHeader>
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
                      onChange={OfficeOverheadshandleInputs}
                      value={
                        financechargesinsertdetails && moment(financechargesinsertdetails.date).format('YYYY-MM-DD')
                      }
                    />
                  </td>
                  <td data-label="Amount">
                    <Input
                      type="text"
                      name="amount"
                      onChange={OfficeOverheadshandleInputs}
                      value={
                        financechargesinsertdetails &&
                        financechargesinsertdetails.amount
                      } 
                    />
                  </td>
                  <td data-label="Description">
                    <Input
                      type="text"
                      name="description"
                      onChange={OfficeOverheadshandleInputs}
                      value={
                        financechargesinsertdetails && financechargesinsertdetails.description
                      }
                    />
                  </td>
                </tr>
                {financechargesdetails &&
                  financechargesdetails.map((e) => {
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
                insertFinanceCharges();
                setAddFinanceChargesModal(false);
                
            }}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            onClick={() => {
                setAddFinanceChargesModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default FinanceChargesModal;
