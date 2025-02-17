import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function KeyStaffAddress({ staffeditdetails, handleInputs, allCountries }) {
  KeyStaffAddress.propTypes = {
    staffeditdetails: PropTypes.any,
    handleInputs: PropTypes.func,
    allCountries: PropTypes.array,
  };
  return (
    <Form>
      <FormGroup>
        <ComponentCard title="Address">
          <Row>
            <Col md="6">
              <FormGroup>
                <Label>Street Address</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={staffeditdetails && staffeditdetails.address_street}
                  name="address_street"
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>Town/Suburb</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={staffeditdetails && staffeditdetails.address_town}
                  name="address_town"
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>State</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={staffeditdetails && staffeditdetails.address_state}
                  name="address_state"
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>Country</Label>
                <Input
                  type="select"
                  name="address_country"
                  onChange={handleInputs}
                  value={staffeditdetails && staffeditdetails.address_country}
                >
                  <option defaultValue="selected" >
                    Please Select
                  </option>
                  {allCountries &&
                    allCountries.map((country) => (
                      <option key={country.country_code} value={country.country_code}>{country.name}</option>
                    ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </ComponentCard>
      </FormGroup>
    </Form>
  );
}
