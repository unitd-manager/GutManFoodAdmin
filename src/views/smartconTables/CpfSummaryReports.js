import React, { useEffect, useState } from 'react';
import { Row, Button, Col, Input, Table, Card, CardBody } from 'reactstrap';
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
import ExportReport from '../../components/Report/ExportReport';

function CpfSummaryReports() {
  const [summaries, setSummaries] = useState([]);
  const [totalCpfEmployee, setTotalCpfEmployee] = useState(0);
  const [totalCpfEmployer, setTotalCpfEmployer] = useState(0);
  const [totalCpf, setTotalCpf] = useState(0);
  const [period, setPeriod] = useState({
    month: null,
    year: null,
  });

  const handleInputs = (e) => {
    setPeriod({ ...period, [e.target.name]: e.target.value });
  };

  //get lineitems
  const getCpfSummaries = () => {
    period.month = parseInt(period.month, 10);
    period.year = parseInt(period.year, 10);
    api
      .post('/payrollmanagement/getCpfSummaryReport', period)
      .then((res) => {
        setSummaries(res.data.data);
        let cpfEmployee = 0;
        let cpfEmployer = 0;
        let cpf = 0;
        res.data.data.forEach((el) => {
          cpfEmployee += el.cpf_employee;
          cpfEmployer += el.cpf_employer;
          cpf += el.total_cpf;
        });
        setTotalCpfEmployee(cpfEmployee);
        setTotalCpfEmployer(cpfEmployer);
        setTotalCpf(cpf);
      })
      .catch(() => {
        message('summaries not found', 'error');
      });
  };

  const columns = [
    {
      name: 'S.No',
      selector: 's_no',
    },
    {
      name: 'Employee Name',
      selector: 'employee_name',
    },
    {
      name: 'NRIC',
      selector: 'nric_no',
    },
    {
      name: 'CPF By Employer',
      selector: 'cpf_employer',
    },
    {
      name: 'CPF By Employee',
      selector: 'cpf_employee',
    },
    {
      name: 'Total Cpf',
      selector: 'total_cpf',
    },
  ];

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
  }, []);

  return (
    <div className="">
      <ToastContainer></ToastContainer>
      <div className="card p-2 shadow-none">
        <Row>
          <Col></Col>
          <Col></Col>
          <Col>
            <Input type="select" name="month" onChange={handleInputs}>
              <option value="">Select Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </Input>
          </Col>
          <Col>
            <Input type="select" name="year" onChange={handleInputs}>
              <option value="">Select Year</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </Input>
          </Col>
          <Col md="2">
            <Button
              color="primary"
              className="shadow-none"
              onClick={() => {
                getCpfSummaries();
              }}
            >
              Go
            </Button>
          </Col>
        </Row>
      </div>

      <div className="card p-2 text-center shadow-none mt-0">
        <b>CPF Summary Report</b>
      </div>
      <div className="card p-2 shadow-none mt-0">
        <Row>
          <Col md="6">
            <b>Month:</b> &nbsp; <span>{period.month}</span>
          </Col>
          <Col md="6">
            <b>year:</b> &nbsp; <span>{period.year}</span>
          </Col>
        </Row>
      </div>

      <Card>
        <CardBody>
          <Row>
            <Col>
              <ExportReport columns={columns} data={summaries} />
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
              {summaries &&
                summaries.map((res, index) => {
                  return (
                    <tr key={res.employee_id}>
                      <td>{index + 1}</td>
                      <td>{res.employee_name}</td>
                      <td>{res.nric_no}</td>
                      <td>{res.cpf_employer}</td>
                      <td>{res.cpf_employee}</td>
                      <td>{res.total_cpf}</td>
                    </tr>
                  );
                })}
              <tr>
                <td>
                  <b></b>
                </td>
                <td>
                  <b></b>
                </td>
                <td>
                  <b>Total</b>
                </td>
                <td>
                  <b>{totalCpfEmployee}</b>
                </td>
                <td>
                  <b>{totalCpfEmployer}</b>
                </td>
                <td>
                  <b>{totalCpf}</b>
                </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

export default CpfSummaryReports;
