import React from 'react'
import { Row, Col, Form, FormGroup,Button } from 'reactstrap';
import PropTypes from 'prop-types'
import ComponentCardV2 from '../ComponentCardV2';

export default function ClientButton({editClientsData,navigate,applyChanges,backToList}) {
    ClientButton.propTypes = {
        editClientsData: PropTypes.any,
        navigate: PropTypes.any,
        applyChanges: PropTypes.func,
        // DeleteClient: PropTypes.func,
        backToList: PropTypes.func,
        // sendMail: PropTypes.func
      }
  return (
    <Form>
    <FormGroup>
      {/* Button */}
      <ComponentCardV2>
        <Row>
        {/* <Col>
            <Button className='shadow-none'
              color="success"
              onClick={() => {
                
                  sendMail();
                
              }}
            >
              Send Mail
            </Button>
          </Col> */}
          <Col>
            <Button className='shadow-none'
              color="primary"
              onClick={() => {
                editClientsData();
                navigate('/Client');
              }}
            >
              Save
            </Button>
          </Col>
          <Col>
            <Button className='shadow-none'
              color="primary"
              onClick={() => {
                editClientsData();
                applyChanges();
                console.log('cancel process');
              }}
            >
              Apply
            </Button>
          </Col>
          {/* <Col>
            <Button className='shadow-none'
              color="dark"
              onClick={() => {
                if (
                  window.confirm(
                    'Are you sure you want to cancel  \n  \n You will lose any changes made',
                  )
                ) {
                  navigate('/Client');
                } else {
                  applyChanges();
                }
              }}
            >
              Cancel
            </Button>
          </Col> */}
          {/* <Col>
            <Button className='shadow-none'
              color="danger"
              onClick={() => {
                if (
                  window.confirm(
                    'Are you sure you want to delete this record? You cannot undo this action!',
                  )
                ) {
                    DeleteClient();
                  navigate('/Client');
                } else {
                  applyChanges();
                }
                console.log('back to list');
              }}
            >
              Delete
            </Button>
          </Col> */}
          <Col>
            <Button className='shadow-none'
              color="dark"
              onClick={() => {
                backToList();
                console.log('back to list');
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