import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
// import message from '../../components/Message';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import SortOrder from '../../components/SortOrder';

const Valuelist = () => {
  // All state variables
  const [valuelist, setValuelist] = useState();
  // const [selectedItem, setSelectedSortingItem] = useState();
  const [loading, setLoading] = useState(false);

  //Api call for getting Valuelist Data
  const getValuelist = () => {
    api
      .get('/valuelist/getValueList')
      .then((res) => {
        setValuelist(res.data.data);
        $('#example').DataTable({
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
          dom: 'Bfrtip',
          // buttons: [
          //   {
          //     extend: 'print',
          //     text: 'Print',
          //     className: 'shadow-none btn btn-primary',
          //   },
          // ],
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // // API call for Update Sort Order
  // const changeSortingOrder = (e) => {
  //   /* eslint-disable-next-line */
  //   selectedItem.sort_order = parseInt(e.target.value);
  //   /* eslint-disable-line */
  //   api
  //     .post('/valuelist/updateSortOrder', selectedItem)
  //     .then(() => {
  //       getValuelist();
  //     })
  //     .catch(() => {
  //       message('Cannot get Update Data', 'error');
  //     });
  // };

  useEffect(() => {
    getValuelist();
  }, []);

  //Structure of ValueList List view
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
      name: 'Text (English)',
      selector: 'value',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Value List Name',
      selector: 'key_text',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Code',
      selector: 'code',
      sortable: true,
      grow: 0,
    },
    {
      name: 'ID',
      selector: 'valuelist_id',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Order',
      selector: 'sort_order',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
  ];

  return (
    <div className="MainDiv">
      <div className="pt-xs-25">
        <BreadCrumbs />

        <CommonTable
          loading={loading}
          title="Value List"
          module='Value List'
          Button={
            <Link to="/ValuelistDetails">
              <Button color="primary" className=" shadow-none mr-2">
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
            {valuelist &&
              valuelist.map((element, index) => {
                return (
                  <tr key={element.valuelist_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/ValueListEdit/${element.valuelist_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.value}</td>
                    <td>{element.key_text}</td>
                    <td>{element.code}</td>
                    <td>{element.valuelist_id}</td>
                    <td>
                    <SortOrder
                       idValue={element.sub_category_id}
                       idColumn="valuelist_id"
                       tablename="valuelist"
                       value={element.sort_order}>
                    </SortOrder>
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
export default Valuelist;
