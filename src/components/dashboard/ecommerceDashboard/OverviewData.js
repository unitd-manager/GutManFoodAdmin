import React from 'react';
import PropTypes from 'prop-types';

const OverviewData = ({ textColor, icon, title, subtitle }) => {
  return (
    <>
      <div className="d-flex align-items-center mt-3 mt-md-0">
        <div className={`circle-box lg-box d-inline-block bg-light-${textColor}`}>
          <i className={`bi bi-${icon} text-${textColor}`} />
        </div>
        <div className="ms-2">
          <span className="text-muted">{title}</span>
          <h4 className="font-medium mb-0">{subtitle}</h4>
        </div>
      </div>
    </>
  );
};

OverviewData.defaultProps = {
  textColor: 'default',
};

OverviewData.propTypes = {
  textColor: PropTypes.oneOf([
    'primary',
    'success',
    'info',
    'danger',
    'warning',
    'orange',
    'cyan',
    'default',
  ]),
  icon: PropTypes.string,
  title: PropTypes.node,
  subtitle: PropTypes.node,
};

export default OverviewData;
