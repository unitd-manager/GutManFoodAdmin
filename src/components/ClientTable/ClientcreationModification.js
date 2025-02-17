import React from 'react'
import { Row, Col, Form, FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types'

export default function ClientcreationModification({clientsDetails}) {
    ClientcreationModification.propTypes = {
        clientsDetails: PropTypes.object
      }
  return (
    <Form >
        <FormGroup>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Created By</Label><br/>
                  <span>{clientsDetails && clientsDetails.created_by}</span>
                  <span>
            {clientsDetails &&
                    clientsDetails.creation_date}
            </span>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Modified By </Label><br/>
                  <span>{clientsDetails && clientsDetails.modified_by}</span>
                  <span>
            {clientsDetails &&
                    clientsDetails.modification_date}
            </span>  
                </FormGroup>
              </Col>
            </Row>
        </FormGroup>
      </Form>
  )
}