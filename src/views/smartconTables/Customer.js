import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import message from '../../components/Message';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
// import Publish from '../../components/Publish';
// import SortOrder from '../../components/SortOrder';

const Customer = () => {
  //Const Variables
  const [customer, setCustomer] = useState(null);

  //getting data from content
  const getCustomer = () => {
    api
      .get('/contact/getContact')
      .then((res) => {
        setCustomer(res.data.data);
      })
      .catch(() => {
        message('Cannot get Content Data', 'error');
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

    getCustomer();
  }, []);
  //Structure of Content List view
  const Contentcolumns = [
    {
      name: '#',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => (
        <Link to="/">
          {' '}
          <Icon.Edit3 />
        </Link>
      ),
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: 'ID',
      selector: 'contact_id ',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Name',
      selector: 'first_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Password',
      selector: 'pass_word',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Mobile',
      selector: 'mobile',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    
    {
      name: 'Creation Date',
      selector: 'creation_date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
  ];

  return (
    <div className="MainDiv  pt-xs-25">
      <BreadCrumbs />

      <CommonTable
        title="Customer List"
        Button={
          <Link to="/CustomerDetails">
            <Button color="primary" className="shadow-none">
              Add New
            </Button>
          </Link>
        }
      >
        <thead>
          <tr>
            {Contentcolumns.map((cell) => {
              return <td key={cell.name}>{cell.name}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {customer &&
            customer.map((element, index) => {
              return (
                <tr key={element.contact_id}>
                  <td>{index + 1}</td>
                  <td>
                    {' '}
                    <Link to={`/CustomerEdit/${element.contact_id}`}>
                      <Icon.Edit2 />
                    </Link>
                  </td>
                  <td>{element.contact_id}</td>
                  <td>{element.first_name}</td>
                  <td>{element.email}</td>
                  <td>{element.pass_word}</td>
                  <td>{element.mobile}</td>
                  <td>{element.creation_date}</td>
                
                </tr>
              );
            })}
        </tbody>
      </CommonTable>
    </div>
  );
};
export default Customer;
