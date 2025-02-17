import React, { useState, useEffect } from 'react';
import { Row, Col, FormGroup, Label, Input, Form, Table } from 'reactstrap';
import * as $ from 'jquery';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { usePermify } from '@permify/react-role';
import ComponentCard from '../../components/ComponentCard';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import message from '../../components/Message';
import UserGroupButtons from '../../components/userGroup/UserGroupButtons';
import AppContext from '../../context/AppContext';

const UserGroupEdit = () => {
  //state variables
  const [userGroupDetails, setUserGroupDetails] = useState({});
  const [roomUser, setRoomUser] = useState([]);
  const { loggedInuser } = React.useContext(AppContext);
  const { setUser } = usePermify();
  //params and routing
  const { id } = useParams();
  const navigate = useNavigate();

  // Route Change
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/UserGroup');
  };

  //Setting data in userGroupDetails
  const handleInputs = (e) => {
    setUserGroupDetails({ ...userGroupDetails, [e.target.name]: e.target.value });
  };

  // Get Product data By product id
  const getUserGroupById = () => {
    api
      .post('/usergroup/getusergroupById', { user_group_id: id })
      .then((res) => {
        setUserGroupDetails(res.data.data[0]);
      })
      .catch(() => {
        message('userGroupDetails Data Not Found', 'info');
      });
  };

  //get roomusergroup data by id
  const getRoomUserGroup = () => {
    api
      .post('/usergroup/getroomusergroupById', { user_group_id: id })
      .then((res) => {
        setRoomUser(res.data.data);
        if (id === loggedInuser.user_group_id) {
          const apiData = res.data.data;
          const permissionArray = [];
          apiData.forEach((element) => {
            if (element.edit) permissionArray.push(`${element.section_title}-edit`);
            if (element.detail) permissionArray.push(`${element.section_title}-detail`);
            if (element.duplicate) permissionArray.push(`${element.section_title}-duplicate`);
            if (element.export) permissionArray.push(`${element.section_title}-export`);
            if (element.import) permissionArray.push(`${element.section_title}-import`);
            if (element.list) permissionArray.push(`${element.section_title}-list`);
            if (element.new) permissionArray.push(`${element.section_title}-new`);
            if (element.print) permissionArray.push(`${element.section_title}-print`);
            if (element.publish) permissionArray.push(`${element.section_title}-publish`);
            if (element.remove) permissionArray.push(`${element.section_title}-remove`);
          });
          setUser({
            id: '1',
            roles: ['admin'],
            permissions: permissionArray,
          });
        }
      })
      .catch(() => {
        message('Unable to get room user record.', 'error');
      });
  };
  //update room user
  const editRoomUserGroup = (elem) => {
    api
      .post('/usergroup/edit-roomusergroup', elem)
      .then(() => {
        message('Record edited successfully', 'success');
        getRoomUserGroup();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  //update userGroup
  const editUserGroupData = () => {
    userGroupDetails.modification_date = creationdatetime;
    userGroupDetails.modified_by = loggedInuser.first_name;
    api
      .post('/usergroup/edit-usergroup', userGroupDetails)
      .then(() => {
        message('Record edited successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  //insert userGroup
  const insertRoomUserGroup = (item) => {
    api
      .post('/usergroup/insertRoomUserGroup', item)
      .then(() => {
        message('Record edited successfully', 'success');
        getRoomUserGroup();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  //Api call for Deleting UserGroup Data
  const deleteUserGroupData = () => {
    api
      .post('/usergroup/deleteUserGroup', { user_group_id: id })
      .then(() => {
        message('Record deleted successfully', 'success');
      })
      .catch(() => {
        message('Unable to delete record.', 'error');
      });
  };
  const handleOnChange = (e, item) => {
    item = { ...item, modification_date: creationdatetime };
    item = { ...item, [e.target.name]: e.target.checked === true ? 1 : 0 };
    if (item.room_user_group_id) {
      editRoomUserGroup(item);
    } else {
      item = { ...item, user_group_id: id };
      insertRoomUserGroup(item);
    }
  };
  const getAllValues = () => {
    const result = [];
    $('#example tbody tr').each(() => {
      const allValues = {};
      $(this)
        .find('input')
        .each(() => {
          const fieldName = $(this).attr('name');
          allValues.user_group_id = id;
          allValues[fieldName] = $(this).val();
        });

      result.push(allValues);
    });
    result.forEach((obj) => {
      editRoomUserGroup(obj);
    });
  };

  const accessColumns = [
    {
      name: 'room name',
    },

    {
      name: 'list',
    },
    {
      name: 'detail',
    },
    {
      name: 'new',
    },
    {
      name: 'edit',
    },
    {
      name: 'delete',
    },
    {
      name: 'publish',
    },
    {
      name: 'un-publish',
    },
    {
      name: 'print',
    },
    {
      name: 'import',
    },
    {
      name: 'export',
    },
  ];

  //useEffect
  useEffect(() => {
    getUserGroupById();
    getRoomUserGroup();
  }, [id]);

  return (
    <>
      <div className="MainDiv">
        <div className="">
          <ToastContainer></ToastContainer>
          <Row>
            <BreadCrumbs heading={userGroupDetails && userGroupDetails.title} />
            <UserGroupButtons
              id={id}
              applyChanges={applyChanges}
              backToList={backToList}
              deleteUserGroupData={deleteUserGroupData}
              editUserGroupData={editUserGroupData}
              editRoomUserGroup={getAllValues}
              navigate={navigate}
            />
            <Form>
              <FormGroup>
                <ComponentCard title="UserGroup Details" creationModificationDate={userGroupDetails}>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label>Title</Label>
                        <Input
                          type="text"
                          value={userGroupDetails && userGroupDetails.title}
                          onChange={handleInputs}
                          name="title"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>UserGroup Type</Label>
                        <Input
                          type="select"
                          value={userGroupDetails && userGroupDetails.user_group_type}
                          onChange={handleInputs}
                          name="user_group_type"
                        >
                          <option value="Super Administrator" defaultValue="selected">
                            Super Administrator
                          </option>
                          <option value="Administrator">Administrator</option>
                          <option value="User">User</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </ComponentCard>
              </FormGroup>
            </Form>
          </Row>

          <ComponentCard title="Actions">
            <Table id="example" className="display border border-secondary rounded">
              <thead>
                <tr>
                  {accessColumns.map((cell) => {
                    return <td key={cell.name}>{cell.name}</td>;
                  })}
                </tr>
              </thead>
              <tbody>
                <tr className="w-100 bg-primary text-white">
                  <td>Modules</td>
                </tr>
              </tbody>
              <tbody>
                {roomUser &&
                  roomUser.map((element) => {
                    return (
                      <tr key={element.section_id}>
                        <td>
                          <Input
                            type="text"
                            name="section_title"
                            value={element.section_title}
                            disabled
                          />
                        </td>
                        <td>
                          <FormGroup check>
                            <Input
                              type="checkbox"
                              value="1"
                              name="list"
                              onChange={(e) => {
                                handleOnChange(e, element);
                              }}
                              defaultChecked={element.list}
                            />
                          </FormGroup>
                        </td>
                        <td>
                          <FormGroup check>
                            <Input
                              type="checkbox"
                              value="1"
                              name="detail"
                              onChange={(e) => {
                                handleOnChange(e, element);
                              }}
                              defaultChecked={element.detail}
                            />
                          </FormGroup>
                        </td>
                        <td>
                          <FormGroup check>
                            <Input
                              type="checkbox"
                              value="1"
                              name="new"
                              onChange={(e) => {
                                handleOnChange(e, element);
                              }}
                              defaultChecked={element.new}
                            />
                          </FormGroup>
                        </td>
                        <td>
                          <FormGroup check>
                            <Input
                              type="checkbox"
                              value="1"
                              name="edit"
                              onChange={(e) => {
                                handleOnChange(e, element);
                              }}
                              defaultChecked={element.edit}
                            />
                          </FormGroup>
                        </td>
                        <td>
                          <FormGroup check>
                            <Input
                              type="checkbox"
                              value="1"
                              name="remove"
                              onChange={(e) => {
                                handleOnChange(e, element);
                              }}
                              defaultChecked={element.remove}
                            />
                          </FormGroup>
                        </td>
                        <td>
                          <FormGroup check>
                            <Input
                              type="checkbox"
                              value="1"
                              name="publish"
                              onChange={(e) => {
                                handleOnChange(e, element);
                              }}
                              defaultChecked={element.publish}
                            />
                          </FormGroup>
                        </td>
                        <td>
                          <FormGroup check>
                            <Input
                              type="checkbox"
                              value="1"
                              name="unpublish"
                              onChange={(e) => {
                                handleOnChange(e, element);
                              }}
                              defaultChecked={element.unpublish}
                            />
                          </FormGroup>
                        </td>
                        <td>
                          <FormGroup check>
                            <Input
                              type="checkbox"
                              value="1"
                              name="print"
                              onChange={(e) => {
                                handleOnChange(e, element);
                              }}
                              defaultChecked={element.print}
                            />
                          </FormGroup>
                        </td>
                        <td>
                          <FormGroup check>
                            <Input
                              type="checkbox"
                              value="1"
                              name="import"
                              onChange={(e) => {
                                handleOnChange(e, element);
                              }}
                              defaultChecked={element.import}
                            />
                          </FormGroup>
                        </td>
                        <td>
                          <FormGroup check>
                            <Input
                              type="checkbox"
                              value="1"
                              name="export"
                              onChange={(e) => {
                                handleOnChange(e, element);
                              }}
                              defaultChecked={element.export}
                            />
                          </FormGroup>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              <tbody>
                <tr className="bg-primary text-white w-100">
                  <td>Reports / Widgets</td>
                </tr>
              </tbody>
            </Table>
          </ComponentCard>
        </div>
      </div>
    </>
  );
};

export default UserGroupEdit;
