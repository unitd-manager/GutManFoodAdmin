import React from 'react';
import { Row, Col, Input, Form, FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import ComponentCard from '../ComponentCard';
 
function PurchaseOrderDetailsPart({ purchaseDetails, handleInputs, supplier }) {
  PurchaseOrderDetailsPart.propTypes = {
    purchaseDetails: PropTypes.object,
    handleInputs: PropTypes.func,
    supplier: PropTypes.array,
  };
  return (
    <div>
      <Form>
        <FormGroup>
          <ComponentCard
            title="PurchaseOrder Details"
            
            creationModificationDate={purchaseDetails}
            
          >
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Po Code</Label>
                  <br></br>
                  <span>{purchaseDetails && purchaseDetails.po_code}</span>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Title</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={purchaseDetails && purchaseDetails.title}
                    name="title"
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Status</Label>
                  <Input
                    type="select"
                    value={purchaseDetails && purchaseDetails.status}
                    name="status"
                    onChange={handleInputs}
                  >
                    <option defaultValue="selected">Please Select</option>
                    <option value="in progress">in progress</option>
                    <option value="sent to supplier">sent to supplier</option>
                    <option value="order acknowledged">order acknowledged</option>
                    <option value="partially received">partially received</option>
                    <option value="closed">closed</option>
                    <option value="on hold">on hold</option>
                    <option value="cancelled">cancelled</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Supplier Name</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={purchaseDetails && purchaseDetails.supplier_id}
                    name="supplier_id"
                  >
                    <option defaultValue="selected">Please Select</option>
                    {supplier &&
                      supplier.map((e) => {
                        return (
                          <option key={e.supplier_id} value={e.supplier_id}>
                            {e.company_name}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Priority</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    name='priority'
                    value={purchaseDetails && purchaseDetails.priority}
                  >
                    <option defaultValue="selected">Please Select</option>
                    <option value="priority 1">priority 1</option>
                    <option value="priority 2">priority 2</option>
                    <option value="priority 3">priority 3</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>PO Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={
                      purchaseDetails &&
                      moment(purchaseDetails.purchase_order_date).format('YYYY-MM-DD')
                    }
                    name="purchase_order_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Follow Up Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={
                      purchaseDetails && moment(purchaseDetails.follow_up_date).format('YYYY-MM-DD')
                    }
                    name="follow_up_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Delivery Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={
                      purchaseDetails && moment(purchaseDetails.delivery_date).format('YYYY-MM-DD')
                    }
                    name="delivery_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Yr Quote Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={
                      purchaseDetails && moment(purchaseDetails.yr_quote_date).format('YYYY-MM-DD')
                    }
                    name="yr_quote_date"
                  />
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label>Notes To Supplier</Label>
                  <Input
                    type="textarea"
                    value={purchaseDetails && purchaseDetails.notes}
                    name="notes"
                    onChange={handleInputs}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Delivery Terms</Label>
                  <Input
                    type="textarea"
                    value={purchaseDetails && purchaseDetails.delivery_terms}
                    name="delivery_terms"
                    onChange={handleInputs}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Payment Terms</Label>
                  <Input
                    type="textarea"
                    value={purchaseDetails && purchaseDetails.payment_terms}
                    name="payment_terms"
                    onChange={handleInputs}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Payment Status</Label>
                  <Input
                    type="select"
                    value={purchaseDetails && purchaseDetails.payment_status}
                    name="payment_status"
                    onChange={handleInputs}
                  >
                    <option value=""> Please Select</option>
                    <option value="Due">Due</option>
                    <option value="Partially Paid">Partially Paid</option>
                    <option value="Paid">Paid</option>
                    <option value="Cancelled">Cancelled</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>supplier Invoice Code</Label>
                  <Input
                    type="text"
                    value={purchaseDetails && purchaseDetails.supplier_inv_code}
                    name="supplier_inv_code"
                    onChange={handleInputs}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Yr Ref No</Label>
                  <Input
                    type="text"
                    value={purchaseDetails && purchaseDetails.supplier_reference_no}
                    name="supplier_reference_no"
                    onChange={handleInputs}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Item</Label>
                  <Input
                    type="textArea"
                    value={purchaseDetails && purchaseDetails.purchase_item}
                    name="purchase_item"
                    onChange={handleInputs}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Currency</Label>
                  <Input
                    type="text"
                    value={purchaseDetails && purchaseDetails.currency}
                    name="currency"
                    onChange={handleInputs}
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
    </div>
  );
}

export default PurchaseOrderDetailsPart;
