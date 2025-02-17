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
import PropTypes from 'prop-types';
import moment from 'moment';
import api from '../../constants/api';
import message from '../Message';

//VehicleInsuranceModal From VehicleEdit
const VehicleInsuranceModal = ({ vehicleservicemodal, setVehicleServiceModal }) => {
  VehicleInsuranceModal.propTypes = {
    vehicleservicemodal: PropTypes.bool,
    setVehicleServiceModal: PropTypes.func,
  };

  // All State Variable
  const { id } = useParams();
  const [vehicleservicegetdetails, setVehicleServiceGetDetails] = useState();
  const [vehicleserviceinsertdetails, setVehicleServiceInsertDetails] = useState({
    vehicle_id: id,
    date: new Date().toISOString().slice(0,10),
  });

  //Setting Data in Vehicle Fuel
  const vehicleInsurancehandleInputs = (e) => {
    setVehicleServiceInsertDetails({
      ...vehicleserviceinsertdetails,
      [e.target.name]: e.target.value,
    });
  };

  //Api call for getting Vehicle Service Data By ID
  const getVehicleServiceDataById = () => {
    api
      .post('/vehicle/getVehicleServiceDataById', { vehicle_id: id })
      .then((res) => {
        setVehicleServiceGetDetails(res.data.data);
      })
      .catch(() => {
        message('Vehicle Service Data Not Found', 'info');
      });
  };

  //Api call for Insert Vehicle Service Data
  const insertVehicleServiceData = () => {
    if (vehicleserviceinsertdetails.amount && vehicleserviceinsertdetails.amount !=='') {
      api
        .post('/vehicle/insertVehicleServiceData', vehicleserviceinsertdetails)
        .then((res) => {
          setVehicleServiceInsertDetails(res.data.data);
          message('Vehicle Fuel Data Inserted Successfully', 'success');
        })
        .catch(() => {
          message('Vehicle Fuel Data Not Found', 'info');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  // useEffect for Vehicle Service
  useEffect(() => {
    getVehicleServiceDataById();
  }, [id]);

  return (
    <>
      <Modal size="md" isOpen={vehicleservicemodal}>
        <ModalHeader>
          Add Service
          <Button
            color="secondary"
            onClick={() => {
              setVehicleServiceModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <ModalHeader>Service</ModalHeader>
          <FormGroup>
            <Table bordered className="lineitem">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Amount<span className='required'> *</span> </th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Date">
                    <Input
                      type="date"
                      name="date"
                      onChange={vehicleInsurancehandleInputs}
                      value={
                        vehicleserviceinsertdetails &&
                        moment(vehicleserviceinsertdetails.date).format('YYYY-MM-DD')
                      }
                    />
                  </td>
                  <td data-label="Amount">
                    <Input
                      type="text"
                      name="amount"
                      onChange={vehicleInsurancehandleInputs}
                      value={vehicleserviceinsertdetails && vehicleserviceinsertdetails.amount}
                    />
                  </td>
                  <td data-label="Description">
                    <Input
                      type="textarea"
                      name="description"
                      onChange={vehicleInsurancehandleInputs}
                      value={vehicleserviceinsertdetails && vehicleserviceinsertdetails.description}
                    />
                  </td>
                </tr>
                {vehicleservicegetdetails &&
                  vehicleservicegetdetails.map((e) => {
                    return (
                      <tr key={e.vehicle_id}>
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
            color="primary"
            type="button"
            onClick={() => {
              insertVehicleServiceData();
              setVehicleServiceModal(false);
            }}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setVehicleServiceModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {/* END Add Line Item Modal */}
    </>
  );
};

export default VehicleInsuranceModal;
