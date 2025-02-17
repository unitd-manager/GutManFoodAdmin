import React from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

export default function SupportCreationModification({ supportDetails }) {
  SupportCreationModification.propTypes = {
    supportDetails: PropTypes.object,
  };
  return (
    <>
      <Row>
        <Col>
          <small>Creation Date:</small>
          <small>{supportDetails && supportDetails.creation_date}</small>
        </Col>
      </Row>
      <Row>
        <Col>
          <small>Modification Date:</small>
          <small>{supportDetails && supportDetails.modification_date}</small>
        </Col>
      </Row>
    </>
  );
}
