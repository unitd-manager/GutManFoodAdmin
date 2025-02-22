import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, Table } from 'reactstrap';
import PdfCreditNote from '../PDF/PdfCreditNote';

export default function CustomerFinanceCreditNote({ note }) {
  CustomerFinanceCreditNote.propTypes = {
    note: PropTypes.array,
  };
  //Structure of creditNote table
  const noteTableColumns = [
    { name: 'Code' },
    { name: 'Date' },
    { name: 'Amount' },
    { name: 'Print' },
  ];

  return (
    // Credit note tab
    <Form>
      <div className="MainDiv">
        <div className="container">
          <Table id="example">
            <thead>
              <tr>
                {noteTableColumns.map((cell) => {
                  return <td key={cell.name}>{cell.name}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              {note &&
                note.map((element) => {
                  return (
                    <tr key={element.credit_note_id}>
                      <td>{element.credit_note_code}</td>
                      <td>{moment(element.from_date).format('YYYY-MM-DD')}</td>
                      <td>{element.amount}</td>
                      <td>
                        {' '}
                        <PdfCreditNote
                          note={note}
                          creditId={element.credit_note_id}
                        ></PdfCreditNote>
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
