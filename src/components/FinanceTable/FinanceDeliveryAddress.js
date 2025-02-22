import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

export default function FinanceDeliveryAddress({ financeDetails, handleInputs }) {
  FinanceDeliveryAddress.propTypes = {
    financeDetails: PropTypes.object,
    handleInputs: PropTypes.func,
  };
  return (
    <Form>
      <FormGroup>
        <Row>
          <Col md="3">
            <FormGroup>
              <Label> Company Name </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={financeDetails && financeDetails.shipping_first_name}
                name="shipping_first_name"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label> Address 1 </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={financeDetails && financeDetails.shipping_address1}
                name="shipping_address1"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label> Address 2 </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={financeDetails && financeDetails.shipping_address2}
                name="shipping_address2"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label> Country </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={financeDetails && financeDetails.shipping_address_country}
                name="shipping_address_country"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label> Postal Code </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={financeDetails && financeDetails.shipping_address_po_code}
                name="shipping_address_po_code"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label> Delivery Date</Label>
              <Input
                type="date"
                onChange={handleInputs}
                value={financeDetails && financeDetails.delivery_date}
                name="delivery_date"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Delivery Terms </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={financeDetails && financeDetails.delivery_terms}
                name="delivery_terms"
              />
            </FormGroup>
          </Col>
        </Row>
      </FormGroup>
    </Form>
  );
}
