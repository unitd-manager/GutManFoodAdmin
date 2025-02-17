import React, { useState, useEffect } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-fixedheader';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
//  import Api from 'datatables.net';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import apiCall from '../../constants/api';
import { columns } from '../../data/Tender/ProductData';
import message from '../../components/Message';
import Publish from '../../components/Publish';

const Test = () => {
  //state variables
  const [products, setProducts] = useState();
  //get api for products
  const getAllProducts = () => {
    apiCall
      .get('/product/getProducts')
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch(() => {
        message('Product Data Not Found', 'info');
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

 
  useEffect(() => {
    /* eslint-disable */
    $(document).ready(function () {
      $('#example').DataTable({
        fixedHeader: {
          header: false,
          footer: false,
        },
        pagingType: 'full_numbers',
        bSort: true,
        order: [[0, 'asc']],
        lengthMenu: [
          [25, 50, 100, -1],
          [25, 50, 100, 'All'],
        ],
        initComplete: () => {
          this.api()
            .columns()
            .every(() => {
              const column = this;
              const select = $('<select style="width:100px;"><option value=""></option></select>')
                .appendTo($(column.header()).find('span').empty())
                .on({
                  change: function () {
                    const val = $.fn.dataTable.util.escapeRegex($(this).val());
                    column.search(`${val} ? ^ ${val} $ : '', true, false `).draw();
                  },
                  click: function (e) {
                    // stop click event bubbling
                    e.stopPropagation();
                  },
                });

              column
                .data()
                .unique()
                .sort()
                .each((d) => {
                  select.append(`<option value=${d}>${d}</option>`);
                });
              $(column.footer()).empty();
            });
        },
      });
    });

    /* eslint-disable */
  }, []);

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <Link to="/ProductDetails">
          <Button color="primary" className="shadow-none">
            Add New
          </Button>
        </Link>
        <table
          // ref={tableRef}
          id="example"
          className="display border border-secondary rounded"
        >
          <thead>
            <tr>
              {columns.map((cell) => {
                return <th key={cell.name}>{cell.name}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((element) => {
                return (
                  <tr key={element.product_id}>
                    <td>{element.product_id}</td>
                    <td>
                      <Link to={`/ProductEdit/${element.product_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.item_code}</td>
                    <td>{element.title}</td>
                    <td>{element.product_type}</td>
                    <td>{element.price}</td>
                    <td>{element.unit}</td>
                    <td>{element.qty_in_stock}</td>
                    <td>{element.modified_by}</td>
                    <td><Publish
                        idColumn="product_id"
                        tablename="product"
                        idValue={element.product_id.toString()}
                        value={element.published}
                      ></Publish></td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Test;
