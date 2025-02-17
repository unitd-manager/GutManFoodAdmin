import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Form, FormGroup } from 'reactstrap';
import ComponentCardV2 from '../ComponentCardV2';
import DeleteButton from '../DeleteButton';

export default function ValueListButton({
  saveChanges,
  applyChanges,
  backToList,
  editValueListData,
  id,
  navigate,
}) {
  ValueListButton.propTypes = {
    saveChanges: PropTypes.func,
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    editValueListData: PropTypes.any,
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
                color="primary"
                className='shadow-none'
                onClick={() => {
                  editValueListData();
                  saveChanges();
                  setTimeout(() => {
                    navigate('/Valuelist');
                  }, 1100);
                }}
              >
                Save
              </Button>
            </Col>
            <Col>
              <Button
                color="primary"
                className='shadow-none'
                onClick={() => {
                  editValueListData();
                  applyChanges();
                }}
              >
                Apply
              </Button>
            </Col>
            <Col>
              <Button
                color="dark"
                className='shadow-none'
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to cancel  \n  \n You will lose any changes made',
                    )
                  ) {
                    navigate(`/ValueList`);
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
              id={id} 
              columnname="valuelist_id"
              tablename="valuelist"
            ></DeleteButton>
            </Col>
            <Col>
              <Button
                color="dark"
                className='shadow-none'
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
