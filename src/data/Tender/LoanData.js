import React, {useState,useEffect } from 'react';
import DataTable from "react-data-table-component";
 import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import api from '../../constants/api';

function LoanData() {
  const [mydata,setData] = useState([]);
  
   useEffect(()=>{
      api.get('/loan/getLoan')
      .then((res)=> {
        const response = res.data.data
        const finalArray = []
        response.forEach(element => {
          finalArray.push({loan_id:element.loan_id.toString(),
            
            edit:"",
            flag:"",

            loan_id:element.loan_id,

            employee_id:element.employee_id,

            date:element.date,

            amount:element.amount,

            month_amount:element.month_amount,

            status:element.status
          })
        });
       setData(finalArray);
        console.log(finalArray) 
      })
  },[]);

const columns = [
    {
      name: "id",
      selector: "loan_id",
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
      name: "Employee Name",
      selector: "employee_name",
      sortable: true,
      grow:0,
      wrap: true
    },
    {
      name: "Loan Appication Date",
      selector: "date",
      sortable: true,
      grow:2,
      wrap: true
    },
    {
      name: "Total Loan Amount",
      selector: "amount",
      sortable: true,
      grow:0,
    },
    {
        name: "Amount Payable(per month)",
        selector: "month_amount",
        sortable: true,
        width:'auto',
        grow:3,
        // cell: d => <span>{d.closing.join(", ")}</span>
      },
      {
        name: "Total amount paid",
        selector: "total_amount",
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

export default LoanData;