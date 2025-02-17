import React from 'react';
import { Row, Col } from 'reactstrap';
import RecentComments from '../../components/dashboard/classicDashboard/RecentComments';
import Chat from '../../components/dashboard/classicDashboard/Chat';
import CryptoExchange from '../../components/dashboard/cryptoDashboard/CryptoExchange';
import CryptoOrder from '../../components/dashboard/cryptoDashboard/CryptoOrder';
import ActiveVisitors from '../../components/dashboard/classicDashboard/ActiveVisitors';
import ProductTable from '../../components/dashboard/ecommerceDashboard/ProductTable';
import OrderStats from '../../components/dashboard/ecommerceDashboard/OrderStats';
import Earnings from '../../components/dashboard/ecommerceDashboard/Earnings';
import Feeds from '../../components/widgets/Feeds';
import TaskList from '../../components/widgets/TaskList';
import Profile from '../../components/widgets/Profile';

const Widgets = () => {
  return (
    <>
      <Row>
        <Col xs="12" lg="4">
          <RecentComments />
          <TaskList />
          <CryptoOrder />
          <Earnings />
        </Col>
        <Col xs="12" lg="4">
          <Chat />
          <ProductTable />
          <Profile />
        </Col>
        <Col xs="12" lg="4">
            <Feeds />
            <CryptoExchange />
            <ActiveVisitors />
            <OrderStats />
        </Col>
      </Row>
    </>
  );
};

export default Widgets;
