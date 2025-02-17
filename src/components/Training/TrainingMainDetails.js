import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import ComponentCard from '../ComponentCard';

export default function TrainingMainDetails({ trainingDetails, handleInputs }) {
  TrainingMainDetails.propTypes = {
    trainingDetails: PropTypes.object,
    handleInputs: PropTypes.func,
  };
  return (
    
    <ComponentCard title='Main Details'>
    <Form>
    <Row>
      <Col md="4">
        <FormGroup>
          <Label> Title </Label>
          <Input type="text" onChange={handleInputs} value={trainingDetails && trainingDetails.title} name="title" />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label> From Date </Label>
          <Input type="date" onChange={handleInputs} value={moment(trainingDetails && trainingDetails.from_date).format('YYYY-MM-DD')} name="from_date" />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label> To date </Label>
          <Input type="date" onChange={handleInputs} value={moment(trainingDetails && trainingDetails.to_date).format('YYYY-MM-DD')} name="to_date" />
        </FormGroup>
      </Col>
      </Row>
      <Row>
      <Col md="4">
        <FormGroup>
          <Label>Trainer</Label>
          <Input type="text" onChange={handleInputs} value={trainingDetails && trainingDetails.trainer} name="trainer" />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label> Description</Label>
          <Input type="text" onChange={handleInputs} value={trainingDetails && trainingDetails.description} name="description" />
        </FormGroup>
      </Col>
    </Row>
    </Form>
  </ComponentCard>
 );
}