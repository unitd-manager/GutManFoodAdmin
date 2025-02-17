import React from 'react';
import {
  Row,
  Form,
  ModalFooter,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  Table,
  Label,
  Input,
  Col,
  FormGroup,
  Button,
  CardBody,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';

export default function ClientContactGetAndInsert({
  setContactData,
  setEditContactEditModal,
  deleteRecord,
  contactsDetails,
  addContactToggle,
  addContactModal,
  handleAddNewContact,
  newContactData,
  AddNewContact,
}) {
  ClientContactGetAndInsert.propTypes = {
    setContactData: PropTypes.func,
    setEditContactEditModal: PropTypes.func,
    deleteRecord: PropTypes.func,
    contactsDetails: PropTypes.any,
    addContactToggle: PropTypes.func,
    addContactModal: PropTypes.bool,
    handleAddNewContact: PropTypes.func,
    newContactData: PropTypes.object,
    AddNewContact: PropTypes.func,
  };
  //  Table Contact
  const columns = [
    {
      name: 'id',
      selector: 'contact_id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: 'Del',
      selector: 'delete',
      cell: () => <Icon.Trash />,
      grow: 0,
      width: 'auto',
      wrap: true,
    },
    {
      name: 'Name',
      selector: 'first_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Phone(Direct)',
      selector: 'phone_direct',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Mobile',
      selector: 'mobile',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Position',
      selector: 'position',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Dept',
      selector: 'department',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
  ];
  return (
    <Form>
      <Row>
        <Table id="example" className="display border border-secondary rounded">
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {contactsDetails &&
              contactsDetails.map((element, i) => {
                return (
                  <tr key={element.contact_id}>
                    <td>{i + 1}</td>
                    <td>
                      <Link to="">
                        <span
                          onClick={() => {
                            setContactData(element);
                            setEditContactEditModal(true);
                          }}
                        >
                          <Icon.Edit2 />
                        </span>
                      </Link>
                    </td>
                    <td>
                      <Link to="">
                        <span onClick={() => deleteRecord(element.contact_id)}>
                          <Icon.Trash2 />
                        </span>
                      </Link>
                    </td>
                    <td>{element.first_name}</td>
                    <td>{element.email}</td>
                    <td>{element.phone_direct}</td>
                    <td>{element.mobile}</td>
                    <td>{element.position}</td>
                    <td>{element.department}</td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
      </Row>
      <Row>
        <Col md="3">
          <FormGroup>
            <Button color="primary" className="shadow-none" onClick={addContactToggle.bind(null)}>
              Add New Contact{' '}
            </Button>
            <Modal size="lg" isOpen={addContactModal} toggle={addContactToggle.bind(null)}>
              <ModalHeader toggle={addContactToggle.bind(null)}>New Contact</ModalHeader>
              <ModalBody>
                <Row>
                  <Col md="12">
                    <Card>
                      <CardBody>
                        <Form>
                          <Row>
                            <Col md="12">
                              <FormGroup>
                                <Label>Title</Label>
                                <Input
                                  type="select"
                                  name="salutation"
                                  onChange={handleAddNewContact}
                                  value={newContactData && newContactData.salutation}
                                >
                                  <option value="" selected="selected">
                                    Please Select
                                  </option>
                                  <option value="Ms">Ms</option>
                                  <option value="Mr">Mr</option>
                                  <option value="Mrs">Mrs</option>
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col md="12">
                              <FormGroup>
                                <Label>Name</Label>
                                <Input
                                  type="text"
                                  name="first_name"
                                  onChange={handleAddNewContact}
                                  value={newContactData && newContactData.first_name}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="12">
                              <FormGroup>
                                <Label>Email</Label>
                                <Input
                                  type="text"
                                  name="email"
                                  onChange={handleAddNewContact}
                                  value={newContactData && newContactData.email}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="12">
                              <FormGroup>
                                <Label>Position</Label>
                                <Input
                                  type="text"
                                  name="position"
                                  onChange={handleAddNewContact}
                                  value={newContactData && newContactData.position}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="12">
                              <FormGroup>
                                <Label>Department</Label>
                                <Input
                                  type="text"
                                  name="department"
                                  onChange={handleAddNewContact}
                                  value={newContactData && newContactData.department}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="12">
                              <FormGroup>
                                <Label>Phone (Direct)</Label>
                                <Input
                                  type="number"
                                  name="phone_direct"
                                  onChange={handleAddNewContact}
                                  value={newContactData && newContactData.phone_direct}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="12">
                              <FormGroup>
                                <Label>Fax (Direct)</Label>
                                <Input
                                  type="number"
                                  name="fax"
                                  onChange={handleAddNewContact}
                                  value={newContactData && newContactData.fax}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="12">
                              <FormGroup>
                                <Label>Mobile</Label>
                                <Input
                                  type="number"
                                  name="mobile"
                                  onChange={handleAddNewContact}
                                  value={newContactData && newContactData.mobile}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    AddNewContact();
                    addContactModal(false);
                  }}
                >
                  Submit
                </Button>
                <Button
                  color="secondary"
                  className="shadow-none"
                  onClick={addContactToggle.bind(null)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
}
