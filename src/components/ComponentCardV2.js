import { Card, CardBody } from 'reactstrap';
import PropTypes from 'prop-types';

const pStyle = {
  textAlign: 'right',
  marginRight: '10px',
};
const oStyle={
outline:'none',
border:'none'
};

const ComponentCardV2 = ({ children }) => {
  return (
    <Card className='shadow-none'>
      <CardBody style={pStyle} >
        <div className="btn btn-space text-nowrap shadow-none outline-none" style={oStyle}>{children}</div>
      </CardBody>
    </Card>
  );
};

ComponentCardV2.propTypes = {
  children: PropTypes.node,
};

export default ComponentCardV2;
