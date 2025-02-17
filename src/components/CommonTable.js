
import { Card, CardBody, CardTitle, CardSubtitle, Table, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import LottieComponent from './LottieComponent'

const CommonTable = (props) => {
    CommonTable.propTypes = {
        children: PropTypes.node,
        title: PropTypes.any,
        subtitle: PropTypes.any,
        Button:PropTypes.node,
        additionalClasses:PropTypes.string,
        loading:PropTypes.bool
      };
  return (
     <div>
    <Card>
      <CardBody>
        <Row className="mb-2 title_border">
          <Col>
            <CardTitle tag="h5">{props.title}</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {props.subtitle}
            </CardSubtitle>
          </Col>
          <Col className='d-flex' style={{justifyContent:'flex-end'}} xl={3} sm={12}>
              {props.Button}
          </Col>
        </Row>
        {props.loading ? <LottieComponent /> : <Table id="example" className={`no-wrap mt-3 align-middle example ${props.additionalClasses}`} striped responsive borderless>
          {props.children}
        </Table>}
        
      </CardBody>
    </Card>
  </div>
    
  );
};

export default CommonTable;
