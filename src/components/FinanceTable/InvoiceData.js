import React, { useState,useEffect } from 'react';
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
// import { convertToRaw,EditorState,ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
// import draftToHtml from 'draftjs-to-html';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import * as $ from 'jquery';
import random from 'random';
import api from '../../constants/api';
import message from '../Message';
// import ComponentCard from '../ComponentCard';
import InvoiceTable from './InvoiceTable';

const FinanceInvoiceData = ({ editInvoiceData, setEditInvoiceData, projectInfo, orderId }) => {
  FinanceInvoiceData.propTypes = {
    editInvoiceData: PropTypes.bool,
    setEditInvoiceData: PropTypes.func,
    projectInfo: PropTypes.any,
    orderId: PropTypes.any,
  };
  //All state Varible
  const { id } = useParams();
  const [totalAmount, setTotalAmount] = useState(0);
  const [gstValue, setGstValue] = useState();
  // const [paymentTerms, setPaymentTerms] = useState('');
  const gstPercentageValue = parseInt(gstValue?.value, 10) || 0; 
  const [createInvoice, setCreateInvoice] = useState({
    discount: '',
    quote_code: '',
    po_number: '',
    project_location: '',
    project_reference: '',
    invoice_date: '',
    code: '',
    so_ref_no: '',
    site_code: '',
    attention: '',
    reference: '',
    invoice_terms: '',
    status: 'due',
    paymentTerms: '',
    invoice_code: '',
    order_id: id,
    invoice_due_date: ''
  });
  const [addLineItem, setAddLineItem] = useState([
    {
      id: random.int(1, 99),
      unit: '',
      qty: '',
      unit_price: '',
      total_cost: '',
      remarks: '',
      item_title: '',
      description: '',
    },
  ]);

  const getGstValue = () => {
    api.get('/finance/getGst').then((res) => {
      setGstValue(res.data.data);
      });
  };



  //setting data in createinvoice
  const handleInserts = (e) => {
    setCreateInvoice({ ...createInvoice, [e.target.name]: e.target.value });
  };
  // const handleDataEditor = (e, type) => {
  //   setCreateInvoice({
  //     ...createInvoice,
  //     [type]: draftToHtml(convertToRaw(e.getCurrentContent())),
  //   });
  // };

  //Insert Invoice Item
  const addLineItemApi = (obj) => {
    obj.order_id = projectInfo;
    api
      .post('/invoice/insertInvoiceItem', obj)
      .then(() => {
        message('Line Item Added Successfully', 'sucess');
      })
      .catch(() => {
        message('Cannot Add Line Items', 'error');
      });
  };

  const fetchTermsAndConditions = () => {
    api.get('/setting/getSettingsForPaymentTerms')
      .then((res) => {
        const settings = res.data.data;
        if (settings && settings.length > 0) {
          const fetchedTermsAndCondition = settings[0].value; // Assuming 'value' holds the terms and conditions
          // Update the payment terms in createInvoice
          setCreateInvoice({ ...createInvoice, payment_terms: fetchedTermsAndCondition });
          const contentBlock = htmlToDraft(fetchedTermsAndCondition);
          if (contentBlock) {
            // const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            // const editorState = EditorState.createWithContent(contentState);
            // setPaymentTerms(editorState);
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching terms and conditions:', error);
      });
  };

  useEffect(() => {
    fetchTermsAndConditions();
    // Other useEffect logic
  }, []);
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
  const onchangeItem = (selectedValue) => {
    const updatedItems = addLineItem.map((item) => {
      if (item.unit === selectedValue.value) {
        // Compare with selectedValue.value
        return {
          ...item,
          unit: selectedValue.value, // Update the unit with the selected option's value
          value: selectedValue.value, // Update the value with the selected option's value
        };
      }
      return item;
    });

    setAddLineItem(updatedItems);
  };
  //final api call
  const finalinsertapi = (receipt, results) => {
    for (let j = 0; j < results.length; j++) {
      addLineItemApi({
        description: results[j].description,
        invoice_id: receipt,
        total_cost: results[j].total_cost,
        item_title: results[j].item_title,
        item_code: projectInfo.item_code,
        cost_price: 2,
        qty: results[j].qty,
        unit: results[j].unit,
        remarks: results[j].remarks,
        unit_price: parseFloat(results[j].unit_price),
      });
    }
  };
  //Insert Invoice
  const insertInvoice = async (results, code,) => {
    createInvoice.invoice_amount = totalAmount + (gstPercentageValue / 100) * totalAmount;
    createInvoice.gst_value = (gstPercentageValue / 100) * totalAmount;
    createInvoice.gst_percentage = gstPercentageValue;
    // createInvoice.project_id = projectInfo;
    createInvoice.order_id = orderId;
    createInvoice.invoice_code = code;
    // Add the project_id to the createInvoice object
  createInvoice.project_id = projectInfo; // Assuming projectInfo is the project_id
  // Access project_id from nested object (e.g., projectInfo.details.project_id)
  createInvoice.project_id = projectInfo.project_id;

    const now = new Date();
    if (now.getMonth() === 11) {
      const current = new Date(now.getFullYear() + 1, 0, now.getDate());
      createInvoice.invoice_due_date = current;
    } else {
      const current = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
      createInvoice.invoice_due_date = current;
    }
    api
      .post('/finance/insertInvoice', createInvoice)
      .then((res) => {
        message('Invoice inserted successfully.', 'success');
        finalinsertapi(res.data.data.insertId, results);
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch(() => {
        message('Network connection error.');
      });
  };
  //generateCode
  const generateCode = (results,type) => {
    api
      .post('/tender/getCodeValue', { type })
      .then((res) => {
        insertInvoice(results, res.data.data);
      })
      .catch(() => {
        insertInvoice(results, '');
      });
  };

  //Add new line item
  const AddNewLineItem = () => {
    setAddLineItem([
      ...addLineItem,
      {
        id: new Date().getTime().toString(),
        uom: '',
        qty: '',
        unitprice: '',
        total_cost: '',
        remarks: '',
        item: '',
        description: '',
      },
    ]);
  };
  useEffect(() => {
    getGstValue();
    getUnit();
    //getCheckBox();
  }, [orderId]);

  //Invoice item values
  const getAllValues = () => {
    const result = [];
    let hasZeroTotalCost = false; 
    $('.lineitem tbody tr').each(function input() {
      const allValues = {};
      $(this)
        .find('input')
        .each(function output() {
          const fieldName = $(this).attr('name');
          allValues[fieldName] = $(this).val();
        });
        allValues.total_cost = allValues.qty * allValues.unit_price;
        if (allValues.total_cost === 0) {
          hasZeroTotalCost = true; // Set the flag if total_cost is 0
        }
      result.push(allValues);
    });
    if (hasZeroTotalCost) {
      message('Total cost cannot be 0.', 'error');
      return; // Prevent further processing if total_cost is 0
    }
    setTotalAmount(0);
    setAddLineItem([
      {
        id: random.int(1, 99),
        unit: '',
        qty: '',
        unit_price: '',
        total_cost: '',
        remarks: '',
        item_title: '',
        description: '',
      },
    ]);
    generateCode(result, 'invoicestype');
  };
  //Invoice Items Calculation
  const calculateTotal = () => {
    let totalValue = 0;
    const result = [];
    $('.lineitem tbody tr').each(function input() {
      const allValues = {};
      $(this)
        .find('input')
        .each(function output() {
          const fieldName = $(this).attr('name');
          allValues[fieldName] = $(this).val();
          allValues.total_cost = allValues.qty * allValues.unit_price;
        });
      result.push(allValues);
    });
    result.forEach((e) => {
      if (e.total_cost) {
        totalValue += parseFloat(e.total_cost);
      }
    });
    setAddLineItem(result);
    setTotalAmount(totalValue);
  };

  // Clear row value
  const ClearValue = (ind) => {
    setAddLineItem((current) =>
      current.filter((obj) => {
        return obj.id !== ind.id;
      }),
    );
    if (ind.total_cost) {
      const finalTotal = totalAmount - parseFloat(ind.total_cost);
      setTotalAmount(finalTotal);
    }
  };
  return (
    <>
      <Modal size="xl" isOpen={editInvoiceData}>
        <ModalHeader>
          Create Invoice
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setEditInvoiceData(false);
            }}
          >
            X
          </Button>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Form>
                <Row>
                  <Col md="3">
                    <Button
                      className="shadow-none"
                      color="primary"
                      type="button"
                      onClick={() => {
                        AddNewLineItem();
                      }}
                    >
                      Add Line Item
                    </Button>
                  </Col>
                  {/* Invoice Detail */}
                  <Row>
                    <InvoiceTable createInvoice={createInvoice} handleInserts={handleInserts} />
                    {/* Description form */}
                    {/* <ComponentCard title="Description">
                      <Editor
                        editorState={paymentTerms}
                        wrapperClassName="demo-wrapper mb-0"
                        editorClassName="demo-editor border mb-4 edi-height"
                        onEditorStateChange={(e) => {
                          handleDataEditor(e, 'payment_terms');
                          setPaymentTerms(e);
                        }}
                      />
                    </ComponentCard> */}
                  </Row>
                  {/* Invoice Item */}
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
                          {addLineItem.map((item) => {
                            return (
                              <tr key={item.id}>
                                <td data-label="Item">
                                  <Input defaultValue={item.item} type="text" name="item_title" />
                                </td>
                                <td data-label="Description">
                                  <Input
                                    defaultValue={item.description}
                                    type="text"
                                    name="description"
                                  />
                                </td>
                                <td data-label="UoM">
                                  <Select
                                    name="unit"
                                    onChange={(selectedOption) => {
                                      onchangeItem(selectedOption);
                                    }}
                                    options={unitdetails}
                                  />
                                </td>
                                <td data-label="Qty">
                                  <Input defaultValue={item.qty} type="number" name="qty" />
                                </td>
                                <td data-label="Unit Price">
                                  <Input
                                    defaultValue={item.unit_price}
                                    onBlur={() => {
                                      calculateTotal();
                                    }}
                                    type="number"
                                    name="unit_price"
                                  />
                                </td>
                                <td data-label="Total Price">
                                  <Input
                                    defaultValue={item.total_cost}
                                    type="text"
                                    name="total_cost"
                                    disabled
                                  />
                                </td>
                                <td data-label="Remarks">
                                  <Input defaultValue={item.remarks} type="text" name="remarks" />
                                </td>
                                <td data-label="Action">
                                  <div className="anchor">
                                    <Input type="hidden" name="id" defaultValue={item.id}></Input>
                                    <span
                                      onClick={() => {
                                        ClearValue(item);
                                      }}
                                    >
                                      Clear
                                    </span>
                                  </div>
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
                        getAllValues();
                      }}
                    >
                      {' '}
                      Submit{' '}
                    </Button>
                    <Button
                      className="shadow-none"
                      color="secondary"
                      onClick={() => {
                        setEditInvoiceData(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Row>
              </Form>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default FinanceInvoiceData;
