import React from 'react';

import Chart from 'react-apexcharts';

import { Row, Col } from 'reactstrap';
import DashCard from '../dashboardCards/DashCard';

const ProductSales = () => {
  //Line chart
  const optionsproductsales = {
    chart: {
        id: 'basic-bar',
        fontFamily: '"Nunito", sans-serif',
        type: 'line',
        toolbar: {
          show: false,
        },
        stacked: false,
      },
      labels: ['Day', 'Month'],
      dataLabels: {
        enabled: false,
      },
      grid: {
        padding: {
          left: 0,
          right: 0,
        },
        borderColor: 'rgba(0,0,0,0.1)',
      },
      tooltip: {
        shared: false,
        intersect: true,
        x: {
          show: false,
        },
        theme: 'dark',
      },
      legend: {
        show: false,
      },
      colors: ['#2962FF', '#4fc3f7'],
      plotOptions: {
        bar: {
          columnWidth: '25%',
        },
      },
      fill: {
        opacity: 1,
      },
      stroke: {
        width: 0,
      },
      xaxis: {
        categories: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32],
        labels: {
          show: true,
          style: {
            colors: [
              '#99abb4',
              '#99abb4',
              '#99abb4',
              '#99abb4',
              '#99abb4',
              '#99abb4',
              '#99abb4',
              '#99abb4',
              '#99abb4',
              '#99abb4',
              '#99abb4',
              '#99abb4',
              '#99abb4',
              '#99abb4',
              '#99abb4',
              '#99abb4',
              '#99abb4',
            ],
            fontSize: '12px',
            fontFamily: "'Nunito Sans', sans-serif",
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            colors: [
              '#99abb4',
              '#99abb4',
              '#99abb4',
              '#99abb4',
              '#99abb4',
              '#99abb4',
              '#99abb4',
              '#99abb4',
            ],
            fontSize: '12px',
            fontFamily: "'Nunito Sans', sans-serif",
          },
        },
      },
  };
  const seriesproductsales = [
    {
        name: 'Product A',
        type: 'column',
        data: [5, 6, 3, 7, 9, 10, 14, 12, 11, 9, 8, 7, 10, 6, 12, 10, 8],
      },
      {
        name: 'Product B',
        type: 'column',
        data: [1, 2, 8, 3, 4, 5, 7, 6, 5, 6, 4, 3, 3, 12, 5, 6, 3],
      },
  ];
  return (
    /*--------------------------------------------------------------------------------*/
    /* Product Sales                                       */
    /*--------------------------------------------------------------------------------*/
    <Row>
      <Col xs="12">
        <DashCard
          title="Product Sales"
          subtitle="Total Earnings of the Month"
        >
          <div className="mt-4">
            <Chart
              options={optionsproductsales}
              series={seriesproductsales}
              type="line"
              height="400"
            />
          </div>
        </DashCard>
      </Col>
    </Row>
  );
};

export default ProductSales;
