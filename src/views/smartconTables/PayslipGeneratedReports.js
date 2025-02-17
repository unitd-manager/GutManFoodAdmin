import React, { useEffect, useState } from 'react';
import { Row, Button, Col, Input, Table, Card, CardBody, FormGroup,Label } from 'reactstrap';
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

function PayslipGeneratedReports() {
  const [report, setReport] = useState('');

  const [period, setPeriod] = useState({
    month: null,
    year: null,
  });

  const handleInputs = (e) => {
    setPeriod({ ...period, [e.target.name]: e.target.value });
  };

  //get lineitems
  const getPaySlip = () => {
    period.month = parseInt(period.month, 10);
    period.year = parseInt(period.year, 10);
    api
      .post('/reports/getPayslipGeneratedReport', period)
      .then((res) => {
        setReport(res.data.data);
      })

      .catch(() => {
        message('summaries not found', 'error');
      });
  };

  const columns = [
    {
      name: 'SN.No',
      selector:'s_no'
    },

    {
      name: 'Employee Name', selector: 'employee_name',
    },

    {
      name: 'Pass Type', selector: 'citizen',
    },
    {
      name: 'Employee Status', selector: 'employee_status',
    },
    {
      name: 'NRIC No/FIN No', selector: 'nric_no',
    },
    {
      name: 'Basic Pay', selector: 'basic_pay',
    },
    {
      name: 'OT Amount', selector: 'ot_amount',
    },
    {
      name: 'CPF(Employer)', selector: 'cpf_employer',
    },
    {
      name: 'CPF(Employee)', selector: 'cpf_employee',
    },
    {
      name: 'Reimbursement', selector: 'reimbursement',
    },
    {
      name: 'Allowance', selector: 'total_allowance',
    },
    {
      name: 'Deductions', selector: 'total_deductions',
    },
    {
      name: 'Net Pay', selector: 'net_total',
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
    <div className="container">
      <ToastContainer></ToastContainer>
      <Card>
          <CardBody>
            <Row>
              <Col> </Col>
              <Col md="2">
                <FormGroup>
                <Label>Month</Label>
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
            </FormGroup>
          </Col>
          <Col md="2">
            <FormGroup>
            <Label>Year</Label>
            <Input type="select" name="year" onChange={handleInputs}>
              <option value="">Select Year</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </Input>
            </FormGroup>
          </Col>
          <Col md="2">
            {' '}
            <Button
              color="dark"
              onClick={() => {
                getPaySlip();
              }}
            >
              Go
            </Button>
          </Col>
          </Row>
        </CardBody>
      </Card>
    <Card>
        <CardBody>
          <Row>
          <Col md="2">
              <Label>
                <b>Month:</b> &nbsp; <span>{period.month}</span>
              </Label>
            </Col>
          <Col md="2">
              <Label>
                <b>Year:</b> &nbsp; <span>{period.year}</span>
              </Label>
            </Col>
                     </Row>
        </CardBody>
      </Card>
      <Card>
      <CardBody>
          <Row>
            <Col>
              <ExportReport columns={columns} data={report} /> 
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
              {report &&
                report.map((element, index) => {
                  return (
                    <tr key={element.payroll_management_id}>
                      <td>{index + 1}</td>
                      <td>{element.employee_name}</td>
                      <td>{element.citizen}</td>
                      <td>{element.employee_status}</td>
                      <td>{element.nric_no}</td>
                      <td>{element.basic_pay}</td>
                      <td>{element.ot_amount}</td>
                      <td>{element.cpf_employer}</td>
                      <td>{element.cpf_employee}</td>
                      <td>{element.reimbursement}</td>
                      <td>{element.total_allowance}</td>
                      <td>{element.total_deductions}</td>
                      <td>{element.net_total}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

export default PayslipGeneratedReports;
