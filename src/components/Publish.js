import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
import * as Icon from 'react-feather';
import api from '../constants/api';
import message from './Message';

const Publish = ({ value, tablename, idColumn, idValue }) => {
  Publish.propTypes = {
    value: PropTypes.bool,
    tablename: PropTypes.string,
    idColumn: PropTypes.string,
    idValue: PropTypes.string
  };
  const changePublishStatus = (publishValue) => {
    api
      .post('/commonApi/updatePublish', {
        tablename,
        idColumn,
        idValue,
        value:publishValue
      })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload()
        } else {
          message('Unable to edit record.', 'error');
        }
      })
      .catch(() => {
        message('Network connection error.');
      });
  };
  return (
    
      value === 1 ? (
        <Badge
          onClick={() => {
            changePublishStatus('0');
          }}
          color="success"
          className="cursor-pointer"
        >
          <Icon.Eye size={20} />
        </Badge>
      ) : (
        <Badge
          onClick={() => {
            changePublishStatus('1');
          }}
          color="danger"
          className="cursor-pointer"
        >
          <Icon.EyeOff size={20} />
        </Badge>
      )
  
  );
};

export default Publish;
