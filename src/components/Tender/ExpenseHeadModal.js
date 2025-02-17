import React, { useEffect, useState } from 'react';
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
import message from '../Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../views/form-editor/editor.scss';
import api from '../../constants/api';

//  Modal insert
const ExpenseHeadModal = ({ expenseData, ExpenseSuphead, SetExpenseSuphead }) => {
  ExpenseHeadModal.propTypes = {
    expenseData: PropTypes.object,
    ExpenseSuphead: PropTypes.bool,
    SetExpenseSuphead: PropTypes.func,
  };
  //Const Variables
  const [Expense, SetExpense] = useState(null);
  //Setting data in Expense
  const handleInputs = (e) => {
    SetExpense({ ...Expense, [e.target.name]: e.target.value });
  };
  //Logic for edit data in db
  const ExpenseData = () => {
    api
      .post('/expensehead/editsubExpenseHead', Expense)
      .then(() => {
        message('Record editted successfully', 'success');
         setTimeout(() => {
        window.location.reload();
         }, 300);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  useEffect(() => {
    SetExpense(expenseData);
  }, [expenseData]);

  return (
    <>
      <Modal size="lg" isOpen={ExpenseSuphead}>
        <ModalHeader>
          New Sub Head
          <Button
            color="secondary"
            onClick={() => {
              SetExpenseSuphead(false);
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
            <Col md="6">
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={Expense && Expense.title}
                  name="title"
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
                  ExpenseData();
                }}
              >
                Submit
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  SetExpenseSuphead(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Row>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default ExpenseHeadModal;
