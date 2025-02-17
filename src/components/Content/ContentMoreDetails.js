import React from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import ComponentCard from '../ComponentCard';

export default function ContentMoreDetails({
  contentDetails,
  handleInputs,
  valuelist,
  subcategoryLinked,
  sectionLinked,
  categoryLinked
  }) {
  ContentMoreDetails.propTypes = {
    contentDetails: PropTypes.object,
    handleInputs: PropTypes.any,
    valuelist: PropTypes.object,
    subcategoryLinked: PropTypes.func,
    sectionLinked: PropTypes.func,
    categoryLinked: PropTypes.func,

      };
  return (
    <div>
   <ComponentCard title="Content details" creationModificationDate={contentDetails} >
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Title </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={contentDetails && contentDetails.title}
                    name="title"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  {/* Section title from section table */}
                  <Label>Section</Label>
                  <Input
                    type="select"
                    name="section_id"
                    value={contentDetails && contentDetails.section_id}
                    onChange={handleInputs}
                  >
                    <option value="" selected="selected">
                      Please Select
                    </option>
                    {sectionLinked &&
                      sectionLinked.map((ele) => {
                        return <option value={ele.section_id}>{ele.section_title}</option>;
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  {/* Category title from Category table */}
                  <Label>Category</Label>
                  <Input
                    type="select"
                    name="category_id"
                    value={contentDetails && contentDetails.category_id}
                    onChange={handleInputs}
                  >
                    <option value="" selected="selected">
                      Please Select
                    </option>
                    {categoryLinked &&
                      categoryLinked.map((ele) => {
                        return <option value={ele.category_id}>{ele.category_title}</option>;
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  {/* subcategory title from sub Category table */}
                  <Label>Sub Category</Label>
                  <Input
                    type="select"
                    name="sub_category_id"
                    value={contentDetails && contentDetails.sub_category_id}
                    onChange={handleInputs}
                  >
                    <option value="" selected="selected">
                      Please Select
                    </option>
                    {subcategoryLinked &&
                      subcategoryLinked.map((ele) => {
                        return (
                          <option value={ele.sub_category_id}>{ele.sub_category_title}</option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Content Type</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={contentDetails && contentDetails.content_type}
                    name="content_type"
                  >
                    <option defaultValue="selected">Please Select</option>
                    {valuelist &&
                      valuelist.map((e) => {
                        return (
                          <option key={e.value} value={e.value}>
                            {e.value}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
    </div>
  );
}
