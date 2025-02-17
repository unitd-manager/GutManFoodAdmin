import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import ComponentCard from '../ComponentCard';


export default function ProductDetail({ productDetails, handleInputs,categoryLinked }) {
    ProductDetail.propTypes = {
    productDetails: PropTypes.object,
    handleInputs: PropTypes.func,
    categoryLinked: PropTypes.array,
  };
  return (
    <>
      <Form>
        <FormGroup>
        <ComponentCard title="Product Details" creationModificationDate={productDetails}>
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Product code </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.product_code}
                    name="product_code"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Product Name </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.title}
                    name="title"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  {/* Category title from Category table */}
                  <Label>Category</Label>
                  <Input
                    type="select"
                    name="category_id"
                    value={productDetails && productDetails.category_id}
                    onChange={handleInputs}
                  >
                    <option defaultValue="selected">Please Select</option>
                    {categoryLinked &&
                      categoryLinked.map((ele) => {
                        return (
                          <option key={ele.category_id} value={ele.category_id}>
                            {ele.category_title}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Type</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={productDetails && productDetails.product_type}
                    name="product_type"
                  >
                    <option defaultValue="selected"> Please Select </option>
                    <option value="materials">Materials</option>
                    <option value="tools">Tools</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Quantity in Stock</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.qty_in_stock}
                    name="qty_in_stock"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> List Price </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.price}
                    name="price"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Tag </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.tag}
                    name="tag"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Unit</Label>
                  <Input
                    type="select"
                    value={productDetails && productDetails.unit}
                    name="unit"
                    onChange={handleInputs}
                  >
                    <option defaultValue="selected">Please Select</option>
                    <option value="Box">Box</option>
                    <option value="Piece">Piece</option>
                    <option value="Kg">Kg</option>
                  </Input>
                </FormGroup>
              </Col>
 
              <Col md="3">
                <FormGroup>
                  <Label> Short Description </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.description_short}
                    name="description_short"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Brand </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.brand}
                    name="brand"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Gst</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.gst}
                    name="gst"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Description </Label>
                  <Input
                    type="textarea"
                    onChange={handleInputs}
                    value={productDetails && productDetails.description}
                    name="description"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Keyword search</Label>
                  <Input
                    type="textarea"
                    onChange={handleInputs}
                    value={productDetails && productDetails.keyword_search}
                    name="keyword_search"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Discount Percentage </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.discount_percentage}
                    name="discount_percentage"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <Label>Most Popular</Label>
                <FormGroup>
                  <Label>Yes</Label>
                  &nbsp;
                  <Input
                    name="most_popular"
                    value="1"
                    type="radio"
                    defaultChecked={productDetails && productDetails.most_popular === 1 && true}
                    onChange={handleInputs}
                  />
                  &nbsp; &nbsp;
                  <Label>No</Label>
                  &nbsp;
                  <Input
                    name="most_popular"
                    value="0"
                    type="radio"
                    defaultChecked={productDetails && productDetails.most_popular === 0 && true}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>

              <Col md="3">
                <Label>Most sellers</Label>
                <FormGroup>
                  <Label>Yes</Label>
                  &nbsp;
                  <Input
                    name="top_seller"
                    value="1"
                    type="radio"
                    defaultChecked={productDetails && productDetails.top_seller === 1 && true}
                    onChange={handleInputs}
                  />
                  &nbsp; &nbsp;
                  <Label>No</Label>
                  &nbsp;
                  <Input
                    name="top_seller"
                    value="0"
                    type="radio"
                    defaultChecked={productDetails && productDetails.top_seller === 0 && true}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>

              <Col md="3">
                <Label>Published</Label>
                <FormGroup>
                  <Label>Yes</Label>
                  &nbsp;
                  <Input
                    name="published"
                    value="1"
                    type="radio"
                    defaultChecked={productDetails && productDetails.published === 1 && true}
                    onChange={handleInputs}
                  />
                  &nbsp; &nbsp;
                  <Label>No</Label>
                  &nbsp;
                  <Input
                    name="published"
                    value="0"
                    type="radio"
                    defaultChecked={productDetails && productDetails.published === 0 && true}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>

              <Col md="3">
                <Label>New Arrivals</Label>
                <FormGroup>
                  <Label>Yes</Label>
                  &nbsp;
                  <Input
                    name="latest"
                    value="1"
                    type="radio"
                    defaultChecked={productDetails && productDetails.latest === 1 && true}
                    onChange={handleInputs}
                  />
                  &nbsp; &nbsp;
                  <Label>No</Label>
                  &nbsp;
                  <Input
                    name="latest"
                    value="0"
                    type="radio"
                    defaultChecked={productDetails && productDetails.latest === 0 && true}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
       
        </FormGroup>
      </Form>
     
     
    </>
  );
}
