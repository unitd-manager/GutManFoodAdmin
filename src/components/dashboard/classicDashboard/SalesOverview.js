import { Input, Row, Col, Button } from 'reactstrap';
import Chart from 'react-apexcharts';
import DashCard from '../dashboardCards/DashCard';

const optionssalesummary = {
  chart: {
    id: 'basic-bar',
    fontFamily: '"Nunito", sans-serif',
    type: 'area',
    toolbar: {
      show: false,
    },
  },

  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  colors: ['#4fc3f7', '#2962ff'],
  legend: {
    show: false,
  },
  markers: {
    size: 3,
  },
  xaxis: {
    categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    labels: {
      show: true,
      style: {
        colors: '#99abb4',
        fontSize: '12px',
        fontFamily: "'Nunito Sans', sans-serif",
      },
    },
  },
  yaxis: {
    labels: {
      show: true,
      style: {
        colors: '#99abb4',
        fontSize: '12px',
        fontFamily: "'Nunito Sans', sans-serif",
      },
    },
  },
  grid: {
    borderColor: 'rgba(0,0,0,0.1)',
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  tooltip: {
    theme: 'dark',
  },
};
const seriessalessummry = [
  {
    name: 'Site A view',
    data: [0, 5, 6, 8, 25, 9, 8, 24],
  },
  {
    name: 'Site B view',
    data: [0, 3, 1, 2, 8, 1, 5, 1],
  },
];

const states = [
  {
    icon: 'bi bi-wallet',
    title: 'Wallet Balance',
    earning: '3,567.53',
    color: 'success',
  },
  {
    icon: 'bi bi-link',
    title: 'Referral Earnings',
    earning: '769.08',
    color: 'danger',
  },
  {
    icon: 'bi bi-archive',
    title: 'Estimate Sales',
    earning: '5,489',
    color: 'warning',
  },
  {
    icon: 'bi bi-coin',
    title: 'Earnings',
    earning: '23,568',
    color: 'info',
  },
];

const SalesOverview = () => {
  return (
    <DashCard
      title="Sales Overview"
      subtitle="Overview of Latest Month"
      actions={
        <Input type="select" id="exampleSelect">
          <option value="">Monthly</option>
          <option>Daily</option>
          <option>Weekly</option>
          <option>Yearly</option>
        </Input>
      }
    >
      <Row>
        <Col lg="4">
          <h2 className="mb-0 mt-4">$6,890.68</h2>
          <small className="text-muted">Current Month Earnings</small>
          <h3 className="mt-4 mb-0">1,540</h3>
          <small className="text-muted">Current Month Sales</small>
          <br />
          <Button color="primary" className="mt-3 p-3">
            Last Month Summary
          </Button>
        </Col>
        <Col lg="8">
          <div className="campaign ct-charts">
            <div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 250 }}>
              <Chart
                options={optionssalesummary}
                series={seriessalessummry}
                type="area"
                height="250"
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-5 border-top">
        {states.map((item) => (
          <Col key={item.title}>
            <div className="d-flex p-2 pt-4">
              <div className={`circle-box lg-box d-inline-block bg-light-${item.color}`}>
                <i className={`${item.icon} text-${item.color}`} />
              </div>
              <div className="ms-3">
                <small className="text-muted">{item.title}</small>
                <h3 className="mb-0 font-weight-bold">${item.earning}</h3>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </DashCard>
  );
};

export default SalesOverview;
