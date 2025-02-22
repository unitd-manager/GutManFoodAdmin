import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, Table } from 'reactstrap';
import PdfCreateReceipt from '../PDF/PdfCreateReceiptss'

export default function CustomerFinanceReceipt({
  receipt,
  setEditReceiptModal,
  setReceiptDataModal,
  receiptCancel,
  financeDetails, 
}) {
  CustomerFinanceReceipt.propTypes = {
    receipt: PropTypes.array,
    setEditReceiptModal: PropTypes.func,
    setReceiptDataModal: PropTypes.func,
    receiptCancel: PropTypes.func,
    financeDetails: PropTypes.any,
  };

  //Structure of Receipt table
  const receiptTableColumns = [
    { name: 'Receipt Code' },
    { name: 'Status' },
    { name: 'Receipt Date' },
    { name: 'Mode Of Payment' },
    { name: 'Receipt Amount' },
    { name: 'Print' },
    { name: 'View' },
    { name: 'Cancel' },
  ];

  return (
    //Receipt tab

    <Form>
      <div className="MainDiv">
        <div className="container">
          <Table id="example">
            <thead>
              <tr>
                {receiptTableColumns.map((cell) => {
                  return <td key={cell.name}>{cell.name}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              {receipt &&
                receipt.map((element) => {
                  const balanceAmountClass =
                    element.receipt_status.toLowerCase() === 'cancelled' ? 'text-danger' : '';
                  return (
                    <tr key={element.receipt_id}>
                      <td>{element.receipt_code}</td>
                      <td className={balanceAmountClass}>{element.receipt_status}</td>
                      <td>{element.receipt_date ? moment(element.receipt_date).format('DD-MM-YYYY') : ''}</td>
                      <td>{element.mode_of_payment}</td>
                      <td>{element.amount}</td>
                      <td><PdfCreateReceipt financeDetails={financeDetails} receiptId ={element.receipt_id}></PdfCreateReceipt></td>
                      <td>
                        <span
                          className="addline"
                          onClick={() => {
                            setEditReceiptModal(element);
                            setReceiptDataModal(true);
                          }}
                        >
                          View
                        </span>
                      </td>

                      <td>
                        {element.receipt_status.toLowerCase() === 'paid' && (
                          <span
                            onClick={() => {
                              if (
                                window.confirm(
                                  'Are you sure you want to cancel?\n\nYou will lose any changes made',
                                )
                              ) {
                                receiptCancel(element,element.invoice_id);
                              }
                            }}
                          >
                            Cancel
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
    </Form>
  );
}
