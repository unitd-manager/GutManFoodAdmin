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
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import Publish from '../../components/Publish';

const Staff = () => {
  // All state variables
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(false);

  //Api call for getting Staff Data
  const getStaff = () => {
    api
      .get('/staff/getStaff')
      .then((res) => {
        setStaff(res.data.data);
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
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getStaff();
  }, []);

  const columns = [
    {
      name: '#',
      selector: '',
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
      name: 'Name',
      selector: 'first_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Group',
      selector: 'user_group_title',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Team',
      selector: 'team',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Staff Type',
      selector: 'staff_type',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'ID',
      selector: 'staff_id',
      sortable: true,
      width: 'auto',
    },
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

        <CommonTable
          loading={loading}
          title="Staff List"
          Button={
            <Link to="/StaffDetails">
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
            {staff &&
              staff.map((element, index) => {
                return (
                  <tr key={element.staff_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/StaffEdit/${element.staff_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.first_name}</td>
                    <td>{element.user_group_title}</td>
                    <td>{element.email}</td>
                    <td>{element.team}</td>
                    <td>{element.staff_type}</td>
                    <td>{element.status}</td>
                    <td>{element.staff_id}</td>
                    <td>
                      <Publish
                        idColumn="staff_id"
                        tablename="staff"
                        idValue={element.staff_id.toString()}
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
export default Staff;
