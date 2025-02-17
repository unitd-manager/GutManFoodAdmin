import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import ComponentCardV2 from '../ComponentCardV2';

// import DeleteButton from '../DeleteButton';


export default function CategoryButton({
  editCategoryData,
  // navigate,
  applyChanges,
  saveChanges,
  // id,
  backToList,
}) {
  CategoryButton.propTypes = {
    editCategoryData: PropTypes.any,
    // navigate: PropTypes.func,
    applyChanges: PropTypes.func,
    saveChanges: PropTypes.func,
    // id: PropTypes.string,
    backToList: PropTypes.func,
  };
  const navigate = useNavigate();
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
                  editCategoryData();
                  saveChanges();
                  setTimeout(() => {
                    navigate('/Category');
                  }, 1100);
                }}
              >
                Save
              </Button>
            </Col>
            <Col>
              <Button
                color="primary"
                className="shadow-none"
                onClick={() => {
                  editCategoryData();
                  applyChanges();
                  console.log('cancel process');
                }}
              >
                Apply
              </Button>
            </Col>
            {/* <Col>
              <Button
                type="submit"
                className="shadow-none"
                color="dark"
                onClick={(e) => {
                  if (window.confirm('Are you sure you want to cancel? ')) {
                    navigate('/Category');
                  } else {
                    e.preventDefault();
                  }
                }}
              >
                Cancel
              </Button>
            </Col>
            <Col>
            <DeleteButton
              id={id} 
              columnname="category_id"
              tablename="category"
            ></DeleteButton>
            </Col> */}
            <Col>
              <Button
                color="dark"
                className="shadow-none"
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
  );
}
