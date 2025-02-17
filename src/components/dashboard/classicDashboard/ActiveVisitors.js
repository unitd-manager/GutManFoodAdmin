import React from 'react';
import { Progress, Card, CardBody, Row, Col, Button } from 'reactstrap';

import img1 from '../../../assets/images/background/active-bg.png';

const ActiveVisitors = () => {
  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-1 [Classic]                                                  */
    /*--------------------------------------------------------------------------------*/
    <Card className="card-hover">
      <CardBody style={{ background: `url(${img1}) no-repeat top center` }}>
        <div className="pt-3 text-center">
          <i className="bi bi-bar-chart-line display-4 text-primary d-block" />
          <span className="display-5 d-block fw-bold">368</span>
          <span>Active Visitors on Site</span>
          <Progress multi className="mt-5" style={{ height: '0.3rem' }}>
            <Progress bar color="primary" value="15" />
            <Progress bar color="success" value="60" />
            <Progress bar color="warning" value="25" />
          </Progress>
          <Row className="mt-4 mb-4">
            <Col xs="4" md="12" lg="4" className="border-right text-left">
              <h4 className="mb-0 fw-bold">60%</h4>Desktop
            </Col>
            <Col xs="4" md="12" lg="4" className="border-right text-md-left">
              <h4 className="mb-0 fw-bold">28%</h4>Mobile
            </Col>
            <Col xs="4" md="12" lg="4" className="text-right text-md-left">
              <h4 className="mb-0 fw-bold">12%</h4>Tablet
            </Col>
          </Row>
          <Button color="primary" className="mb-2">
            View More Details
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default ActiveVisitors;
