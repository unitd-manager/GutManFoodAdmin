import React from 'react';
import PropTypes from 'prop-types';

const OrderStatsData = ({ iconColor, title, subtitle }) => {
  return (
    <>
      <i className={`bi bi-record-fill text-${iconColor} fs-4`} />
      <h3 className="mb-0 font-medium">{title}</h3>
      <span className="text-muted">{subtitle}</span>
    </>
  );
};

OrderStatsData.defaultProps = {
  iconColor: 'default',
};

OrderStatsData.propTypes = {
  iconColor: PropTypes.oneOf([
    'primary',
    'success',
    'info',
    'danger',
    'warning',
    'orange',
    'cyan',
    'default',
  ]),
  title: PropTypes.node,
  subtitle: PropTypes.node,
};

export default OrderStatsData;
