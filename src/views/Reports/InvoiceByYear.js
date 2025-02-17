import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { ToastContainer } from 'react-toastify';
import { Button, Card, CardBody, Col, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import api from '../../constants/api';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ExportReport from '../../components/Report/ExportReport';

const InvoiceBYYear = () => {
  //All state variable
  const [invoiceReport, setInvoiceReport] = useState(null);
  const [userSearchData, setUserSearchData] = useState('');
  const [companyName, setCompanyName] = useState('');

  const thisYear=new Date().getFullYear();

  console.log('thisyear',thisYear)
  //Get data from Training table
  const getProject = () => {
    api
      .get('/reports/getInvoiceByYearReport')
      .then((res) => {
        const data=[]
       let obj = {invoice_year:'' ,invoice_amount_yearly:''}
          let total=0
        res.data.data.filter((x) => parseFloat(x.invoice_year) === thisYear).forEach((el)=>{
          total +=el.invoice_amount_yearly
        })
        obj={invoice_year:thisYear ,invoice_amount_yearly:total}
        data.push(obj);
        setInvoiceReport(res.data.data);
        setUserSearchData(data);
      })
      .catch(() => {
        message('Project Data Not Found', 'info');
      });
  };

  const handleSearch = () => {
    const newData =  companyName === '' ?invoiceReport
      .filter((x) => parseFloat(x.invoice_year) === thisYear):invoiceReport
      .filter((y) => y.record_type === (companyName === '' ? y.record_type : companyName))
        setUserSearchData(newData);
        console.log('newdata',newData)
  };
  
  useEffect(() => {
        getProject();
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
      name: 'SN',
      selector:'s_no'
    },
    {
      name: 'Year',
      selector:'invoice_year'
    },
    {
      name: 'Amount',
      selector:'invoice_amount_yearly'
    },
    // {
    //   name: 'Category',
    //   selector: 'record_type',
    // },   
     ];
  return (
    <>
        <BreadCrumbs />
        <ToastContainer></ToastContainer>
        <Card>
          <CardBody>
            <Row>
              <Col>
                {/* <ExportReport columns={columns} data={userSearchData}/> */}
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
            <Col md="3">
              <Label>
                <b>Category:</b> {companyName}
              </Label>
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
                    <td>{element.invoice_year}</td>
                    <td>{element.invoice_amount_yearly}</td>
                    {/* <td>{element.record_type}</td> */}
                  </tr>
                );
              })} 
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
export default InvoiceBYYear;
