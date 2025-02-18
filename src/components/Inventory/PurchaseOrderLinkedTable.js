import React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import ComponentCard from '../ComponentCard';


function PurchaseOrderLinkedTable({ tabPurchaseOrdersLinked,  arb, }) {
    PurchaseOrderLinkedTable.propTypes = {
    tabPurchaseOrdersLinked: PropTypes.array,
    arb: PropTypes.any,
  };

  

  return (
    <div>
      <ComponentCard title={arb ? 'أوامر الشراء مرتبطة': 'Purchase Orders Linked'}>
        <Table id="example" className="display border border-secondary rounded">
          <thead>
            <tr>
            <th scope="col">{arb ?'رمز الشراء':'PO Code'}</th>
            <th scope="col">{arb ?'تاريخ أمر الشراء':'PO Date'}</th>
            {/* <th scope="col">{arb ?'عنوان المشروع':'Project Title'}</th> */}
            <th scope="col">{arb ?' اسم العميل ':'Client Name'}</th>
            <th scope="col">{arb ?'كمية ':'Amount'}</th>
            <th scope="col">{arb ?'كمية':'Qty'}</th>
            </tr>
          </thead>
          <tbody>
            {tabPurchaseOrdersLinked &&
              tabPurchaseOrdersLinked.map((element) => {
                return (
                  <tr>
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
                    {/* <td>{element.title}
                        { arb === true && element.title_arb} </td> */}
                    <td>{element.supplier_name}
                       </td>
                    <td>{element.cost_price}
                       </td>
                    <td>{element.qty}
                        </td>
                   
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </ComponentCard>
    </div>
  );
}

export default PurchaseOrderLinkedTable;
