import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import { Button, Card, CardBody, Col, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import api from '../../constants/api';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ExportReport from '../../components/Report/ExportReport';

const ProjectReport = () => {
  //All state variable
  const [projectReport, setProjectReport] = useState(null);
  const [userSearchData, setUserSearchData] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [projectStatus, setProjectStatus] = useState('');
 
  //Get data from Training table
  const getProject = () => {
    api
      .get('/reports/getProjectReport')
      .then((res) => {
        setProjectReport(res.data.data);
        setUserSearchData(res.data.data);
      })
      .catch(() => {
        message('Project Data Not Found', 'info');
      });
  };

  const handleSearch = () => {
    const newData = projectReport
      .filter((y) => y.category === (companyName === '' ? y.category : companyName))
      .filter((z) => z.status === (projectStatus === '' ? z.status : projectStatus))
      .filter(
        (x) => endDate && startDate  ? (x.actual_finish_date <= (endDate === '' ? x.actual_finish_date : endDate) &&
        x.start_date >= (startDate === '' ? x.start_date : startDate) ): startDate ? x.start_date === (startDate === '' ? x.start_date : startDate) :
        x.actual_finish_date === (endDate === '' ? x.actual_finish_date : endDate ) 
      );
    setUserSearchData(newData);

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
  const totalPages = Math.ceil(userSearchData.length / employeesPerPage);
  const changePage = ({ selected }) => {
    setPage(selected);
  };
  //structure of Training list view
  const columns = [
    {
      name: 'SN',
      selector:'s_no',
    },
   
    {
      name: 'Project Code',
      selector: 'project_code',
      grow: 0,
      wrap: true,
      width: '4%',
    },

    {
      name: 'Project Title',
      selector: 'Project_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Category',
      selector: 'category',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Start Date',
      selector: 'start_date',
      sortable: true,
      grow: 0,
    },
    {
      name: 'End Date',
      selector: 'actual_finish_date',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Client Company',
      selector: 'company_name',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Contact',
      selector: 'contact_name',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      grow: 0,
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
                  name="start_date"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>End Date</Label>
                <Input type="date" name="actual_finish_date" onChange={(e) => setEndDate(e.target.value)} />
              </FormGroup>
            </Col>
              <Col>
              <FormGroup>
                <Label>Select Category</Label>
                <Input
                  type="select"
                  name="project_type"
                  onChange={(e) => setCompanyName(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Project">Project</option>
                  <option value="Tenancy Project">Tenancy Project</option>
                  <option value="Tenancy Work">Tenancy Work</option>
                  <option value="Maintenance">Maintenance</option>
                </Input>
              </FormGroup>
            </Col>
              <Col>
              <FormGroup>
              <Label>Status</Label>
                <Input type="select"  name="status"
                  onChange={(e) => setProjectStatus(e.target.value)}>
                <option value="">Please Select</option>
                    <option defaultValue="selected" value="WIP">
                      WIP
                    </option>
                    <option value="Billable">Billable</option>
                    <option value="Billed">Billed</option>
                    <option value="Complete">Complete</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Latest">Latest</option>
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
              <Label><b>Category:</b> {companyName}</Label>
            </Col>
            <Col md="3">
              <Label><b>Start Date:</b> {startDate}</Label>
            </Col>
            <Col md="3">
              <Label><b> End Date:</b> {endDate}</Label>
            </Col>
            <Col md="3">
              <Label><b> Status:</b> {projectStatus}</Label>
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
                return (
                  <tr key={element.project_id}>
                    <td>{index + 1}</td>
                    <td>{element.project_code}</td>
                    <td>{element.Project_name}</td>
                    <td>{element.category}</td>
                    <td>{moment(element.start_date).format('YYYY-MM-DD')}</td>
                    <td>{moment(element.actual_finish_date).format('YYYY-MM-DD')}</td>
                    <td>{element.company_name}</td>
                    <td>{element.contact_name}</td>
                    <td>{element.status}</td>
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
export default ProjectReport;