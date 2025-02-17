import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
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

export default function Test() {
  const [tenders, setTenders] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      $('#example').DataTable({
        pagingType: 'full_numbers',
        pageLength: 20,
        processing: true,
        dom: 'Bfrtip',
        buttons: ['print'],
      });
    }, 1000);

    api.get('/tender/getTenders').then((res) => {
      setTenders(res.data.data);
    });
  }, []);

  const columns = [
    {
      name: 'id',
      selector: 'opportunity_id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => (
        <Link to="/TenderEdit">
          <Icon.Edit2 />
        </Link>
      ),
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: 'Lang',
      selector: 'flag',
      cell: () => <Icon.Flag />,
      grow: 0,
      width: 'auto',
      wrap: true,
    },
    {
      name: 'Code',
      selector: 'opportunity_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Project',
      selector: 'title',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Ref No',
      selector: 'office_ref_no',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Main Con',
      selector: 'company_name',
      sortable: true,
      width: 'auto',
      grow: 3,
      // cell: d => <span>{d.closing.join(", ")}</span>
    },
    {
      name: 'Actual Closing',
      selector: 'closinactual_closing',
      sortable: true,
      grow: 2,
      width: 'auto',
      // cell: d => <span>{d.closing.join(", ")}</span>
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      grow: 2,
      wrap: true,
      // cell: d => <span>{d.closing.join(", ")}</span>
    },
    {
      name: 'Quoted By',
      selector: 'quote_ref',
      sortable: true,
      width: 'auto',
      // cell: d => <span>{d.closing.join(", ")}</span>
    },
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        <table id="example" className="display border border-secondary rounded">
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {tenders &&
              tenders.map((element) => {
                return (
                  <tr key={element.title}>
                    <td>{element.opportunity_id}</td>
                    <td>
                      <Link to="/TenderEdit">
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td></td>
                    <td>{element.opportunity_code}</td>
                    <td>{element.title}</td>
                    <td>{element.office_ref_no}</td>
                    <td>{element.company_name}</td>
                    <td>{element.closinactual_closing}</td>
                    <td>{element.status}</td>
                    <td>{element.quote_ref}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
