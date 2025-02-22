import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ComponentCard from '../ComponentCard';

export default function FinanceMainDetails({ financeDetails, handleInputs }) {
  FinanceMainDetails.propTypes = {
    financeDetails: PropTypes.object,
    handleInputs: PropTypes.func,
  };

  return (
    <Form>
      <FormGroup>
        <ComponentCard title="Main Details" creationModificationDate={financeDetails}>
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
                <Label>Project code </Label>
                <br />
                <td>
                  {' '}
                  <Link to={`/ProjectEdit/${financeDetails && financeDetails.project_id}?tab=9`}>
                    {financeDetails && financeDetails.project_code}
                  </Link>
                </td>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Project Category </Label>
                <br />
                <span>{financeDetails && financeDetails.category}</span>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Order Date</Label>
                <br />
                {financeDetails && financeDetails.order_date
                  ? moment(financeDetails.order_date).format('DD-MM-YYYY')
                  : ''}
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Amount</Label>
                <br />
                <span>{financeDetails && financeDetails.orderamount}</span>
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
                <Label>Terms </Label>
                <br />
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={financeDetails && financeDetails.invoice_terms}
                  name="invoice_terms"
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Notes</Label>
                <br />
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={financeDetails && financeDetails.notes}
                  name="notes"
                />
              </FormGroup>
            </Col>
          </Row>
        </ComponentCard>
      </FormGroup>
    </Form>
  );
}