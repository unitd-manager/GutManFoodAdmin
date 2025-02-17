import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function CategoryDetailComp({ categoryDetails, handleInputs, section, valuelist }) {
  CategoryDetailComp.propTypes = {
    categoryDetails: PropTypes.object,
    handleInputs: PropTypes.func,
    section: PropTypes.array,
    valuelist: PropTypes.array,
  };
  return (
    <>
      <Form>
        <FormGroup>
        <ComponentCard title="Category Details"
         creationModificationDate={categoryDetails}>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>
                    Title <span className="required"> *</span>
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={categoryDetails && categoryDetails.category_title}
                    name="category_title"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Section</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={categoryDetails && categoryDetails.section_id}
                    name="section_id"
                  >
                    <option defaultValue="selected">
                      Please Select
                    </option>
                    {section &&
                      section.map((e) => {
                        return <option key={e.section_id} value={e.section_id}>{e.section_title}</option>;
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Category Type</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={categoryDetails && categoryDetails.category_type}
                    name="category_type"
                  >
                    <option defaultValue="selected">
                      Please Select
                    </option>
                    {valuelist &&
                      valuelist.map((e) => {
                        return <option key={e.value} value={e.value}>{e.value}</option>;
                      })}
                  </Input>
                </FormGroup>
              </Col>
          </Row>
          <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Internal Link</Label>
                  <Input
                    type="text"
                    value={categoryDetails && categoryDetails.internal_link}
                    onChange={handleInputs}
                    name="internal_link"
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="4">
              <FormGroup>
                
                <Label>Published</Label>
                <br></br>
                <Input
                  name="published"
                  value="1"
                  type="radio"
                  defaultChecked={categoryDetails && categoryDetails.published === 1 && true}
                  onChange={handleInputs}
                />
                <Label> Yes </Label>
                <Input
                  name="published"
                  value="0"
                  type="radio"
                  defaultChecked={categoryDetails && categoryDetails.published === 0 && true}
                  onChange={handleInputs}
                />
                <Label>No</Label>
                
              </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
          <ComponentCard title="Page Meta Data">
            <Row>
            <Col md="6">
              <FormGroup>
                <Label>Page Title</Label>
                <Input
                  value={categoryDetails && categoryDetails.meta_title}
                  type="text"
                  onChange={handleInputs}
                  name="meta_title"
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>Page Description</Label>
                <Input
                  value={categoryDetails && categoryDetails.meta_description}
                  type="textarea"
                  onChange={handleInputs}
                  name="meta_description"
                />
              </FormGroup>
            </Col>
            </Row>
            <Row>
            <Col md="6">
              <FormGroup>
                <Label>Page Keywords</Label>
                <Input
                  value={categoryDetails && categoryDetails.meta_keyword}
                  type="textarea"
                  onChange={handleInputs}
                  name="meta_keyword"
                />
              </FormGroup>
            </Col>
            <Col md="6">
        <FormGroup>
          <Label>SEO Title</Label>
          <Input
            value={categoryDetails && categoryDetails.seo_title}
            type="text"
            onChange={handleInputs}
            name="seo_title"
          />
        </FormGroup>
      </Col>
            </Row>
          </ComponentCard>
          <Row></Row>
        </FormGroup>
      </Form>
     
     
    </>
  );
}
