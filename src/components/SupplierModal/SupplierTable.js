import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'
import {  Form, Table } from 'reactstrap';
import ComponentCard from '../ComponentCard';

export default function SupplierTable({purchaseOrder}) {
    SupplierTable.propTypes = {
        purchaseOrder: PropTypes.array,
      }
// structure of makesupplier payment tables
      const supplierTableColumn = [
        {
          name: "PO Date",
        },
        {
          name: "PO CODE",
          
        },
        {
          name: "PO value",
          
        },
        {
          name: "Balance",
         
        },
        {
          name: "Payment Status",
          
        },{
          name: "History",
         
        },
        
      ]

  return (
    <ComponentCard title='Purchase Order Linked'>
    <Form>
      <div className="MainDiv">
        <div className="container">

        <Table id="example" className="display border border-secondary rounded">
        <thead title='Purchase Order Linked '>
            <tr >
                {supplierTableColumn.map(cell=>{
                  return (<td key={cell.name}>{cell.name}</td>)
                })}
            </tr>
        </thead>
        <tbody>
          {purchaseOrder && purchaseOrder.map(element=>{
              return (<tr key={element.supplier_id}>
                <td >{moment(element.po_date).format('YYYY-MM-DD')}</td>
              <td><Link to={`/PurchaseOrderEdit/${element.purchase_order_id}`} >{element.po_code}</Link></td>
              <td>{element.po_value}</td>
              <td>{parseFloat?(element.po_value) - parseFloat(element.prev_amount) :''}</td>
              <td>{element.payment_status}</td>
              <td><Link to={`/SupplierHistory/${element.purchase_order_id}`}>View History</Link></td>
              </tr>)
          })}
        </tbody>
    </Table> 
        </div>
      </div>
    </Form>
  </ComponentCard>
)
}