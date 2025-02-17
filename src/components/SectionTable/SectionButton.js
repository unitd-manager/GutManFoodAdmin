import React from 'react'
import { Row, Col, Form, FormGroup,Button } from 'reactstrap';
import PropTypes from 'prop-types'
import ComponentCardV2 from '../ComponentCardV2';
import DeleteButton from '../DeleteButton';


export default function SectionButton({editSectionData,navigate,applyChanges,backToList, id}) {
    SectionButton.propTypes = {
        editSectionData: PropTypes.func,
        navigate: PropTypes.any,
        applyChanges: PropTypes.func,
        id: PropTypes.string,
        backToList: PropTypes.func
      }
  return (
    <Form>
    <FormGroup>
      <ComponentCardV2>
        <Row>
          <Col>
            <Button  className='shadow-none'
              color="primary"
              onClick={() => {
                editSectionData();
                setTimeout(() => {
                  navigate('/Section');
                }, 1100);
              }}>Save
            </Button>
          </Col>
          <Col>
            <Button  className='shadow-none'
              color="primary"
              onClick={() => {
                editSectionData();
                applyChanges();
              }}>Apply
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
                  navigate('/Section');
                } else {
                  applyChanges();
                }
              }}
            > Cancel
            </Button>
          </Col>
          <Col>
          
          <DeleteButton
              pictureroom="SectionPic"
              ifpiture
              id={id} 
              columnname="section_id"
              tablename="section"
            ></DeleteButton>
          </Col>
          <Col>
            <Button  className='shadow-none'
              color="dark"
              onClick={() => {
                backToList();
              }}>Back to List
            </Button>
          </Col>
        </Row>
      </ComponentCardV2>
    </FormGroup>
  </Form>
  )
}