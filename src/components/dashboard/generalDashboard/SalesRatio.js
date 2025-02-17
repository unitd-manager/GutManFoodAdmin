import React from 'react';

import Chart from 'react-apexcharts';
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

const SalesRatio = () => {
  const optionssalesratio = {
    chart: {
      id: 'sales-ratio',
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
    colors: ['#2962FF'],
    xaxis: {
      show: false,
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    markers: {
      size: 0,
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
  const seriessalesratio = [
    {
      name: 'Sales Ratio',
      data: [5, 6, 3, 7, 9, 10, 14, 12, 11, 9, 8, 7, 10, 6, 12, 10, 8],
    },
  ];
  return (
    /*--------------------------------------------------------------------------------*/
    /* Sales Ratio                                                 */
    /*--------------------------------------------------------------------------------*/
    <Card>
      <CardBody className='p-4'>
        <CardTitle tag="h4">Sales Ratio</CardTitle>

        <h4 className="fw-bold mt-3 mb-2">35,658</h4>
        <CardSubtitle className="text-muted mb-1 fs-6">Total Earnings of the Month</CardSubtitle>
      </CardBody>
      <div className="text-center">
        <Chart options={optionssalesratio} series={seriessalesratio} type="area" height="60" />
      </div>
    </Card>
  );
};

export default SalesRatio;
