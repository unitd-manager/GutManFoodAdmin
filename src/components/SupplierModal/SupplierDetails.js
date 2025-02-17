import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function SupplierDetails({  handleInputs ,supplier ,allCountries , supplierStatus , status , setEditPurchaseOrderLinked}) {
  SupplierDetails.propTypes = {
    handleInputs: PropTypes.func,
    supplier: PropTypes.object,
    allCountries: PropTypes.object,
    supplierStatus: PropTypes.object,
    status: PropTypes.object,
    setEditPurchaseOrderLinked: PropTypes.bool


  };

  return (
    <Form>
    <FormGroup>
  <ComponentCard title="Supplier Details">
    <Row>
      <Col md="4">
        <FormGroup>
          <Label>
            Name <span className="required"> *</span>
          </Label>
          <Input
            type="text"
            onChange={handleInputs}
            value={supplier && supplier.company_name}
            name="company_name"/>
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="text"
            onChange={handleInputs}
            value={supplier && supplier.email}
            name="email" />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Fax</Label>
          <Input
            type="text"
            onChange={handleInputs}
            value={supplier && supplier.fax}
            name="fax"  />
        </FormGroup>
      </Col>
      </Row>
      <Row>
      <Col md="4">
        <FormGroup>
          <Label>Mobile</Label>
          <Input
            type="text"
            onChange={handleInputs}
            value={supplier && supplier.mobile}
            name="mobile"  />
        </FormGroup>
      </Col>
      <Col md="4">
      <FormGroup>
        <Label>Status</Label>
        <Input
          type="select"
          name="status"
          onChange={handleInputs}
          value={supplier && supplier.status}
        >
          <option defaultValue="selected">
            Please Select
          </option>
          <option value="current">Current</option>
            <option value="old">Old</option>
          {supplierStatus &&
            supplierStatus.map((ele) => {
              return <option value={ele.value}>{ele.value}</option>;
            })}
        </Input>
      </FormGroup>
    </Col>
      <Col md="4">
        <FormGroup>
          <Label>GST NO</Label>
          <Input
            type="text"
            onChange={handleInputs}
            value={supplier && supplier.gst_no}
            name="gst_no"  />
        </FormGroup>
      </Col>
      </Row>
      <Row>
      <Col md="4">
        <FormGroup>
          <Label>Payment Details</Label>
          <Input
            type="text"
            onChange={handleInputs}
            value={supplier && supplier.payment_details}
            name="payment_details" />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Terms</Label>
          <Input
            type="text"
            onChange={handleInputs}
            value={supplier && supplier.terms}
            name="terms" />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Contact Person</Label>
          <Input
            type="text"
            onChange={handleInputs}
            value={supplier && supplier.contact_person}
            name="contact_person"  />
        </FormGroup>
      </Col>
    </Row>
  </ComponentCard>
</FormGroup>
<FormGroup>
  <ComponentCard title="Address">
    <Row>
      <Col md="4">
        <FormGroup>
          <Label>
            Address 1 
          </Label>
          <Input
            type="text"
            onChange={handleInputs}
            value={supplier && supplier.address_flat}
            name="address_flat"  />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Address 2</Label>
          <Input
            type="text"
            onChange={handleInputs}
            value={supplier && supplier.address_street}
            name="address_street"  />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>State/Zip</Label>
          <Input
            type="text"
            onChange={handleInputs}
            value={supplier && supplier.address_state}
            name="address_state" />
        </FormGroup>
      </Col>
      </Row>
      <Row>
      <Col md="4">
        <FormGroup>
        <Label>Country</Label>
          <Input
            type="select"
            name="address_country"
            onChange={handleInputs}
            value={supplier && supplier.address_country}>
            <option defaultValue="selected">
              Please Select
            </option>
            {allCountries && allCountries.map(country=>(<option value={country.country_code}>{country.name}</option>))}
  </Input>
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Pin Code</Label>
          <Input
            type="text"
            onChange={handleInputs}
            value={supplier && supplier.address_po_code}
            name="address_po_code"  />
        </FormGroup>
      </Col>
    </Row>
   {status &&(status.payment_status === 'Due' ||status.payment_status === 'Partially Paid' ||status.payment_status === 'Paid') &&(
   <Row>
      <div className="pt-3 mt-3 d-flex align-items-center gap-2">
        <Button className='shadow-none'
          onClick={() => {
            setEditPurchaseOrderLinked(true);
          }}
          color="primary" >
          Make Supplier Payment
        </Button>
      </div>
    </Row>
)}
  </ComponentCard>
</FormGroup>
</Form>

  );
}
