import React from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCardV2 from '../ComponentCardV2';
// import DeleteButton from '../DeleteButton';

export default function ContentButton({
  applyChanges,
  backToList,
  editContentData,
  navigate,
  // id
}) {
  ContentButton.propTypes = {
    editContentData: PropTypes.func,
    navigate: PropTypes.func,
    applyChanges: PropTypes.func,
    // id: PropTypes.string,
    backToList: PropTypes.func,
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
                  editContentData();
                  navigate('/Content');
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
                  editContentData();
                  applyChanges();
                 }}
              >
                Apply
              </Button>
            </Col>
            {/* <Col>
              <Button
                className="shadow-none"
                color="secondary"
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to cancel  \n  \n You will lose any changes made',
                    )
                  ) {
                    navigate('/Content');
                  } else {
                    applyChanges();
                  }
                }}
              >
                {' '}
                Cancel
              </Button>
            </Col>
            <Col>
            <DeleteButton
              ifAttachment
              attachmentroom="ContentAttachment"
              pictureroom="ContentPic"
              ifpiture
              id={id} 
              columnname="content_id"
              tablename="content"
            ></DeleteButton>
            </Col> */}
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
