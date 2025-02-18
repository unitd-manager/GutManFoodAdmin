import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Row,
  Col,
  Button,
  Table,
  Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import message from '../Message';

function DeliveryOrderEditModal({
  deliveryOrderEditModal,
  setDeliveryOrderEditModal,
  deliveryOrderId,
}) {
  DeliveryOrderEditModal.propTypes = {
    deliveryOrderId: PropTypes.any,
    deliveryOrderEditModal: PropTypes.bool,
    setDeliveryOrderEditModal: PropTypes.func,
  };
  const [deliverOrderProducts, setDeliveryOrderProducts] = useState([]);

  //get products
  const getDeliveryOrderProducts = () => {
    api
      .post('purchaseorder/getDeliveryOrderHistory', { delivery_order_id: deliveryOrderId })
      .then((res) => {
        setDeliveryOrderProducts(res.data.data);
      })
      .catch(() => {
        message('unable to get products', 'error');
      });
  };
  //edit delivery items
  const editDeliveryProducts = () => {
    deliverOrderProducts.forEach((el) => {
      api
        .post('/purchaseorder/editDelieryOrderHistory', el)
        .then(() => {
          message('Record editted successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    });
  };

  function updateState(index, property, e) {
    const copyDeliverOrderProducts = [...deliverOrderProducts];
    const updatedObject = { ...copyDeliverOrderProducts[index], [property]: e.target.value };
    copyDeliverOrderProducts[index] = updatedObject;
    setDeliveryOrderProducts(copyDeliverOrderProducts);
  }

  const supplierColumn = [
    {
      name: 'Product Name	',
    },
    {
      name: 'Quantity',
    },
    {
      name: 'Status	',
    },
    {
      name: 'Remarks',
    },
  ];
  useEffect(() => {
    getDeliveryOrderProducts();
  }, [deliveryOrderId]);
  return (
    <div>
      <Modal size="xl" isOpen={deliveryOrderEditModal}>
        <ModalHeader>
          {' '}
          Edit Delivery Order
          <Button
            color="secondary"
            onClick={() => {
              setDeliveryOrderEditModal(false);
            }}
          >
            {' '}
            X{' '}
          </Button>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Form>
                <Row>
                  <div>
                    <Table id="example" className="lineitem border border-secondary rounded">
                      <tr>
                        {supplierColumn.map((cell) => {
                          return <td key={cell.name}>{cell.name}</td>;
                        })}
                      </tr>
                      {deliverOrderProducts &&
                        deliverOrderProducts.map((element, index) => {
                          return (
                            <>
                              <tr key={element.delivery_order_id}>
                                <td data-label="title">
                                  <Input type="text" name="title" value={element.item_title} />
                                </td>
                                <td data-label="quantity">
                                  <Input
                                    type="text"
                                    name="quantity"
                                    value={element.quantity}
                                    onChange={(e) => updateState(index, 'quantity', e)}
                                  />
                                </td>
                                <td data-label="status">
                                  <Input
                                    type="select"
                                    value={element.status}
                                    name="status"
                                    onChange={(e) => updateState(index, 'status', e)}
                                  >
                                    <option defaultValue="selected">Please Select</option>
                                    <option value="in progress">in progress</option>
                                    <option value="sent to supplier">sent to supplier</option>
                                    <option value="order acknowledged">order acknowledged</option>
                                    <option value="partially received">partially received</option>
                                    <option value="closed">closed</option>
                                    <option value="on hold">on hold</option>
                                    <option value="cancelled">cancelled</option>
                                  </Input>
                                </td>
                                <td data-label="remarks">
                                  <Input
                                    type="text"
                                    name="remarks"
                                    value={element.remarks}
                                    onChange={(e) => updateState(index, 'remarks', e)}
                                  />
                                </td>
                              </tr>
                            </>
                          );
                        })}
                    </Table>
                  </div>
                </Row>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            className="shadow-none"
            color="primary"
            onClick={() => {
              editDeliveryProducts();
              setDeliveryOrderEditModal(false);
            }}
          >
            Submit
          </Button>
          <Button
            className="shadow-none"
            color="dark"
            onClick={() => setDeliveryOrderEditModal(false)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeliveryOrderEditModal;
