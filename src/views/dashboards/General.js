import { Row, Col } from 'reactstrap';
import MonthSummery from '../../components/dashboard/generalDashboard/MonthSummery';
import TotalVisits from '../../components/dashboard/generalDashboard/TotalVisits';
import SalesRatio from '../../components/dashboard/generalDashboard/SalesRatio';
import OrderStatus from '../../components/dashboard/generalDashboard/OrderStatus';
import RevenuePageBounce from '../../components/dashboard/generalDashboard/RevenuePageBounce';
import ProjectTable from '../../components/dashboard/classicDashboard/ProjectTable';
import RecentComments from '../../components/dashboard/classicDashboard/RecentComments';
import Chat from '../../components/dashboard/classicDashboard/Chat';

const General = () => {
  return (
    <>
        {/********************* Month Summery, Total visits & sales ratio, Order Status ************************/}
      <Row>
        <Col sm="12" lg="6">
          <MonthSummery />
        </Col>
        <Col sm="12" lg="6">
          <Row>
            <Col sm="12" lg="6">
              <TotalVisits />
            </Col>
            <Col sm="12" lg="6">
              <SalesRatio />
            </Col>
          </Row>
          <OrderStatus />
        </Col>
      </Row>
      {/********************* Revenue , Page, Bounce ************************/}
      <RevenuePageBounce />
      {/********************* Project Table ************************/}
      <ProjectTable />
      {/*********************Chat & comment ************************/}
      <Row>
        <Col lg="6" sm="12">
          <RecentComments />
        </Col>
        <Col lg="6" sm="12">
          <Chat />
        </Col>
      </Row>
    </>
  );
};

export default General;
