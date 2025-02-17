import React from 'react'
import { Row, Col, Form, FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types'

export default function CustomerDetail({financeDetails}) {
    CustomerDetail.propTypes = {
        financeDetails: PropTypes.any
      }
  return (
    <Form >
        <FormGroup>
            <Row>
              <Col md="4" sm="12">
                <FormGroup>
                  <Label>Customer Name</Label><br />
                  {financeDetails && financeDetails.cust_first_name}
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup>
                  <Label> Address 1 </Label>
                  <br />
                  <span>{financeDetails && financeDetails.cust_address1}</span>
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup>
                  <Label> Address 2 </Label>
                  <br />
                  <span>{financeDetails && financeDetails.cust_address2}</span>
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup>
                  <Label> Country </Label>
                  <br />
                  <span>{financeDetails && financeDetails.cust_address_country}</span>
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup>
                  <Label> Postal Code</Label>
                  <br />
                  <span>{financeDetails && financeDetails.cust_address_po_code}</span>
                </FormGroup>
              </Col>
            </Row>
     
        </FormGroup>
      </Form>
  )
}
