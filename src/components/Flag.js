import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
import * as Icon from 'react-feather';


function Flag({ value }) {
  Flag.propTypes = {
    value: PropTypes.bool, 
  };
  useEffect(() => {
  }, [value]);
  return (
    <div>
      {value === 1 ? (
        <Badge color="success" className="cursor-pointer">
          <Icon.Flag size={20} />
        </Badge>
      ) : (
        <Badge color="danger" className="cursor-pointer">
          <Icon.Flag size={20} />
        </Badge>
      )}
    </div>
  );
}

export default Flag;
