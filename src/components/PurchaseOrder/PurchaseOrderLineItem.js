import React from 'react';
import {
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import * as $ from 'jquery';

const PurchaseOrderlineItemEdit = ({
  product,
  editModal,
  editPoProductData,
  setEditModal,
  handlePOInputs,
}) => {
  PurchaseOrderlineItemEdit.propTypes = {
    product: PropTypes.object,
    editPoProductData: PropTypes.func,
    editModal: PropTypes.bool,
    setEditModal: PropTypes.func,
    handlePOInputs: PropTypes.func,
  };

  const getAllValues = () => {
    const result = [];
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
    result.forEach((obj) => {
      if (obj.qty) {
        if (obj.po_product_id !== '') {
          editPoProductData(obj);
        }
      }
    });
  };
  //Calculation for Invoice Item
  const calculateTotal = () => {
    const result = [];
    $('.lineitem tbody tr').each(() => {
      const allValues = {};
      $(this)
        .find('input')
        .each(() => {
          const fieldName = $(this).attr('name');
          allValues[fieldName] = $(this).val();
          allValues.price = allValues.qty * allValues.cost_price;
        });
      result.push(allValues);
    });
  };

  return (
    <>
      <Modal isOpen={editModal}>
        <ModalHeader>
          Edit Product
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setEditModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <CardBody>
                <Form>
                  <Row>
                    <FormGroup>
                      <Label>Qty</Label>
                      <Input
                        type="text"
                        name="qty"
                        onChange={handlePOInputs}
                        value={product && product.qty}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Damaged Quantity</Label>
                      <Input
                        type="text"
                        name="damage_qty"
                        onChange={handlePOInputs}
                        value={product && product.damage_qty}
                      ></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label>Add to Stock</Label>
                      <Input
                        type="text"
                        name="qty_delivered"
                        onChange={handlePOInputs}
                        value={product && product.qty_delivered}
                      ></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label>Cost Price</Label>
                      <Input
                        type="number"
                        name="cost_price"
                        onChange={handlePOInputs}
                        value={product && product.cost_price}
                        onBlur={() => {
                          calculateTotal();
                        }}
                      ></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label>Selling Price</Label>
                      <Input
                        type="number"
                        name="selling_price"
                        onChange={handlePOInputs}
                        value={product && product.selling_price}
                      ></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label>GST%</Label>
                      <Input
                        type="number"
                        name="gst"
                        onChange={handlePOInputs}
                        value={product && product.gst}
                      ></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label>Status</Label>
                      <Input
                        type="select"
                        value={product && product.status}
                        name="status"
                        onChange={handlePOInputs}
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
                    </FormGroup>
                  </Row>
                </Form>
              </CardBody>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            className="shadow-none"
            color="primary"
            onClick={() => {
              //insertPayment();
              editPoProductData();
              getAllValues();
              setEditModal(false);
              setTimeout(() => {
                window.location.reload();
              }, 300);
            }}
          >
            Save & Continue
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default PurchaseOrderlineItemEdit;
