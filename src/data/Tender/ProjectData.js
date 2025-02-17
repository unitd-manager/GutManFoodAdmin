import React, {useState,useEffect } from 'react';
import axios from 'axios';
// import DataTableExtensions from "react-data-table-component-extensions";
import DataTable from "react-data-table-component";

function ProjectData() {
const [mydata,setData] = useState([]);

 useEffect(()=>{
    axios.get('http://43.228.126.245:3001/project/getProjects')
    .then((res)=> {
      setData(res.data.data);
      //console.log(res.data.data) 
    })
},[]);

const columns = [
    {
      name:'id',
      selector:'',

    },
    {
      name: "Code",
      selector: "opportunity_code",
      grow:0,
      wrap: true,
     
    },
    {
        name: "Title",
        selector: "title",
        sortable: true,
        grow:2,
        wrap: true
  },
    {
        name:"company",
        selector: "company_name",
        sortable: true,
        grow:2,
        wrap: true
    },
    {
      name: "contact",
      selector: "contact_name",
    },
    {
      name: "Category",
      selector: "category",
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      grow:0,
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

export default ProjectData;
  