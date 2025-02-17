import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Row, Col, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import moment from 'moment';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import message from '../../components/Message';

const PurchaseOrder = () => {
  //All state variable
  const [purchaseOrder, setPurchaseOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  //Getting data from purchaseorder
  const getpurchaseorder = () => {
    setLoading(true);
    api
      .get('/purchaseorder/TabPurchaseOrder')
      .then((res) => {
        setPurchaseOrder(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        message('Unable to get Purchase Data');
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
    getpurchaseorder();
  }, []);
  //Structure of purchaseorder list view
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
      name: 'PO Code',
      selector: 'po_code',
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
      name: 'Po Value',
      selector: 'po_value',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'PO Date',
      selector: 'purchase_order_date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Supplier Invoice Code',
      selector: 'supplier_inv_code',
      sortable: true,
      width: 'auto',
      grow: 3,
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
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable
          loading={loading}
          title="Purchase Order List"
          Button={
            <>
              <Row>
                <Col md="6">
                  <Link to="/purchaseorderDetail">
                    <Button color="primary" className="shadow-none">
                      New
                    </Button>
                  </Link>
                </Col>
                <Col md="6">
                  <a
                    href="http://43.228.126.245/smartco-api/storage/excelsheets/PurchaseOrder.xlsx"
                    download
                  >
                    <Button color="primary" className="shadow-none">
                      Sample
                    </Button>
                  </a>
                </Col>
              </Row>
            </>
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
            {purchaseOrder &&
              purchaseOrder.map((element, index) => {
                return (
                  <tr key={element.purchase_order_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/purchaseorderEdit/${element.purchase_order_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.po_code}</td>
                    <td>{element.title}</td>
                    <td>{element.po_value}</td>
                    <td>{element.status}</td>
                    <td>
                      {element.purchase_order_date
                        ? moment(element.purchase_order_date).format('YYYY-MM-DD')
                        : ''}
                    </td>
                    <td>{element.supplier_inv_code}</td>
                    <td>
                      {element.creation_date
                        ? moment(element.creation_date).format('YYYY-MM-DD')
                        : ''}
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

export default PurchaseOrder;
