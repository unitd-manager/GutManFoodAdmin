import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, FormGroup, Label } from 'reactstrap';
import CostingSummaryModal from '../ProjectModal/CostingSummaryModal';
/* eslint-disable */
export default function CostingSummary({ getCostingSummary, gTotal,gTotal1,gTotal2,gTotal3,gTotal4,gTotal5,gTotalInvoicedPrice,gTotalProfit,otherchargesdetails }) {
    const [type, setType] = React.useState('')
    const [addCostingSummaryModal, setAddCostingSummaryModal] = React.useState(false)
  return (
    <>
      <Row>
        <Col md="3">
          <FormGroup>
            <h3>Costing Summary</h3>{' '}
          </FormGroup>
        </Col>
        <Col md="2">
          <FormGroup>
            <Label>
              Total Cost : <b>{gTotal+gTotal1+gTotal2+gTotal3+gTotal4+gTotal5}</b>
            </Label>{' '}
          </FormGroup>
        </Col>
        <Col md="2">
          <FormGroup>
            <Label>
              PO Price (S$ W/o GST) : <b>{getCostingSummary && getCostingSummary.po_price}</b>
            </Label>{' '}
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label> Invoiced Price (S$ W/o GST) :<b>{gTotalInvoicedPrice}</b></Label>{' '}
          </FormGroup>
        </Col>
        <Col md="2">
          <FormGroup>
            <Label>
              Profit Margin : <b>{gTotalProfit}</b> %
            </Label>{' '}
          </FormGroup>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col md="3">
          <FormGroup>
            <Label>Total Material</Label>
            <br />
            <span>{getCostingSummary && getCostingSummary.total_material_price}</span>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>
              Transport Charges{' '}
              <Link to="" color="primary">
                <span
                  onClick={() => {
                    setType('Transport Charges')
                    setAddCostingSummaryModal(true);
                    
                  }}
                >
                  <b>
                    <u>Add</u>
                  </b>
                </span>
              </Link>
            </Label>
            <br />
            <span>{gTotal}</span>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>
              Total Labour Charges{' '}
              <Link to="" color="primary">
                <span
                  onClick={() => {
                    setType('Total Labour Charges')
                    setAddCostingSummaryModal(true);
                  }}
                >
                  <b>
                    <u>Add</u>
                  </b>
                </span>
              </Link>
            </Label>
            <br />
            <span>{gTotal1}</span>
          </FormGroup>
        </Col>

        <Col md="3">
          <FormGroup>
            <Label>
              Salesman Commission{' '}
              <Link to="" color="primary">
                <span
                  onClick={() => {
                    setType('Salesman Commission')
                    setAddCostingSummaryModal(true);
                  }}
                >
                  <b>
                    <u>Add</u>
                  </b>
                </span>
              </Link>
            </Label>
            <br />
            <span>{gTotal2}</span>
          </FormGroup>
        </Col>
      </Row>
      <br />
      <Row>
        <Col md="3">
          <FormGroup>
            <Label>
              {' '}
              Finance Charges{' '}
              <Link to="" color="primary">
                <span
                  onClick={() => {
                    setType('Finance Charges')
                    setAddCostingSummaryModal(true);
                  }}
                >
                  <b>
                    <u>Add</u>
                  </b>
                </span>
              </Link>
            </Label>
            <br />
            <span>{gTotal3}</span>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>
              Office Overheads{' '}
              <Link to="" color="primary">
                <span
                  onClick={() => {
                    setType('Office Overheads')
                    setAddCostingSummaryModal(true);
                  }}
                >
                  <b>
                    <u>Add</u>
                  </b>
                </span>
              </Link>
            </Label>
            <br />
            <span>{gTotal4}</span>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>
              Other Charges{' '}
              <Link to="" color="primary">
                <span
                  onClick={() => {
                    setType('Other Charges')
                    setAddCostingSummaryModal(true);
                  }}
                >
                  <b>
                    <u>Add</u>
                  </b>
                </span>
              </Link>
            </Label>
            <br />
            <span>{gTotal5}</span>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label> TOTAL COST </Label>
            <br />
            <span>{gTotal+gTotal1+gTotal2+gTotal3+gTotal4+gTotal5}</span>
          </FormGroup>
        </Col>
      </Row>
      {addCostingSummaryModal && <CostingSummaryModal
      type={type}
      
          addCostingSummaryModal={addCostingSummaryModal}
          setAddCostingSummaryModal={setAddCostingSummaryModal}
        />}
    </>
  );
}
