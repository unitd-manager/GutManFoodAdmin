import React from 'react';
import { Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
import DashCard from '../dashboardCards/DashCard';
import OrderStatsData from "./OrderStatsData";

const OrderStats = () => {
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
  const seriesorder = [45, 27, 15, 18];
  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-1 [Classic]                                                  */
    /*--------------------------------------------------------------------------------*/
    <DashCard title="Order Stats" subtitle="Overview of orders">
      <div className="mt-5">
        <Chart options={optionsorder} series={seriesorder} type="donut" height="245" />
      </div>
      <Row className="mt-4">
        <Col className="xs-4">
          <OrderStatsData iconColor="primary" title="5489" subtitle="Success" />
        </Col>
        <Col className="xs-4">
          <OrderStatsData iconColor="info" title="954" subtitle="Pending" />
        </Col>
        <Col className="xs-4">
          <OrderStatsData iconColor="danger" title="736" subtitle="Failed" />
        </Col>
      </Row>
    </DashCard>
  );
};

export default OrderStats;
