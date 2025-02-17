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
const OfficeOverheadsModal = ({ addOfficeOverheadsModal, setAddOfficeOverheadsModal }) => {
    OfficeOverheadsModal.propTypes = {
        addOfficeOverheadsModal: PropTypes.bool,
        setAddOfficeOverheadsModal: PropTypes.func,
        
  };

  // All State Variable
  const { id } = useParams();
  const [officeoverheadsdetails, setOfficeOverheadsDetails] = useState();
  //const [gTotal, setGtotal] = useState(0);
  const [officeoverheadsinsertdetails, setOfficeOverheadsInsertDetails] = useState({
    costing_summary_id: id,
    date: new Date().toISOString().slice(0,10)
  });

  //Setting Data in Vehicle Fuel
  const OfficeOverheadshandleInputs = (e) => {
    officeoverheadsinsertdetails({
      ...officeoverheadsinsertdetails,
      [e.target.name]: e.target.value,
    });
  };

  //Api call for getting Vehicle Fuel Data By ID
  const getOfficeOverheadsById = () => {
    api
      .post('/projecttabcostingsummary/getOtherChargesById', { costing_summary_id: id })
      .then((res) => {
        setOfficeOverheadsDetails(res.data.data);
        
        
      })
      .catch(() => {
        message('Costing Summary Data Not Found', 'info');
      });
  };

  //Api call for Insert transport charges Data
  const insertOfficeOverheads = () => {
    if (officeoverheadsinsertdetails.amount && officeoverheadsinsertdetails.amount !=='') {
    api
      .post('/projecttabcostingsummary/insertOtherCharges', officeoverheadsinsertdetails)
      .then((res) => {
        setOfficeOverheadsInsertDetails(res.data.data);
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
    getOfficeOverheadsById();
  }, [id]);

  return (
    <>
      <Modal size="md" isOpen={addOfficeOverheadsModal} > 
        <ModalHeader>
          Add Actual Charges
          <Button
            color="secondary"
            onClick={() => {
                setAddOfficeOverheadsModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <ModalHeader>Office Overheads</ModalHeader>
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
                        officeoverheadsinsertdetails && moment(officeoverheadsinsertdetails.date).format('YYYY-MM-DD')
                      }
                    />
                  </td>
                  <td data-label="Amount">
                    <Input
                      type="text"
                      name="amount"
                      onChange={OfficeOverheadshandleInputs}
                      value={
                        officeoverheadsinsertdetails &&
                        officeoverheadsinsertdetails.amount
                      } 
                    />
                  </td>
                  <td data-label="Description">
                    <Input
                      type="text"
                      name="description"
                      onChange={OfficeOverheadshandleInputs}
                      value={
                        officeoverheadsinsertdetails && officeoverheadsinsertdetails.description
                      }
                    />
                  </td>
                </tr>
                {officeoverheadsdetails &&
                  officeoverheadsdetails.map((e) => {
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
                insertOfficeOverheads();
                setAddOfficeOverheadsModal(false);
                
            }}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            onClick={() => {
                setAddOfficeOverheadsModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default OfficeOverheadsModal;
