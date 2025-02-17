import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Row,
  Col,
  CardBody,
  Button,
  Table,
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import api from '../../constants/api';
import message from '../Message';

function ViewHistoryModal({ viewHistoryModal, setViewHistoryModal, productId, supplierId }) {
  ViewHistoryModal.propTypes = {
    viewHistoryModal: PropTypes.bool,
    setViewHistoryModal: PropTypes.func,
    productId: PropTypes.any,
    supplierId: PropTypes.any,
  };

  const [fromSame, setFromSame] = useState([]);
  const [fromOthers, setFromOthers] = useState([]);

  //get history from same supplier
  const getProductsFromSameSupplier = () => {
    api
      .post('/purchaseorder/getProductsfromSupplier', {
        product_id: productId,
        supplier_id: supplierId,
      })
      .then((res) => {
        setFromSame(res.data.data);
      })
      .catch(() => {
        message('Product history Data Not Found', 'info');
      });
  };
  //get history from other supplier
  const getProductshistory = () => {
    api
      .post('/purchaseorder/getProductsfromOtherSuppliers', {
        product_id: productId,
        supplier_id: supplierId,
      })
      .then((res) => {
        setFromOthers(res.data.data);
      })
      .catch(() => {
        message('Product history Data Not Found', 'info');
      });
  };
  const supplierColumn = [
    {
      name: 'PO Code	',
    },
    {
      name: 'Supplier Name	',
    },
    {
      name: 'Date	',
    },
    {
      name: 'Price',
    },
    {
      name: 'Qty	',
    },
  ];
  useEffect(() => {
    getProductsFromSameSupplier();
    getProductshistory();
  }, []);
  return (
    <div>
      <Modal size="l" isOpen={viewHistoryModal}>
        <ModalHeader>Product Sales history</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <CardBody>
                <Form>
                  <Row>
                    <h5>Purchase History from this supplier</h5>
                    <div>
                      <Table id="example" className="display border border-secondary rounded">
                        <tr>
                          {supplierColumn.map((cell) => {
                            return <td key={cell.name}>{cell.name}</td>;
                          })}
                        </tr>

                        {fromSame &&
                          fromSame.map((element) => {
                            return (
                              <tr key={element.product_id}>
                                <td>{element.po_code}</td>
                                <td>{element.supplier_name}</td>
                                <td>{moment(element.po_date).format('YYYY-MM-DD')}</td>
                                <td>{element.cost_price}</td>
                                <td>{element.qty}</td>
                              </tr>
                            );
                          })}
                      </Table>
                    </div>
                  </Row>
                </Form>

                <Form>
                  <Row>
                    <h5>Purchase History from other supplier</h5>
                    <div>
                      <Table id="example" className="display border border-secondary rounded">
                        <tr>
                          {supplierColumn.map((cell) => {
                            return <td key={cell.name}>{cell.name}</td>;
                          })}
                        </tr>

                        {fromOthers &&
                          fromOthers.map((element) => {
                            return (
                              <tr key={element.product_id}>
                                <td>{element.po_code}</td>
                                <td>{element.supplier_name}</td>
                                <td>{moment(element.po_date).format('YYYY-MM-DD')}</td>
                                <td>{element.cost_price}</td>
                                <td>{element.qty}</td>
                              </tr>
                            );
                          })}
                      </Table>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => setViewHistoryModal(false)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ViewHistoryModal;
