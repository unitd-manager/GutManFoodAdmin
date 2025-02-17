import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
// import message from '../../components/Message';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import 'react-data-table-component-extensions/dist/index.css';
import api from '../../constants/api';
import CommonTable from '../../components/CommonTable';

function UserGroup() {
  const [userGroups, setUserGroups] = useState();
  const [loading, setLoading] = useState(false)


  //get api for usergroups
  const getAllUserGroups = () => {
    api
      .get('/usergroup/getusergroup')
      .then((res) => {
        setUserGroups(res.data.data);
        $('#example').DataTable({
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
          dom: 'Bfrtip',
          buttons: [ {
            extend: 'print',
            text: "Print",
            className:"shadow-none btn btn-primary",
        }],
        });
        setLoading(false)
      }).catch(()=>{
        setLoading(false)
      });
    };
  

  useEffect(() => {
    // setTimeout(() => {
    //   $('#example').DataTable({
    //     pagingType: 'full_numbers',
    //     pageLength: 20,
    //     processing: true,
    //     dom: 'Bfrtip',
    //     buttons: [
    //       {
    //         extend: 'print',
    //         text: 'Print',
    //         className: 'shadow-none btn btn-primary',
    //       },
    //     ],
    //     searching: true,
    //   });
    // }, 1000);

    getAllUserGroups();
  }, []);

  const columns = [
    {
      name: '#',
      selector: 'id',
      sortable: true,
      grow: 0,
      width: 'auto',
    },
    {
      name: '',
      selector: 'edit',
      sortable: true,
      grow: 0,
      width: 'auto',
      wrap: true,
    },
    {
      name: 'Title',
      selector: 'title',
      sortable: true,
      grow: 5,
    },
    {
      name: 'ID',
      selector: 'user_group_id',
      sortable: true,
      grow: 1,
      cell: (d) => <span>{d.closing.join(', ')}</span>,
    },
  ];
  return (
    <>
      <div className="MainDiv">
        {/* <div className="jumbotron text-center bg-sky">
        <h3>Therichpost.com</h3>
    </div> */}

        <div className="">
          <CommonTable
            title="UserGroup List"
            loading={loading}
            Button={
              <Link to="/UserGroupDetails">
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
              {userGroups &&
                userGroups.map((element) => {
                  return (
                    <tr key={element.user_group_id}>
                      <td>{element.user_group_id}</td>
                      <td>
                        <Link to={`/UserGroupEdit/${element.user_group_id}`}>
                          <Icon.Edit2 />
                        </Link>
                      </td>

                      <td>{element.title}</td>
                      <td>{element.user_group_id}</td>
                    </tr>
                  );
                })}
            </tbody>
          </CommonTable>
        </div>
      </div>
    </>
  );
}

export default UserGroup;
