import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Form, FormGroup } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import ComponentCardV2 from '../ComponentCardV2';

export default function TrainingButton({ applyChanges, backToList, insertTrainingData, navigate }) {
  TrainingButton.propTypes = {
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    insertTrainingData: PropTypes.func,
    navigate: PropTypes.any,
  };
  return (
    <Form>
      <FormGroup>
        <ComponentCardV2>
          <ToastContainer></ToastContainer>
          <Row>
            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  insertTrainingData();
                  setTimeout(() => {
                    navigate('/Training');
                  }, 800);
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
                  insertTrainingData();
                  applyChanges();
                  }}
              >
                Apply
              </Button>
            </Col>
            <Col>
              <Button
                className="shadow-none"
                color="dark"
                onClick={() => {
                  backToList();
                  navigate('/Training');
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
