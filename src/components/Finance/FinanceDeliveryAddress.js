import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

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
                  <Label> Shipping Name </Label>
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
                    value={financeDetails && financeDetails.shipping_address_country_code}
                    name="shipping_address_country_code"
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
                    value={financeDetails && moment(
                      financeDetails.delivery_date && financeDetails.delivery_date,
                    ).format('YYYY-MM-DD')}
                    name="delivery_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Delivery status</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={financeDetails && financeDetails.delivery_status}
                    name="delivery_status"
                  >
                    <option defaultValue="selected"> Please Select </option>
                    <option value="Order placed">Order placed</option>
                    <option value="Shipping">Shipping</option>
                    <option value="Delivered">Delivered</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
        </FormGroup>
  </Form>
 );
}