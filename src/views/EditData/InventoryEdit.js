import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Form, TabPane, TabContent } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { useParams } from 'react-router-dom';
import api from '../../constants/api';
import message from '../../components/Message';
import ComponentCard from '../../components/ComponentCard';
import InventoryEditPart from '../../components/Inventory/InventoryEditPart';
// import InventoryEditTables from '../../components/Inventory/InventoryEditTables';
import PurchaseOrderLinkedTable from '../../components/Inventory/PurchaseOrderLinkedTable';
import creationdatetime from '../../constants/creationdatetime';
import Tab from '../../components/Tab';
import Tabs from '../../components/Tabs';
import ClientAttachmentPortal from '../../components/ClientTable/ClientAttachmentPortal';
import ProjectLinkedTable from '../../components/Inventory/ProjectLinkedTable';
import AppContext from '../../context/AppContext';

const Test = () => {
  //state variables
  const [tabPurchaseOrdersLinked, setTabPurchaseOrdersLinked] = useState([]);
  const [projectsLinked, setProjectsLinked] = useState([]);
  const [productQty, setProductQty] = useState({});
  const [inventoryDetails, setInventoryDetails] = useState({
    inventory_code: '',
    inventory_id: '',
    minimum_order_level: '',
    productId: '',
    product_type: '',
    company_name: '',
    product_name: '',
    item_code: '',
    unit: '',
    notes: '',
    product_code: '',
  });
  const [activeTab, setActiveTab] = useState('1');

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  const { loggedInuser } = useContext(AppContext);
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();

// Use the selected language value as needed
console.log('Selected language from localStorage:', selectedLanguage);

  //params and routing
  const { id } = useParams();

  const tabs = [
    { id: '1', name: 'Purchase Orders Linked' },
    { id: '2', name: 'Materials Used Linked' },
    { id: '3', name: ' Attachment' },
  ];
  const tabsArb =  [
    {id:'1',name:'أوامر الشراء مرتبطة'},
    {id:'2',name:'المشاريع المرتبطة'},
    {id:'3',name:'مرفق'},
  ];

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  //handle input change
  const handleInputs = (e) => {
    setInventoryDetails({ ...inventoryDetails, [e.target.name]: e.target.value, inventory_id: id });
  };
  //get data for purchaseorder table
  const getInventoryData = (inventoryid) => {
    api
      .post(`inventory/getinventoryById`, { inventory_id: inventoryid })
      .then(({ data }) => {
        setInventoryDetails(data.data[0]);
      })
      .catch(() => {
        message('Unable to get inventory data.', 'error');
      });
  };

  const getAllpurchaseOrdersLinked = (productid) => {
    api
      .post(`inventory/gettabPurchaseOrderLinkedById`, { product_id: productid })
      .then(({ data }) => {
        setTabPurchaseOrdersLinked(data.data);
      })
      .catch(() => {
        message('Unable to get purchase order data.', 'error');
      });
  };

  const getAllProjectsLinked = (productid) => {
    api
      .post(`inventory/getTabProjectLinkedById`, { product_id: productid })
      .then(({ data }) => {
        setProjectsLinked(data.data);
      })
      .catch(() => {
        message('Unable to get projects data.', 'error');
      });
  };

  const getproductquantity = (productid) => {
    api
      .post(`inventory/getPurchaseSoldQTY`, { product_id: productid })
      .then((res) => {
        setProductQty(res.data.data[0]);
      })
      .catch(() => {
        message('Unable to get product qty data.', 'error');
      });
  };

  //update Inventory
  const editinventoryData = () => {
    inventoryDetails.modification_date = creationdatetime;
    inventoryDetails.modified_by = loggedInuser.first_name
    api
      .post('/inventory/editinventoryMain', inventoryDetails)
      .then(() => {
        message('Record editted successfully', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
    if (id) {
      getInventoryData(id);
    }
  }, [id]);

  useEffect(() => {
    const { productId } = inventoryDetails;
    if (productId) {
      getAllpurchaseOrdersLinked(productId);
      getAllProjectsLinked(productId);
      getproductquantity(productId);
    }
  }, [inventoryDetails]);

  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  const eng =selectedLanguage === 'English'
  

  const getArabicInventory = () => {
      api
      .get('/inventory/getTranslationForInventory')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });   
  };

  console.log('arabic',arabic)
  useEffect(() => {
    getArabicInventory();
  }, []);


  return (
      <>
        <ToastContainer></ToastContainer>
        <InventoryEditPart
          inventoryDetails={inventoryDetails}
          handleInputs={handleInputs}
          editinventoryData={editinventoryData}
          arb={arb}
          eng={eng}
          arabic={arabic}
        />
        <Row>
          <Form>
            <ComponentCard title='Stock Details'>
              <Row>
                <Col xs="12" md="4">
                  <Row>
                   <h5>Total Purchased Quantity</h5>
                  </Row>
                  {/* <span>{productQty && productQty.materials_purchased}</span> */}
                  <span>{productQty.materials_purchased} 
</span>
                  <Row></Row>
                </Col>
               
                {/* <Col xs="12" md="3">
                  <Row>
                    <h5>Remaining Purchased quantity</h5>
                  </Row>
                  <span>
                    {productQty && productQty.materials_purchased - productQty.materials_used}
                  </span>
                  <Row></Row>
                </Col> */}
                <Col xs="12" md="4">
                  <Row>
                    <h5> {arb ?'الكمية المتوفرة في المخزون':'Available Quantity in Stock'} </h5>
                  </Row>
                  {/* <span>
                  {productQty && productQty.actual_stock}
  </span> */}
                 <span>
                  {productQty.actual_stock} 
                  
                 </span>
                  <Row></Row>
                </Col>
              </Row>
            </ComponentCard>
          </Form>
        </Row>
        <ComponentCard title= {arb ? 'المزيد من التفاصيل':'More Details'} >
        <ToastContainer></ToastContainer>
        {/* Nav Tab */}
        {eng === true &&
        <Tab toggle={toggle} tabs={tabs} />
        }
        { arb === true &&
        <Tabs toggle={toggle} tabsArb={tabsArb} />
        }
        <TabContent className="p-4" activeTab={activeTab}>
          {/* Contact Linked */}
          <TabPane tabId="1">
          <PurchaseOrderLinkedTable
          tabPurchaseOrdersLinked={tabPurchaseOrdersLinked}
          projectsLinked={projectsLinked}
          eng={eng}
          arb={arb}
          arabic={arabic}
        />
          </TabPane>
          { /* Invoice Linked Portal */}
           <TabPane tabId="2">
           <ProjectLinkedTable
          projectsLinked={projectsLinked}
          eng={eng}
          arb={arb}
          arabic={arabic}
        />
          </TabPane>
          { /* Attachment Portal */ }
          <TabPane tabId="3">
          <ClientAttachmentPortal
          ClientId={id}
          />
          </TabPane>
        </TabContent>
      </ComponentCard>

      </>
  );
};

export default Test;