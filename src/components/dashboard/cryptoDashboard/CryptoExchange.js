import React from 'react';
import { Row, Col, Form, Input, Button, InputGroup, InputGroupText } from 'reactstrap';
import DashCard from '../dashboardCards/DashCard';

const CryptoExchange = () => {
  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-2 [Cryptocurrency]                                           */
    /*--------------------------------------------------------------------------------*/
    <DashCard title="Currency Exchange" subtitle="Exchange currency from here">
      <Form className="text-center pt-3 mb-4">
        <Row className="no-gutters">
          <Col xs="12">
            <InputGroup>
              <Input />
              <InputGroupText>
                <Input type="select" className="">
                  <option value="1">BTC</option>
                  <option value="2">ETH</option>
                  <option value="3">DASH</option>
                  <option value="4">LTC</option>
                  <option value="5">NEO</option>
                  <option value="6">XRP</option>
                  <option value="7">EOS</option>
                  <option value="8">NEM</option>
                  <option value="9">ADA</option>
                </Input>
              </InputGroupText>
            </InputGroup>
          </Col>
        </Row>
        <div className="circle-box d-inline-block text-white bg-danger my-3 mx-auto">
          <i className="bi bi-arrow-down-up" />
        </div>
        <Row className="no-gutters">
          <Col xs="12">
            <InputGroup>
              <Input />
              <InputGroupText>
                <Input type="select" className="">
                  <option value="1">USD</option>
                  <option value="2">EUR</option>
                  <option value="3">INR</option>
                  <option value="4">AUD</option>
                  <option value="5">GBP</option>
                  <option value="6">CAD</option>
                </Input>
              </InputGroupText>
            </InputGroup>
          </Col>
        </Row>
      </Form>
      <Button type="button" color="primary">
        Exchange Now
      </Button>
    </DashCard>
  );
};

export default CryptoExchange;
