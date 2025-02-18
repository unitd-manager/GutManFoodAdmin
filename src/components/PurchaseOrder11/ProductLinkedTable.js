import React from 'react';
import { Row, Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import { purchaseTableColumn } from '../../data/PurchaseOrder/PurchaseTableColumn';

function ProductLinkedTable({
  products,
  setProduct,
  getCheckedDeliverProducts,
  getCheckedPoProducts,
  setEditModal,
  setViewHistoryModal,
  deletePoProduct,
  setHistoryProduct,
}) {
  ProductLinkedTable.propTypes = {
    products: PropTypes.array,
    setProduct: PropTypes.func,
    getCheckedDeliverProducts: PropTypes.func,
    getCheckedPoProducts: PropTypes.func,
    setEditModal: PropTypes.func,
    setViewHistoryModal: PropTypes.func,
    deletePoProduct: PropTypes.func,
    setHistoryProduct: PropTypes.func,
  };
  return (
    <div>
      <Row>
        <Table id="example" className="display border border-secondary rounded">
          <thead title="Purchase Order Linked ">
            <tr>
              {purchaseTableColumn.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((element, index) => {
                return (
                  <tr key={element.po_product_id}>
                    <td>
                      <input
                        type="checkbox"
                        id="sno"
                        name="sno"
                        value={element.po_product_id}
                        onChange={(e) => {
                          getCheckedPoProducts(e, index, element);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="dno"
                        name="do"
                        value={element.po_product_id}
                        onChange={(e) => {
                          getCheckedDeliverProducts(e, index, element);
                        }}
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{element.item_code}</td>
                    <td>{element.title}</td>
                    <td>{element.cost_price}</td>
                    <td>{element.selling_price}</td>
                    <td>{element.gst}</td>
                    <td>{element.qty_in_stock}</td>
                    <td>{element.qty}</td>
                    <td>{element.damage_qty}</td>
                    <td>{element.qty_delivered}</td>
                    <td>{element.qty_balance}</td>
                    <td>{element.status}</td>
                    <td>{element.po_value}</td>
                    <td>{element.actual_value}</td>

                    <td>
                      <Button
                        color="primary"
                        onClick={() => {
                          setProduct(element);
                          setEditModal(true);
                        }}
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Link to="">
                        <span
                          onClick={() => {
                            deletePoProduct(element.po_product_id);
                          }}
                        >
                          <Icon.Trash2 />
                        </span>
                      </Link>
                    </td>
                    <td>
                      <Link
                        to=""
                        color="primary"
                        onClick={() => {
                          setHistoryProduct(element.product_id);
                          setViewHistoryModal(true);
                        }}
                      >
                        <b>
                          <u>View History</u>
                        </b>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Row>
    </div>
  );
}

export default ProductLinkedTable;
