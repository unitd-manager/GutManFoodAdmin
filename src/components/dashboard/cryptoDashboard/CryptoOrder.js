import React, { useState } from 'react';
import {
  Nav,
  NavItem,
  TabContent,
  TabPane,
  NavLink,
  InputGroup,
  InputGroupText,
  Input,
} from 'reactstrap';
import DashCard from '../dashboardCards/DashCard';

const CryptoOrder = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <DashCard title="Place your Order" subtitle="Buy and Sell Crypto as you Like">
      <Nav tabs className="mt-4">
        <NavItem>
          <NavLink
            className={activeTab === '1' ? 'active bg-transparent' : 'cursor-pointer'}
            onClick={() => {
              toggle('1');
            }}
          >
            Buy
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '2' ? 'active bg-transparent' : 'cursor-pointer'}
            onClick={() => {
              toggle('2');
            }}
          >
            Sell
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab} className="p-4 border border-top-0">
        <TabPane tabId="1" className="text-center">
          <InputGroup>
            <Input placeholder="Buy Bitcoin" />
            <InputGroupText>
              <i className="bi bi-currency-bitcoin" />
            </InputGroupText>
          </InputGroup>
          <div className="circle-box d-inline-block text-white bg-success my-3 mx-auto">Or</div>
          <InputGroup>
            <Input placeholder="Buy Ethereum" />
            <InputGroupText>
              <i className="bi bi-coin" />
            </InputGroupText>
          </InputGroup>
        </TabPane>
        <TabPane tabId="2" className="text-center">
          <InputGroup>
            <Input placeholder="Sell Bitcoin" />
            <InputGroupText>
              <i className="bi bi-currency-bitcoin" />
            </InputGroupText>
          </InputGroup>
          <div className="circle-box d-inline-block text-white bg-success my-3 mx-auto">Or</div>
          <InputGroup>
            <Input placeholder="Sell Ethereum" />
            <InputGroupText>
              <i className="bi bi-coin" />
            </InputGroupText>
          </InputGroup>
        </TabPane>
      </TabContent>
    </DashCard>
  );
};

export default CryptoOrder;
