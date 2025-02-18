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
import DeliveryModalTable from './DeliveryModalTable';

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
  const [delivery, setDelivery] = useState();

  const handleInputs = (e) => {
    setDelivery({ ...delivery, [e.target.name]: e.target.value });
  };

  const getDeliveryOrder = () => {
    api
      .post('/purchaseorder/getDeliveryOrderss', { delivery_order_id: deliveryOrderId})
      .then((res) => {
        setDelivery(res.data.data[0]);
        console.log('delivery order response', res.data.data[0]);
      });
  };

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

  const editDeliveryorder = () => {
    
    api
      .post('/purchaseorder/editDeliveryOrder', delivery)
      .then(() => {
        message('Record edited successfully.', 'success');
        window.location.reload();
      })
      .catch(() => {
        message('Network connection error.');
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
      name: 'Work Description',
    },
   
    {
      name: 'Quantity',
    },
    {
      name: 'Remarks',
    },
  ];
  useEffect(() => {
    getDeliveryOrderProducts();
    getDeliveryOrder();
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
        <Form>
            <Row>
              <DeliveryModalTable delivery={delivery} handleInputs={handleInputs} />
              
            </Row>
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
                            
                        <td data-label="Item">
                          <Input disabled type="text" name="item_title" value={element.item_title} />
                        </td>
                       
                       
                        <td data-label="Quantity">
                          <Input
                            type="text"
                            name="quantity"
                            value={element.quantity}
                            onChange={(e) => updateState(index, 'quantity', e)}
                          ></Input>
                        </td>
                        <td data-label="remarks">
                          <Input
                            type="text"
                            name="remarks"
                            value={element.remarks}
                            onChange={(e) => updateState(index, 'remarks', e)}
                          ></Input>
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
        </Form>
        <ModalFooter>
          <Button
            className="shadow-none"
            color="primary"
            onClick={() => {
              editDeliveryProducts();
              editDeliveryorder();
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
