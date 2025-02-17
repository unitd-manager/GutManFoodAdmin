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

//VehicleInsuranceModal From VehicleEdit
const VehicleInsuranceModal = ({ vehicleinsurancemodal, setVehicleInsuranceModal }) => {
  VehicleInsuranceModal.propTypes = {
    vehicleinsurancemodal: PropTypes.bool,
    setVehicleInsuranceModal: PropTypes.func,
  };

  // All State Variable
  const { id } = useParams();
  const [vehicleinsurancegetdetails, setVehicleInsuranceGetDetails] = useState();
  const [vehicleinsuranceinsertdetails, setVehicleInsuranceInsertDetails] = useState({
    vehicle_id: id,
    insurance_date: new Date().toISOString().slice(0,10),
    renewal_date: new Date().toISOString().slice(0,10),
    insurance_amount: '',
  });

  //Setting Data in Vehicle Insurance
  const vehicleInsurancehandleInputs = (e) => {
    setVehicleInsuranceInsertDetails({
      ...vehicleinsuranceinsertdetails,
      [e.target.name]: e.target.value,
    });
  };

  //Api call for getting Vehicle Insurance Data By ID
  const getVehicleInsuranceDataById = () => {
    api
      .post('/vehicle/getVehicleInsuranceDataById', { vehicle_id: id })
      .then((res) => {
        setVehicleInsuranceGetDetails(res.data.data);
      })
      .catch(() => {
        message('Vehicle Data Not Found', 'info');
      });
  };

  //Api call for Insert Vehicle Insurance Data
  const insertVehicleInsuranceData = () => {
    if (vehicleinsuranceinsertdetails.insurance_amount && vehicleinsuranceinsertdetails.insurance_amount !=='') {
      api
        .post('/vehicle/insertVehicleInsuranceData', vehicleinsuranceinsertdetails)
        .then((res) => {
          setVehicleInsuranceInsertDetails(res.data.data);
          message('Vehicle Insurance Data Inserted Successfully', 'success');
        })
        .catch(() => {
          message('VehicleFuel Data Not Found', 'info');
        });
    }
    else {
      message('Please fill all required fields', 'warning');
    }
  };

  // useEffect for Vehicle Insurance
  useEffect(() => {
    getVehicleInsuranceDataById();
  }, [id]);

  return (
    <>
      <Modal size="md" isOpen={vehicleinsurancemodal}>
        <ModalHeader>
          Add Insurance
          <Button
            color="secondary"
            onClick={() => {
              setVehicleInsuranceModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <ModalHeader>Insurance</ModalHeader>
          <FormGroup>
            <Table bordered className="lineitem">
              <thead>
                <tr>
                  <th scope="col">Insurance_Date</th>
                  <th scope="col">Amount<span className='required'> *</span> </th>
                  <th scope="col">Renewal_Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Insurance_Date">
                    <Input
                      type="date"
                      name="insurance_date"
                      onChange={vehicleInsurancehandleInputs}
                      value={
                        vehicleinsuranceinsertdetails && moment(vehicleinsuranceinsertdetails.insurance_date).format('YYYY-MM-DD')
                      }
                    />
                  </td>
                  <td data-label="Amount">
                    <Input
                      type="text"
                      name="insurance_amount"
                      onChange={vehicleInsurancehandleInputs}
                      value={
                        vehicleinsuranceinsertdetails &&
                        vehicleinsuranceinsertdetails.insurance_amount
                      }
                    />
                  </td>
                  <td data-label="Renewal_Date">
                    <Input
                      type="date"
                      name="renewal_date"
                      onChange={vehicleInsurancehandleInputs}
                      value={
                        vehicleinsuranceinsertdetails && moment(vehicleinsuranceinsertdetails.renewal_date).format('YYYY-MM-DD')
                      }
                    />
                  </td>
                </tr>
                {vehicleinsurancegetdetails &&
                  vehicleinsurancegetdetails.map((e) => {
                    return (
                      <tr key={e.vehicle_id}>
                        <td data-label="Insurance_Date">{e.insurance_date}</td>
                        <td data-label="Amount">{e.insurance_amount}</td>
                        <td data-label="Renewal_Date">{e.renewal_date}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            type="button"
            onClick={() => {
              insertVehicleInsuranceData();
              setVehicleInsuranceModal(false);
            }}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setVehicleInsuranceModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default VehicleInsuranceModal;
