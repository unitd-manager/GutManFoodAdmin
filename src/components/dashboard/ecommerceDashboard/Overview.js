import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Row, Col } from 'reactstrap';

import OverviewData  from './OverviewData';

const Overview = () => {
  return (
    /*--------------------------------------------------------------------------------*/
    /* Earnings                                                 */
    /*--------------------------------------------------------------------------------*/
    <Card>
      <CardBody className="border-bottom p-4">
        <CardTitle tag="h4">Overview</CardTitle>
        <CardSubtitle className="text-muted">Total Earnings of the Month</CardSubtitle>
      </CardBody>
      <CardBody className='p-4'>
        <Row>
          <Col md="4" sm="12" lg="4">
            <OverviewData
              textColor="info"
              icon="wallet2"
              title="Net Profit"
              subtitle="$3,567.53"
            />
          </Col>
          <Col md="4" sm="12" lg="4">
            <OverviewData textColor="warning" icon="basket" title="Product sold" subtitle="5489" />
          </Col>
          <Col md="4" sm="12" lg="4">
            <OverviewData textColor="success" icon="person" title="New Customers" subtitle="$23,568.90" />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Overview;
