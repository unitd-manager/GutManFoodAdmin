import React from 'react'
import { Row, Col, Form, FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types'
import moment from 'moment';
import ComponentCard from '../ComponentCard';


export default function CreationModification({financeDetails}) {
    CreationModification.propTypes = {
        financeDetails: PropTypes.object
      }
  return (
    <Form >
        <FormGroup>
          <ComponentCard title='Creation&modification'>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Created By</Label><span>{financeDetails && financeDetails.created_by}</span>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Modified By </Label>
                  <span>
                  {financeDetails &&
                    financeDetails.modification_date &&
                    moment(financeDetails.modification_date).format('YYYY-MM-DD hh:mm:ss')}
                </span>
                </FormGroup>
              </Col>

            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
  )
}
