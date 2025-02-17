import { Row, Col } from 'reactstrap';
import Earnings from '../../components/dashboard/ecommerceDashboard/Earnings';
import Overview from '../../components/dashboard/ecommerceDashboard/Overview';
import ProductSales from '../../components/dashboard/ecommerceDashboard/ProductSales';
import ProductTable from '../../components/dashboard/ecommerceDashboard/ProductTable';
import OrderStats from '../../components/dashboard/ecommerceDashboard/OrderStats';
import Reviews from '../../components/dashboard/ecommerceDashboard/Reviews';

const Ecommerce = () => {
  return (
    <>
    {/********************* Earnings & Overview ************************/}
      <Row>
        <Col sm="12" lg="4">
          <Earnings />
        </Col>
        <Col sm="12" lg="8">
          <Overview />
        </Col>
      </Row>
      {/********************* Product Sale Table ************************/}
      <ProductSales />
      {/********************* Product table & Order Stats ************************/}
      <Row>
        <Col sm="12" lg="8">
          <ProductTable />
        </Col>
        <Col sm="12" lg="4">
          <OrderStats />
        </Col>
      </Row>
      {/********************* Review ************************/}
      <Reviews />
    </>
  );
};

export default Ecommerce;
