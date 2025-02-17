import { React, useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../constants/api';
import message from '../../components/Message';
import ComponentCard from '../../components/ComponentCard';

const LoginDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [staffdetails, setStaffDetails] = useState();

  const handleInputs = (e) => {
    setStaffDetails({ ...staffdetails, [e.target.name]: e.target.value });
  };

  const insertAttendance = () => {
    staffdetails.staff_id = id;
    api
      .post('/attendance/insertAttendance', staffdetails)
      .then((res) => {
        const insertedId = res.data.data.insertId;
        console.log(insertedId);
        message('add inserted successfully.', 'success');

        setTimeout(() => {
          navigate(`/Dashboard`);
        }, 300);
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
  };
  useEffect(() => {}, [id]);
  return (
    <div>
      <Row>
        <Col md="8">
          <ComponentCard title="Login">
            <Form>
              <FormGroup>
                <Row>
                  <Form>
                    <Row>
                      <Col md="8">
                        <FormGroup>
                          <Label>
                            Username <span className="required"> </span>
                          </Label>
                          <Input type="text" name="login" onChange={handleInputs} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="8">
                        <FormGroup>
                          <Label>
                            {' '}
                            password<span className="required"> </span>
                          </Label>
                          <Input type="text" name="password" onChange={handleInputs} />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      onClick={() => {
                        insertAttendance();
                      }}
                      type="button"
                      className="btn btn-success mr-2"
                    >
                      submit
                    </Button>
                    <Button onClick={() => {}} type="button" className="btn btn-dark">
                      Cancel
                    </Button>
                  </div>
                </Row>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>

      {/* <ModalFooter>
          <Button
            size="sm"
            className="shadow-none"
            color="primary"
            type="button"
            onClick={() => {
              // editAttendance();
            }}
          >
            Submit
          </Button>
        </ModalFooter> */}
    </div>
  );
};
export default LoginDetails;
