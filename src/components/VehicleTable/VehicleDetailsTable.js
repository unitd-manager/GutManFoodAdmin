import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

//VehicleDetails From VehicleEdit
export default function VehicleDetails({
  vehicleeditdetails,
  vehiclehandleInputs,
  setVehicleFuelModal,
  setVehicleInsuranceModal,
  setVehicleServiceModal,
}) {
  VehicleDetails.propTypes = {
    vehiclehandleInputs: PropTypes.func,
    vehicleeditdetails: PropTypes.object,
    setVehicleFuelModal: PropTypes.func,
    setVehicleInsuranceModal: PropTypes.func,
    setVehicleServiceModal: PropTypes.func,
  };
  return (
    <Form>
      <FormGroup>
        <ComponentCard title="Vehicle Details"
          creationModificationDate={vehicleeditdetails}
          >
          <Row>
            <Col md="3">
              <FormGroup>
                <Label>Vehicle No</Label>
                <Input
                  type="text"
                  onChange={vehiclehandleInputs}
                  value={vehicleeditdetails && vehicleeditdetails.vehicle_no}
                  name="vehicle_no"
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Year Of Purchase</Label>
                <Input
                  type="text"
                  onChange={vehiclehandleInputs}
                  value={vehicleeditdetails && vehicleeditdetails.year_of_purchase}
                  name="year_of_purchase"
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Model</Label>
                <Input
                  type="text"
                  onChange={vehiclehandleInputs}
                  value={vehicleeditdetails && vehicleeditdetails.model}
                  name="model"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="3">
              <FormGroup>
                <Label>
                  Fuel{' '}
                  <Link to="" color="primary">
                    <span
                      onClick={() => {
                        setVehicleFuelModal(true);
                      }}
                    >
                      <b>
                        <u>Add</u>
                      </b>
                    </span>
                  </Link>
                </Label>
                <br />
                <span>{vehicleeditdetails && vehicleeditdetails.fuel_amount}</span>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>
                  Insurance
                  <Link to="" color="primary">
                    <span
                      onClick={() => {
                        setVehicleInsuranceModal(true);
                      }}
                    >
                      <b>
                        <u>Add</u>
                      </b>
                    </span>
                  </Link>
                </Label>
                <br />
                <span>{vehicleeditdetails && vehicleeditdetails.vehicle_renewal_date}</span>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>
                  Service
                  <Link to="" color="primary">
                    <span
                      onClick={() => {
                        setVehicleServiceModal(true);
                      }}
                    >
                      <b>
                        <u>Add</u>
                      </b>
                    </span>
                  </Link>
                </Label>
                <br />
                <span>{vehicleeditdetails && vehicleeditdetails.service_amount}</span>
              </FormGroup>
            </Col>
          </Row>
        </ComponentCard>
      </FormGroup>
    </Form>
  );
}
