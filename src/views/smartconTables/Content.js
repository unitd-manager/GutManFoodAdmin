import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import moment from 'moment';
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
import Publish from '../../components/Publish';
import SortOrder from '../../components/SortOrder';

const Content = () => {
  //Const Variables
  const [content, setContent] = useState(null);

  //getting data from content
  const getContent = () => {
    api
      .get('/content/getContent')
      .then((res) => {
        setContent(res.data.data);
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

    getContent();
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
      name: 'Title',
      selector: 'title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Order',
      selector: 'sort_order',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Section',
      selector: 'section_title',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Category',
      selector: 'category_title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Sub Category',
      selector: 'sub_category_title',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Content Date',
      selector: 'content_date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Content Type',
      selector: 'content_type',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'ID',
      selector: 'content_id ',
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
    <div className="MainDiv  pt-xs-25">
      <BreadCrumbs />

      <CommonTable
        title="Content List"
        Button={
          <Link to="/ContentDetails">
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
          {content &&
            content.map((element, index) => {
              return (
                <tr key={element.content_id}>
                  <td>{index + 1}</td>
                  <td>
                    {' '}
                    <Link to={`/ContentEdit/${element.content_id}`}>
                      <Icon.Edit2 />
                    </Link>
                  </td>
                  <td>{element.title}</td>
                  <td>
                    <SortOrder
                      idValue={element.content_id}
                      idColumn="content_id"
                      tablename="content"
                      value={element.sort_order}
                    ></SortOrder>
                  </td>
                  <td>{element.section_title}</td>
                  <td>{element.category_title}</td>
                  <td>{element.sub_category_title}</td>
                  <td>{moment(element.content_date).format('YYYY-MM-DD')}</td>
                  <td>{element.content_type}</td>
                  <td>{element.content_id}</td>
                  <td>
                    <Publish
                      idColumn="content_id"
                      tablename="content"
                      idValue={element.content_id.toString()}
                      value={element.published}
                    ></Publish>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </CommonTable>
    </div>
  );
};
export default Content;
