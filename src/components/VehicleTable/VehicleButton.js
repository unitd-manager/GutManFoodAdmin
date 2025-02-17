import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Form, FormGroup } from 'reactstrap';
import ComponentCardV2 from '../ComponentCardV2';
import DeleteButton from '../DeleteButton';


export default function VehicleButton({
  saveChanges,
  applyChanges,
  backToList,
  editVehicleData,
  id,
  navigate,
}) {
  VehicleButton.propTypes = {
    saveChanges: PropTypes.func,
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    editVehicleData: PropTypes.any,
    id: PropTypes.string,
    navigate: PropTypes.any,
  };
  return (
    <Form>
      <FormGroup>
        <ComponentCardV2>
          <Row>
            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  editVehicleData();
                  saveChanges();
                }}
              >
                Save
              </Button>
            </Col>
            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  editVehicleData();
                  applyChanges();
                }}
              >
                Apply
              </Button>
            </Col>
            <Col>
              <Button
                className="shadow-none"
                color="secondary"
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to cancel  \n  \n You will lose any changes made',
                    )
                  ) {
                    navigate('/Vehicle');
                  } else {
                    applyChanges();
                  }
                }}
              >
                Cancel
              </Button>
            </Col>
            <Col>
            <DeleteButton
              ifAttachment
              attachmentroom="Vehicle"
              id={id}
              columnname="vehicle_id"
              tablename="vehicle"
            ></DeleteButton>
            </Col>
            <Col>
              <Button
                className="shadow-none"
                color="secondary"
                onClick={() => {
                  backToList();
                }}
              >
                Back to List
              </Button>
            </Col>
          </Row>
        </ComponentCardV2>
      </FormGroup>
    </Form>
  );
}
