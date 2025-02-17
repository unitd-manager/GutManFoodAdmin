import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as $ from 'jquery';
import random from 'random';
import Select from 'react-select';
import api from '../../constants/api';
import message from '../Message';

const AddPoModal = ({
  projectId,
  supplierId,
  addPurchaseOrderModal,
  setAddPurchaseOrderModal,
  PurchaseOrderId,
}) => {
  AddPoModal.propTypes = {
    addPurchaseOrderModal: PropTypes.bool,
    projectId: PropTypes.string,
    supplierId: PropTypes.any,
    PurchaseOrderId: PropTypes.any,
    setAddPurchaseOrderModal: PropTypes.func,
  };
  const [addNewProductModal, setAddNewProductModal] = useState(false);
  const [getProductValue, setProductValue] = useState();
  const [productDetail, setProductDetail] = useState({
    category_id: null,
    sub_category_id: null,
    title: '',
    product_code: '',
    qty_in_stock: null,
    price: null,
    published: 0,
  });
  const [addMoreItem, setMoreItem] = useState([
    {
      id: random.int(1, 99).toString(),
      itemId: '',
      unit: '',
      qty: '',
      price: '',
      mrp: '',
      gst: '',
      description: '',
    },
    {
      id: random.int(0, 9999).toString(),
      itemId: '',
      unit: '',
      qty: '',
      price: '',
      mrp: '',
      gst: '',
      description: '',
    },
    {
      id: random.int(0, 9999).toString(),
      itemId: '',
      unit: '',
      qty: '',
      price: '',
      mrp: '',
      gst: '',
      description: '',
    },
  ]);

  const AddNewLineItem = () => {
    setMoreItem([
      ...addMoreItem,
      {
        id: random.int(0, 9999).toString(),
        itemId: '',
        unit: '',
        qty: '',
        price: '',
        mrp: '',
        gst: '',
        description: '',
      },
    ]);
  };

  const [insertPurchaseOrderData] = useState({
    po_code: '',
    supplier_id: supplierId,
    contact_id_supplier: '',
    delivery_terms: '',
    status: 'test',
    project_id: projectId,
    flag: 1,
    creation_date: new Date(),
    modification_date: new Date(),
    created_by: '1',
    modified_by: '1',
    supplier_reference_no: '',
    our_reference_no: '',
    shipping_method: '',
    payment_terms: '',
    delivery_date: '',
    po_date: '',
    shipping_address_flat: '',
    shipping_address_street: '',
    shipping_address_country: '',
    shipping_address_po_code: '',
    expense_id: 0,
    staff_id: 0,
    purchase_order_date: new Date(),
    payment_status: '0',
    title: 'Purchase Order',
    priority: '1',
    follow_up_date: new Date(),
    notes: 'test',
    supplier_inv_code: '',
    gst: 0,
    gst_percentage: '10%',
    delivery_to: '',
    contact: '',
    mobile: '',
    payment: '0',
    project: '',
  });

  const handleNewProductDetails = (e) => {
    setProductDetail({ ...productDetail, [e.target.name]: e.target.value });
  };

  //   Get Products
  const getProduct = () => {
    api.get('/product/getProducts').then((res) => {
      const items = res.data.data;
      const finaldat = [];
      items.forEach((item) => {
        finaldat.push({ value: item.product_id, label: item.title });
      });
      setProductValue(finaldat);
    });
  };

  const insertProduct = () => {
    api
      .post('/purchaseorder/insertPurchaseProduct', productDetail)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        message('Product inserted successfully.', 'success');
        api
          .post('/inventory/insertinventory', { product_id: insertedDataId })
          .then(() => {
            message('inventory created successfully.', 'success');
            getProduct();
          })
          .catch(() => {
            message('Unable to create inventory.', 'error');
          });
      })
      .catch(() => {
        message('Unable to insert product.', 'error');
      });
  };

  // Materials Purchased
  const TabMaterialsPurchased = () => {
    api
      .get('/purchaseorder/TabPurchaseOrderLineItem')
      .then((res) => {
        const items = res.data.data;
        const finaldat = [];
        items.forEach((item) => {
          finaldat.push({ value: item.product_id, label: item.title });
        });
      })
      .catch(() => {
        message('Tab Purchase Order not found', 'info');
      });
  };
  const poProduct = (itemObj) => {
    api
      .post('/purchaseorder/insertPoProduct', {
        purchase_order_id: PurchaseOrderId,
        item_title: itemObj.title,
        quantity: itemObj.qty,
        unit: itemObj.unit,
        amount: 0,
        description: itemObj.description,
        creation_date: new Date(),
        modification_date: new Date(),
        created_by: '1',
        modified_by: '1',
        status: 'In Progress',
        cost_price: itemObj.cost_price,
        selling_price: itemObj.mrp,
        qty_updated: parseInt(itemObj.qty, 10),
        qty: parseInt(itemObj.qty, 10),
        product_id: itemObj.product_id,
        supplier_id: insertPurchaseOrderData.supplier_id,
        gst: itemObj.gst,
        damage_qty: 0,
        brand: '',
        qty_requested: 0,
        qty_delivered: 0,
        price: itemObj.price,
      })
      .then(() => {
        message('Product Added!', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch(() => {
        message('Unable to add Product!', 'error');
      });
  };

  //     const insertlineItem = () => {
  //        addMoreItem.forEach(pItems=>{
  //         if(pItems.item !== ''){
  //             poProduct(pItems)
  //         }

  //        })
  //    }

  const getAllValues = () => {
    const result = [];
    const oldArray = addMoreItem;
    $('.lineitem tbody tr').each(() => {
      const allValues = {};
      $(this)
        .find('input')
        .each(() => {
          const fieldName = $(this).attr('name');
          allValues[fieldName] = $(this).val();
        });
      result.push(allValues);
    });
    oldArray.forEach((obj) => {
      if (obj.id) {
        /* eslint-disable */
        // const objId = parseInt(obj.id)
        const foundObj = oldArray.find((el) => el.id === obj.id);
        if (foundObj) {
          obj.product_id = foundObj.product_id;
          obj.title = foundObj.title;
          obj.item_title = foundObj.item_title;
        }
        poProduct(foundObj);
      }
    });

  };

  function updateState(index, property, e) {
    const copyDeliverOrderProducts = [...addMoreItem];
    const updatedObject = { ...copyDeliverOrderProducts[index], [property]: e.target.value };
    copyDeliverOrderProducts[index] = updatedObject;
    setMoreItem(copyDeliverOrderProducts);
  }

  useEffect(() => {
    getProduct();
    TabMaterialsPurchased();
  }, []);
  useEffect(() => {
    setMoreItem([
      {
        id: random.int(1, 99).toString(),
        itemId: '',
        unit: '',
        qty: '',
        price: '',
        mrp: '',
        gst: '',
        description: '',
      },
      {
        id: random.int(0, 9999).toString(),
        itemId: '',
        unit: '',
        qty: '',
        price: '',
        mrp: '',
        gst: '',
        description: '',
      },
      {
        id: random.int(0, 9999).toString(),
        itemId: '',
        unit: '',
        qty: '',
        price: '',
        mrp: '',
        gst: '',
        description: '',
      },
    ]);
  }, [addPurchaseOrderModal]);

  const onchangeItem = (str, itemId) => {
    const element = addMoreItem.find((el) => el.id === itemId);
    element.title = str.label;
    element.item_title = str.label;
    element.product_id = str.value.toString();
    setMoreItem(addMoreItem);
  };

  // Clear row value
  const ClearValue = (ind) => {
    setMoreItem((current) =>
      current.filter((obj) => {
        return obj.id !== ind.id;
      }),
    );
  };

  return (
    <>
      <Modal size="xl" isOpen={addPurchaseOrderModal}>
        <ModalHeader>Add Product</ModalHeader>

        <ModalBody>
          <FormGroup>
            <Row>
              <Col md="12" className="mb-4">
                <Row>
                  <Col md="3">
                    <Button
                      color="primary"
                      className="shadow-none"
                      onClick={() => {
                        setAddNewProductModal(true);
                      }}
                    >
                      Add New Product
                    </Button>
                  </Col>
                  <Col md="3">
                    <Button
                      color="primary"
                      className="shadow-none"
                      onClick={() => {
                        AddNewLineItem();
                      }}
                    >
                      Add Item
                    </Button>
                  </Col>
                </Row>
                <br />
              </Col>
            </Row>

            <table className="lineitem">
              <thead>
                <tr className="">
                  <th width="20%" scope="col">
                    Item
                  </th>
                  <th scope="col">Unit</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Cost Price (without GST)</th>
                  <th scope="col">Selling Price (without GST)</th>
                  <th scope="col">GST</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {addMoreItem.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td data-label="title">
                        <Select
                          key={item.id}
                          defaultValue={{ value: item.product_id, label: item.title }}
                          onChange={(e) => {
                            onchangeItem(e, item.id);
                          }}
                          options={getProductValue}
                        />
                        <Input value={item.product_id} type="hidden" name="product_id"></Input>
                        <Input value={item.title} type="hidden" name="title"></Input>
                      </td>

                      <td data-label="Unit">
                        <Input
                          defaultValue={item.uom}
                          type="text"
                          name="unit"
                          onChange={(e) => updateState(index, 'unit', e)}
                          value={insertPurchaseOrderData && insertPurchaseOrderData.unit}
                        />
                      </td>
                      <td data-label="Qty">
                        <Input
                          defaultValue={item.qty}
                          type="number"
                          name="qty"
                          onChange={(e) => updateState(index, 'qty', e)}
                          value={insertPurchaseOrderData && insertPurchaseOrderData.qty}
                        />
                      </td>
                      <td data-label="Cost Price">
                        <Input
                          defaultValue={item.cost_price}
                          type="number"
                          onChange={(e) => updateState(index, 'cost_price', e)}
                          value={insertPurchaseOrderData && insertPurchaseOrderData.cost_price}
                          name="cost_price"
                        />
                      </td>
                      <td data-label="Selling Price">
                        <Input
                          type="input"
                          defaultValue={item.price}
                          name="mrp"
                          onChange={(e) => updateState(index, 'mrp', e)}
                          value={insertPurchaseOrderData && insertPurchaseOrderData.mrp}
                        />
                        {item.price}
                      </td>
                      <td data-label="GST">
                        <Input
                          type="number"
                          defaultValue={item.gst}
                          name="gst"
                          onChange={(e) => updateState(index, 'gst', e)}
                          value={insertPurchaseOrderData && insertPurchaseOrderData.gst}
                        />
                      </td>
                      <td data-label="Action">
                        {' '}
                        <Input defaultValue={item.id} type="hidden" name="id"></Input>
                        <Link to="">
                          <span
                            onClick={() => {
                              ClearValue(item);
                            }}
                          >
                            Clear
                          </span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              getAllValues();
              getProduct();
            }}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setAddPurchaseOrderModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Add New Product Modal */}
      <Modal isOpen={addNewProductModal}>
        <ModalHeader>Add New Products</ModalHeader>

        <ModalBody>
          <FormGroup>
            <Row>
              <Col md="12" className="mb-4">
                <Row>
                  <FormGroup>
                    <Row>
                      <Label sm="3">
                        Product Name <span className="required"> *</span>
                      </Label>
                      <Col sm="8">
                        <Input
                          type="text"
                          name="title"
                          onChange={handleNewProductDetails}
                          value={productDetail.title}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                </Row>
              </Col>
            </Row>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              setAddNewProductModal(false);
              insertProduct();
              getProduct();
              setTimeout(() => {
                window;
              }, 300);
            }}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setAddNewProductModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddPoModal;
