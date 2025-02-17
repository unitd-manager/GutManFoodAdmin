import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import moment from 'moment';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { ToastContainer } from 'react-toastify';
import api from '../../constants/api';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
// import ExportReport from '../../components/Report/ExportReport';

const Employeertrainingeports = () => {
  //All state variable
  const [report, setReport] = useState(null);
  //Get data from Reports table
  const getEmployeeTraining = () => {
    api
      .post('/reports/getEmployeeReports')
      .then((res) => {
        setReport(res.data.data);
      })
      .catch(() => {
        message('Reports Data Not Found', 'info');
      });
  };
  useEffect(() => {
    setTimeout(() => {
      $('#example').DataTable({
        pagingType: 'full_numbers',
        pageLength: 20,
        processing: true,
        dom: 'Bfrtip',
        buttons: [
          {
            extend: 'csv',
            text: 'CSV',
            className: 'shadow-none btn btn-primary',
           
          },
          {
            extend: 'print',
            text: 'Print',
            className: 'shadow-none btn btn-primary',
           
          },
          
        ],
      });
    }, 1000);
    getEmployeeTraining();
  }, []);
  //structure of Training list view
  const columns = [
    {
      name: '#',
      grow: 0,
      wrap: true,
      width: '4%',
    },
   
    {
      name: 'Title',
      selector: 'training_title',
      grow: 0,
      wrap: true,
      width: '4%',
    },

    {
      name: 'Employee',
      selector: 'first_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'From Date',
      selector: 'from_date',
      sortable: true,
      grow: 0,
    },
    {
      name: 'To Date',
      selector: 'to_date',
      sortable: true,
      grow: 0,
    },
  ];
  return (
    <>
        <BreadCrumbs />
        <ToastContainer></ToastContainer>
        <CommonTable
          title="Employee Training Expiry Report">
  
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {report &&
              report.map((element, index) => {
                return (
                  <tr key={element.title}>
                    <td>{index + 1}</td>
                    <td>{element.training_title}</td>
                    <td>{element.first_name}</td>
                    <td>{moment(element.from_date).format('YYYY-MM-DD')}</td>
                    <td>{moment(element.to_date).format('YYYY-MM-DD')}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
    </>
  );
};
export default Employeertrainingeports;
