import React from "react";
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';


const ref = React.createRef();

export default function GeneratePdf() {
  return (
    <div className="App">
      <div style={{ marginBottom: 10 }}></div>

      {/* <div className="element-to-print" ref={ref}> */}

      <div className="element-to-print" style={{  width:785 }} ref={ref}>

<Row>
{/* <Pdf targetRef={ref} filename="cenaze-yardimlasma.pdf">
        {({ toPdf }) => (
          <button type="button" className="button" onClick={toPdf}>
            Pdf İndir
          </button>
        )}
      </Pdf> */}
</Row>

<div className="page">

    <Row>
      <Col>
    
        <Card>
          <CardTitle tag="h4" className="border-bottom p-3 mb-0">
            Form Example
          </CardTitle>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="with a placeholder"
                  type="email"
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  id="examplePassword"
                  name="password"
                  placeholder="password placeholder"
                  type="password"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Select</Label>
                <Input id="exampleSelect" name="select" type="select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelectMulti">Select Multiple</Label>
                <Input id="exampleSelectMulti" multiple name="selectMulti" type="select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="exampleText">Text Area</Label>
                <Input id="exampleText" name="text" type="textarea" />
              </FormGroup>
              <FormGroup>
                <Label for="exampleFile">File</Label>
                <Input id="exampleFile" name="file" type="file" />
                <FormText>
                  This is some placeholder block-level help text for the above input. Its a bit
                  lighter and easily wraps to a new line.
                </FormText>
              </FormGroup>
              <FormGroup tag="fieldset">
                <legend>Radio Buttons</legend>
                <FormGroup check>
                  <Input name="radio1" type="radio" />{' '}
                  <Label check>Option one is this and that—be sure to include why its great</Label>
                </FormGroup>
                <FormGroup check>
                  <Input name="radio1" type="radio" />{' '}
                  <Label check>
                    Option two can be something else and selecting it will deselect option one
                  </Label>
                </FormGroup>
                <FormGroup check disabled>
                  <Input disabled name="radio1" type="radio" />{' '}
                  <Label check>Option three is disabled</Label>
                </FormGroup>
              </FormGroup>
              <FormGroup check>
                <Input type="checkbox" /> <Label check>Check me out</Label>
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </div>
  <div className="page">

    <Row>
      <Col>
    
        <Card>
          <CardTitle tag="h4" className="border-bottom p-3 mb-0">
            Form Example
          </CardTitle>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="with a placeholder"
                  type="email"
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  id="examplePassword"
                  name="password"
                  placeholder="password placeholder"
                  type="password"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Select</Label>
                <Input id="exampleSelect" name="select" type="select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelectMulti">Select Multiple</Label>
                <Input id="exampleSelectMulti" multiple name="selectMulti" type="select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="exampleText">Text Area</Label>
                <Input id="exampleText" name="text" type="textarea" />
              </FormGroup>
              <FormGroup>
                <Label for="exampleFile">File</Label>
                <Input id="exampleFile" name="file" type="file" />
                <FormText>
                  This is some placeholder block-level help text for the above input. Its a bit
                  lighter and easily wraps to a new line.
                </FormText>
              </FormGroup>
              <FormGroup tag="fieldset">
                <legend>Radio Buttons</legend>
                <FormGroup check>
                  <Input name="radio1" type="radio" />{' '}
                  <Label check>Option one is this and that—be sure to include why its great</Label>
                </FormGroup>
                <FormGroup check>
                  <Input name="radio1" type="radio" />{' '}
                  <Label check>
                    Option two can be something else and selecting it will deselect option one
                  </Label>
                </FormGroup>
                <FormGroup check disabled>
                  <Input disabled name="radio1" type="radio" />{' '}
                  <Label check>Option three is disabled</Label>
                </FormGroup>
              </FormGroup>
              <FormGroup check>
                <Input type="checkbox" /> <Label check>Check me out</Label>
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
</div>
   
      {/* <div className="page">
        <MDBContainer className="py-5">
        <MDBCard className="p-4">
          <MDBCardBody>
            <MDBContainer className="mb-2 mt-3">
              <MDBRow>
                <MDBCol xl="4" lg="12">
                  <MDBIcon
                      far
                      icon="building"
                      color="danger"
                      size="6x"
                      className="float-start"
                      />
                  </MDBCol>
                  <MDBCol xl="4"><h2 className="text-center">Cubosale Pte Ltd</h2></MDBCol>
                  <MDBCol xl="4">
                  <MDBTypography listUnStyled className="float-end">

                  <Pdf targetRef={ref} filename="cenaze-yardimlasma.pdf">
                    {({ toPdf }) => (

                  <MDBBtn
                    color="light"
                    ripple="dark"
                    className="text-capitalize border-0 ms-2"
                    onClick={toPdf}
                  >
                    <MDBIcon
                      far
                      icon="file-pdf"
                      color="danger"
                      className="me-1"
                    />
                    Export
                  </MDBBtn>
                  )}
                </Pdf>

                  </MDBTypography>
                </MDBCol>
              </MDBRow>
            </MDBContainer>


            <MDBContainer className="mb-2 mt-3">
              <MDBRow>
                <MDBCol xl="4">
                  <p style={{ color: "#7e8d9f", fontSize: "20px" }} className="float-start">
                  Reg No &gt; &gt; <strong>ID: #123-123</strong>
                  </p> 
                  </MDBCol>
                  <MDBCol xl="4"><p className="pt-0 text-center">QUOTATION</p></MDBCol>
                  <MDBCol xl="4">
                  <MDBTypography listUnStyled className="float-end">
                   
                    <li>123, Elm Street</li>
                    <li>123-456-789</li>
                    <li>mail@mail.com</li>
                  </MDBTypography>
                </MDBCol>
              </MDBRow>
              <hr/>
            </MDBContainer>


            <MDBContainer className="mt-5">
              <MDBCol md="12" className="text-center">
               
              </MDBCol>
            </MDBContainer>

            <MDBRow>
              <MDBCol xl="8">
                <MDBTypography listUnStyled>
                  <li className="text-muted">
                    To: <span style={{ color: "#5d9fc5" }}>John Lorem</span>
                  </li>
                  <li className="text-muted">Street, City</li>
                  <li className="text-muted">State, Country</li>
                  <li className="text-muted">
                    <MDBIcon fas icon="phone-alt" /> 123-456-789
                  </li>
                </MDBTypography>
              </MDBCol>
              <MDBCol xl="4">
                <p className="text-muted">Invoice</p>
                <MDBTypography listUnStyled>
                  <li className="text-muted">
                    <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                    <span className="fw-bold ms-1">ID:</span>#123-456
                  </li>
                  <li className="text-muted">
                    <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                    <span className="fw-bold ms-1">Creation Date: </span>Jun
                    23,2021
                  </li>
                  <li className="text-muted">
                    <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                    <span className="fw-bold ms-1">Status:</span>
                    <span className="badge bg-warning text-black fw-bold ms-1">
                      Unpaid
                    </span>
                  </li>
                </MDBTypography>
              </MDBCol>
            </MDBRow>
            <MDBRow className="my-2 mx-1 justify-content-center">
              <MDBTable striped borderless>
                <MDBTableHead
                  className="text-white"
                  style={{ backgroundColor: "#84B0CA" }}
                >
                  <tr>
                    <th scope="col">Sn</th>
                    <th scope="col">Description</th>
                    <th scope="col">EA</th>
                    <th scope="col">Qty</th>
                    <th scope="col">U/R(S$)</th>
                    <th scope="col"> Amt(S$)</th>
                    <th scope="col">Remarks</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Pro Package</td>
                    <td></td>
                    <td>4</td>
                    <td>$200</td>
                    <td>$800</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Web hosting</td>
                    <td></td>
                    <td>1</td>
                    <td>$10</td>
                    <td>$10</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Consulting</td>
                    <td></td>
                    <td>1 year</td>
                    <td>$300</td>
                    <td>$300</td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </MDBRow>
            <MDBRow>
            <MDBCol xl="8" ></MDBCol>
              <MDBCol xl="4" >
                <MDBTypography listUnStyled>
                  <li className="text-muted ms-3">
                    <span className="text-black me-4">SubTotal</span>$1110
                  </li>
                  <li className="text-muted ms-3 mt-2">
                    <span className="text-black me-4">Tax(15%)</span>$111
                  </li>
                </MDBTypography>
                <p className="text-black float-start">
                  <span className="text-black me-3"> Total Amount</span>
                  <span style={{ fontSize: "25px" }}>$1221</span>
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow>
            <MDBCol xl="12">
                <p className="ms-3">  Terms and Condition:- </p>
                <MDBTypography listUnStyled>
                  <li className="text-muted">
                    <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                    <span className="fw-bold ms-1"> Payment : </span> COD
                  </li>
                  <li className="text-muted">
                    <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                    <span className="fw-bold ms-1"></span> The above quote does not cover replacement of any parts unless expressly stated above.
                  </li>
                  <li className="text-muted">
                    <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                    <span className="fw-bold ms-1"></span> We reserve the right to terminate any scope of work in event where there is a default to our Payment Schedule.
                  </li>
                </MDBTypography>
              
              </MDBCol>
            </MDBRow>
            <hr />
            <MDBRow>
              <MDBCol xl="10">
                <p>Thank You Very Much for your Business!</p>
              </MDBCol>
              <MDBCol xl="2">
                <MDBBtn
                  className="text-capitalize"
                  style={{ backgroundColor: "#60bdf3" }}
                >
                  Pay Now
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
        </MDBContainer>
    </div> */}
      </div>
      
    </div>
  );
}

// export default GeneratePdf
