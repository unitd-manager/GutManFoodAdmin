import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody, Button, Input, FormGroup, Label, Table} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import api from '../../constants/api';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ExportReport from '../../components/Report/ExportReport';

const EmployeeSalary = () => {
  //All state variable
  const [report, setReport] = useState(null);
  const [userSearchData, setUserSearchData] = useState('');
  const [companyName, setCompanyName] = useState('');
  //Get data from Reports table
  const getEmployeeSalary= () => {
    api
      .get('/reports/getEmployeeSalaryReport')
      .then((res) => {
        setReport(res.data.data);
        setUserSearchData(res.data.data);
      })
      .catch(() => {
        message('Reports Data Not Found', 'info');
      });
  };
  const handleSearch = () => {
    const newData = report
      .filter((y) => y.status === (companyName === '' ? y.status : companyName))
      setUserSearchData(newData);

  };
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

  useEffect(() => {
   
    getEmployeeSalary();
  }, []);
  //structure of Training list view
  const columns = [
    {
      name: '#',
      selector: 's_no',
    },
   
    {
      name: 'Employee Name',
      selector: 'employee_name',
      grow: 0,
      wrap: true,
      width: '4%',
    },

    {
      name: 'NRIC',
      selector: 'nric_no',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Date Of Birth',
      selector: 'date_of_birth',
      sortable: true,
      grow: 10,
      wrap: true,
    },
    {
      name: ' Age ',
      selector: 'age',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Designation',
      selector: 'designation',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Department',
      selector: 'department',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Basic Pay ',
      selector: 'basic_pay',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Total Allowance',
      selector: 'total_allowance',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Total Deduction',
      selector: 'total_deductions',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Net Pay',
      selector: 'net_total',
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
                
                </Col>
              <Col>
              <FormGroup>
                <Label>Select Status</Label>
                <Input
                  type="select"
                  name="status"
                  onChange={(e) => setCompanyName(e.target.value)}
                >
                  <option value="Current">Current</option>
                  <option value="Archive">Archive</option>
                  <option value="Cancel">Cancel</option>
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
                <b> Status:</b>
                {companyName}
              </Label>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Row>
            <Col>
              <ExportReport data={userSearchData} columns={columns} /> 
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
                return (
                  <tr key={element.employee_id}>
                    <td>{index + 1}</td>
                    <td>{element.employee_name}</td>
                    <td>{element.nric_no}</td>
                    <td>{(element.date_of_birth)?moment(element.date_of_birth).format('DD-MM-YYYY'):''}</td>
                    <td>{element.age}</td>
                    <td>{element.designation}</td>
                    <td>{element.department}</td>
                    <td>{element.basic_pay}</td>
                    <td>{element.total_allowance}</td>
                    <td>{element.total_deductions}</td> 
                    <td>{element.net_total}</td> 
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
export default EmployeeSalary;
