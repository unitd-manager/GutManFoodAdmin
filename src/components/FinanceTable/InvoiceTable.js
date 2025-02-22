import React from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

const CreateReceipt = ({ createInvoice, handleInserts }) => {
  CreateReceipt.propTypes = {
    createInvoice: PropTypes.object,
    handleInserts: PropTypes.func,
  };
  return (
    <>
    <Col md="4">
        <FormGroup>
          <Label>Title</Label>
          <Input
            type="text"
            onChange={handleInserts}
            value={createInvoice && createInvoice.title}
            name="title"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Discount</Label>
          <Input
            type="number"
            onChange={handleInserts}
            value={createInvoice && createInvoice.discount}
            name="discount"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Quote Code</Label>
          <Input
            type="text"
            onChange={handleInserts}
            value={createInvoice && createInvoice.quote_code}
            name="quote_code"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>PO Number</Label>
          <Input
            type="text"
            onChange={handleInserts}
            value={createInvoice && createInvoice.po_number}
            name="po_number"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Project Location</Label>
          <Input
            type="text"
            onChange={handleInserts}
            value={createInvoice && createInvoice.project_location}
            name="project_location"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Project Reference</Label>
          <Input
            type="text"
            onChange={handleInserts}
            value={createInvoice && createInvoice.project_reference}
            name="project_reference"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Invoice date</Label>
          <Input
            type="date"
            onChange={handleInserts}
            value={createInvoice && createInvoice.invoice_date}
            name="invoice_date"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Code</Label>
          <Input
            type="text"
            onChange={handleInserts}
            value={createInvoice && createInvoice.job_code}
            name="job_code"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Revision</Label>
          <Input
            type="text"
            onChange={handleInserts}
            value={createInvoice && createInvoice.revision}
            name="revision"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Site Code</Label>
          <Input
            type="text"
            onChange={handleInserts}
            value={createInvoice && createInvoice.site_code}
            name="site_code"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Attention</Label>
          <Input
            type="text"
            onChange={handleInserts}
            value={createInvoice && createInvoice.attention}
            name="attention"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Reference</Label>
          <Input
            type="textarea"
            onChange={handleInserts}
            value={createInvoice && createInvoice.reference}
            name="reference"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Invoice Terms</Label>
          <Input
            type="text"
            onChange={handleInserts}
            value={createInvoice && createInvoice.invoice_terms}
            name="invoice_terms"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Supply To</Label>
          <Input
            type="text"
            onChange={handleInserts}
            value={createInvoice && createInvoice.supply_to}
            name="supply_to"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>PO Date</Label>
          <Input
            type="date"
            onChange={handleInserts}
            value={createInvoice && createInvoice.po_date}
            name="po_date"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label> For and Behalf of </Label>
          <Input
            type="text"
            onChange={handleInserts}
            value={createInvoice && createInvoice.for_and_behalf_of}
            name="for_and_behalf_of"
          />
        </FormGroup>
      </Col>
      <Col md="8">
        <FormGroup>
          <Label>Payment Terms</Label>
          <Input
            type="textarea"
            onChange={handleInserts}
            value={createInvoice && createInvoice.payment_terms}
            name="payment_terms"
          />
        </FormGroup>
      </Col>
      
      
    </>
  );
};

export default CreateReceipt;
