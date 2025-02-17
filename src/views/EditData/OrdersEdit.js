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
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
    getFinancesById();
    getOrderItemsById();
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
      </TabContent>
    </>
  );
};
export default FinanceEdit;
