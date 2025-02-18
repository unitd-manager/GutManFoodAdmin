import React, { useState, useEffect,useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import message from '../../components/Message';
import AppContext from '../../context/AppContext';


const PurchaseOrderDetails = () => {
  //All state variables
  const getSelectedLocationFromLocalStorage = () => {
    const locations = localStorage.getItem('selectedLocation');
    const loc=JSON.parse(locations);
    return locations ? Number(loc) : null;
  };

  const selectedLocation = getSelectedLocationFromLocalStorage();

  //console.log('Leavesite',selectedLocation)

  const getSelected = () => {
    return localStorage.getItem('selectedBranch') || '';
  };
  
 const branchId = getSelected()
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
  const { loggedInuser } = useContext(AppContext);
   //inserting data of Purchase Order
   const insertPurchaseOrder = (code) => { 
    purchaseForms.purchase_order_date = moment();
    purchaseForms.creation_date = creationdatetime;
    purchaseForms.site_id = selectedLocation;
    purchaseForms.branch_id = branchId;
    purchaseForms.created_by = loggedInuser.first_name;

    purchaseForms.po_code=code;
    if (purchaseForms.supplier_id !== '') {
      api
        .post('/purchaseorder/insertPurchaseOrder', purchaseForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Purchase Order inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/PurchaseOrderEdit/${insertedDataId}?tab=1`);
          }, 500);
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'warning');
    }
  };

  const generateCode = () => {
    api
      .post('/commonApi/getCodeValue', { type: 'purchaseOrder' })
      .then((res) => {
        insertPurchaseOrder(res.data.data);
      })
      .catch(() => {
        insertPurchaseOrder('');
      });
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
                          generateCode();
                        }}
                      >
                        Save & Continue
                      </Button>
                      <Button
                        onClick={() => {
                          navigate('/PurchaseOrder');
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
