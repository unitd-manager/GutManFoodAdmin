import React from 'react'
import { Row, Form,Table } from 'reactstrap';
import {  Link } from 'react-router-dom';
import PropTypes from 'prop-types'
// import ComponentCard from '../../components/ComponentCard';

export default function ClientTenderDataGet({tenderDetails}) {
  ClientTenderDataGet.propTypes = {
    tenderDetails: PropTypes.object
      }

  // Table Tender
  const columns3 = [
    {
      name: 'Tender Code',
     
    },

    {
      name: 'Title',
      
    },
    {
      name: 'Est Value',
      
    },
    {
      name: 'Status',
     
    },
  ];
  return (
    <Form>
              <Row>
                <Table id="example3" className="display border border-secondary rounded">
                  <thead>
                    <tr>
                      {columns3.map((cell) => {
                        return <td key={cell.name}>{cell.name}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {tenderDetails &&
                      tenderDetails.map((element) => {
                        return (
                          <tr key={element.opportunity_code}>
                            <td>{element.opportunity_code}</td>
                            <td>
                              {' '}
                              <Link to={`/TenderEdit/${element.opportunity_id}`}>
                                {element.title}
                              </Link>
                            </td>
                            <td>{element.price}</td>
                            <td>{element.status}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Row>
            </Form>
  )
}