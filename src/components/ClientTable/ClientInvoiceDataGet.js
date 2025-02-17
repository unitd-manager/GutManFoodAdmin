import React from 'react';
import { Row, Form, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function ClientInvoiceDataGet({ invoiceDetails }) {
  ClientInvoiceDataGet.propTypes = {
    invoiceDetails: PropTypes.any,
  };

  // Table Invoice
  const columns2 = [
    {
      name: 'Invoice Code',
    },

    {
      name: 'Title',
    },
    {
      name: 'Invoice Amount',
    },
    {
      name: 'Invoice Date',
    },
    {
      name: 'Invoice Due Date',
    },
    {
      name: 'Status',
    },
  ];
  return (
    <Form>
      <Row>
        <Table id="example2" className="display border border-secondary rounded">
          <thead>
            <tr>
              {columns2.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {invoiceDetails &&
              invoiceDetails.map((element) => {
                return (
                  <tr key={element.invoice_code}>
                    <td>
                      {' '}
                      <Link to={`/InvoiceEdit/${element.invoice_id}`}>{element.invoice_code}</Link>
                    </td>
                    <td>{element.project_title}</td>
                    <td>{element.invoice_amount}</td>
                    <td>{moment(element.invoice_date).format('YYYY-MM-DD')}</td>
                    <td>{moment(element.invoice_due_date).format('YYYY-MM-DD')}</td>
                    <td>{element.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Row>
    </Form>
  );
}
