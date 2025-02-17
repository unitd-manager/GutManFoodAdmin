import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Form, FormGroup } from 'reactstrap';
import { useDispatch } from 'react-redux';
import ComponentCardV2 from '../ComponentCardV2';
import {SearchTicket} from '../../store/apps/ticket/TicketSlice';

export default function SupportButton({ backToList, editSupportData, navigate, sendMail }) {
  SupportButton.propTypes = {
    // applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    editSupportData: PropTypes.func,
    navigate: PropTypes.any,
    sendMail:PropTypes.func,
  };
  const dispatch = useDispatch();
  return (
    <Form>
      <FormGroup>
        <ComponentCardV2>
          <Row>
          <Col>
            <Button className='shadow-none'
              color="success"
              onClick={() => {
                  sendMail();
              }}
            >
              Send Mail
            </Button>
          </Col>
            <Col>
              <Button className='shadow-none'
                color="primary"
                onClick={() => {
                  editSupportData();
                  setTimeout(() => {
                    navigate('/Support')
                  }, 800);
                }}
              >
                Save
              </Button>
            </Col>
            <Col>
              <Button className='shadow-none'
                color="primary"
                onClick={() => {
                  editSupportData();
                  // applyChanges();
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
                    navigate(`/Support`);
                    dispatch(SearchTicket(''))
                  } else {
                    applyChanges();
                  }
                }}
              >
                Cancel
              </Button>
            </Col> */}
            <Col>
              <Button className='shadow-none'
                color="dark"
                onClick={() => {
                  backToList();
                  dispatch(SearchTicket(''))
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
