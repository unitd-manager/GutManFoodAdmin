import React from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

const CreateReceipt = ({ invoiceData, handleInputs }) => {
  CreateReceipt.propTypes = {
    invoiceData: PropTypes.object,
    handleInputs: PropTypes.func,
  };
  return (
    <>
      <Col md="4">
        <FormGroup>
          <Label>Invoice Code</Label>
          <Input
            type="text"
            value={invoiceData && invoiceData.invoice_code}
            onChange={handleInputs}
            name="invoice_code"
            disabled
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Discount</Label>
          <Input
            type="text"
            //value={invoiceData && invoiceData.discount}
            value={(invoiceData && invoiceData.discount) || 0}
            onChange={handleInputs}
            name="discount"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Quote Code</Label>
          <Input
            type="text"
            value={invoiceData && invoiceData.quote_code}
            onChange={handleInputs}
            name="quote_code"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>PO Number</Label>
          <Input
            type="text"
            value={invoiceData && invoiceData.po_number}
            onChange={handleInputs}
            name="po_number"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Project Location</Label>
          <Input
            type="text"
            value={invoiceData && invoiceData.project_location}
            onChange={handleInputs}
            name="project_location"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Project Reference</Label>
          <Input
            type="text"
            value={invoiceData && invoiceData.project_reference}
            onChange={handleInputs}
            name="project_reference"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Invoice date</Label>
          <Input
            type="date"
            value={moment(invoiceData && invoiceData.invoice_date).format(
              'YYYY-MM-DD',
            )}
            onChange={handleInputs}
            name="invoice_date"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label> Job Code</Label>
          <Input
            type="text"
            onChange={handleInputs}
            value={invoiceData && invoiceData.job_code}
            name="job_code"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Revision</Label>
          <Input
            type="text"
            onChange={handleInputs}
            value={invoiceData && invoiceData.revision}
            name="revision"
          />
        </FormGroup>
      </Col>

      <Col md="4">
        <FormGroup>
          <Label>Site Code</Label>
          <Input
            type="text"
            value={invoiceData && invoiceData.site_code}
            onChange={handleInputs}
            name="site_code"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Attention</Label>
          <Input
            type="text"
            value={invoiceData && invoiceData.attention}
            onChange={handleInputs}
            name="attention"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Reference</Label>
          <Input
            type="textarea"
            value={invoiceData && invoiceData.reference}
            onChange={handleInputs}
            name="reference"
          />
        </FormGroup>
      </Col>
      <Col md="6">
        <FormGroup>
          <Label>Invoice Terms</Label>
          <Input
            type="text"
            value={invoiceData && invoiceData.invoice_terms}
            onChange={handleInputs}
            name="invoice_terms"
          />
        </FormGroup>
      </Col>
      <Col md="6">
        <FormGroup>
          <Label>Payment Terms</Label>
          <Input
            type="textarea"
            value={invoiceData && invoiceData.payment_terms}
            onChange={handleInputs}
            name="payment_terms"
          />
        </FormGroup>
      </Col>
    </>
  );
};

export default CreateReceipt;
