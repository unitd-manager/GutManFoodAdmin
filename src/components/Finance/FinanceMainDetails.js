import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input, } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';


export default function FinanceMainDetails({ financeDetails , handleInputs,}) {
  FinanceMainDetails.propTypes = {
    financeDetails: PropTypes.object,
    handleInputs: PropTypes.func,
  };
  return (
    <Form>
        <FormGroup>
          <ComponentCard title="Main Details">
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Order Id </Label>
                  <br />
                  <span>{financeDetails && financeDetails.order_id} </span>
                </FormGroup>
              </Col>
              
              <Col md="3">
                <FormGroup>
                  <Label>Payment Method </Label>
                  <br />
                  <span>{financeDetails && financeDetails.payment_method} </span>
                </FormGroup>
              </Col>
            <Col md="3">
                <FormGroup>
                  <Label>Order Date</Label>
                  <br />
                  <span>
                    {financeDetails && financeDetails.order_date}
                  </span>
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label>Delivery Date</Label>
                  <br />
                  <span>
                    {financeDetails && financeDetails.delivery_date}
                  </span>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Amount</Label>
                  <br />
                  <span>{financeDetails && financeDetails.amount}</span>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Status</Label>
                  <br />
                  <span>{financeDetails && financeDetails.order_status}</span>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Published</Label>
                  <br></br>
                  <Label>Yes</Label>
                  <Input
                    name="published"
                    value="1"
                    type="radio"
                    defaultChecked={financeDetails && financeDetails.published === 1 && true}
                    onChange={handleInputs}
                  />
                  <Label>No</Label>
                  <Input
                    name="published"
                    value="0"
                    type="radio"
                    defaultChecked={financeDetails && financeDetails.published === 0 && true}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
             </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
 );
}