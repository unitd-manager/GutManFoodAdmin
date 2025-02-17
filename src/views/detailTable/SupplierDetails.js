import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';

const SupplierDetails = () => {
  //all state variables
  const [supplierForms, setSupplierForms] = useState({
    company_name: '',
  });
  //navigation and params
  const navigate = useNavigate();
  //supplierData in supplier details
  const handleInputsSupplierForms = (e) => {
    setSupplierForms({ ...supplierForms, [e.target.name]: e.target.value });
  };
  //inserting supplier data
  const insertSupplier = () => {
    if (supplierForms.company_name !== '')
      api.post('/supplier/insert-Supplier', supplierForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Supplier inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/SupplierEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    else {
      message('Please fill all required fields.', 'error');
    }
  };
  useEffect(() => {}, []);
  return (
    <div>
       <BreadCrumbs />
      <ToastContainer />
      <Row>
        <Col md="6" xs="12">
          {/* Key Details */}
          <ComponentCard title="Supplier Name">
          <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                      {' '}
                      Supplier Name <span className="required"> *</span>{' '}
                    </Label>
                    <Input type="text" name="company_name" onChange={handleInputsSupplierForms} />
                    </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
          <div className="pt-3 mt-3 d-flex align-items-center gap-2">
            <Button color="primary"
              onClick={() => {
                insertSupplier();
                setTimeout(() => {
                  navigate('/SupplierEdit');
                }, 800);
              }}
              type="button"
              className="btn mr-2 shadow-none"  >
              Save & Continue
            </Button>
            <Button
              onClick={() => {
                navigate('/SupplierEdit')
              }}
              type="button"
              className="btn btn-dark shadow-none" >
              Go to List
            </Button>
            </div>
                </Row>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default SupplierDetails;
