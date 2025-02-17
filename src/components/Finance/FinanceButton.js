import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Form, FormGroup } from 'reactstrap';
import ComponentCardV2 from '../ComponentCardV2';

export default function FinanceEditComp({
     backToList,
     editFinanceData,
      navigate
}) {
  FinanceEditComp.propTypes = {
   backToList: PropTypes.func,
   editFinanceData: PropTypes.func,
   navigate: PropTypes.any

  };
  return (
    <Form>
      <FormGroup>
      <ComponentCardV2>
        <Row>
          <Col>
            <Button className='shadow-none'
              color="primary"
              onClick={() => {
                editFinanceData();
                setTimeout(() => {
                  navigate('/Orders');
                }, 1100);
              }}
            >
              Save
            </Button>
          </Col>
          <Col>
              <Button className='shadow-none'
                color="primary"
                onClick={() => {
                  editFinanceData();
                   }}
              >
                Apply
              </Button>
            </Col>
           <Col>
            <Button className='shadow-none'
              color="dark"
              onClick={() => {
                backToList();
                navigate('/Orders');
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