import React from 'react';
import { Row, Col, Input, ListGroup, ListGroupItem } from 'reactstrap';
import Chart from 'react-apexcharts';
import DashCard from '../dashboardCards/DashCard';

const EmailCampaign = () => {
  const optionsvisit = {
    chart: {
      id: 'donut-chart',
      fontFamily: '"Nunito", sans-serif',
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70px',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Ratio',
              color: '#99abb4',
            },
          },
        },
      },
    },
    stroke: {
      width: 0,
    },
    labels: ['Open Ratio', 'Un-Open Ratio', 'Clicked Ratio', 'Bounced Ratio'],
    legend: {
      show: false,
    },
    colors: ['rgb(64, 196, 255)', 'rgb(255, 130, 28)', 'rgb(126, 116, 251)', 'rgb(41, 97, 255)'],
    tooltip: {
      fillSeriesColor: false,
    },
  };
  const seriesvisit = [45, 27, 15, 18];
  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-1 [Classic]                                                  */
    /*--------------------------------------------------------------------------------*/
    
    <DashCard
      title="Email Campaigns"
      subtitle="Overview of Email Campaigns"
      actions={
        <Input type="select" className="custom-select">
          <option value="0">Monthly</option>
          <option value="1">Daily</option>
          <option value="2">Weekly</option>
          <option value="3">Yearly</option>
        </Input>
      }
    >
      <Row className="my-4">
        <Col lg="6">
          <div>
            <Chart options={optionsvisit} series={seriesvisit} type="donut" height="245" />
          </div>
        </Col>
        <Col lg="6">
          <h1 className="display-6 mb-0 fw-bold">45%</h1>
          <span>Open Ratio for Campaigns</span>
          <ListGroup>
            <ListGroupItem className="border-0 mt-3 p-0 d-flex">
              <i className="bi bi-circle-fill text-info me-2" /> Open Ratio
              <span className="ms-auto">45%</span>
            </ListGroupItem>
            <ListGroupItem className="border-0 mt-3 p-0 d-flex">
              <i className="bi bi-circle-fill text-primary me-2" /> Clicked Ratio
              <span className="ms-auto">15%</span>
            </ListGroupItem>
            <ListGroupItem className="border-0 mt-3 p-0 d-flex">
              <i className="bi bi-circle-fill text-warning me-2" /> Un-Open Ratio
              <span className="ms-auto">25%</span>
            </ListGroupItem>
            <ListGroupItem className="border-0 mt-3 p-0 d-flex">
              <i className="bi bi-circle-fill text-danger me-2" /> Bounced Ratio
              <span className="ms-auto">18%</span>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </DashCard>
  );
};

export default EmailCampaign;
