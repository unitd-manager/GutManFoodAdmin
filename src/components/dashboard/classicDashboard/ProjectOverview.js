import React,{useState,useEffect} from "react"
import { Input, Row, Col, Button } from 'reactstrap';
import Chart from 'react-apexcharts';
import DashCard from '../dashboardCards/DashCard';
import api from '../../../constants/api';
import Task from "../../../views/smartconTables/Task";

const states = [
    {
      icon: 'bi bi-wallet',
      title: 'Pending Task',
      earning: '0',
      color: 'success',
    },
    {
      icon: 'bi bi-link',
      title: 'Total Projects',
      earning: '0',
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
  const [editTask, setEditask] = useState();
  <Task editTask={editTask}setEditask={setEditask}/>
    const [optionssalesummary, setoptionssalesummary] = useState({})
    const [seriessalessummry, setseriessalessummry] = useState([])

    const getTableData = () => {
      api 
        .get('/invoice/getInvoiveByMonth')
        .then((res) => {
          const statData= res.data.data
          const project = [];
          const stats = [];
          statData.forEach(element => {
            project.push(element.invoice_month)
            stats.push(element.invoice_amount_monthly)
          });
          setoptionssalesummary({
            chart: {
              id: 'apexchart-example'
            },
            plotOptions: {
                bar: {
                  horizontal: false
                }
              },
            xaxis: {
              categories: project
            }
          })
          setseriessalessummry([{
            name: 'Data',
            data: stats
          }])
          
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
  
    useEffect(() => {
      getTableData();
    }, []);
  return (
    <DashCard
      title="Project Overview"
      subtitle="Overview of all project"
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
            <div className="chart-wrapper" style={{ width: '100%', margin: '0 auto', height: 750 }}>
              
              <Chart 
              options={optionssalesummary} 
              series={seriessalessummry} type="bar"  height={750} />
              
              {/* <Chart
                options={optionssalesummary}
                series={seriessalessummry}
                type="area"
                height="250"
              /> */} 
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
