import React from 'react';

import Chart from 'react-apexcharts';
import { Card, CardBody, CardTitle, CardSubtitle, Row, Col } from 'reactstrap';

const OrderStatus = () => {
  const optionsorder = {
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
          size: '60px',
        },
      },
    },
    labels: ['Success', 'Failed ', 'Pending'],
    stroke: {
      width: 0,
    },
    legend: {
      show: false,
    },
    colors: ['rgb(64, 196, 255)', 'rgb(255, 130, 28)', 'rgb(41, 97, 255)'],
    tooltip: {
      fillSeriesColor: false,
    },
  };
  const seriesorder = [65, 15, 17];
  return (
    /*--------------------------------------------------------------------------------*/
    /* Sales Ratio                                                 */
    /*--------------------------------------------------------------------------------*/
    <Card>
      <CardBody className='p-4'>
        <Row>
          <Col sm="12" md="8">
            <CardTitle tag="h4">Order Status</CardTitle>
            <CardSubtitle className="text-muted mb-0">Total Earnings of the Month</CardSubtitle>
            <Row className="mt-4">
              <Col xs="4" className="border-end">
                <i className="bi bi-record-fill fs-4 text-primary"></i>
                <h3 className="mb-0 font-medium">5489</h3>
                <span className='text-muted'>Pending</span>
              </Col>
              <Col xs="4" className="border-end">
                <i className="bi bi-record-fill fs-4 text-danger"></i>
                <h3 className="mb-0 font-medium">954</h3>
                <span className='text-muted'>Failed</span>
              </Col>
              <Col xs="4">
                <i className="bi bi-record-fill fs-4 text-info"></i>
                <h3 className="mb-0 font-medium">736</h3>
                <span className='text-muted'>Success</span>
              </Col>
            </Row>
          </Col>
          <Col sm="12" md="4">
            <div className="mt-3">
              <Chart options={optionsorder} series={seriesorder} type="donut" height="110" />
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default OrderStatus;
