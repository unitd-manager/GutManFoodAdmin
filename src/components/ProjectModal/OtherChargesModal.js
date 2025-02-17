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
const OtherChargesModal = ({ addOtherChargesModal, setAddOtherChargesModal,otherchargesdetails }) => {
    OtherChargesModal.propTypes = {
        addOtherChargesModal: PropTypes.bool,
        setAddOtherChargesModal: PropTypes.func,
        otherchargesdetails:PropTypes.func
  };

  // All State Variable
  const { id } = useParams();
  //const [otherchargesdetails, setOtherChargesDetails] = useState();
  //const [gTotal, setGtotal] = useState(0);
  const [otherchargesinsertdetails, setOtherChargesInsertDetails] = useState({
    costing_summary_id: id,
    date: new Date().toISOString().slice(0,10)
  });

  //Setting Data in Vehicle Fuel
  const OtherChargeshandleInputs = (e) => {
    setOtherChargesInsertDetails({
      ...otherchargesinsertdetails,
      [e.target.name]: e.target.value,
    });
  };

  //Api call for getting Vehicle Fuel Data By ID
  // const getTransportChargesById = () => {
  //   api
  //     .post('/projecttabcostingsummary/getOtherChargesById', { costing_summary_id: id })
  //     .then((res) => {
  //       setOtherChargesDetails(res.data.data);
  //       let grandTotal = 0;
        
  //       res.data.data.forEach((elem) => {
  //         grandTotal += elem.po_value;
  //       });
  //       setGtotal(grandTotal);
        
  //     })
  //     .catch(() => {
  //       message('Costing Summary Data Not Found', 'info');
  //     });
  // };

  //Api call for Insert transport charges Data
  const insertTransportCharges= () => {
    if (otherchargesinsertdetails.amount && otherchargesinsertdetails.amount !=='') {
    api
      .post('/projecttabcostingsummary/insertOtherCharges', otherchargesinsertdetails)
      .then((res) => {
        setOtherChargesInsertDetails(res.data.data);
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
    //getTransportChargesById();
  }, [id]);

  return (
    <>
      <Modal size="md" isOpen={addOtherChargesModal} > 
        <ModalHeader>
          Add Transport Charges
          <Button
            color="secondary"
            onClick={() => {
                setAddOtherChargesModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <ModalHeader>Other Charges Modal</ModalHeader>
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
                      onChange={OtherChargeshandleInputs}
                      value={
                        otherchargesinsertdetails && moment(otherchargesinsertdetails.date).format('YYYY-MM-DD')
                      }
                    />
                  </td>
                  <td data-label="Amount">
                    <Input
                      type="text"
                      name="amount"
                      onChange={OtherChargeshandleInputs}
                      value={
                        otherchargesinsertdetails &&
                        otherchargesinsertdetails.amount
                      } 
                    />
                  </td>
                  <td data-label="Description">
                    <Input
                      type="text"
                      name="description"
                      onChange={OtherChargeshandleInputs}
                      value={
                        otherchargesinsertdetails && otherchargesinsertdetails.description
                      }
                    />
                  </td>
                </tr>
                {otherchargesdetails &&
                  otherchargesdetails.map((e) => {
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
                setAddOtherChargesModal(false);
                
            }}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            onClick={() => {
                setAddOtherChargesModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default OtherChargesModal;
