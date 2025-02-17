import React from 'react'
import { Row,Col, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types'

export default function SectionDetail({section,valuelist,handleInputs}) {
  SectionDetail.propTypes = {
        section: PropTypes.object,
        valuelist: PropTypes.array,
        handleInputs: PropTypes.any
      }
  return (
   
    <Row>
      <Col md="3">
        <FormGroup>
          <Label>
            Title<span className="required"> *</span>
          </Label>
          <Input
            type="text"
            onChange={handleInputs}
            value={section && section.section_title}
            name="section_title"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Section Type</Label>
          <Input
            type="select"
            onChange={handleInputs}
            value={section && section.section_type}
            name="section_type"
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
      <Col md="4">
        <Label>Button Position</Label>
        <Input
          type="select"
          onChange={handleInputs}
          value={section && section.button_position}
          name="button_position"
        >
          <option defaultValue="selected">Please Select</option>
          <option value="Top">Top</option>
          <option value="Admin">Admin</option>
          <option value="Reports">Reports</option>
        </Input>
      </Col>
      <Col md="3">
        <Label>Groups</Label>
        <Input
          type="select"
          onChange={handleInputs}
          value={section && section.groups}
          name="groups"
        >
          <option defaultValue="selected">Please Select</option>
          <option value="Reports">Reports</option>
          <option value="Home">Home</option>
          <option value="Admin">Admin</option>
          <option value="Main">Main</option>
        </Input>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Routes</Label>
          <Input
            type="text"
            onChange={handleInputs}
            value={section && section.routes}
            name="routes"
          />
        </FormGroup>
      </Col>
      <Col md="4">
        <FormGroup>
          <Label>Number Of Rows</Label>
          <Input
            type="text"
            onChange={handleInputs}
            value={section && section.number_of_rows}
            name="number_of_rows"
          />
        </FormGroup>
      </Col>
      <Col md="3">
        <Label>Published</Label>
        <FormGroup>
          <Input
            type="radio"
            name="published"
            value="1"
            onChange={handleInputs}
            defaultChecked={section && section.published === 1 && true}
          />
          <Label>Yes</Label>

          <Input
            type="radio"
            name="published"
            value="0"
            onChange={handleInputs}
            defaultChecked={section && section.published === 0 && true}
          />
          <Label>No</Label>
        </FormGroup>
      </Col>
    </Row>
  )
}