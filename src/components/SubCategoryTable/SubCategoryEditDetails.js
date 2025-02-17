import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function SubCategoryEditDetails({ subcategoryeditdetails, handleInputs, category }) {
  SubCategoryEditDetails.propTypes = {
    subcategoryeditdetails: PropTypes.object,
    handleInputs: PropTypes.func,
    category: PropTypes.array,
  };
  return (
    <Form>
      <FormGroup>
        {/* Sub Category  Details */}
        <ComponentCard title="Sub Category Details"
         creationModificationDate={subcategoryeditdetails}>
          <Row>
            <Col md="3">
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={subcategoryeditdetails && subcategoryeditdetails.sub_category_title}
                  name="sub_category_title"
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Category</Label>
                <Input
                  type="select"
                  name="category_id"
                  onChange={handleInputs}
                  value={subcategoryeditdetails && subcategoryeditdetails.category_id}
                >
                  <option defaultValue="selected">
                    Please Select
                  </option>
                  {category &&
                    category.map((ele) => {
                      return <option key={ele.category_id} value={ele.category_id}>{ele.concattitle}</option>;
                    })}
                </Input>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Sub Category Type</Label>
                <Input
                  type="select"
                  name="sub_category_type"
                  onChange={handleInputs}
                  value={subcategoryeditdetails && subcategoryeditdetails.sub_category_type}
                >
                  <option> Please Select </option>
                  <option defaultValue="Content">
                    Content
                  </option>
                  <option value="Enquiry Form">Enquiry Form </option>
                  <option value="Regisration">Regisration</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>External Link</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={subcategoryeditdetails && subcategoryeditdetails.external_link}
                  name="external_link"
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Internal Link</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={subcategoryeditdetails && subcategoryeditdetails.internal_link}
                  name="internal_link"
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Published</Label>
                <br></br>
                <Input
                  name="published"
                  value="1"
                  type="radio"
                  defaultChecked={
                    subcategoryeditdetails && subcategoryeditdetails.published === 1 && true
                  }
                  onChange={handleInputs}
                />
                <Label> Yes </Label>
                <Input
                  name="published"
                  value="0"
                  type="radio"
                  defaultChecked={
                    subcategoryeditdetails && subcategoryeditdetails.published === 0 && true
                  }
                  onChange={handleInputs}
                />
                <Label>No</Label>
              </FormGroup>
            </Col>
          </Row>
        </ComponentCard>
      </FormGroup>
    </Form>
  );
}
