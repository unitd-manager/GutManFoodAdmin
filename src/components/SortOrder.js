import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Row, Col } from 'reactstrap';
import api from '../constants/api';
import message from './Message';

const SortOrder = ({ value, tablename, idColumn, idValue }) => {
  const [initialValue, setValue] = useState(value);

  const SortingOrder = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    const newValue = e.target.value;
    if (newValue === '') {
      message('Enter valid sort order', 'warning');
    } else {
      api
        .post('/commonApi/updateSortOrder', {
          tablename,
          idColumn,
          idValue,
          value: newValue,
        })
        .then((res) => {
          if (res.status === 200) {
            setValue(newValue);
            window.location.reload(); // Reload the page after successful update
          } else {
            message('Unable to edit record.', 'error');
          }
        })
        .catch(() => {
          message('Network connection error.');
        });
    }
  };

  return (
    <div>
      <Row>
        <Col md="4" className="mx-0 px-0">
          <Input
            onBlur={(e) => SortingOrder(e)}
            style={{ minWidth: 70 }}
            type="number"
            name="sort_order"
            defaultValue={initialValue ? initialValue.toString() : '0'}
            onChange={(e) => setValue(e.target.value)}
          />
        </Col>
      </Row>
    </div>
  );
};

SortOrder.propTypes = {
  tablename: PropTypes.string,
  idColumn: PropTypes.string,
  idValue: PropTypes.any,
  value: PropTypes.any,
};

export default SortOrder;
