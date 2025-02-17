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
import Publish from '../../components/Publish';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const Setting = () => {
  //All state variable
  const [setting, setSetting] = useState(null);
  const [loading, setLoading] = useState(false);

  //Getting data from setting
  const getSetting = () => {
    api
      .get('/setting/getSetting')
      .then((res) => {
        setSetting(res.data.data);
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
    getSetting();
  }, []);
  //Structure of Setting list view
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
      name: 'Key Text',
      selector: 'key_text',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Description',
      selector: 'description',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Value',
      selector: 'value',
      sortable: true,
      grow: 0,
    },
    {
      name: 'ID',
      selector: 'setting_id',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Published',
      selector: 'published',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
  ];
  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        <CommonTable
          loading={loading}
          title="Setting List"
          Button={
            <Link to="/SettingDetails">
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
            {setting &&
              setting.map((element, index) => {
                return (
                  <tr key={element.setting_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/SettingEdit/${element.setting_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.key_text}</td>
                    <td>{element.description}</td>
                    <td>{element.value}</td>
                    <td>{element.setting_id}</td>
                    <td>
                      <Publish
                        idColumn="setting_id"
                        tablename="setting"
                        idValue={element.setting_id.toString()}
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

export default Setting;
