import React from 'react';

import Chart from 'react-apexcharts';
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

const MonthSummery = () => {
  const optionscampaignoverview = {
    chart: {
      id: 'earnings',
      type: 'area',
      fontFamily: '"Nunito", sans-serif',
      toolbar: {
        show: false,
      },
      sparkline: { enabled: true },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    colors: ['#2962FF', '#4fc3f7'],
    xaxis: {
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    markers: {
      size: 3,
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
      theme: 'dark',
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
  };
  const seriescampaignoverview = [
    {
      name: 'Last Month',
      data: [3, 8, 2, 3, 2, 5, 6, 8],
    },
    {
      name: 'Current Month',
      data: [7, 6, 5, 8, 6, 7, 2, 1],
    },
  ];
  return (
    /*--------------------------------------------------------------------------------*/
    /* email campaigns                                                 */
    /*--------------------------------------------------------------------------------*/
    <Card>
      <CardBody className='p-4'>
        <div className="d-flex align-items-center">
          <div>
            <CardTitle tag="h1">$6,890.68</CardTitle>
            <CardSubtitle className="text-muted">Overview of email campaigns</CardSubtitle>
          </div>
          <div className="ms-auto">
            <i className="bi bi-wallet2 text-primary display-6" />
          </div>
        </div>

        <p className='mt-3'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non pharetra ligula, sit
          amet laoreet arcu.Integer.
        </p>
        <a href="/" className="fw-bold text-decoration-none">
          Last Month Summary
        </a>
      </CardBody>
      <div className="mt-5">
        <div className="chart-wrapper" style={{ height: '160px' }}>
          <Chart
            options={optionscampaignoverview}
            series={seriescampaignoverview}
            type="area"
            height="160"
          />
        </div>
      </div>
    </Card>
  );
};

export default MonthSummery;
