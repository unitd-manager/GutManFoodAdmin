import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
// import { Editor } from 'react-draft-wysiwyg';
import { useParams } from 'react-router-dom';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import { EditorState, convertToRaw, ContentState } from 'draft-js';
import Select from 'react-select';
import api from '../../constants/api';
import message from '../Message';
import InvoiceModalTable from './InvoiceModalTable';

const InvoiceModal = ({ editInvoiceModal, editModal, setEditModal, invoiceDatas }) => {
  InvoiceModal.propTypes = {
    editInvoiceModal: PropTypes.any,
    editModal: PropTypes.bool,
    setEditModal: PropTypes.func,
    invoiceDatas: PropTypes.func
  };
  //All state variable
  //const [totalAmount, setTotalAmount] = useState(0);
  //const [paymentTerms, setPaymentTerms] = useState('');
  // const [conditions, setConditions] = useState('');
  const [invoiceData, setInvoiceData] = useState(invoiceDatas);
  const { id } = useParams();
  //Add Line Item
  const [addLineItem, setAddLineItem] = useState([
    {
      invoice_item_id: id,
    }
  ]);

  //setting value in invoiceData
  const handleInputs = (e) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  };

  const [unitdetails, setUnitDetails] = useState();
  // Fetch data from API
  const getUnit = () => {
    api.get('/product/getUnitFromValueList', unitdetails).then((res) => {
      const items = res.data.data;
      const finaldat = [];
      items.forEach((item) => {
        finaldat.push({ value: item.value, label: item.value });
      });
      setUnitDetails(finaldat);
    });
  };


  // function updateState(index, property, e) {
  //   const copyDeliverOrderProducts = [...addLineItem];
  //   const updatedObject = { ...copyDeliverOrderProducts[index], [property]: e.target.value };

  // const quantity = parseFloat(updatedObject.qty) || 0;
  // const unitPrice = parseFloat(updatedObject.unit_price) || 0;
  // // const totalCost = parseFloat(updatedObject.total_cost);
  // updatedObject.total_cost = quantity * unitPrice;

  //   copyDeliverOrderProducts[index] = updatedObject;
  //   setAddLineItem(copyDeliverOrderProducts);
  // }
  const updateState = (e, index) => {
    const updatedLineItems = [...addLineItem];

    updatedLineItems[index] = {
      ...updatedLineItems[index],
      [e.target.name]: e.target.value,
    };
    setAddLineItem(updatedLineItems);
  };
  const onchangeItem = (selectedValue, index) => {
    const updatedItems = [...addLineItem];

    updatedItems[index] = {
      ...updatedItems[index],
      unit: selectedValue.value,
      value: selectedValue.value,
    };

    setAddLineItem(updatedItems);
  };

  // const handleDataEditor = (e, type) => {
  //   setInvoiceData({ ...invoiceData, [type]: draftToHtml(convertToRaw(e.getCurrentContent())) });
  // };
  // const convertHtmlToDraftcondition = (existingQuoteformal) => {
  //   if (existingQuoteformal && existingQuoteformal.payment_terms) {
  //     const contentBlock = htmlToDraft(existingQuoteformal && existingQuoteformal.payment_terms);
  //     if (contentBlock) {
  //       const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  //       const editorState = EditorState.createWithContent(contentState);
  //       setConditions(editorState);
  //     }
  //   }
  // };
  //getting data from invoice id
  const getInvoice = () => {
    api
      .post('/invoice/getInvoiceByInvoiceId', { invoice_id: editInvoiceModal.invoice_id })
      .then((res) => {
        setInvoiceData(res.data.data);
        console.log('invoice', res.data.data);
      });
  };
  //get invoice line item
  const getLineItem = () => {
    api
      .post('/invoice/getInvoiceItemsById', { invoice_id: editInvoiceModal.invoice_id })
      .then((res) => {
        setAddLineItem(res.data.data);
      });
  };
  //Edit invoice
  const editInvoice = () => {
    //invoiceData.invoice_amount = totalAmount + (7 / 100) * totalAmount;
    invoiceData.order_id = id;
    api
      .post('/Finance/editInvoicePortalDisplay', invoiceData)
      .then(() => {
        message('Invoice edited successfully.', 'success');
        window.location.reload();
      })
      .catch(() => {
        message('Network connection error.');
      });
  };
  //editlineitem
  const editLineItemApi = () => {

    addLineItem.forEach((item) => {
      //item.invoice_id=id;
      api
        .post('/Finance/editInvoiceItem', item)
        .then(() => {
          message('Line Item Edited Successfully', 'sucess');
        })
        .catch(() => {
          message('Cannot Edit Line Items', 'error');
        });
    })
  };

  //Add line item API



  // Clear row value

  useEffect(() => {
    getLineItem();
    getInvoice();
    getUnit();
    // convertHtmlToDraftcondition(invoiceDatas);
    setInvoiceData(editInvoiceModal);
  }, [invoiceDatas, editInvoiceModal]);
  return (
    <>
      <Modal size="xl" isOpen={editModal}>
        <ModalHeader>
          Create Invoice
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setEditModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <InvoiceModalTable invoiceData={invoiceData} handleInputs={handleInputs} />
              {/* <Col md='12'>
                <Editor
                  editorState={conditions}
                  wrapperClassName="demo-wrapper mb-0"
                  editorClassName="demo-editor border mb-4 edi-height"
                  onEditorStateChange={(e) => {
                    handleDataEditor(e, 'payment_terms');
                    setConditions(e);
                  }}
                />
              </Col> */}
            </Row>
            <Row>
              <Col>
                <table className="lineitem">
                  <thead>
                    <tr>
                      <th scope="col">Item</th>
                      <th scope="col">Description </th>
                      <th scope="col">UoM</th>
                      <th scope="col">Qty</th>
                      <th scope="col">Unit Price</th>
                      <th scope="col">Total Price</th>
                      <th scope="col">Remarks</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {addLineItem &&
                      addLineItem.map((item, index) => {
                        return (
                          <tr key={item.id}>
                            <td data-label="Item">
                              <Input
                                value={item.item_title}
                                type="text"
                                name="item_title"
                                onChange={(e) => updateState(e, index, item.invoice_item_id)}
                              />
                            </td>
                            <td data-label="Description">
                              <Input
                                value={item.description}
                                type="text"
                                name="description"
                                onChange={(e) => updateState(e, index, item.invoice_item_id)}
                              />
                            </td>
                            {/* <td data-label="UoM">
                              <Input
                                defaultValue={item.unit}
                                type="text"
                                name="unit"
                                onChange={(e) => updateState(e, index, item.invoice_item_id)}
                                
                              />
                            </td> */}
                            <td>
                              <Select
                                name="unit"
                                value={{ value: item.unit, label: item.unit }}
                                onChange={(selectedOption) => onchangeItem(selectedOption, index)}
                                options={unitdetails}
                              />
                            </td>

                            <td data-label="Qty">
                              <Input
                                value={item.qty}
                                type="number"
                                name="qty"
                                onChange={(e) => updateState(e, index, item.invoice_item_id)}
                                disabled
                              />
                            </td>
                            <td data-label="Unit Price">
                              <Input
                                value={item.unit_price}
                                type="number"
                                name="unit_price"
                                onChange={(e) => updateState(e, index, item.invoice_item_id)}
                                disabled
                              />
                            </td>

                            <td data-label="Total Price">

                              <Input
                                value={item.total_cost}
                                type="text"
                                name="total_cost"
                                onChange={(e) => updateState(e, index, item.invoice_item_id)}
                                disabled
                              />
                            </td>
                            <td data-label="Remarks">
                              <Input value={item.remarks} type="text" name="remarks"
                                onChange={(e) => updateState(e, index, item.invoice_item_id)}
                              />
                            </td>

                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </Col>
            </Row>
            <ModalFooter>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  editInvoice();
                  editLineItemApi();
                }}
              >
                {' '}
                Submit{' '}
              </Button>
              <Button
                className="shadow-none"
                color="secondary"
                onClick={() => {
                  setEditModal(false);
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default InvoiceModal;
