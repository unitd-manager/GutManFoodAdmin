import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

 const ValueListEditDetails = ({
  valuelisteditdetails,
  handleInputs,
  valuelistname,
  id,
}) => {
  ValueListEditDetails.propTypes = {
    valuelisteditdetails: PropTypes.object,
    handleInputs: PropTypes.func,
    valuelistname: PropTypes.array,
    id: PropTypes.any,
  };

  return (
    <Form>
      <FormGroup>
        <ComponentCard title="Valuelist Details"
                    creationModificationDate={valuelisteditdetails}
        >
          <Row>
            <Col md="4">
              <FormGroup>
                <Label>
                  Value List Name<span className="required"> *</span>
                </Label>
                <Input
                  type="select"
                  onChange={handleInputs}
                  value={valuelisteditdetails && valuelisteditdetails.key_text}
                  name="key_text"
                >
                  <option value="" defaultValue='selected' >
                    Please Select
                  </option>
                  {valuelistname &&
                    valuelistname.map((ele) => {
                      if (ele.id === id) {
                        return (
                          <option key={ele.id} defaultValue='selected' value={ele.name} >
                            {ele.name}
                          </option>
                        );
                      }
                      return <option key={ele.id} value={ele.name}>{ele.name}</option>;
                    })}
                </Input>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>
                  Value <span className="required"> *</span>
                </Label>
                <Input
                  type="textarea"
                  onChange={handleInputs}
                  value={valuelisteditdetails && valuelisteditdetails.value}
                  name="value"
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>Code</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={valuelisteditdetails && valuelisteditdetails.code}
                  name="code"
                />
              </FormGroup>
            </Col>
            <Col md="4">
                <FormGroup>
                  <Label>Published</Label>
                  <br></br>
                  <Label>Yes</Label>
                  <Input
                    name="published"
                    value="1"
                    type="radio"
                    defaultChecked={valuelisteditdetails && valuelisteditdetails.published === 1 && true}
                    onChange={handleInputs}
                  />
                  <Label>No</Label>
                  <Input
                    name="published"
                    value="0"
                    type="radio"
                    defaultChecked={valuelisteditdetails && valuelisteditdetails.published === 0 && true}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
          </Row>
        </ComponentCard>
      </FormGroup>
    </Form>
  );
}
export default ValueListEditDetails