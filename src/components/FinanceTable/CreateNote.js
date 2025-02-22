import React, { useEffect, useState } from 'react';
import {
  CardBody,
  Row,
  Col,
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
  Label,
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import $ from 'jquery';
import api from '../../constants/api';

const CreateNote = ({ editCreateNote, setEditCreateNote }) => {
  CreateNote.propTypes = {
    editCreateNote: PropTypes.bool,
    setEditCreateNote: PropTypes.func,
  };
  const [createNoteAmount, setCreateNoteAmount] = useState(null);
  const [createInvoiceNote, setCreateInvoiceNote] = useState(null);
  //edit Tab Costing Summary Form
  const { id } = useParams();

  const [amount, setAmount] = useState({
    amount: 0,
    order_id: id,
  });
  const handleInputs = (e) => {
    setCreateNoteAmount({ ...createNoteAmount, [e.target.name]: e.target.value });
  };

  const editInvoiceCreditData = (obj) => {
    api
      .post('/Finance/insertcredit_note_history', obj)
      .then((res) => {
        setCreateInvoiceNote(res.data.data);
      })
  };

  const finalapicall = (receipt, results) => {
    // Insert Receipt History

    for (let j = 0; j < results.length; j++) {
      if (results[j].amount !== '') {
        editInvoiceCreditData({
          invoice_id: results[j].invoice_id,
          credit_note_id: receipt,
          invoice_code: results[j].invoice_code,
          item_title: results[j].item_title,
          amount: results[j].amount,
          description: results[j].description,
          modified_by: '',
        });
      }
    }
  };

  const editCreditData = async (results, code) => {
    amount.credit_note_code = code;
    api
      .post('/Finance/insertcredit_note', amount)
      .then((res) => {
        setCreateNoteAmount(res.data.data);
        finalapicall(res.data.data.insertId, results);
        window.location.reload();
      })
  };

  //generateCode
  const generateCode = (results, type) => {
    api
      .post('/tender/getCodeValue', { type })
      .then((res) => {
        editCreditData(results, res.data.data);
      })
      .catch(() => {
        editCreditData(results, '');
      });
  };
  let totalValue = 0;
  const getAllValues = () => {
    const result = [];

    $('.display tbody tr').each(function input() {
      const allValues = {};
      $(this)
        .find('input')
        .each(function output() {
          const fieldName = $(this).attr('name');
          allValues[fieldName] = $(this).val();
        });
      result.push(allValues);
    });
    result.forEach((e) => {
      if (e.amount) {
        totalValue += parseFloat(e.amount) + (7 / 100) * e.amount;
      }
      amount.amount = totalValue;
    });
    setAmount({ amount: totalValue });
    generateCode(result, 'creditNote');

    result.forEach((obj) => {
      if (obj.item_title !== '' && obj.description && obj.amount) {
        editInvoiceCreditData(obj, totalValue);
      }
    });

    // editCreditData(amount);
  };

  const [crediteNote, setCreditNote] = useState(null);
  const getCredit = () => {
    api.post('/invoice/getInvoiceById', { order_id: id }).then((res) => {
      setCreditNote(res.data.data);
    });
  };
  useEffect(() => {
    getCredit();
  }, [id]);

  const columns = [
    {
      name: 'Invoice Code',
      selector: 'invoice_code',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Amount',
      selector: 'invoice_amount',
      grow: 0,
      width: '1%',
      wrap: true,
    },
    {
      name: 'Invoice Id',
      selector: 'invoice_id',
      grow: 0,
      width: '1%',
      wrap: true,
    },
    {
      name: 'Title',
      selector: ' ',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Description',
      selector: ' ',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Credit Amount',
      selector: ' ',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
  ];

  return (
    <>
      <Modal size="xl" isOpen={editCreateNote}>
        <ModalHeader>
          Credit Note
          <Button
            color="secondary"
            onClick={() => {
              setEditCreateNote(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col md="12">
                <CardBody>
                  <Form>
                    <Row>
                      <div className="container">
                        <Table id="example" className="display">
                          <thead>
                            <tr>
                              {columns.map((cell) => {
                                return <td key={cell.name}>{cell.name}</td>;
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {crediteNote &&
                              crediteNote.map((element) => {
                                return (
                                  <tr key={element.invoice_code}>
                                    <td>
                                      <Input value={element.invoice_code} />{' '}
                                    </td>
                                    <td>{element.invoice_amount}</td>
                                    <td>
                                      <Input
                                        type="text"
                                        name="invoice_id"
                                        value={element.invoice_id}
                                      />
                                    </td>
                                    <td>
                                      <Input
                                        type="text"
                                        name="item_title"
                                        value={createInvoiceNote && createInvoiceNote.item_title}
                                      ></Input>
                                    </td>
                                    <td>
                                      <Input
                                        type="text"
                                        name="description"
                                        value={createInvoiceNote && createInvoiceNote.description}
                                      ></Input>
                                    </td>
                                    <td>
                                      <Input
                                        type="text"
                                        name="amount"
                                        value={createInvoiceNote && createInvoiceNote.amount}
                                      ></Input>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </Table>
                        <Label>Date</Label>
                        <Input
                          type="date"
                          name="from_date"
                          onChange={handleInputs}
                          value={createNoteAmount && createNoteAmount.from_date}
                        ></Input>
                        <Label>Notes</Label>
                        <Input
                          type="text"
                          name="remarks"
                          onChange={handleInputs}
                          value={createNoteAmount && createNoteAmount.remarks}
                        ></Input>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            type="button"
            onClick={() => {
              getAllValues();
            }}
          >
            Submit
          </Button>
          <Button color="secondary" onClick={() => { setEditCreateNote(false) }}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CreateNote;
