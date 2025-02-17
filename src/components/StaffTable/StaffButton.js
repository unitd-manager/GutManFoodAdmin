import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Form, FormGroup } from 'reactstrap';
import ComponentCardV2 from '../ComponentCardV2';


export default function StaffButton({
 
  applyChanges,
  backToList,
  editStaffData,
  navigate,
}) {
  StaffButton.propTypes = {
   
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    editStaffData: PropTypes.func,
    navigate: PropTypes.any,
  };
  return (
    <Form>
      <FormGroup>
        <ComponentCardV2>
          <Row>
            <Col>
              <Button  className='shadow-none'
                color="primary"
                onClick={() => {
                  editStaffData();
                  setTimeout(() => {
                    navigate('/Staff');
                  }, 1100);
                }}
              >
                Save
              </Button>
            </Col>
            <Col>
              <Button  className='shadow-none'
                color="primary"
                onClick={() => {
                  editStaffData();
                  applyChanges();
                }}
              >
                Apply
              </Button>
            </Col>
            <Col>
              <Button  className='shadow-none'
                color="dark"
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to cancel  \n  \n You will lose any changes made',
                    )
                  ) {
                    navigate('/Staff');
                  } else {
                    applyChanges();
                  }
                }}
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button  className='shadow-none'
                color="dark"
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
