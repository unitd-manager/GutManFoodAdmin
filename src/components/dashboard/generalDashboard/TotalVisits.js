import React from 'react';

import Chart from 'react-apexcharts';
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

const TotalVisits = () => {
  const optionsvisits = {
    chart: {
      id: 'total-visits',
      fontFamily: '"Nunito", sans-serif',
      type: 'bar',
      toolbar: {
        show: false,
      },
      sparkline: { enabled: true },
    },
    colors: ['#4dd0e1'],
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'flat',
        columnWidth: '30%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ['transparent'],
    },
    xaxis: {
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
    },
  };
  const seriesvisits = [
    {
      name: 'Total Visits',
      data: [6, 15, 9, 11, 9, 15, 20, 15, 9, 11, 9, 15],
    },
  ];
  return (
    /*--------------------------------------------------------------------------------*/
    /* Total Visits                                                 */
    /*--------------------------------------------------------------------------------*/
    <Card>
      <CardBody className='p-4'>
        <CardTitle tag="h4">Total Visits</CardTitle>

        <h4 className="fw-bold mt-3 mb-2">3,25,346</h4>
        <CardSubtitle className="text-muted mb-1 fs-6">Total Earnings of the Month</CardSubtitle>
      </CardBody>
      <div className="text-center">
        <Chart options={optionsvisits} series={seriesvisits} type="bar" height="62" />
      </div>
    </Card>
  );
};

export default TotalVisits;
