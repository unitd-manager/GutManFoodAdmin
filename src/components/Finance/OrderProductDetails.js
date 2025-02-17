import React from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'reactstrap';
// import api from '../../constants/api';
// import message from '../Message';


export default function OrderProductDetails({
  historyDetails,
  
}) {
  OrderProductDetails.propTypes = {
    historyDetails: PropTypes.array,
    };
  // const [setCreateInvoice ] = useState();

  //Structure of Invoice table
  const invoiceTableColumns = [
    { name: 'Order Item' },
     { name: 'Product Name' },
    { name: 'Quantity' },
    { name: 'Cost Price' },
    { name: 'Delivery Date' },
    ];

  return (
    // Invoice Tab
   
      <Form>
      
          <div className="container">
            <Table id="example">
              <thead>
                <tr>
                  {invoiceTableColumns.map((cell) => {
                    return <td key={cell.name}>{cell.name}</td>;
                  })}
                </tr>
              </thead>
              <tbody>
                {historyDetails &&
                  historyDetails.map((element) => {
                    return (
                      <tr key={element.order_item_id}>
                        <td>{element.order_item_id}</td>
                        <td>{element.item_title}</td>
                        <td>{element.qty}</td>
                        <td>{element.unit_price}</td>
                        <td>{element.delivery_date}</td>
                        <td>
                       </td>
                     
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
           
          </div>
        
      </Form>
  );
}
