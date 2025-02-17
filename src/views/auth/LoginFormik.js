import React from 'react';

import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody, Input } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import PropTypes from 'prop-types';
import { usePermify } from '@permify/react-role';
import AuthLogo from '../../layouts/logo/AuthLogo';
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';
// import {Dashboards} from '../../components/dashboard/classicDashboard';
import loginApi from '../../constants/api';
import message from '../../components/Message';

const LoginFormik = ({ setToken }) => {
  const { setUser } = usePermify();
  const getPermissions = (user) => {
    loginApi
      .post('/usergroup/getusergroupForLoginUser', { user_group_id: user.user_group_id })
      .then((res) => {
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
        localStorage.setItem('user', JSON.stringify(user));
        setToken('123');
        setUser({
          id: '1',
          roles: ['admin'],
          permissions: permissionArray,
        });
        window.location.reload()
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
  };

  const UserLogin = (value) => {
    loginApi
      .post('/api/backlogin', value)
      .then((res) => {
        if (res && res.data.status === '400') {
          alert('Invalid Username or Password');
        } else {
          getPermissions(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const initialValues = {
    email: 'admin@gmail.com',
    password: 'admin@123',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  return (
    <div className="loginBox">
      <LeftBg className="position-absolute left bottom-0" />
      <RightBg className="position-absolute end-0 top" />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
            <AuthLogo />
            <Card>
              <CardBody className="p-4 m-1">
                {/* <h5 className="mb-0">Login</h5>
                <small className="pb-4 d-block">
                  Do not have an account? <Link to="/auth/registerformik">Sign Up</Link>
                </small> */}
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    UserLogin(values);
                  }}
                  render={({ errors, touched }) => (
                    <Form>
                      <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Field
                          name="email"
                          type="text"
                          className={`form-control${
                            errors.email && touched.email ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Field
                          name="password"
                          type="password"
                          className={`form-control${
                            errors.password && touched.password ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup className="form-check d-flex" inline>
                        <Label check>
                          <Input type="checkbox" />
                          Remember me
                        </Label>
                        {/* <Link className="ms-auto text-decoration-none" to="/auth/forgotPwd">
                          <small>Forgot Pwd?</small>
                        </Link> */}
                      </FormGroup>
                      <FormGroup>
                        <Button type="submit" color="primary" className="me-2">
                          Login
                        </Button>
                      </FormGroup>
                    </Form>
                  )}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

LoginFormik.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default LoginFormik;