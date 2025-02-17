import React from 'react';
import { Row, Col, Form, FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function CreationAndModification({ producteditdetails }) {
  CreationAndModification.propTypes = {
    producteditdetails: PropTypes.object,
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
                  {producteditdetails &&
                    producteditdetails.created_by}
                
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
                  {producteditdetails &&
                    producteditdetails.modified_by}
                 
                </span>
              </FormGroup>
            </Col>
          </Row>
        </ComponentCard>
      </FormGroup>
    </Form>
  );
}
