import React from 'react'
import { Row, Form,Table } from 'reactstrap';
import {  Link } from 'react-router-dom';
import PropTypes from 'prop-types'
// import ComponentCard from '../../components/ComponentCard';

export default function ClientProjectDataGet({projectDetails}) {
  ClientProjectDataGet.propTypes = {
    projectDetails: PropTypes.any
      }

       // Table Project
  const columns1 = [
    {
      name: 'Project Code',
      
    },

    {
      name: 'Title',
     
    },
    {
      name: 'Project Value',
     
    },
    {
      name: 'Status',
      
    },
  ];
  return (
    <Form>
    <Row>
      <Table id="example1" className="display border border-secondary rounded">
        <thead>
          <tr>
            {columns1.map((cell) => {
              return <td key={cell.name}>{cell.name}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {projectDetails &&
            projectDetails.map((element) => {
              return (
                <tr key={element.project_code}>
                  <td>{element.project_code}</td>
                  <td>
                    <Link to={`/projectEdit/${element.project_id}`}>{element.title}</Link>
                  </td>
                  <td>{element.project_value}</td>
                  <td>{element.status}</td>
                </tr>
              )
            })}
        </tbody>
      </Table>
    </Row>
  </Form>
  )
}