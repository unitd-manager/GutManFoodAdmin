import React, {useState,useEffect } from 'react';
import DataTable from "react-data-table-component";
 import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import api from '../../constants/api';

function TenderData() {
  const [mydata,setData] = useState([]);
  
   useEffect(()=>{
      api.get('/tender/getTenders')
      .then((res)=> {
        const response = res.data.data
        const finalArray = []
        response.forEach(element => {
          finalArray.push({opportunity_id:element.opportunity_id.toString(),
            
            edit:"",
            flag:"",

            opportunity_code:element.opportunity_code,

            title:element.title,

            office_ref_no:"",

            company_name:element.company_name,

            closinactual_closing:"",

            status:element.status,

            quote_ref:""
          })
        });
       setData(finalArray);
        console.log(finalArray) 
      })
  },[]);

const columns = [
    {
      name: "id",
      selector: "opportunity_id",
      grow:0,
      wrap: true,
      width:'4%'
    },
    {
        name: 'Edit',
        selector: "edit",
       cell: () => <Link to="/EmployeeDetailsData"><Icon.Edit2 /></Link>,
        grow:0,
        width:'auto',
        button:true,
        sortable:false,
    },
    {
        name:'Lang',
        selector: "flag",
        cell: () => <Icon.Flag />,
        grow:0,
        width:'auto',
        wrap: true
    },
    {
      name: "Code",
      selector: "opportunity_code",
      sortable: true,
      grow:0,
      wrap: true
    },
    {
      name: "Project",
      selector: "title",
      sortable: true,
      grow:2,
      wrap: true
    },
    {
      name: "Ref No",
      selector: "office_ref_no",
      sortable: true,
      grow:0,
    },
    {
        name: "Main Con",
        selector: "company_name",
        sortable: true,
        width:'auto',
        grow:3,
        // cell: d => <span>{d.closing.join(", ")}</span>
      },
      {
        name: "Actual Closing",
        selector: "closinactual_closing",
        sortable: true,
        grow:2,
        width:'auto',
        // cell: d => <span>{d.closing.join(", ")}</span>
      },
      {
        name: "Status",
        selector: "status",
        sortable: true,
        grow:2,
        wrap: true,
        // cell: d => <span>{d.closing.join(", ")}</span>
      },
      {
        name: "Quoted By",
        selector: "quote_ref",
        sortable: true,
        width:'auto',
        // cell: d => <span>{d.closing.join(", ")}</span>
      },
  ];
  

  return(
    <>
     {/* <DataTableExtensions> */}
        <DataTable
          columns={columns}
          data={mydata}
          noHeader
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          highlightOnHover
        />
      {/* </DataTableExtensions> */}
    </>
  )
};

export default TenderData;