import React, { useEffect, useState } from 'react';
import { Row, Col, Label, Card, CardBody, Button, Input, FormGroup, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import api from '../../constants/api';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ExportReport from '../../components/Report/ExportReport';

const StatementofAccountsReport = () => {
  const [report, setReport] = useState('');
  const [company, setCompany] = useState();
  const [userSearchData, setUserSearchData] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [companyName, setCompanyName] = useState('');

  //Get data from Reports table
  const getAccountsReport = () => {
    api
      .get('/reports/getAccountReport')
      .then((res) => {
        setReport(res.data.data);
        setUserSearchData(res.data.data);
      })
      .catch(() => {
        message('Reports Data Not Found', 'info');
      });
  };
  //Api call for getting company dropdown
  const getCompany = () => {
    api.get('/company/getCompany').then((res) => {
      setCompany(res.data.data);
    });
  };

  const handleSearch = () => {
    const newData = report
      .filter((y) => y.company_name === (companyName === '' ? y.company_name : companyName))
      .filter((x) =>
        endDate && startDate
          ? x.invoice_date <= (endDate === '' ? x.invoice_date : endDate) &&
            x.invoice_date >= (startDate === '' ? x.invoice_date : startDate)
          : startDate
          ? x.invoice_date === (startDate === '' ? x.invoice_date : startDate)
          : x.invoice_date === (endDate === '' ? x.invoice_date : endDate),
      );
    setUserSearchData(newData);
  };

  useEffect(() => {
    getAccountsReport();
    getCompany();
  }, []);

  // Pagination

  const [page, setPage] = useState(0);

  const employeesPerPage = 20;
  const numberOfEmployeesVistited = page * employeesPerPage;
  const displayEmployees = userSearchData.slice(
    numberOfEmployeesVistited,
    numberOfEmployeesVistited + employeesPerPage,
  );
  const totalPages = Math.ceil(userSearchData.length / employeesPerPage);
  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const columns = [
    {
      name: 'S.No',
      selector:'s_no'
    },

    {
      name: 'Date',
      selector: 'invoice_date',
      grow: 0,
      wrap: true,
      width: '4%',
    },

    {
      name: 'Company Name',
      selector: 'company_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Code',
      selector: 'invoice_code',
      sortable: true,
      grow: 10,
      wrap: true,
    },
    {
      name: 'Charges (Invoice Amount)',
      selector: 'invoice_amount',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Credits (Receipt Amount)',
      selector: 'amount',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Payment Mode',
      selector: 'mode_of_payment',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Account Balance',
      selector: 'account',
      sortable: true,
      grow: 0,
      wrap: true,
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
              <FormGroup>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>End Date</Label>
                <Input type="date" name="endDate" onChange={(e) => setEndDate(e.target.value)} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Select Company Name</Label>
                <Input
                  type="select"
                  name="company_id"
                  onChange={(e) => setCompanyName(e.target.value)}
                >
                  <option value="">Please Select</option>
                  {company &&
                    company.map((ele) => {
                      return (
                        <option key={ele.company_id} value={ele.company_name}>
                          {ele.company_name}
                        </option>
                      );
                    })}
                </Input>
              </FormGroup>
            </Col>
            <Col md="1">
              <Button color="primary" className="shadow-none mt-3" onClick={() => handleSearch()}>Go</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Row>
            <Col md="3">
              <Label>
                <b>Company:</b>
                {companyName}
              </Label>
            </Col>
            <Col md="3">
              <Label>
                <b>Start Date:</b>
                {startDate}
              </Label>
            </Col>
            <Col md="3">
              <Label>
                <b> End Date:</b>
                {endDate}
              </Label>
            </Col>
            <Col md="3">
              <Label>
                <b>Total Outstanding Amount:</b>
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
                displayEmployees.map((element, index) => {
                  /* eslint-disable */
                  const keyData = parseInt(element.invoice_id.toString() + index);
                  return (
                    <tr key={keyData}>
                      <td>{index + 1}</td>
                      <td>{element.invoice_date}</td>
                      <td>{element.company_name}</td>
                      <td>{element.invoice_code}</td>
                      <td>{element.invoice_amount}</td>
                      <td>{element.amount}</td>
                      <td>{element.mode_of_payment}</td>
                      <td></td>
                    </tr>
                  );
                  /* eslint-disable */
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

export default StatementofAccountsReport;