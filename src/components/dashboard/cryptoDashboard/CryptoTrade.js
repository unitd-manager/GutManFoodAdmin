import React, { useState } from 'react';
import { Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Table, Input } from 'reactstrap';
import DashCard from '../dashboardCards/DashCard';
import { ReactComponent as Bitcoin } from '../../../assets/images/crypto/bitcoin-btc-logo.svg';
import { ReactComponent as Cardano } from '../../../assets/images/crypto/cardano-ada-logo.svg';

import { ReactComponent as Litecoin } from '../../../assets/images/crypto/litecoin-ltc-logo.svg';
import { ReactComponent as Monero } from '../../../assets/images/crypto/monero-xmr-logo.svg';
import { ReactComponent as Shiba } from '../../../assets/images/crypto/shiba-inu-shib-logo.svg';
import { ReactComponent as Terra } from '../../../assets/images/crypto/terra-luna-luna-logo.svg';
import { ReactComponent as Tether } from '../../../assets/images/crypto/tether-usdt-logo.svg';

const CryptoTrade = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-2 [Cryptocurrency]                                           */
    /*--------------------------------------------------------------------------------*/
    <DashCard
      title="Trade History"
      subtitle="History as you Like"
      actions={
        <Input type="select" className="custom-select">
          <option value="0">March</option>
          <option value="1">April</option>
          <option value="2">May</option>
        </Input>
      }
    >
      <Nav pills className="custom-pills mt-4">
        <NavItem>
          <NavLink
            className={activeTab === '1' ? 'active text-dark-white' : 'cursor-pointer'}
            onClick={() => {
              toggle('1');
            }}
          >
            Market
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '2' ? 'active text-dark-white' : 'cursor-pointer'}
            onClick={() => {
              toggle('2');
            }}
          >
            Sell History
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab} className="mt-3">
        {/*--------------------------------------------------------------------------------*/}
        {/* Tab-1                                                                          */}
        {/*--------------------------------------------------------------------------------*/}
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <div>
                <Table className="v-middle no-wrap">
                  <thead>
                    <tr>
                      <th>Price</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="text-success">$12948.89</span>
                      </td>
                      <td>
                        <Bitcoin width="30" /> <span className="ms-2 fw-bold">0.123</span>
                      </td>
                      <td>12:45:09</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="text-danger">$23135.78</span>
                      </td>
                      <td>
                        <Cardano width="30" /> <span className="ms-2 fw-bold">1.123</span>
                      </td>
                      <td>12:43:09</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="text-success">$43567.98</span>
                      </td>
                      <td>
                        <Tether width="30" />
                        <span className="ms-2 fw-bold">0.123</span>
                      </td>
                      <td>12:45:09</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="text-success">$12948.89</span>
                      </td>
                      <td>
                        <Litecoin width="30" /> <span className="ms-2 fw-bold">0.123</span>
                      </td>
                      <td>12:45:09</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="text-danger">$23135.78</span>
                      </td>
                      <td>
                        <Monero width="30" /> <span className="ms-2 fw-bold">1.123</span>
                      </td>
                      <td>12:43:09</td>
                    </tr>
                    <tr>
                      <td>
                        <span className="text-success">$43567.98</span>
                      </td>
                      <td>
                        <Shiba width="30" />
                        <span className="ms-2 fw-bold">0.123</span>
                      </td>
                      <td>12:45:09</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </TabPane>
        {/*--------------------------------------------------------------------------------*/}
        {/* Tab-2                                                                          */}
        {/*--------------------------------------------------------------------------------*/}
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <Table className="v-middle no-wrap" responsive>
                <thead>
                  <tr>
                    <th className="border-top-0">Price</th>
                    <th className="border-top-0">Amount</th>
                    <th className="border-top-0">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="text-success">$43567.98</span>
                    </td>
                    <td>
                      <Terra width="30" /> <span className="ms-2 fw-bold">0.123</span>
                    </td>
                    <td>12:45:09</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="text-success">$12948.89</span>
                    </td>
                    <td>
                      <Tether width="30" /> <span className="ms-2 fw-bold">0.123</span>
                    </td>
                    <td>12:45:09</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="text-success">$12948.89</span>
                    </td>
                    <td>
                      <Bitcoin width="30" /> <span className="ms-2 fw-bold">0.123</span>
                    </td>
                    <td>12:45:09</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="text-danger">$23135.78</span>
                    </td>
                    <td>
                      <Bitcoin width="30" /> <span className="ms-2 fw-bold">1.123</span>
                    </td>
                    <td>12:43:09</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="text-danger">$23135.78</span>
                    </td>
                    <td>
                      <Bitcoin width="30" /> <span className="ms-2 fw-bold">1.123</span>
                    </td>
                    <td>12:43:09</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="text-success">$43567.98</span>
                    </td>
                    <td>
                      <Bitcoin width="30" /> <span className="ms-2 fw-bold">0.123</span>
                    </td>
                    <td>12:45:09</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </DashCard>
  );
};

export default CryptoTrade;
