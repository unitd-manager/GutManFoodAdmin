import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';

const PurchaseOrderDetails = () => {
  //All state variables
  const [supplier, setSupplier] = useState();
  const [purchaseForms, setPurchaseForms] = useState({
    supplier_id: '',
    company_name: '',
  });

  //Navigation and Parameters
  const { id } = useParams();
  const navigate = useNavigate();
  // Gettind data from Job By Id
  const editPurchaseById = () => {
    api
      .get('/purchaseorder/getSupplier')
      .then((res) => {
        setSupplier(res.data.data);
      })
      .catch(() => {});
  };
  //PurchaseOrder data in PurchaseOrderDetails
  const handleInputs = (e) => {
    setPurchaseForms({ ...purchaseForms, [e.target.name]: e.target.value });
  };
  //inserting data of Purchase Order
  const insertPurchaseOrder = () => {
    purchaseForms.purchase_order_date = moment();

    if (purchaseForms.supplier_id !== '') {
      api
        .post('/purchaseorder/insertPurchaseOrder', purchaseForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Purchase Order inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/PurchaseOrderEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'warning');
    }
  };
  useEffect(() => {
    editPurchaseById();
  }, [id]);
  return (
    <div>
      <BreadCrumbs />
      <Row>
        <ToastContainer></ToastContainer>
        <Col md="6">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                  <Label>supplier Name </Label>
                  <Input
                    type="select"
                    name="supplier_id"
                    onChange={(e) => {
                      handleInputs(e);
                    }}
                  >
                    <option value="" selected>
                      Please Select
                    </option>
                    {supplier &&
                      supplier.map((ele) => {
                        return (
                          <option key={ele.supplier_id} value={ele.supplier_id}>
                            {ele.company_name}
                          </option>
                        );
                      })}
                  </Input>
                </Row>

                <FormGroup>
                  <Row>
                    <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                      <Button
                        color="primary"
                        type="button"
                        className="btn mr-2 shadow-none"
                        onClick={() => {
                          insertPurchaseOrder();
                        }}
                      >
                        Save & Continue
                      </Button>
                      <Button
                        onClick={() => {
                          navigate('/PurchaseOrderEdit');
                        }}
                        type="button"
                        className="btn btn-dark shadow-none"
                      >
                       Go to List
                      </Button>
                    </div>
                  </Row>
                </FormGroup>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};
export default PurchaseOrderDetails;
