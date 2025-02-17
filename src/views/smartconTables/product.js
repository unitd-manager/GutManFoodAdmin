import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import Publish from '../../components/Publish';


const SectionDetails = () => {
  //Const Variables
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(false);

  // Navigation and Parameter Constants
  const { id } = useParams();

  // get section
  const getSection = () => {
    api
      .get('/product/getProductAdmin')
      .then((res) => {
        setSection(res.data.data);
    
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    setTimeout(() => {
      $('#example').DataTable({
        pagingType: 'full_numbers',
        pageLength: 20,
        processing: true,
        dom: 'Bfrtip',
        buttons: [
          {
            extend: 'print',
            text: 'Print',
            className: 'shadow-none btn btn-primary',
          },
        ],
      });
    }, 1000);

    getSection();
  }, [id]);

  // useEffect(() => {
  //   getSection();
  // }, [id]);
  //  stucture of Section list view
  const columns = [
    {
      name: '#',
      grow: 0,
      wrap: true,
      width: '4%',
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
      name: 'Product Code',
      selector: 'product_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Title',
      selector: 'title',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Product Type',
      selector: 'product_type',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Unit',
      selector: 'unit',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Price',
      selector: 'price',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    // {
    //   name: 'Qty in Stock',
    //   selector: 'qty_in_stock',
    //   sortable: true,
    //   grow: 2,
    //   width: 'auto',
    // },
    // {
    //   name: 'Modified By',
    //   selector: 'modified_by',
    //   sortable: true,
    //   grow: 2,
    //   width: 'auto',
    // },
    {
      name: 'Published',
      selector: 'published',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
   
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        {/* Section Add new button */}

        <CommonTable
          loading={loading}
          title="Product List"
          Button={
            <Link to="/ProductDetails">
              <Button color="primary" className="shadow-none">
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
            {section &&
              section.map((element, index) => {
                return (
                  <tr key={element.product_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/ProductEdit/${element.product_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    
                    <td>
                    <Link to={`/InventoryEdit/${element.inventory_id}`}>
                      {element.product_code}
                      </Link>
                    </td>
                    <td>{element.title}</td>
                    <td>{element.product_type}</td>
                    <td>{element.unit}</td>
                    <td>{element.price}</td>
                    {/* <td>{element.qty_in_stock}</td> */}
                    {/* <td>{element.modified_by}</td> */}
                    <td>
                      <Publish
                        idColumn="product_id"
                        tablename="product"
                        idValue={element.product_id.toString()}
                        value={element.published}
                      ></Publish>
                    </td>
                    {/* <td>
                      <SortOrder
                        idValue={element.product_id}
                        idColumn="product_id"
                        tablename="section"
                        value={element.sort_order}
                      ></SortOrder>
                    </td> */}
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
        {/* setion table */}
      </div>
    </div>
  );
};

export default SectionDetails;
