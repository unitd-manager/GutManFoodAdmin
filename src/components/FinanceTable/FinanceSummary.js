import React from 'react'
import PropTypes from 'prop-types'
import {  Col, Form, FormGroup, Input, Label, Row, } from 'reactstrap';


export default function FinanceSummary({invoicesummary,receiptsummary,invoiceitemsummary  }) {
  FinanceSummary.propTypes = {
    invoicesummary: PropTypes.any,
    receiptsummary: PropTypes.any,
    invoiceitemsummary: PropTypes.any,

      }

  return (
    
    <Form>
<div className="MainDiv">
  <div className="container">
       <Row>
          <Col md="4">
            <FormGroup>
              <Label>Total Order Amount</Label>{' '}
              <Input type="text" name="orderamount" value={invoiceitemsummary && invoiceitemsummary.TotalCost} disabled></Input>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label>Total GST Amount</Label>
              {' '}
              <Input type="text" name="gstamount" value={invoiceitemsummary && invoiceitemsummary.total_gst_value} disabled></Input>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label>Total Invoice raised</Label>
              {' '}
              <Input type="text" name="invoiceRaised" value={invoicesummary && invoicesummary.orderamount} disabled></Input>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label>Amount Paid</Label>
              {' '}
              <Input type="text" name="paidAmount" value={receiptsummary && receiptsummary.paidAmount} disabled></Input>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label>Outstanding Invoice</Label>
              {' '}
              <Input type="text" name="outstandingInvoice" value={receiptsummary && receiptsummary.outstandingInvoiceAmount} disabled></Input>
            </FormGroup>
          </Col>
          {/* <Col md="4">
            <FormGroup>
              <Label>Overall Balance</Label>
              {' '}
              <Input type="text" name="balance" value={receiptsummary && receiptsummary.balance} disabled></Input>
            </FormGroup>
          </Col> */}
          </Row>
  </div>
</div>
</Form>       
 
  )
}
