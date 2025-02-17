import React from 'react';
import { Row, Col, Form, FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function CreationModification({ subcategoryeditdetails }) {
  CreationModification.propTypes = {
    subcategoryeditdetails: PropTypes.object,
  };
  return (
    <Form>
      <FormGroup>
        <ComponentCard title="Creation & Modification">
          <Row>
            <Col md="3">
              <FormGroup>
                <Label> Creation</Label>
                <br></br>
                <span>
                  {subcategoryeditdetails &&
                    subcategoryeditdetails.creation_date}
                </span>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="3">
              <FormGroup>
                <Label> Modification </Label>
                <br></br>
                <span>
                  {subcategoryeditdetails &&
                    subcategoryeditdetails.modification_date }
                </span>
              </FormGroup>
            </Col>
          </Row>
        </ComponentCard>
      </FormGroup>
    </Form>
  );
}
