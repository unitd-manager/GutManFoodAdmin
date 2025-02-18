import React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import ComponentCard from '../ComponentCard';
import { pocolumns, plcolumns } from '../../data/Tender/InventoryData';

function InventoryEditTables({ tabPurchaseOrdersLinked, projectsLinked }) {
  InventoryEditTables.propTypes = {
    tabPurchaseOrdersLinked: PropTypes.array,
    projectsLinked: PropTypes.array,
  };

  return (
    <div>
      <ComponentCard title="Purchase orders Linked">
        <Table id="example" className="display border border-secondary rounded">
          <thead>
            <tr>
              {pocolumns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {tabPurchaseOrdersLinked &&
              tabPurchaseOrdersLinked.map((element) => {
                return (
                  <tr key={element.title}>
                    <td>
                      <Link to={`/PurchaseOrderEdit/${element.purchase_order_id}`}>
                        {element.po_code}
                      </Link>
                    </td>

                    <td>
                      {element.purchase_order_date
                        ? moment(element.purchase_order_date).format('YYYY-MM-DD')
                        : ''}
                    </td>
                    <td>{element.title}</td>
                    <td>{element.company_name}</td>
                    <td>{element.cost_price}</td>
                    <td>{element.qty}</td>
                    <td>{element.supplier_name}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </ComponentCard>

      <ComponentCard title="Projects Linked">
        <Table id="examplepl" className="display border border-secondary rounded">
          <thead>
            <tr>
              {plcolumns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {projectsLinked &&
              projectsLinked.map((element) => {
                return (
                  <tr key={element.project_id}>
                    <td>{moment(element.material_used_date).format('YYYY-MM-DD')}</td>
                    <td>
                      <Link to={`/projectEdit/${element.project_id}`}>{element.title}</Link>
                    </td>
                    <td>{element.company_name}</td>
                    <td>{element.quantity}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </ComponentCard>
    </div>
  );
}

export default InventoryEditTables;
