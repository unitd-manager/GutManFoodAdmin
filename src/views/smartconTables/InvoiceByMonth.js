import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Button, Input, FormGroup, Label,Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { ToastContainer } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import api from '../../constants/api';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ExportReport from '../../components/Report/ExportReport';

const InvoiceMonthReports = () => {
  //All state variable
  const [report, setReport] = useState(null);
  const [gTotal, setGtotal] = useState(0);
  const [userSearchData, setUserSearchData] = useState('');
  const [companyName, setCompanyName] = useState('');
  //Get data from Reports table
  const getInvoiceMonth = () => {
    api
      .get('/reports/getInvoiveByMonth')
      .then((res) => {
        setReport(res.data.data);
        setUserSearchData(res.data.data);
         //grand total
         console.log(res.data.data)
         let grandTotal = 0;
        res.data.data.forEach((elem) => {
          grandTotal += elem.invoice_amount_monthly;
        });
        setGtotal(grandTotal);
      })
      .catch(() => {
        message('Reports Data Not Found', 'info');
      });
  };

  const handleSearch = () => {
    const newData = report
      .filter((y) => y.record_type === (companyName === '' ? y.record_type : companyName))
        setUserSearchData(newData);
  };
  useEffect(() => {
  
    getInvoiceMonth();
  }, []);

  const [page, setPage] = useState(0);

  const employeesPerPage = 20;
  const numberOfEmployeesVistited = page * employeesPerPage;
  const displayEmployees = userSearchData.slice(
    numberOfEmployeesVistited,
    numberOfEmployeesVistited + employeesPerPage,
  );
  console.log("displayEmployees",displayEmployees)
  const totalPages = Math.ceil(userSearchData.length / employeesPerPage);
  const changePage = ({ selected }) => {
    setPage(selected);
  };
  //structure of Training list view
  const columns = [
    {
      name: 'S.No',
      selector:'s_no'
    },
    {
      name: 'Invoice Month',
      selector: 'invoice_month',
    },

    {
      name: 'Invoice Amount Monthly',
      selector: 'invoice_amount_monthly',
    },
    {
      name: 'Category',
      selector: 'record_type',
    },
  ];

  return (
    <>
        <BreadCrumbs />
        <ToastContainer></ToastContainer>
        <Card>
          <CardBody>
            <Row>
              <Col>
                
              </Col>
              <Col>
              <FormGroup>
                <Label>Select Category</Label>
                <Input
                  type="select"
                  name="record_type"
                  onChange={(e) => setCompanyName(e.target.value)}
                > <option value="">Select Category</option>
                  <option value="project">Project</option>
                  <option value="tenancy project">Tenancy Project</option>
                  <option value="tenancy work">Tenancy Work</option>
                  <option value="maintenance">Maintenance</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md="1">
              <Button color="primary" className="shadow-none" onClick={() => handleSearch()}>Go</Button>
            </Col>
            </Row>
          </CardBody>
        </Card>
        <Card>
        <CardBody>
          <Row>
            <Col>
              <ExportReport columns={columns} data={userSearchData} />
            </Col>
          </Row>
        </CardBody>
      
        <CardBody>
          <Table>

          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {displayEmployees &&
              displayEmployees.map((element,index) => {
                return (
                  <tr key={element.invoice_id}>
                    <td>{index+1}</td>
                    <td>{element.invoice_month}</td>
                    <td>{element.invoice_amount_monthly}</td>
                    <td>{element.record_type}</td>
                  </tr>
                );
              })} 
               <tr>
                  <td><b></b></td>
                  <td><b>Total Invoice Amount</b></td>
                  <td><b>{(gTotal.toLocaleString('en-IN', {  minimumFractionDigits: 1 }))}</b></td>
                  </tr>
          </tbody>
</Table>
        <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageCount={totalPages}
            onPageChange={changePage}
            containerClassName="navigationButtons"
            previousLinkClassName="previousButton"
            nextLinkClassName="nextButton"
            disabledClassName="navigationDisabled"
            activeClassName="navigationActive"
          />
      </CardBody>
      </Card>
    </>
  );
};
export default InvoiceMonthReports;
