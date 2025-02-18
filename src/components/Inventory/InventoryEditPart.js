import React from 'react';
import { Row, Col, FormGroup, Label, Input, Form } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../ComponentCard';
//import ComponentCardV2 from '../ComponentCardV2';
import ApiButton from '../ApiButton';

function InventoryEditPart({ inventoryDetails, handleInputs, editinventoryData, eng, arb }) {
  InventoryEditPart.propTypes = {
    inventoryDetails: PropTypes.object,
    handleInputs: PropTypes.func,
    editinventoryData: PropTypes.func,
    eng: PropTypes.any,
    arb: PropTypes.any,
  };
 
  //navigation
  const navigate = useNavigate();
  // Route Change
 // const applyChanges = () => {};
  const backToList = () => {
    navigate('/Inventory');
  };
  return (
    <div>
      <Row>
        {eng ===true && <BreadCrumbs heading={inventoryDetails && inventoryDetails.title} />}
      { arb === true && <BreadCrumbs heading={inventoryDetails && inventoryDetails.title_arb} />}
        <ToastContainer></ToastContainer>
        <Form>
          <FormGroup>
            {/* <ComponentCardV2>
              <Row>
                <Col>
                  <Button
                    className="shadow-none"
                    color="primary"
                    onClick={() => {
                      editinventoryData();
                      navigate(`/Inventory`);
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
                      editinventoryData();
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
                    {' '}
                    Back to List{' '}
                  </Button>
                </Col>
              </Row>
            </ComponentCardV2> */}
            
            <ApiButton
              editData={editinventoryData}
              navigate={navigate}
              applyChanges={editinventoryData}
             // deleteData={deleteBookingData}
              backToList={backToList}
              module="Inventory"
            ></ApiButton>

            <ComponentCard  title={arb ? 'تفاصيل المخزون': 'Inventory Details'} creationModificationDate={inventoryDetails}>
              <Row>
                <Col md="3">
                  <FormGroup>
                    {/* <Label>Inventory Code</Label> */}
                    <Label dir="rtl" style={{ textAlign: 'right' }}>
Inventory Code              </Label>
          <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? inventoryDetails && inventoryDetails.inventory_code_arb
                    : inventoryDetails && inventoryDetails.inventory_code
                }
                name={arb ? 'inventory_code_arb' : 'inventory_code'}
                disabled
                />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    {/* <Label>Product Name</Label> */}
                    <Label dir="rtl" style={{ textAlign: 'right' }}>
                Product Name
              </Label>
          <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? inventoryDetails && inventoryDetails.product_name_arb
                    : inventoryDetails && inventoryDetails.product_name
                }
                name={arb ? 'product_name_arb' : 'product_name'}
                disabled
                />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                Product Type
              </Label>
          <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? inventoryDetails && inventoryDetails.product_type_arb
                    : inventoryDetails && inventoryDetails.product_type
                }
                name={arb ? 'product_type_arb' : 'product_type'}
                disabled
                />
                    
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                Item Code
              </Label>
          <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? inventoryDetails && inventoryDetails.item_code_arb
                    : inventoryDetails && inventoryDetails.item_code
                }
                name={arb ? 'item_code_arb' : 'item_code'}
                disabled
                />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                {/* <Col md="3">
                  <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdInventory.ItemCode')?.[genLabel]}
              </Label>
          <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? inventoryDetails && inventoryDetails.item_code_arb
                    : inventoryDetails && inventoryDetails.item_code
                }
                name={arb ? 'item_code_arb' : 'item_code'}
                disabled
                />
               </FormGroup>
                </Col> */}
                <Col md="3">
                  <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
               MOL
              </Label>
          <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? inventoryDetails && inventoryDetails.minimum_order_level_arb
                    : inventoryDetails && inventoryDetails.minimum_order_level
                }
                name={arb ? 'minimum_order_level_arb' : 'minimum_order_level'}
                />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
               Notes
              </Label>
          <Input
                type="text"
                onChange={handleInputs}
                value={
                  arb
                    ? inventoryDetails && inventoryDetails.notes_arb
                    : inventoryDetails && inventoryDetails.notes
                }
                name={arb ? 'notes_arb' : 'notes'}
                />
                  </FormGroup>
                </Col>
              </Row>
            </ComponentCard>
          </FormGroup>
        </Form>
      </Row>
    </div>
  );
}

export default InventoryEditPart;
