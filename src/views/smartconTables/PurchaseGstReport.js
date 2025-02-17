import React, { useEffect, useState } from 'react';
import { Row, Card, Button, Col, Input, Label, FormGroup, CardBody, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import ReactPaginate from 'react-paginate';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { ToastContainer } from 'react-toastify';
import api from '../../constants/api';
import message from '../../components/Message';
import ExportReport from '../../components/Report/ExportReport';

function PurchaseGstReport() {
  const [report, setReport] = useState();
  const [company, setCompany] = useState();
  const [userSearchData, setUserSearchData] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [companyName, setCompanyName] = useState('');
  
  // const handleInputs = (e) => {
  //   setPeriod({ ...period, [e.target.name]: e.target.value });
  // };

  //get lineitems
  const getPurchases = () => {
    api
      .get('/purchaseorder/getPurchaseGstReport')
      .then((res) => {
        setUserSearchData(res.data.data);
        setReport(res.data.data);
      })
      .catch(() => {
        message('purchases not found', 'error');
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

  const columns = [
    {
      name: 'S.No',
      selector: 's_no',
    },
    {
      name: 'Invoice Date',
      selector: 'invoice_date',
    },
    {
      name: 'Invoice Number',
      selector: 'invoice_code',
    },
    {
      name: 'Supplier',
      selector: 'supplier_name',
    },
    {
      name: 'GST Number',
      selector: 'gst_no',
    },
    // {
    //   name: 'Description',
    //   selector: 'description',
    // },
    {
      name: 'Invoice Amount',
      selector: 'invoice_amount',
    },
    // {
    //   name: 'GST ($)',
    //   selector: 'gst',
    // },
    {
      name: 'Total Amount ($)',
      selector: 'total_amount',
    },
    // {
    //   name: 'Mode of Payment',
    //   selector: 'mode_of_payment',
    // },
    // {
    //   name: 'Payment Ref No',
    //   selector: 'payment_ref_no',
    // },
    {
      name: 'Payment Date',
      selector: 'payment_date',
    },
    // {
    //   name: 'Type',
    //   selector: 'type',
    // },
    {
      name: 'Po Number',
      selector: 'po_code',
    },
    {
      name: 'Po Date',
      selector: 'po_date',
    },
  ];

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
    getCompany();
    getPurchases();
  }, []);
  return (
    <>
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

            <Col md="2">
              <Input type="select" name="gst">
                <option value="">Select Gst</option>
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </Input>
            </Col>
            <Col md="2">
              <Input
                type="select"
                name="company_id"
                onChange={(e) => setCompanyName(e.target.value)}
              >
                <option defaultValue="selected">Select Client</option>

                {company &&
                  company.map((ele) => {
                    return (
                      <option key={ele.company_id} value={ele.company_name}>
                        {ele.company_name}
                      </option>
                    );
                  })}
              </Input>
            </Col>
            <Col md="1">
              {' '}
              <Button color="primary" className="shadow-none" onClick={() => handleSearch()}> Go </Button>
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
                displayEmployees.map((res, index) => {
                  return (
                    <tr key={res.employee_id}>
                      <td>{index + 1}</td>
                      <td>{res.invoice_date}</td>
                      <td>{res.invoice_code}</td>
                      <td>{res.supplier_name}</td>
                      <td>{res.gst_no}</td>
                      {/* <td>{res.description}</td> */}
                      <td>{res.invoice_amount}</td>
                      {/* <td>{res.gst}</td> */}
                      <td>{res.total_amount}</td>
                      {/* <td>{res.mode_of_payment}</td>
                      <td>{res.payment_ref_no}</td> */}
                      <td>{res.payment_date}</td>
                      {/* <td>{res.type}</td> */}
                      <td>{res.po_code}</td>
                      <td>{res.po_date}</td>
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
                  <b></b>
                </td>
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
                  <b>{}</b>
                </td>
                <td>
                  <b>{}</b>
                </td>
                <td>
                  <b>{}</b>
                </td>
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
}

export default PurchaseGstReport;
