/* eslint-disable */
import React from 'react';
import { Button, Col, Row, Card } from 'reactstrap';
import PropTypes from 'prop-types';
import { HasAccess ,usePermify} from '@permify/react-role';

const ApiButton = ({ editData, navigate, applyChanges, backToList, module }) => {
  ApiButton.propTypes = {
    editData: PropTypes.func,
    navigate: PropTypes.any,
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    module: PropTypes.string,
  };
  const { isAuthorized, isLoading } = usePermify();

  
  const fetchData = async (type) => {
    // Pass roles and permissions accordingly
    // You can send empty array or null for first param to check permissions only
    if (await isAuthorized(null, `${module}-${type}`)) {
       return true
    }else{
      return false
    }
};

  return (
    <div>
      <Card tag="h4" className="border-bottom px-4 py-3 mb-0">
        <div className="d-flex flex-row-reverse">
          <Row>
            <Col className="d-flex" xl={3} sm={12}>
              {' '}
              <HasAccess
                roles={null}
                permissions={`${module}-edit`}
                renderAuthFailed={<p></p>}
              >
                <Button
                  onClick={() => {
                    editData();
                    navigate('/Leave');
                  }}
                  color="primary"
                >
                  {' '}
                  Save
                </Button>
              </HasAccess>
            </Col>
            <Col className="d-flex" xl={3} sm={12}>
              {' '}
              <HasAccess
                roles={null}
                permissions={`${module}-edit`}
                renderAuthFailed={<p></p>}
              >
                <Button
                  onClick={() => {
                    editData();
                    applyChanges();
                  }}
                  color="primary"
                >
                  Apply
                </Button>
              </HasAccess>
            </Col>
            <Col className="d-flex" xl={4} sm={12}>
              {' '}
              <Button
                onClick={() => {
                  backToList();
                }}
                color="dark"
              >
                Back To List
              </Button>
            </Col>
            <Col className="d-flex" xl={3} sm={12}>
              {' '}
              <HasAccess
                roles={null}
                permissions={`${module}-remove`}
                renderAuthFailed={<p>You are not authorized to access!</p>}
              >
                <Button color="danger" onClick={() => {}}>
                  Delete
                </Button>
              </HasAccess>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default ApiButton;
