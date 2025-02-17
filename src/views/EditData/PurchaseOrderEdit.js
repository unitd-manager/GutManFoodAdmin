import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Row, Col, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import AddNote from '../../components/Tender/AddNote';
import ViewNote from '../../components/Tender/ViewNote';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import AddPoModal from '../../components/PurchaseOrder/AddPoModal';
import AttachmentTab from '../../components/PurchaseOrder/AttachmentTab';
import PurchaseOrderlineItemEdit from '../../components/PurchaseOrder/PurchaseOrderLineItem';
import PurchaseOrderButtons from '../../components/PurchaseOrder/PurchaseOrderButtons';
import ViewHistoryModal from '../../components/PurchaseOrder/ViewHistoryModal';
import DeliveryOrderEditModal from '../../components/PurchaseOrder/DeliveryOrderEditModal';
import PurchaseOrderDetailsPart from '../../components/PurchaseOrder/PurchaseOrderDetailsPart';
import ProductLinkedTable from '../../components/PurchaseOrder/ProductLinkedTable';
import PdfDeliveryOrderPO from '../../components/PDF/PdfDeliveryOrderPO';

const PurchaseOrderEdit = () => {
  //All state variable
  const [purchaseDetails, setPurchaseDetails] = useState();
  const [supplier, setSupplier] = useState([]);
  const [product, setProduct] = useState();
  const [historyProduct, setHistoryProduct] = useState();
  const [addPurchaseOrderModal, setAddPurchaseOrderModal] = useState();
  const [products, setProducts] = useState();
  const [editModal, setEditModal] = useState(false);
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [pictureData, setDataForPicture] = useState({
    modelType: '',
  });
  const [activeTab, setActiveTab] = useState('1');
  const [viewHistoryModal, setViewHistoryModal] = useState(false);
  const [deliveryOrderEditModal, setDeliveryOrderEditModal] = useState(false);
  const [selectedPoProducts, setSelectedPoProducts] = useState([]);
  const [selectedPoDelivers, setSelectedPoDelivers] = useState([]);
  const [deliveryOrderId, setDeliveryOrderId] = useState();
  const [deliveryOrders, setDeliveryOrders] = useState([]);
  const [supplierId, setSupplierId] = useState();
  const [gTotal, setGtotal] = useState(0);
  const [grTotal, setGrTotal] = useState(0);
  //navigation and parameters
  const { id } = useParams();
  const navigate = useNavigate();

  const applyChanges = () => {};
  const backToList = () => {
    navigate('/PurchaseOrder');
  };
  //puchaseOrder data in purchaseDetails
  const handleInputs = (e) => {
    setPurchaseDetails({ ...purchaseDetails, [e.target.name]: e.target.value });
  };
  //getting data from purchaseOrder by Id
  const getPurchaseOrderId = () => {
    api
      .post('/purchaseorder/getPurchaseOrderById', { purchase_order_id: id })
      .then((res) => {
        setPurchaseDetails(res.data.data[0]);
        setSupplierId(res.data.data[0].supplier_id);
      })
      .catch(() => {
        message('PurchaseOrder Data Not Found', 'info');
      });
  };

  // Gettind data from Job By Id
  const getPoProduct = () => {
    api
      .post('/purchaseorder/TabPurchaseOrderLineItemById', { purchase_order_id: id })
      .then((res) => {
        setProducts(res.data.data);
        //grand total
        let grandTotal = 0;
        let grand = 0;
        res.data.data.forEach((elem) => {
          grandTotal += elem.po_value;
          grand += elem.actual_value;
        });
        setGtotal(grandTotal);
        setGrTotal(grand);
      })
      .catch(() => {
        message('Products Data Not Found', 'info');
      });
  };
  // Gettind data from Job By Id
  const getSupplier = () => {
    api
      .get('/purchaseorder/getSupplier')
      .then((res) => {
        setSupplier(res.data.data);
      })
      .catch(() => {
        message('Supplier Data Not Found', 'info');
      });
  };

  const handlePOInputs = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  //Add to stocks
  const addQtytoStocks = () => {
    if (selectedPoProducts) {
      selectedPoProducts.forEach((elem) => {
        if (elem.status !== 'Closed') {
          elem.status = 'Closed';
          elem.qty_updated = elem.qty_delivered;
          elem.qty_in_stock += parseFloat(elem.qty_delivered);
          api.post('/product/edit-ProductQty', elem);
          api
            .post('/purchaseorder/editTabPurchaseOrderLineItem', elem)
            .then(() => {
              api
                .post('/inventory/editInventoryStock', elem)
                .then(() => {
                  message('Quantity updated in inventory successfully.', 'success');
                })
                .catch(() => {
                  message('unable to update quantity in inventory.', 'danger');
                });
              message('Quantity added successfully.', 'success');
            })
            .catch(() => {
              message('unable to add quantity.', 'danger');
            });
        } else {
          message('This product is already added', 'danger');
        }
      });
    } else {
      alert('Please select atleast one product');
    }
  };

  //Delivery order
  const deliverOrder = () => {
    if (selectedPoDelivers) {
      api.post('/purchaseorder/insertDeliveryOrder', { purchase_order_id: id }).then((res) => {
        selectedPoDelivers.forEach((elem) => {
          elem.delivery_order_id = res.data.data.insertId;
          elem.purchase_order_id = id;

          api
            .post('/purchaseorder/insertDeliveryOrderHistory', elem)
            .then(() => {
              message('Inserted successfully.', 'success');
            })
            .catch(() => {
              message('unable to deliver.', 'danger');
            });
        });
      });
    } else {
      alert('Please select atleast one product');
    }
  };
  // get delivery orders

  const getDeliveryOrders = () => {
    api
      .post('/purchaseorder/getDeliveryOrder', { purchase_order_id: id })
      .then((res) => {
        setDeliveryOrders(res.data.data);
      })
      .catch(() => {
        message('DeliveryOrder Data Not Found', 'info');
      });
  };

  //Update Setting
  const editPurchaseData = () => {
    api
      .post('/purchaseorder/editTabPurchaseOrder', purchaseDetails)
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  //Edit poproductdata
  const editPoProductData = () => {
    api
      .post('/purchaseorder/editTabPurchaseOrderLineItem', product)
      .then(() => {
        message('product edited successfully.', 'success');
      })
      .catch(() => {
        message('unable to edit product.', 'danger');
      });
  };

  const deletePoProduct = (poProductId) => {
    Swal.fire({
      title: `Are you sure? `,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .post('purchaseorder/deletePoProduct', { po_product_id: poProductId })
          .then(() => {
            Swal.fire('Deleted!', 'PoProduct has been deleted.', 'success');
            setTimeout(() => {
              window.location.reload();
            }, 300);
          })
          .catch(() => {
            message('Unable to Delete PO Product', 'info');
          });
      }
    });
  };

  //checked objects
  const getCheckedPoProducts = (checkboxVal, index, Obj) => {
    if (checkboxVal.target.checked === true) {
      setSelectedPoProducts([...selectedPoProducts, Obj]);
    }
    if (checkboxVal.target.checked !== true) {
      const copyselectedPoProducts = [...selectedPoProducts];
      copyselectedPoProducts.splice(index, 1);
      setSelectedPoProducts(copyselectedPoProducts);
    }
  };
  //checked Dos
  const getCheckedDeliverProducts = (checkboxVal, index, Obj) => {
    if (checkboxVal.target.checked === true) {
      setSelectedPoDelivers([...selectedPoDelivers, Obj]);
    }
    if (checkboxVal.target.checked !== true) {
      const copyselectedPoDeliveries = [...selectedPoDelivers];
      copyselectedPoDeliveries.splice(index, 1);
      setSelectedPoDelivers(copyselectedPoDeliveries);
    }
  };
  //tab toggle
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  //   //Attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };
  //Pictures
  const dataForPicture = () => {
    setDataForPicture({
      modelType: 'picture',
    });
  };

  useEffect(() => {
    getSupplier();
    getPoProduct();
    getPurchaseOrderId();
    getDeliveryOrders();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      {/* PurchaseorderButtons */}
      <PurchaseOrderButtons
        applyChanges={applyChanges}
        backToList={backToList}
        editPurchaseData={editPurchaseData}
        purchaseDetails={purchaseDetails}
        products={products}
        product={product}
        navigate={navigate}
      />
      {/* PurchaseOrder Details */}
      <PurchaseOrderDetailsPart
        supplier={supplier}
        handleInputs={handleInputs}
        purchaseDetails={purchaseDetails}
      />
      <ComponentCard title="Product Linked">
        <AddPoModal
          PurchaseOrderId={id}
          supplierId={supplierId}
          addPurchaseOrderModal={addPurchaseOrderModal}
          setAddPurchaseOrderModal={setAddPurchaseOrderModal}
        />

        <Row className="mb-4">
          <Col md="2">
            <Button
              color="primary"
              onClick={() => {
                setAddPurchaseOrderModal(true);
              }}
            >
              Add Product
            </Button>
          </Col>
          <Col md="2">
            <Button
              color="success"
              onClick={() => {
                addQtytoStocks();
              }}
            >
              Add all Qty to Stock
            </Button>
          </Col>
          <Col md="2">
            <Button
              color="primary"
              onClick={() => {
                deliverOrder();
              }}
            >
              Delivery Order
            </Button>
          </Col>
          <Col md="3">
            <b color="primary">Grand Total(for delivered qty):{grTotal}</b>
          </Col>
          <Col md="3">
            <b color="primary">Grand Total:{gTotal}</b>
          </Col>
        </Row>
        <ProductLinkedTable
          products={products}
          setProduct={setProduct}
          getCheckedDeliverProducts={getCheckedDeliverProducts}
          getCheckedPoProducts={getCheckedPoProducts}
          setEditModal={setEditModal}
          setViewHistoryModal={setViewHistoryModal}
          deletePoProduct={deletePoProduct}
          setHistoryProduct={setHistoryProduct}
        />
      </ComponentCard>
      {editModal && (
        <PurchaseOrderlineItemEdit
          product={product}
          editModal={editModal}
          editPoProductData={editPoProductData}
          setEditModal={setEditModal}
          handlePOInputs={handlePOInputs}
        ></PurchaseOrderlineItemEdit>
      )}
      {viewHistoryModal && (
        <ViewHistoryModal
          viewHistoryModal={viewHistoryModal}
          setViewHistoryModal={setViewHistoryModal}
          productId={historyProduct}
          supplierId={supplierId}
        />
      )}

      {deliveryOrderEditModal && (
        <DeliveryOrderEditModal
          deliveryOrderEditModal={deliveryOrderEditModal}
          setDeliveryOrderEditModal={setDeliveryOrderEditModal}
          deliveryOrderId={deliveryOrderId}
        />
      )}
      <ComponentCard title="More Details">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => {
                toggle('1');
              }}
            >
              Delivery order
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => {
                toggle('2');
              }}
            >
              Attachments
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '3' ? 'active' : ''}
              onClick={() => {
                toggle('3');
              }}
            >
              Notes
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            {/* delivery order  */}

            <ComponentCard title="Delivery Order">
              {deliveryOrders &&
                deliveryOrders.map((element) => {
                  return (
                    <Row key={element.delivery_order_id}>
                      <Col md="6">
                        <span>{moment(element.date).format('YYYY-MM-DD')}</span>
                      </Col>
                      <Col md="6">
                        <span
                          color="primary"
                          className="m-2 color-primary"
                          onClick={() => {
                            setDeliveryOrderId(element.delivery_order_id);
                            setDeliveryOrderEditModal(true);
                          }}
                        >
                          <Icon.Edit />
                        </span>
                        <PdfDeliveryOrderPO
                          id={id}
                          deliveryOrderId={element.delivery_order_id}
                          date={element.date}
                        ></PdfDeliveryOrderPO>
                      </Col>
                    </Row>
                  );
                })}
            </ComponentCard>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <AttachmentTab
                dataForPicture={dataForPicture}
                dataForAttachment={dataForAttachment}
                id={id}
                attachmentModal={attachmentModal}
                setAttachmentModal={setAttachmentModal}
                pictureData={pictureData}
                attachmentData={attachmentData}
              />
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <ComponentCard title="Add a note">
                <AddNote recordId={id} roomName="PurchaseOrderEdit" />
                <ViewNote recordId={id} roomName="PurchaseOrderEdit" />
              </ComponentCard>
            </Row>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default PurchaseOrderEdit;
