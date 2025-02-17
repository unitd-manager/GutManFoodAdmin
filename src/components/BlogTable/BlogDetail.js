import React from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function BlogDetail({ blog, handleInputs,category }) {
  BlogDetail.propTypes = {
    blog: PropTypes.object,
    handleInputs: PropTypes.func,
    category: PropTypes.array,
  };
  return (
    <>
        <ComponentCard title="blog">
           
                  <Row>
                    <Col md="3">
                      <FormGroup>
                        <Label>Title</Label>
                        <Input
                          type="text"
                          onChange={handleInputs}
                          value={blog && blog.title}
                          name="title"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Category </Label>
                        <Input
                          type="select"
                          name="category_id"
                          onChange={handleInputs}
                          value={blog && blog.category_id}
                        >
                          <option defaultValue="selected">Please Select</option>
                          {category &&
                            category.map((e) => {
                              return (
                                <option key={e.category_id} value={e.category_id}>
                                  {e.category_title}
                                </option>
                              );
                            })}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>author</Label>
                        <Input
                          type="text"
                          onChange={handleInputs}
                          value={blog && blog.author}
                          name="author"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Published</Label>
                        <br></br>
                        <Label>Yes</Label>
                        <Input
                          name="published"
                          value="1"
                          type="radio"
                          defaultChecked={blog && blog.published === 1 && true}
                          onChange={handleInputs}
                        />
                        <Label>No</Label>
                        <Input
                          name="published"
                          value="0"
                          type="radio"
                          defaultChecked={blog && blog.published === 0 && true}
                          onChange={handleInputs}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
           
              </ComponentCard>
            
    </>
  );
}
