import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Form, FormGroup } from 'reactstrap';
import ComponentCardV2 from '../ComponentCardV2';
import DeleteButton from '../DeleteButton';

function UserGroupButtons({
  id,
  applyChanges,
  backToList,
  editUserGroupData,
  editRoomUserGroup,
  navigate,
}) {
  UserGroupButtons.propTypes = {
    id: PropTypes.string,
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    editUserGroupData: PropTypes.func,
    editRoomUserGroup: PropTypes.func,
    navigate: PropTypes.any,
  };

  return (
    <div>
      <Form>
        <FormGroup>
          <ComponentCardV2>
            <Row>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editUserGroupData();
                    editRoomUserGroup();
                    setTimeout(() => {
                      navigate('/UserGroup');
                    }, 300);
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editUserGroupData();
                    editRoomUserGroup();
                    applyChanges();
                  }}
                >
                  Apply
                </Button>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="dark"
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you want to cancel  \n  \n You will lose any changes made',
                      )
                    ) {
                      navigate('/UserGroup');
                    } else {
                      applyChanges();
                    }
                  }}
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <DeleteButton
                  id={id}
                  columnname="user_group_id"
                  tablename="user_group"
                ></DeleteButton>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="dark"
                  onClick={() => {
                    backToList();
                  }}
                >
                  Back to List
                </Button>
              </Col>
            </Row>
          </ComponentCardV2>
        </FormGroup>
      </Form>
    </div>
  );
}

export default UserGroupButtons;
