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
import moment from 'moment';
import api from '../../constants/api';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
 import PdfIR8AReport from '../../components/PDF/PdfIR8AReport';

const InvoiceMonthReports = () => {
  //All state variable
  const [report, setReport] = useState(null);
  //Get data from Reports table
  const getInvoiceMonth = () => {
    api
      .get('/reports/getIr8aReport')
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
    getInvoiceMonth();
  }, []);
  //structure of Training list view
  const columns = [
    {
      name: '#',
     
    },
   
    {
      name: 'Employee Name',

    },

    {
      name: 'Status',

    },
    {
      name: 'DOB',

    },
   
    {
      name: 'Nric/Fin No',
    
    },
    {
      name: 'Payroll Month',
     
    },
    {
      name: 'Gross Salary',
     
    },
    {
      name: 'Total Allowance',
      
    },
    {
      name: 'Total Income',
    
    },
    {
      name: 'Gross Cpf Employee',
      
    },
    {
      name: 'Action',
    },
   
    
  ];
  return (
    <>
        <BreadCrumbs />
        <ToastContainer></ToastContainer>
        <CommonTable
          title="IR8A Reports">
  
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
                  <tr key={element.payroll_management_id}>
                    <td>{index + 1}</td>
                    <td>{element.employee_name}</td>
                    <td>{element.status}</td>
                    <td>{(element.dob)?moment(element.dob).format('DD-MM-YYYY'):''}</td>
                    <td>{element.nric_fin}</td>
                    <td>{element.pyrol_month}</td>
                    <td>{element.gross_salary}</td>
                    <td>{element.total_allowance}</td>
                    <td>{element.total_allowance?element.total_income:element.gross_salary}</td>
                    <td>{element.total_cpf_employee}</td>
                    <td> <PdfIR8AReport  report={report} employeeId ={element.employee_id}></PdfIR8AReport></td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
    </>
  );
};
export default InvoiceMonthReports;
