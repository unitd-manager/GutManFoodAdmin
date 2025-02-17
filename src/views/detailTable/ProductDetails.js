import React, { useContext, useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const ProductDetails = () => {
  //All const variables
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({
    title: '',
    creation_date: moment(),
  });
  //setting data in ProductDetails
  const handleInputs = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  //get staff details
  const { loggedInuser } = useContext(AppContext);
  //Insert Product Data
  const insertProductData = (ProductCode) => {
    if (productDetails.title.trim() !== '') {
      productDetails.product_code = ProductCode;
      productDetails.creation_date = creationdatetime;
      productDetails.created_by = loggedInuser.first_name;
      
      // Insert product
      api.post('/product/insertProduct', productDetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Product inserted successfully.', 'success');
  
          // Fetch inventory code and insert inventory

          api
          .post('/commonApi/getCodeValues', { type: 'inventory' })
          .then((resp) => {
              const InventoryCode = resp.data.data;
              message('Fetched Inventory code successfully.', 'success');
              api.post('/inventory/insertinventory', {
                product_id: insertedDataId,
                inventory_code: InventoryCode,
                created_by: loggedInuser.first_name, 
                creation_date: creationdatetime, 
              })
              .then(() => {
                message('Inventory created successfully.', 'success');
              })
              .catch((inventoryError) => {
                console.error('Error creating inventory:', inventoryError);
                message('Unable to create inventory.', 'error');
              });
  
            })
            .catch((codeError) => {
              console.error('Error fetching Inventory code:', codeError);
              message('Unable to fetch Inventory code.', 'error');
            });
  
          setTimeout(() => {
            navigate(`/ProductEdit/${insertedDataId}?tab=1`);
          }, 300);
        })
        .catch((productError) => {
          console.error('Error inserting product:', productError);
          message('Unable to insert product.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'warning');
    }
  };
  

  //Auto generation code
  const generateCode = () => {
    api
      .post('/commonApi/getCodeValues', { type: 'product' })
      .then((res) => {
        const ProductCode = res.data.data;
       console.log('ProductCode',ProductCode)
          insertProductData(ProductCode);
      })
      .catch(() => {
        insertProductData('');
      });
  };

  //useeffect
  useEffect(() => {}, []);

  return (
    <div>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="6">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                      Product Name <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                      type="text"
                      onChange={handleInputs}
                      value={ProductDetails && ProductDetails.title}
                      name="title"
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      className="shadow-none"
                      color="primary"
                      onClick={() => {
                        generateCode();
                      }}
                    >
                      Save & Continue
                    </Button>
                    <Button
                      type="submit"
                      className="btn btn-dark shadow-none"
                      onClick={(e) => {
                        if (window.confirm('Are you sure you want to cancel? ')) {
                          navigate('/Product');
                        } else {
                          e.preventDefault();
                        }
                      }}
                    >
                      Cancel
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
export default ProductDetails;
