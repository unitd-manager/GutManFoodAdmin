import { Row, Col } from 'reactstrap';
import CryptoTopCards from '../../components/dashboard/cryptoDashboard/CryptoTopCards';
import CryptoChart from '../../components/dashboard/cryptoDashboard/CryptoChart';
import CryptoExchange from '../../components/dashboard/cryptoDashboard/CryptoExchange';
import CryptoOrder from '../../components/dashboard/cryptoDashboard/CryptoOrder';
import CryptoTable from '../../components/dashboard/cryptoDashboard/CryptoTable';
import CryptoTrade from '../../components/dashboard/cryptoDashboard/CryptoTrade';
import CryptoBuySell from '../../components/dashboard/cryptoDashboard/CryptoBuySell';

const Crypto = () => {
  return (
    <>
    {/********************* Crypto Top Cards ************************/}
      <CryptoTopCards />
      {/********************* Crypto Chart ************************/}
      <CryptoChart />
      {/********************* Crypto Exchange & Order ************************/}
      <Row>
        <Col lg="6">
          <CryptoExchange />
        </Col>
        <Col lg="6">
          <CryptoOrder />
        </Col>
      </Row>
      {/********************* Crypto Table ************************/}
      <Row>
        <Col lg="12">
          <CryptoTable />
        </Col>
      </Row>
      {/********************* Crypto Trade & Buy Sell ************************/}
      <Row>
        <Col lg="6">
          <CryptoTrade />
        </Col>
        <Col lg="6">
          <CryptoBuySell />
        </Col>
      </Row>
    </>
  );
};

export default Crypto;
