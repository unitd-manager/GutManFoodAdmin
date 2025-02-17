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
import { useParams, Link } from 'react-router-dom';
import { Form, Table } from 'reactstrap';
import ComponentCard from '../ComponentCard';
import message from '../Message';
import api from '../../constants/api';

const SubConHistory = () => {
  const [history, setHistory] = useState();
  const { id } = useParams();

  // Get  By Id

  const getHistoryById = () => {
    api
      .post('/subcon/SubConPayment', { sub_con_work_order_id: id })
      .then((res) => {
        setHistory(res.data.data);
        // console.log(res);
      })
      .catch(() => {
        message('SubCon Data Not Found', 'info');
      });
  };

  useEffect(() => {
    getHistoryById();
  }, []);

  const subConHistoryColumn = [
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

  const SubCon = () => {
    Swal.fire({
      title: `Are you sure? ${id}`,
      text: 'Do you like to cancel the receipt?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/subcon/SubConPayment', { sub_con_work_order_id: id }).then(() => {
          // console.log(res);
          Swal.fire('Cancelled!');
          getHistoryById();
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
              <Table id="Work Order Linked" className="display">
                <thead title="WorkOrder Linked ">
                  <tr>
                    {subConHistoryColumn.map((cell) => {
                      return <td key={cell.name}>{cell.name}</td>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {history &&
                    history.map((element) => {
                      return (
                        <tr key={element.sub_con_work_order_id}>
                          <td>{moment(element.date).format('YYYY-MM-DD')}</td>
                          <td>{element.amount}</td>
                          <td>{element.mode_of_payment}</td>
                          <td>
                            <Link to="">
                              <span onClick={() => SubCon(element.sub_con_work_order_id)}>
                                Cancel
                              </span>
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
    </>
  );
};
export default SubConHistory;
