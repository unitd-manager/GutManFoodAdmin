import React, { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import CustomerDetail from '../../components/Finance/CustomerDetail';
import FinanceInvoiceModal from '../../components/FinanceTable/FinanceInvoiceModal';
import InvoiceModal from '../../components/FinanceTable/InvoiceModal';

import FinanceButton from '../../components/Finance/FinanceButton';
import FinanceDeliveryAddress from '../../components/Finance/FinanceDeliveryAddress';
import FinanceMainDetails from '../../components/Finance/FinanceMainDetails';
import creationdatetime from '../../constants/creationdatetime';
import OrderProductDetails from '../../components/Finance/OrderProductDetails';

const FinanceEdit = () => {
  // All state variables
  const [activeTab, setActiveTab] = useState('1');
  const [financeDetails, setFinanceDetails] = useState();
  const [historyDetails, setHistoryDetails] = useState();
  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  //Button fuctions
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/Orders');
  };
  //All Functions/Methods
  //Setting Data in Finance Details
  const handleInputs = (e) => {
    setFinanceDetails({ ...financeDetails, [e.target.name]: e.target.value });
  };
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  //For getting Finance By Order Id
  const getFinancesById = () => {
    api
      .post('/orders/getFinancesById', { order_id: id })
      .then((res) => {
        setFinanceDetails(res.data.data);
      })
      .catch(() => {
        message('Order Data Not Found', 'info');
      });
  };
//Get Data from Order Item
  const getOrderItemsById = () => {
    api
      .post('/orders/getOrderHistoryById', { order_id: id })
      .then((res) => {
        setHistoryDetails(res.data.data);
      })
      .catch(() => {
        message('Fianance Data Not Found', 'info');
      });
  };
  //For editting Finace Record
  const editFinanceData = () => {
    financeDetails.modification_date = creationdatetime;
    api
      .post('/orders/editOrders', financeDetails)
      .then(() => {
        message('Record editted successfully', 'success');
        getFinancesById();
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
    getFinancesById();
    getOrderItemsById();
  }, [id]);
  const [invoiceDatas, setInvoiceDatas] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [editInvoiceModal, setEditInvoiceModal] = useState(false);

  const [createInvoice, setCreateInvoice] = useState(null);
  const [cancelInvoice, setCancelInvoice] = useState(null);
  const getInvoiceById = () => {
    api
      .post('/invoice/getInvoiceById', { order_id: id })
      .then((res) => {
        setCreateInvoice(res.data.data);
      })
      .catch(() => {
        message('Cannot get Invoice Data', 'error');
      });
  };


  const invoiceCancel = (obj) => {
    obj.status = 'cancelled';
    api
      .post('/Finance/editInvoicePortalDisplay', obj)
      .then(() => {
        message('Record editted successfully', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 600);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  //get Invoice Cancel
  const getInvoiceCancel = () => {
    api
      .post('/invoice/getInvoiceCancel', { order_id: id })
      .then((res) => {
        setCancelInvoice(res.data.data);
      })
      .catch(() => {
        message('Cannot get Invoice Data', 'error');
      });
  };


  useEffect(() => {
    getInvoiceById();
 
    getInvoiceCancel();

  }, [id]);

  return (
    <>
      <BreadCrumbs heading={financeDetails && financeDetails.order_id} />
      <TabContent className="p-4" activeTab={activeTab}>
        {/* Save,Apply Buttons */}
        <FinanceButton
          navigate={navigate}
          editFinanceData={editFinanceData}
          applyChanges={applyChanges}
          backToList={backToList}
        ></FinanceButton>

        {/* Main Details */}
        <FinanceMainDetails
          financeDetails={financeDetails}
          creationModificationDate={financeDetails}
          handleInputs={handleInputs}
        ></FinanceMainDetails>

        <Row>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={activeTab === '1' ? 'active' : ''}
                onClick={() => {
                  toggle('1');
                }}
              >
                Delivery Address
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === '2' ? 'active' : ''}
                onClick={() => {
                  toggle('2');
                }}
              >
                Customer Details
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === '3' ? 'active' : ''}
                onClick={() => {
                  toggle('3');
                }}
              >
                Product Details
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === '4' ? 'active' : ''}
                onClick={() => {
                  toggle('4');
                }}
              >
                Invoice
              </NavLink>
            </NavItem>
          </Nav>
        </Row>
        {/* Delivery address Form */}
        <TabPane tabId="1">
          <ComponentCard title="Delivery Address">
            <FinanceDeliveryAddress
              financeDetails={financeDetails}
              handleInputs={handleInputs}
            ></FinanceDeliveryAddress>
          </ComponentCard>
        </TabPane>

        {/* Customer Details Form */}
        <TabPane tabId="2">
          <ComponentCard title="Finance Details">
            <CustomerDetail financeDetails={financeDetails}></CustomerDetail>
          </ComponentCard>
        </TabPane>
        <TabPane tabId="3">
          <ComponentCard title="Product Details">
            <OrderProductDetails historyDetails={historyDetails}></OrderProductDetails>
          </ComponentCard>
        </TabPane>
        <TabPane tabId="4">
            <FinanceInvoiceModal
              createInvoice={createInvoice}
              cancelInvoice={cancelInvoice}
              invoiceCancel={invoiceCancel}
              setEditModal={setEditModal}
              setEditInvoiceModal={setEditInvoiceModal}
              setInvoiceDatas={setInvoiceDatas}
              financeDetails={financeDetails}
            ></FinanceInvoiceModal>
              <InvoiceModal
              editModal={editModal}
              setEditModal={setEditModal}
              editInvoiceModal={editInvoiceModal}
              setInvoiceDatas={setInvoiceDatas}
              invoiceDatas={invoiceDatas}
            />
          </TabPane>
      </TabContent>
    </>
  );
};
export default FinanceEdit;
