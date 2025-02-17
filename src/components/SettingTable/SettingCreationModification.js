import React from 'react';
import { Row, Col, FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import ComponentCard from '../ComponentCard';

export default function SettingCreationModification({ settingdetails }) {
  SettingCreationModification.propTypes = {
    settingdetails: PropTypes.object,
  };
  return (
    <ComponentCard
      title="Creation & Modification ">
      <Row>
        <Col md="3">
          <FormGroup>
            <Label>Creation</Label>
            <br />
            <span>
            {settingdetails &&
                    settingdetails.creation_date &&
                    moment(settingdetails.creation_date).format('YYYY-MM-DD  hh:mm:ss')}
            </span>
          </FormGroup>
        </Col>
        <Col md="3">
          <FormGroup>
            <Label>Modification</Label>
            <br />
            <span>
            {settingdetails &&
                    settingdetails.modification_date &&
                    moment(settingdetails.modification_date).format('YYYY-MM-DD  hh:mm:ss')}
            </span>
          </FormGroup>
        </Col>
      </Row>
    </ComponentCard>
  );
}
