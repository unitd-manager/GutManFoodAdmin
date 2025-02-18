import React from 'react';
import { Row, Col, Button, Form, FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCardV2 from '../ComponentCardV2';
import PdfPurchaseOrder from '../PDF/PdfPurchaseOrder';
import PdfPurchaseOrderPrice from '../PDF/PdfPurchaseOrderPrice';

function PurchaseOrderButtons({
  applyChanges,
  backToList,
  editPurchaseData,
  navigate,
  purchaseDetails,
  products,
  product,
}) {
  PurchaseOrderButtons.propTypes = {
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    editPurchaseData: PropTypes.any,
    navigate: PropTypes.any,
    purchaseDetails: PropTypes.any,
    products: PropTypes.array,
    product: PropTypes.array,
  };
  return (
    <div>
      <Form>
        <FormGroup>
          <ComponentCardV2>
            <Row>
              <Col>
                <PdfPurchaseOrder
                  products={products}
                  purchaseDetails={purchaseDetails}
                ></PdfPurchaseOrder>
              </Col>
              <Col>
                <PdfPurchaseOrderPrice
                  product={product}
                  purchaseDetails={purchaseDetails}
                ></PdfPurchaseOrderPrice>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editPurchaseData();
                    setTimeout(() => {
                      navigate('/PurchaseOrder');
                    }, 1100);
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editPurchaseData();
                    applyChanges();
                  }}
                >
                  Apply
                </Button>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="dark"
                  onClick={() => {
                    backToList();
                  }}
                >
                  Back to List
                </Button>
              </Col>
            </Row>
          </ComponentCardV2>
        </FormGroup>
      </Form>
    </div>
  );
}

export default PurchaseOrderButtons;
