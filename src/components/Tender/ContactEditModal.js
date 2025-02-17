import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  ModalBody,
  ModalFooter,
  Modal,
  ModalHeader,
} from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';
import message from '../Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../views/form-editor/editor.scss';

import api from '../../constants/api';

const ContactEditModal = ({ contactData, editContactEditModal, setEditContactEditModal }) => {
  ContactEditModal.propTypes = {
    contactData: PropTypes.object,
    editContactEditModal: PropTypes.bool,
    setEditContactEditModal: PropTypes.func,
  };

  const [contactinsert, setContactInsert] = useState(null);

  const handleInputs = (e) => {
    setContactInsert({ ...contactinsert, [e.target.name]: e.target.value });
  };

  //Logic for edit data in db

  const editContactsData = () => {
    api
      .post('/clients/editContact', contactinsert)
      .then(() => {
        message('Record editted successfully', 'success');
        //  setTimeout(() => {
        //    window.location.reload()
        //  }, 300);
        window.location.reload();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
    // editContactById();
    setContactInsert(contactData);
  }, [contactData]);

  return (
    <>
      <Modal size="lg" isOpen={editContactEditModal}>
        <ModalHeader>
          ContactDetails
          <Button
            color="secondary"
            onClick={() => {
              setEditContactEditModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col md="3" className="mb-4 d-flex justify-content-between"></Col>
          </Row>
          <Row>
            <Col md="2">
              <Label>title </Label>
              <Input
                type="select"
                onChange={handleInputs}
                value={contactinsert && contactinsert.salutation}
                name="salutation"
              >
                <option value="" selected="selected">
                  Please Select
                </option>
                <option value="Ms">Ms</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
              </Input>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>Name</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.first_name}
                  name="first_name"
                />
              </FormGroup>
            </Col>

            <Col md="2">
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.email}
                  name="email"
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>Position </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.position}
                  name="position"
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>Dept </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.department}
                  name="department"
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>Phone(Direct) </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.phone_direct}
                  name="phone_direct"
                />
              </FormGroup>
            </Col>

            <Col md="2">
              <FormGroup>
                <Label>Fax(Direct) </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.fax}
                  name="fax"
                />
              </FormGroup>
            </Col>

            <Col md="2">
              <FormGroup>
                <Label>Mobile </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.mobile}
                  name="mobile"
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Row>
            <div className="pt-3 mt-3 d-flex align-items-center gap-2">
              <Button
                color="primary"
                onClick={() => {
                  editContactsData();
                }}
              >
                Submit
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setEditContactEditModal(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Row>
        </ModalFooter>

        <ComponentCard></ComponentCard>
      </Modal>
    </>
  );
};
export default ContactEditModal;
