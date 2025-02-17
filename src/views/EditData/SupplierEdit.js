import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNavigate, useParams } from 'react-router-dom';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import api from '../../constants/api';
import PurchaseOrderLinked from '../../components/SupplierModal/Purchaseorderlinked';
import SupplierTable from '../../components/SupplierModal/SupplierTable';
import SupplierDetails from '../../components/SupplierModal/SupplierDetails';

const SupplierEdit = () => {
  //all state variables
  const [supplier, setSupplier] = useState();
  const [purchaseOrder, setPurchaseOrder] = useState();
  const [allCountries, setAllCountries] = useState();
  const [editPurchaseOrderLinked, setEditPurchaseOrderLinked] = useState(false);
  const [supplierStatus, setSupplierStatus] = useState();
  const [status, setStatus] = useState();

  //navigation and params
  const { id } = useParams();
  const navigate = useNavigate();
  const applyChanges = () => {};

  // Get Supplier By Id
  const editSupplierById = () => {
    api
      .post('/supplier/get-SupplierById', { supplier_id: id })
      .then((res) => {
        setSupplier(res.data.data[0]);
      })
      .catch(() => {
        message('Supplier Data Not Found', 'info');
      });
  };

  const handleInputs = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };
  //Logic for edit data in db
  const editSupplierData = () => {
    if (supplier.company_name !== '')
      api
        .post('/supplier/edit-Supplier', supplier)
        .then(() => {
          message('Record editted successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    else {
      message('Please fill all required fields.', 'error');
    }
  };
  //Logic for edit data in db
  const Status = () => {
    api
      .post('/supplier/getStatus', { supplier_id: id })
      .then((res) => {
        setStatus(res.data.data[0]);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
    editSupplierById();
  }, [id]);
  // Get purchaseOrder By Id
  const getpurchaseOrder = () => {
    api
      .post('/supplier/getPurchaseOrderLinkedss', { supplier_id: id })
      .then((res) => {
        setPurchaseOrder(res.data.data);
      })
      .catch(() => {
        message('Supplier not found', 'info');
      });
  };
  const suppliereditdetails = () => {
    api
      .get('/geocountry/getCountry')
      .then((res) => {
        setAllCountries(res.data.data);
      })
      .catch(() => {
        message('Supplier Data Not Found', 'info');
      });
  };
  //Api call for getting Staff Type From Valuelist
  const getSupplierStatus = () => {
    api
      .get('/supplier/getValueList')
      .then((res) => {
        setSupplierStatus(res.data.data);
      })
      .catch(() => {
        message('Status Data Not Found', 'info');
      });
  };
  useEffect(() => {
    getpurchaseOrder();
    suppliereditdetails();
    getSupplierStatus();
    Status();
  }, []);

  return (
    <>
      <BreadCrumbs heading={supplier && supplier.company_name} />
      <Form>
        <FormGroup>
          <ComponentCardV2>
            <Row>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editSupplierData();
                    setTimeout(() => {
                      navigate('/Supplier');
                    }, 1100);
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col>
                <Button
                  color="primary"
                  className="shadow-none"
                  onClick={() => {
                    editSupplierData();
                   
                  }}
                >
                  Apply
                </Button>
              </Col>
              <Col>
                <Button
                  color="dark"
                  className="shadow-none"
                  onClick={() => {
                    applyChanges();
                  }}
                >
                  Back to List
                </Button>
              </Col>
            </Row>
          </ComponentCardV2>
        </FormGroup>
      </Form>
      <SupplierDetails
        handleInputs={handleInputs}
        supplier={supplier}
        allCountries={allCountries}
        supplierStatus={supplierStatus}
        status={status}
        setEditPurchaseOrderLinked={setEditPurchaseOrderLinked}
      ></SupplierDetails>

      <PurchaseOrderLinked
        editPurchaseOrderLinked={editPurchaseOrderLinked}
        setEditPurchaseOrderLinked={setEditPurchaseOrderLinked}
      ></PurchaseOrderLinked>
      <ComponentCard>
        <ToastContainer></ToastContainer>
        <SupplierTable purchaseOrder={purchaseOrder}></SupplierTable>
      </ComponentCard>
    </>
  );
};

export default SupplierEdit;
