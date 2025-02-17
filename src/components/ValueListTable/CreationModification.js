import React from 'react';
import { Row, Col, Form, FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function CreationModification({ valuelisteditdetails }) {
  CreationModification.propTypes = {
    valuelisteditdetails: PropTypes.object,
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
                  {valuelisteditdetails &&
                    valuelisteditdetails.creation_date}
                </span>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label> Modification </Label>
                <br></br>
                <span>
                  {valuelisteditdetails &&
                    valuelisteditdetails.modification_date}
                </span>
              </FormGroup>
            </Col>
          </Row>
        </ComponentCard>
      </FormGroup>
    </Form>
  );
}
