import React, { useContext, useEffect, useState } from 'react';
import { Col, Row, Card, Input, Form, Button, CardBody } from 'reactstrap';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Avatar from '@mui/material/Avatar';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import moment from 'moment';
import { ToastContainer } from 'react-toastify';
import message from '../../components/Message';
import api from '../../constants/api';
import AppContext from '../../context/AppContext';

const DashboardComments = () => {
  // All state variables
  const [staff, setStaff] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const { loggedInuser } = useContext(AppContext);
  const [yesterdayNotes, setYesterdayNotes] = useState();

  // const [editTask, setEditTask] = useState();
  const [value, setValue] = useState({});

  const handleChange = (event, newValue, key) => {
    setValue({ ...value, [key]: newValue });
  };

  function createKeysForTab(arr) {
    const obj = {};
    for (let i = 0; i < arr.length; i++) {
      obj[i] = 1;
    }
    setValue(obj);
  }

  function checkWhichTab(index) {
    return value[index];
  }
  //   Api call for getting Yesterday Notes
  const getLastNotes = () => {
    api
      .post('/attendance/getYesterdayNotes', {
        staff_id: loggedInuser.staff_id,
      })
      .then((res) => {
        if (res.data.status === '200') {
          setYesterdayNotes(res.data.data);
        }
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  //   Api call for getting Staff Data
  const getStaff = () => {
    api
      .post('/attendance/getStaff', {
        date: moment().format('DD-MM-YYYY'),
      })
      .then((res) => {
        setStaff(res.data.data);
        createKeysForTab(res.data.data);
        getLastNotes();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  const insertAttendance = (elem, attendanceId) => {
    const user = {};
    user.staff_id = elem.staff_id;
    user.record_date = moment().format('h:mm:ss a');
    user.creation_date = moment().format('DD-MM-YYYY');
    user.modification_date = moment().format('DD-MM-YYYY');
    user.created_by = elem.staff_id;
    user.modified_by = elem.staff_id;
    if (attendanceId !== '') {
      user.attendance_id = attendanceId;
    }
    api
      .post('/attendance/insertAttendance', user)
      .then(() => {
        message('Attendance inserted successfully.', 'success');
        getStaff();
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
  };

  const changeNotes = (e, noteType) => {
    if (e.target.value === '') {
      message('Enter valid Notes', 'warning');
    } else {
      /* eslint-disable-next-line */
      if (selectedItem.attendance_id) {
        /* eslint-disable-next-line */
        selectedItem.notes = e.target.value;
        selectedItem.type = noteType;
        /* eslint-disable-line */
        api
          .post('/attendance/editNotes', selectedItem)
          .then(() => {
            getLastNotes();
            message('Task edited successfully.', 'success');
          })
          .catch(() => {
            message('Cannot Update Data', 'error');
          });
      } else {
        message('Please Login first', 'error');
      }
    }
  };
  const getPreviousNoteVal = (selectedStaff) => {
    const result =
      yesterdayNotes &&
      yesterdayNotes.filter((obj) => {
        return obj.staff_id === selectedStaff;
      });
    /* eslint-disable-next-line */
    if (result) {
      return result[0];
    }
    return { notes: '', completed_notes: '', in_progress_notes: '' };
  };
  useEffect(() => {
    getStaff();
  }, []);

  return (
    <>
      <ToastContainer></ToastContainer>
      <Card className="shadow-none">
        <Form>
          <CardBody className="shadow-none">
            <Row>
              {staff &&
                staff.map((element, index) => {
                  return (
                    <Col md="4" key={element.staff_id}>
                      <Card
                        key={element.staff_id}
                        className="border border-gray shadow-none p-1 pt-2"
                      >
                        <Row className="border-bottom border-gray p-2">
                          <Col md="9">
                            <span>
                              <Row>
                                <Col md="3">
                                  <Avatar />
                                </Col>
                                <Col md="9">
                                  <Row>
                                    <b>{element.first_name}</b>
                                  </Row>
                                  <Row>
                                    <span>designation</span>
                                  </Row>
                                </Col>
                              </Row>
                            </span>
                          </Col>

                          <Col md="3">
                            {loggedInuser.staff_id === element.staff_id &&
                              (element.time_in && !element.leave_time ? (
                                <Button
                                  color="primary"
                                  className="shadow-none"
                                  size="sm"
                                  onClick={() => {
                                    insertAttendance(element, element.attendance_id);
                                  }}
                                >
                                  Logout
                                </Button>
                              ) : !element.time_in ? (
                                <Button
                                  color="primary"
                                  className="shadow-none"
                                  size="sm"
                                  onClick={() => {
                                    insertAttendance(element, '');
                                  }}
                                >
                                  Login
                                </Button>
                              ) : (
                                <Button color="success" className="shadow-none" size="sm">
                                  Marked
                                </Button>
                              ))}
                          </Col>
                        </Row>
                        <br></br>

                        <div className="text-muted mb-3 card-subtitle">
                          <p>
                            Time In:<code> {element.time_in ? element.time_in : ''}</code>{' '}
                          </p>
                          <p>
                            Time Out:<code> {element.leave_time ? element.leave_time : ''}</code>{' '}
                          </p>
                        </div>

                        <Row>
                          <TabContext value={checkWhichTab(index) ?? 1}>
                            <Box
                              sx={{ borderBottom: 1, borderColor: 'divider' }}
                              className="col-12"
                            >
                              <TabList
                                onChange={(event, newValue) => handleChange(event, newValue, index)}
                                aria-label="lab API tabs example"
                              >
                                <Tab label="Pending" value={1} className="col-4" />
                                <Tab label="Progress" value={2} className="col-4" />
                                <Tab label="Comments" value={3} className="col-4" />
                              </TabList>
                            </Box>
                            <TabPanel value={1}>
                              <Input
                                onFocus={() => {
                                  setSelectedItem(element);
                                 
                                }}
                                onBlur={(e) => {
                                  changeNotes(e, 'pending');
                                }}
                                type="textarea"
                                name="task_pending"
                                defaultValue={
                                  getPreviousNoteVal(element.staff_id) &&
                                  getPreviousNoteVal(element.staff_id).notes
                                }
                                disabled={loggedInuser.staff_id !== element.staff_id}
                              />
                            </TabPanel>
                            <TabPanel value={2}>
                              <Input
                                onFocus={() => {
                                  setSelectedItem(element);
                                }}
                                onBlur={(e) => {
                                  changeNotes(e, 'inprogress');
                                }}
                                type="textarea"
                                name="task_progress"
                                defaultValue={
                                  getPreviousNoteVal(element.staff_id) &&
                                  getPreviousNoteVal(element.staff_id).in_progress_notes
                                }
                                disabled={loggedInuser.staff_id !== element.staff_id}
                              />
                            </TabPanel>
                            <TabPanel value={3}>
                              <Input
                                onFocus={() => {
                                  setSelectedItem(element);
                                }}
                                onBlur={(e) => {
                                  changeNotes(e, 'completed');
                                }}
                                type="textarea"
                                name="task_complete"
                                defaultValue={
                                  getPreviousNoteVal(element.staff_id) &&
                                  getPreviousNoteVal(element.staff_id).completed_notes
                                }
                                disabled={loggedInuser.staff_id !== element.staff_id}
                              />
                            </TabPanel>
                          </TabContext>
                        </Row>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          </CardBody>
        </Form>
      </Card>
    </>
  );
};
export default DashboardComments;
