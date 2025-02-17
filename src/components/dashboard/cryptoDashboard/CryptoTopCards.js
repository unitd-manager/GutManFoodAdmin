import React from 'react';

import { Card, CardBody, Row, Col } from 'reactstrap';

const CryptoTopCards = () => {
  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-2 [Cryptocurrency]                                           */
    /*--------------------------------------------------------------------------------*/
    <Row>
      <Col sm="12" lg="3">
        {/*--------------------------------------------------------------------------------*/}
        {/* Card-3                                                                         */}
        {/*--------------------------------------------------------------------------------*/}
        <Card className="bg-primary text-dark-white">
          <CardBody>
            <div className="d-flex align-items-center">
              <div>
                <h6 className="font-12 mb-3">XRP / Ripple</h6>
                <h4 className="mt-4 fw-bolder mb-0">$2,767.53</h4>
                <small>12.3014 XRP</small>
              </div>
              <div className="circle-box lg-box bg-light ms-auto opacity-50">
                <i className="bi bi-coin text-primary" />
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col sm="12" lg="3">
        {/*--------------------------------------------------------------------------------*/}
        {/* Card-2                                                                         */}
        {/*--------------------------------------------------------------------------------*/}
        <Card className="bg-info text-dark-white">
          <CardBody>
            <div className="d-flex align-items-center">
              <div>
                <h6 className="font-12 mb-3">ETH / Ethereum</h6>
                <h4 className="mt-4 fw-bolder mb-0">$767.53</h4>
                <small>1.3014 ETH</small>
              </div>
              <div className="circle-box lg-box bg-light ms-auto opacity-50">
                <i className="bi bi-coin text-info" />
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>

      <Col sm="12" lg="3">
        {/*--------------------------------------------------------------------------------*/}
        {/* Card-3                                                                         */}
        {/*--------------------------------------------------------------------------------*/}
        <Card className="bg-success text-dark-white">
          <CardBody>
            <div className="d-flex align-items-center">
              <div>
                <h6 className="font-12 mb-3">Tether</h6>
                <h4 className="mt-4 fw-bolder mb-0">$2,767.53</h4>
                <small>12.3014 USDT</small>
              </div>
              <div className="circle-box lg-box bg-light ms-auto opacity-50">
                <i className="bi bi-coin text-success" />
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col sm="12" lg="3">
        {/*--------------------------------------------------------------------------------*/}
        {/* Card-1                                                                         */}
        {/*--------------------------------------------------------------------------------*/}
        <Card className="bg-warning text-dark-white">
          <CardBody>
            <div className="d-flex align-items-center">
              <div>
                <h6 className="font-12 mb-3">BTC / Bitcoin</h6>
                <h4 className="mt-4 fw-bolder mb-0">$12,567.53</h4>
                <small>3.3014 BTC</small>
              </div>
              <div className="circle-box lg-box bg-light ms-auto opacity-50">
                <i className="bi bi-currency-bitcoin text-warning" />
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default CryptoTopCards;
