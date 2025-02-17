import React from 'react'
import { Row, Col, Form, FormGroup,Button } from 'reactstrap';
import PropTypes from 'prop-types'
import ComponentCardV2 from '../ComponentCardV2';


export default function TenderButtons({editTenderData,applyChanges,backToList,navigate}) {
    TenderButtons.propTypes = {
        editTenderData: PropTypes.func,
        navigate: PropTypes.any,
        applyChanges: PropTypes.func,
        backToList: PropTypes.func
      }
  return (
    <Form>
    <FormGroup>
      <ComponentCardV2>
        <Row>
          <Col>
            <Button className='shadow-none'
              color="primary"
              onClick={() => {
                editTenderData();
                navigate('/Tender');
              }}
            >
              Save
            </Button>
          </Col>
          <Col>
            <Button className='shadow-none'
              color="primary"
              onClick={() => {
                editTenderData();
                applyChanges();
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
              }}
            >
              Back to List
            </Button>
          </Col>
        </Row>
      </ComponentCardV2>
    </FormGroup>
  </Form>
  )
}