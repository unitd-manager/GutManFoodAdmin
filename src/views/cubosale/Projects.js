import React, { useState, useEffect,useRef } from 'react';
// import treeTableHOC from 'react-table-v6/lib/hoc/treeTable';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import 'react-table-v6/react-table.css';
import { Card,
  CardBody,Table,Row,Col,Button } from 'reactstrap';
  import { CSVLink } from "react-csv";
  import Jspdf from "jspdf";
  import "jspdf-autotable";
import api from '../../constants/api';

// import ProjectReportSection from '../../components/projectReportTop/ProjectReportSection';



// import BreadCrumbs from '../layouts/breadcrumbs/BreadCrumbs';
// import jsPDF from "jspdf";
// import "jspdf-autotable";
const Projects = () => {
  const [projectTableData, setProjectTableData] = useState([]);
  const [csvData, setcsvData] = useState('')
  // const [completeData, setCompleteData] = useState([])
  // const [status, setStatus] = useState('')
  const tableRef = useRef(null);
  const getTableData = () => {
    api 
      .get('/api/getProjects')
      .then((res) => {
        console.log(res.data);
        // console.log(res.data);
        setProjectTableData(res.data.data);
        //setCompleteData(res.data.data)
        const projectDaa = res.data.data;
        const tempData = [
          ["S.no", "Code", "Title","Company","Contact","Category","STATUS"]
        ];
        
        projectDaa.forEach(e => {
          tempData.push(["",e.project_code,e.title,e.company_name,e.contact_name,e.category,e.status])
        });
        console.log(tempData)
        setcsvData(tempData)
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new Jspdf(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Project Report";
    const headers = [["S.no", "Code", "Title","Company","Contact","Category","STATUS"]];

    const data = projectTableData.map(e=> ["",e.project_code,e.title,e.company_name,e.contact_name,e.category,e.status]);

    const content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
  }
  // const filterBystatus = (e) =>{
  //   setStatus(e.target.value)
  //   console.log(status)
  //   const selectedvalue = e.target.value
  //   const tempData = [
  //     ["S.no", "Code", "Title","Company","Contact","Category","STATUS"]
  //   ];
  //   const completeDataSet = []
  //   completeData.forEach(elm => {
  //     if(elm.status === selectedvalue){
  //       completeDataSet.push(elm)
  //       tempData.push(["",elm.project_code,elm.title,elm.company_name,elm.contact_name,elm.category,elm.status])
  //     }
  //   });
  //   console.log(tempData)
  //   setcsvData(tempData)
   
  //   setProjectTableData(completeDataSet)
  // }
  useEffect(() => {
    getTableData();

    return () => {
      getTableData();
    };
  }, []);

  return (
    <>  
      
      <Row>
      
      <Col>
      <Card>
        <CardBody>
          <Row>
          <Col md="6">
            <Link to="/projects/addproject">
              <Button  color="primary" className="mt-3">
                Add Project
              </Button>
            </Link>
            
            <CSVLink style={{marginTop:18,marginRight:10,marginLeft:10}} className='btn btn-block btn-success' data={csvData}>Excel</CSVLink>
            <Button onClick={()=>{exportPDF()}} color="danger btn-outline" className="mt-3">
              PDF
            </Button>
          </Col>
                  
          </Row>
         
        <Table ref={tableRef}>
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>
              <Icon.Trash2 />
            </th>
            <th>Code</th>
            <th>Title</th>
            <th>Company</th>
            <th>Contact</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>
        {projectTableData.map((e) => {
          return (
            <tbody>
              <tr>
                <td>{e.project_id}</td>
                <td>
                  <Link to={`editproject/${e.project_id}`}>
                  <Icon.Edit />
                  </Link>
                  
                </td>
                <td>
                  <Icon.Trash2 />
                </td>
                <td>{e.project_code}</td>
                <td>{e.title}</td>
                <td>{e.company_name}</td>
                <td>{e.contact_name}</td>
                <td>{e.category}</td>
                <td>{e.status}</td>
              </tr>
            </tbody>
          );
        })}
        
      </Table>
        </CardBody>
      </Card>
      
      </Col>
      </Row>
    
      {/* <Row>
        {randomData &&
          randomData.map((blg) => (
            <Col sm="6" lg="6" xl="3" key={blg.avatar}>
              <Blog
                image={blg.avatar}
                title={blg.first_name}
                subtitle={blg.last_name}
                text={blg.username}
                color="#000000"
              />
            </Col>
          ))}
      </Row> */}
      {/* </ComponentCard> */}
    </>
  );
};

export default Projects;

// `${blg.name.title + blg.name.first + blg.name.last}
