import React from 'react';
import { CardTitle, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

export default function CreationModification({ details = null, title }) {
  CreationModification.propTypes = {
    details: PropTypes.object,
    title: PropTypes.string,
  };
  return (
    <>
      <CardTitle tag="h4" className="border-bottom px-4 py-3 mb-0">
        <Row>
          <Col>{title}</Col>
          {details && (
            <Col>
              <Row>
              <span style={{ fontSize: '0.7em' }}> Creation: {details && details.created_by} {details && details.creation_date}</span>
              </Row>
              <Row className="d-flex">
              <span style={{ fontSize: '0.7em' }}> Modified: {details && details.modified_by} {details && details.modification_date}</span>
              </Row>
            </Col>
          )}
        </Row>
      </CardTitle>
    </>
   );
}