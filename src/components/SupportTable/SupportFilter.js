import { Row, Col, Card, CardBody } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setVisibilityFilter } from '../../store/apps/ticket/TicketSlice';

const SupportFilter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.ticketReducer.tickets);
  const newC = counter.filter((t) => t.value === 'new').length;
  const holdC = counter.filter((t) => t.value === 'hold').length;
  const pendingC = counter.filter((t) => t.value === 'in progress').length;
  const openC = counter.filter((t) => t.value === 'completed').length;
  const closeC = counter.filter((t) => t.value === 're-open').length;
  const canC = counter.filter((t) => t.value === 'cancelled').length;
  
  return (
    <Row>
      <Col>
        <Card
          color="secondary"
          className="text-white text-center cursor-pointer"
          onClick={() => dispatch(setVisibilityFilter('total_tickets'))}
        >
          <CardBody>
            <h3>{counter.length}</h3>
            <h5>Total</h5>
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Card
          color="primary"
          className="text-white text-center cursor-pointer"
          onClick={() => dispatch(setVisibilityFilter('new'))}
        >
          <CardBody>
            <h3>{newC}</h3>
            <h5>New </h5>
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Card
          color="warning"
          className="text-white text-center cursor-pointer"
          onClick={() => dispatch(setVisibilityFilter('in progress'))}
        >
          <CardBody>
            <h3>{pendingC}</h3>
            <h5>In Progress</h5>
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Card
          // color="success"
          style={{background:'#807fe2'}}
          className="text-white text-center cursor-pointer"
          onClick={() => dispatch(setVisibilityFilter('hold'))}
        >
          <CardBody>
            <h3>{holdC}</h3>
            <h5>Hold</h5>
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Card
          color="success"
          className="text-white text-center cursor-pointer"
          onClick={() => dispatch(setVisibilityFilter('completed'))}
        >
          <CardBody>
            <h3>{openC}</h3>
            <h5>Completed</h5>
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Card
          style={{background:'#ec6724'}}
          className="text-white text-center cursor-pointer"
          onClick={() => dispatch(setVisibilityFilter('re-open'))}
        >
          <CardBody>
            <h3>{closeC}</h3>
            <h5>Re-open</h5>
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Card
          color="danger"
          className="text-white text-center cursor-pointer"
          onClick={() => dispatch(setVisibilityFilter('cancelled'))}
        >
          <CardBody>
            <h3>{canC}</h3>
            <h5>Cancelled</h5>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default SupportFilter;