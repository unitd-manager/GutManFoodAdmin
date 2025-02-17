import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Form, Table } from 'reactstrap';
import ComponentCard from '../ComponentCard';

export default function SupplierTable({ subConWorkOrder }) {
  SupplierTable.propTypes = {
    subConWorkOrder: PropTypes.array,
  };

  const subConTableColumn = [
    {
      name: 'Date',
    },
    {
      name: 'Project',
    },
    {
      name: 'WO Code',
    },
    {
      name: 'Amount',
    },
    {
      name: 'Status',
    },
    {
      name: 'Balance',
    },
    {
      name: '',
    },
  ];

  return (
    <ComponentCard title="Work Order Linked">
      <Form>
        <div className="MainDiv">
          <div className="container">
            <Table id="example" className="display border border-secondary rounded">
              <thead title=" Work Order Linked ">
                <tr>
                  {subConTableColumn.map((cell) => {
                    return <td key={cell.name}>{cell.name}</td>;
                  })}
                </tr>
              </thead>
              <tbody>
                {subConWorkOrder &&
                  subConWorkOrder.map((element) => {
                    return (
                      <tr key={element.sub_con_id}>
                        <td>{moment(element.date).format('YYYY-MM-DD')}</td>
                        <td>
                          <Link to={`/ProjectEdit/${element.project_id}`}>{element.title}</Link>
                        </td>
                        <td>{element.sub_con_worker_code}</td>
                        <td>{element.amount}</td>
                        <td>
                          {/* {parseFloat(element.prev_amount) === 0 && 'Paid'}
                          {parseFloat(element.amount) === parseFloat(element.prev_amount) && 'New'}
                          {parseFloat(element.amount) > parseFloat(element.prev_amount) &&
                            'Partially Paid'} */}
                             {element.status}
                        </td>
                        <td>
                          {element.amount?parseFloat(element.amount) - parseFloat(element.prev_amount) :''
                      }
                        </td>
                        <td>
                          <Link to={`/SubConHistory/${element.sub_con_work_order_id}`}>
                            Receipt
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </Form>
    </ComponentCard>
  );
}
