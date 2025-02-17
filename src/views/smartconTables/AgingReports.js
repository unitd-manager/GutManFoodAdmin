import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { ToastContainer } from 'react-toastify';
import api from '../../constants/api';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const AgingReports = () => {
  //All state variable
  const [report, setReport] = useState(null);
  //Get data from Reports table
  const getAgingReports = () => {
    
    api
      .post('/reports/getAgingReports')
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
    getAgingReports();
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
      name: 'Company Name',
      selector: 'company_name',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: '15-30 days',
      selector: 'firstdays',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: '30-45days',
      selector: 'seconddays',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: '45-60days',
      selector: 'thirddays',
      grow: 0,
      wrap: true,
      width: '4%',
    },

  ];
  return (
    <>
        <BreadCrumbs />
        <ToastContainer></ToastContainer>
        <CommonTable
          title="Aging Report">
  
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
                  <tr key={element.invoice_id}>
                    <td>{index + 1}</td>
                    <td>{element.company_name}</td>
                    <td>{element.status==='Paid'?0:element.firstdays}</td>
                    <td>{element.status==='Paid'?0:element.seconddays}</td>
                    <td>{element.status==='Paid'?0:element.thirddays}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
    </>
  );
};
export default AgingReports;
