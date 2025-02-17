import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import { Link, useParams } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import Publish from '../../components/Publish';
import SortOrder from '../../components/SortOrder';

const SubCategory = () => {
  // All state variables
  const [subcategory, setSubCategory] = useState();
  const [loading, setLoading] = useState(false)
  

  // Navigation and Parameter Constants
  const { id } = useParams();

  //Api call for getting SubCategory Data
  const getSubCategory = () => {
    api
      .get('/subcategory/getSubCategory')
      .then((res) => {
        setSubCategory(res.data.data);
        $('#example').DataTable({
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
          dom: 'Bfrtip',
        //   buttons: [ {
        //     extend: 'print',
        //     text: "Print",
        //     className:"shadow-none btn btn-primary",
        // }],
        });
        setLoading(false)
      }).catch(()=>{
        setLoading(false)
      });
    };
  
  useEffect(() => {
    getSubCategory();
  }, [id]);

  

  useEffect(() => {
  }, []);


  //Structure of Subcategory List view
  const columns = [
    {
      name: '#',
      selector: '',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Edit', 
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: 'Title',
      selector: 'sub_category_title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Sort Order',
      selector: 'sort_order',
      sortable: true,
      grow: 0,
      width: 'auto',
    },
    {
      name: 'Type',
      selector: 'sub_category_type',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Section',
      selector: 'section_title',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Category',
      selector: 'category_title',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name: 'Sub Category', 
      selector: 'sub_category_id',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Published',
      selector: 'published',
      sortable: true,
      grow: 2,
      wrap: true,
    },
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable
        loading={loading}
          title='SubCategory List'
          module='SubCategory'
          Button={
            <Link to="/SubCategoryDetails">
              <Button color="primary" className="shadow-none mr-2">
                Add New
              </Button>
            </Link>
          }
        >
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {subcategory &&
              subcategory.map((element, index) => {
                return (
                  <tr key={element.sub_category_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/SubCategoryEdit/${element.sub_category_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.sub_category_title}</td>
                    <td>
                    <SortOrder
                        idValue={element.sub_category_id}
                        idColumn="sub_category_id"
                        tablename="sub_category"
                        value={element.sort_order}
                      ></SortOrder>
                    </td>
                    <td>{element.sub_category_type}</td>
                    <td>{element.section_title}</td>
                    <td>{element.category_title}</td>
                    <td>{element.sub_category_id}</td>
                    <td>
                    <Publish
                        idColumn="sub_category_id"
                        tablename="sub_category"
                        idValue={element.sub_category_id.toString()}
                        value={element.published}
                      ></Publish>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default SubCategory;
