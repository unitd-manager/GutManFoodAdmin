import React from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

const DeliveryModalTable = ({ delivery, handleInputs, }) => {
    DeliveryModalTable.propTypes = {
    delivery: PropTypes.object,
    handleInputs: PropTypes.func,
  };
  return (
    <>
    
  
                   
                    <Col md="4">
                      <FormGroup>
                        <Label>PO Code</Label>
                        <Input
                          type="text"
                          value={delivery && delivery.po_code}
                          onChange={handleInputs}
                          name="po_code"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>PO Date</Label>
                        <Input
                          type="date"
                          value={moment(delivery && delivery.purchase_order_date).format(
                            'YYYY-MM-DD',
                          )}
                          onChange={handleInputs}
                          name="purchase_order_date"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  
                    
                    <Col md="4">
                      <FormGroup>
                        <Label>Delivery Date</Label>
                        <Input
                          type="date"
                          value={moment(delivery && delivery.date).format(
                            'YYYY-MM-DD',
                          )}
                          onChange={handleInputs}
                          name="date"
                        />
                      </FormGroup>
                    </Col>
                    
    </>
  );
};

export default DeliveryModalTable;
