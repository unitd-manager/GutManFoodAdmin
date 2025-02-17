import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function SubCategoryPageMetaData({ subcategoryeditdetails, handleInputs }) {
  SubCategoryPageMetaData.propTypes = {
    subcategoryeditdetails: PropTypes.object,
    handleInputs: PropTypes.func,
  };
  return (
    <>
      <Form>
        <FormGroup>
          {/* Page Meta Data Details */}
          <ComponentCard title="Page Meta Data">
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Page Title</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={subcategoryeditdetails && subcategoryeditdetails.meta_title}
                    name="meta_title"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Page Description</Label>
                  <Input
                    type="textarea"
                    name="meta_description"
                    onChange={handleInputs}
                    value={subcategoryeditdetails && subcategoryeditdetails.meta_description}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Page Keywords</Label>
                  <Input
                    type="textarea"
                    name="meta_keyword"
                    onChange={handleInputs}
                    value={subcategoryeditdetails && subcategoryeditdetails.meta_keyword}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="4">
              <Label>SEO Title </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={subcategoryeditdetails && subcategoryeditdetails.seo_title}
                name="seo_title"
              />
            </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
      </>
  );
}
