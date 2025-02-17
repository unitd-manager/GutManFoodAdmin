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
const VehicleFuelModal = ({ vehiclefuelmodal, setVehicleFuelModal }) => {
  VehicleFuelModal.propTypes = {
    vehiclefuelmodal: PropTypes.bool,
    setVehicleFuelModal: PropTypes.func,
  };

  // All State Variable
  const { id } = useParams();
  const [vehiclefuelgetdetails, setVehicleFuelGetDetails] = useState();
  const [vehiclefuelinsertdetails, setVehicleFuelInsertDetails] = useState({
    vehicle_id: id,
    date: new Date().toISOString().slice(0,10)
  });

  //Setting Data in Vehicle Fuel
  const vehicleFuelhandleInputs = (e) => {
    setVehicleFuelInsertDetails({
      ...vehiclefuelinsertdetails,
      [e.target.name]: e.target.value,
    });
  };

  //Api call for getting Vehicle Fuel Data By ID
  const getVehicleFuelDataById = () => {
    api
      .post('/vehicle/getVehicleFuelDataById', { vehicle_id: id })
      .then((res) => {
        setVehicleFuelGetDetails(res.data.data);
      })
      .catch(() => {
        message('Vehicle Fuel Data Not Found', 'info');
      });
  };

  //Api call for Insert Vehicle Full Data
  const insertVehicleFuelData = () => {
    if (vehiclefuelinsertdetails.amount && vehiclefuelinsertdetails.amount !=='') {
    api
      .post('/vehicle/insertVehicleFuelData', vehiclefuelinsertdetails)
      .then((res) => {
        setVehicleFuelInsertDetails(res.data.data);
        message('Vehicle Fuel Data Inserted Successfully', 'success');
      })
      .catch(() => {
        message('Vehicle Fuel Data Not Found', 'info');
      });
    }
    else {
      message('Please fill all required fields', 'warning');
    }
  };

  // useEffect for Vehicle Fuel
  useEffect(() => {
    getVehicleFuelDataById();
  }, [id]);

  return (
    <>
      <Modal size="md" isOpen={vehiclefuelmodal}> 
        <ModalHeader>
          Add Fuel
          <Button
            color="secondary"
            onClick={() => {
              setVehicleFuelModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <ModalHeader>Fuel</ModalHeader>
          <FormGroup>
            <Table bordered className="lineitem">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Amount<span className='required'> *</span></th>
                  <th scope="col">Liters</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Date">
                    <Input
                      type="date"
                      name="date"
                      onChange={vehicleFuelhandleInputs}
                      value={
                        vehiclefuelinsertdetails && moment(vehiclefuelinsertdetails.date).format('YYYY-MM-DD')
                      }
                    />
                  </td>
                  <td data-label="Amount">
                    <Input
                      type="text"
                      name="amount"
                      onChange={vehicleFuelhandleInputs}
                      value={
                        vehiclefuelinsertdetails &&
                        vehiclefuelinsertdetails.amount
                      } 
                    />
                  </td>
                  <td data-label="Liters">
                    <Input
                      type="text"
                      name="liters"
                      onChange={vehicleFuelhandleInputs}
                      value={
                        vehiclefuelinsertdetails && vehiclefuelinsertdetails.liters
                      }
                    />
                  </td>
                </tr>
                {vehiclefuelgetdetails &&
                  vehiclefuelgetdetails.map((e) => {
                    return (
                      <tr key={e.vehicle_id}>
                        <td data-label="Date">{e.date}</td>
                        <td data-label="Amount">{e.amount}</td>
                        <td data-label="Liters">{e.liters}</td>
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
              insertVehicleFuelData();
              setVehicleFuelModal(false);
            }}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setVehicleFuelModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default VehicleFuelModal;
