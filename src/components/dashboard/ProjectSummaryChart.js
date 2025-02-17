import React, { useEffect, useState } from 'react';
import { Row, Col, Label, CardBody, Input } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../ComponentCard';
import api from '../../constants/api';
import message from '../Message';

function ProjectSummaryChart() {
  const [company, setCompany] = useState(null);
  const [data, setData] = useState();
  const [projected, setprojected] = useState();
  const [actual, setActual] = useState();

  // Get Costing Summary Data for projected
  const getProjectedCostingbySummary = (projectId) => {
    const projectedData = [];
    api
      .post('/tender/getCostingSummaryById', { opportunity_id: projectId })
      .then((res) => {
        const AllProjectedData = res.data.data;
        const {
          total_material_price: totalMaterialPrice,
          transport_charges: transportCharges,
          total_labour_charges: totalLabourCharges,
          salesman_commission: salesmanCommission,
          finance_charges: financeCharges,
          office_overheads: officeOverheads,
        } = AllProjectedData;
        projectedData.push(
          totalMaterialPrice,
          transportCharges,
          totalLabourCharges,
          salesmanCommission,
          financeCharges,
          officeOverheads,
        );
        setprojected(projectedData);
      })
      .catch(() => {
        message('Projected Costing Summary not found', 'info');
      });
  };

  const getActualCostingbySummary = (projectId) => {
    const actualData = [];
    api
      .post('/project/getCostingSummaryForDashboard', { project_id: projectId })
      .then((res) => {
        const AllActualData = res.data.data;
        console.log(res.data.data);
        const {
          total_material_price: totalMaterialPrice,
          transport_charges: transportCharges,
          labour_charges: totalLabourCharges,
          sales_commision: salesmanCommission,
          finance_charges: financeCharges,
          office_overheads: officeOverheads,
          other_charges: otherCharges,
        } = AllActualData;
        actualData.push(
          totalMaterialPrice,
          transportCharges,
          totalLabourCharges,
          salesmanCommission,
          financeCharges,
          officeOverheads,
          otherCharges,
        );
        setActual(actualData);
      })
      .catch(() => {
        message('Actual Costing Summary not found', 'info');
      });
  };

  // get Project Summary
  const getProjectSummary = (projectId) => {
    api
      .post('/project/getProjectSummary', { project_id: projectId })
      .then((res) => {
        setData(res.data.data);
      })
      .catch(() => {
        message('Supplier Data Not Found', 'info');
      });
  };

  useEffect(() => {
    api.get('project/getProjects').then((res) => {
      setCompany(res.data.data);
    });
  }, []);

  const optionscolumn = {
    colors: ['#263238', '#745af2', '#4fc3f7'],
    chart: {
      fontFamily: "'Rubik', sans-serif",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: [
        'Total Material',
        'Transport Charges',
        'Total Labour Charges',
        'Salesman Commission',
        'Finance Charges',
        'Office Overheads',
        'Other Charges',
      ],
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    yaxis: {
      title: {
        text: '$ (thousands)',
        color: '#8898aa',
      },
      labels: {
        style: {
          cssClass: 'grey--text lighten-2--text fill-color',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter(val) {
          return `$ ${val} thousands`;
        },
      },
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
    },
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
      fontFamily: "'Montserrat', sans-serif",
      labels: {
        colors: '#8898aa',
      },
    },
  };

  const seriescolumn = [
    {
      name: 'Projected',
      data: projected,
    },
    {
      name: 'Actual',
      data: actual,
    },
  ];

  return (
    <>
      <Row>
        <Col>
          <ComponentCard title="Project Summary">
            <Label>Select Company Name</Label>
            <Input
              type="select"
              name="project_id"
              onChange={(e) => {
                getProjectSummary(e.target.value);
                getProjectedCostingbySummary(e.target.value);
                getActualCostingbySummary(e.target.value);
              }}
            >
              <option value="">Please Select</option>
              { company && company.map((element) => {
                  return <option value={element.project_id}>{element.title}</option>;
                })}
            </Input>
            <CardBody>
              {data && data.map((ele) => { return (
                    <Row>
                      <Col md="6">
                        <Row>
                          <Label> <b>Project code: </b> {ele.project_code} </Label>
                          <Label> <b>Client Company:</b> {ele.company_name} </Label>
                          <Label> <b>Project Title:</b> {ele.Project_name} </Label>
                          <Label> <b>Category:</b> {ele.category} </Label>
                        </Row>
                      </Col>
                      <Col md="6">
                        <Row>
                          <Label> <b>Start Date :</b> {ele.start_date} </Label>
                          <Label> <b>End Date:</b> </Label>
                          <Label> <b>Status:</b> {ele.status} </Label>
                          <Label> <b>% of Work:</b> </Label>
                        </Row>
                      </Col>
                    </Row>
                  );
                })}
            </CardBody>
            {/* { projected && actual === (projected && actual !== '' ?  <Chart options={optionscolumn} series={seriescolumn} type="bar" height="280" /> : "")} */}
           { projected && actual ? <Chart options={optionscolumn} series={seriescolumn} type="bar" height="280" /> : '' } 
          </ComponentCard>
        </Col>
      </Row>
    </>
  );
}
export default ProjectSummaryChart;
