import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import moment from 'moment';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Form, Table } from 'reactstrap';
import ComponentCard from '../ComponentCard';
import message from '../Message';
import api from '../../constants/api';

const SupplierHistory = () => {
  const [history, setHistory] = useState();
  const { id } = useParams();
  const navigate = useNavigate()
  // Get  By Id
  const getHistoryById = () => {
    api
      .post('/supplier/SupplierPayment', { purchase_order_id: id })
      .then((res) => {
        setHistory(res.data.data);
      })
      .catch(() => {
        message('Supplier Data Not Found', 'info');
      });
  };

  useEffect(() => {
    getHistoryById();
  }, []);

  const supplierHistoryColumn = [
    {
      name: 'Date',
    },
    {
      name: 'Amount',
    },
    {
      name: 'Mode Of Payment',
    },
    {
      name: 'Cancel',
    },
  ];
 
  const Supplier = (subConPaymentsId,PaymentsId) => {
    Swal.fire({
      title: `Are you sure? ${PaymentsId}`,
      text: 'Do you like to cancel the receipt?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.put('/supplier/updateSupplierPaymentsAndPurchaseOrder', {supplier_receipt_history_id: PaymentsId, supplier_receipt_id: subConPaymentsId,purchase_order_id: id }).then(() => {
          Swal.fire('Cancelled!');
          navigate(-1);
        });
      }
    });
  };

  return (
    <>
      <ComponentCard>
        <ToastContainer></ToastContainer>
        <Form>
          <div className="MainDiv">
            <div className="container">
              <Table id="Purchase Order Linked" className="display">
                <thead title="Purchase Order Linked ">
                  <tr>
                    {supplierHistoryColumn.map((cell) => {
                      return <td key={cell.name}>{cell.name}</td>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {history &&
                    history.map((element) => {
                      return (
                        <tr key={element.supplier_receipt_id}>
                          <td>{element.creation_date ? moment(element.creation_date).format('DD-MM-YYYY') : ''}</td>
                          <td>{element.amount}</td>
                          <td>{element.mode_of_payment}</td>
                          <td>
              {element.invoice_paid_status !== 'Cancelled' ? (
                <Link to="">
                <span onClick={() => Supplier(element.supplier_receipt_id,element.supplier_receipt_history_id,element.purchase_order_id,element.supplier_id)}>
                  <u>Cancel</u>
                  </span>
                  </Link>
              ) : (
                'Cancelled'
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
      </ComponentCard>
    </>
  );
};
export default SupplierHistory;
