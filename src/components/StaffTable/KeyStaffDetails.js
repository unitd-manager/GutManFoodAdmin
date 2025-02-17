import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function KeyStaffDetails({
  stafftypedetails,
  staffeditdetails,
  handleInputs,
  userdetails,
  staffteamdetails,
}) {
  KeyStaffDetails.propTypes = {
    staffeditdetails: PropTypes.any,
    handleInputs: PropTypes.func,
    userdetails: PropTypes.array,
    staffteamdetails: PropTypes.array,
    stafftypedetails: PropTypes.array,
  };
  return (
    <Form>
      <FormGroup>
      <ComponentCard
            title="Staff Details"
            creationModificationDate={staffeditdetails}
          
          > 
          <Row>
            <Col md="3">
              <FormGroup>
                <Label>
                  Name <span className="required"> *</span>
                </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={staffeditdetails && staffeditdetails.first_name}
                  name="first_name"
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>
                  Email <span className="required"> *</span>
                </Label>
                <Input
                  type="email"
                  onChange={handleInputs}
                  value={staffeditdetails && staffeditdetails.email}
                  name="email"
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={staffeditdetails && staffeditdetails.pass_word}
                  name="pass_word"
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Status</Label>
                <Input
                  type="select"
                  name="status"
                  onChange={handleInputs}
                  value={staffeditdetails && staffeditdetails.status}
                >
                  <option value="">Please Select</option>
                  <option defaultValue="Current">
                    Current
                  </option>
                  <option value="Archive">Archive</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>User Group</Label>
                <Input
                  type="select"
                  name="user_group_id"
                  onChange={handleInputs}
                  value={staffeditdetails && staffeditdetails.user_group_id}
                >
                  <option defaultValue="selected">
                    Please Select
                  </option>
                  {userdetails &&
                    userdetails.map((ele) => {
                      return <option key={ele.user_group_id} value={ele.user_group_id}>{ele.title}</option>;
                    })}
                </Input>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Staff Team</Label>
                <Input
                  type="select"
                  name="team"
                  onChange={handleInputs}
                  value={staffeditdetails && staffeditdetails.team}
                >
                  <option defaultValue="selected">
                    Please Select
                  </option>
                  {staffteamdetails &&
                    staffteamdetails.map((ele) => {
                      return <option key={ele.value} value={ele.value}>{ele.value}</option>;
                    })}
                </Input>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Staff Type</Label>
                <Input
                  type="select"
                  name="staff_type"
                  onChange={handleInputs}
                  value={staffeditdetails && staffeditdetails.staff_type}
                >
                  <option defaultValue="selected">
                    Please Select
                  </option>
                  {stafftypedetails &&
                    stafftypedetails.map((ele) => {
                      return <option key={ele.value} value={ele.value}>{ele.value}</option>;
                    })}
                </Input>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Staff Rate</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={staffeditdetails && staffeditdetails.staff_rate}
                  name="staff_rate"
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Position</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={staffeditdetails && staffeditdetails.position}
                  name="position"
                />
              </FormGroup>
            </Col>
            <Col md="4">
                <FormGroup>
                  <Label>Published</Label>
                  <br></br>
                  <Label>Yes</Label>
                  <Input name="published" value="1" type="radio" checked={staffeditdetails && staffeditdetails.published === 1 && true} onChange={handleInputs}/>
                  <Label>No</Label>
                  <Input name="published" value="0" type="radio" checked={staffeditdetails && staffeditdetails.published === 0 && true} onChange={handleInputs}/>
                </FormGroup>
              </Col>
            
          </Row>
        </ComponentCard>
      </FormGroup>
    </Form>
  );
}
