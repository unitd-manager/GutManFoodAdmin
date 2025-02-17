import React, { useState } from 'react';
import { Card,
    CardBody,
    CardTitle,Row,Col,Form,FormGroup,Label,Input,TabContent,TabPane,Nav, NavItem,NavLink,Button,Modal,
    ModalHeader,
    ModalBody,
    ModalFooter, } from 'reactstrap';
    import {ToastContainer} from 'react-toastify'
    import {  Link } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';

const ProjectEdit = () => {

    const [activeTab, setActiveTab] = useState('1');
    const [editCostingSummaryModel, setEditCostingSummaryModel] = useState(false);
    const [quotationsModal, setquotationsModal] = useState(false);
    const [attachmentModal, setAttachmentModal] = useState(false);
    const [viewLineModal, setViewLineModal] = useState(false);
    const [addContactModal, setAddContactModal] = useState(false);
    const [addCompanyModal, setAddCompanyModal] = useState(false);


    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
      };
    const editCostingSummaryToggle = () => {
      setEditCostingSummaryModel(!editCostingSummaryModel);
      };
      const quotationstoggle = () => {
        setquotationsModal(!quotationsModal);
      };
    const attachmentToggle = () => {
      setAttachmentModal(!attachmentModal);
      };
    const viewLineToggle = () => {
      setViewLineModal(!viewLineModal);
      };
    const addContactToggle = () => {
      setAddContactModal(!addContactModal);
    };
    const addCompanyToggle = () => {
      setAddCompanyModal(!addCompanyModal);
    };

    
  return (
    <>
    <BreadCrumbs />
      
             <Form >
                <FormGroup>
                <ComponentCard title="Key Details | Code: O-1045">
                    <Row>
                    <Col md="3">
                        <FormGroup>
                        <Label>Project <span className='required'> *</span></Label>
                        <Input  type="text" value="" name="title" />
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Ref No</Label>
                        <Input type="text"  value="" name="office_ref_no"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Company Name (OR) <Link to="" color="primary" onClick={addCompanyToggle.bind(null)}><b><u>Add New Company</u></b></Link></Label>
                        <Input type="select" value="" name="company_id">
                            <option value="" selected>Please Select</option>


<Modal isOpen={addCompanyModal} toggle={addCompanyToggle.bind(null)}>
      <ModalHeader toggle={addCompanyToggle.bind(null)}>New Opportunity</ModalHeader>
      <ModalBody>
        <Row>
        <Col md="12">
          <Card>
            <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
                New Company
            </CardTitle>
            <CardBody>
              <Form>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Company Name <span className='required'> *</span></Label>
                      <Input type="text" name="company_name" 
                     
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Website</Label>
                      <Input type="text" name="website"
                       
                       />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Main Phone <span className='required'> *</span></Label>
                      <Input type="text" name="phone" 
                      
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Main Fax</Label>
                      <Input type="text" name="fax"
                      
                     />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
            <CardBody className="bg-light">
              <CardTitle tag="h4" className="mb-0">
                Address
              </CardTitle>
            </CardBody>
            <CardBody>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label>Address 1</Label>
                    <Input type="text" name="address_street" placeholder=" " 
                    
                    />
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label>Address 2</Label>
                    <Input type="text" name="address_town" placeholder="" 
                      />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Post Code</Label>
                    <Input type="text" name="address_po_code" placeholder="" 
                    
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Country <span className='required'> *</span></Label>
                    <Input type="select" name="address_country" 
                    
                    >
                    <option value="" selected="selected">Please Select</option>
                    <option value="AF">Afghanistan</option>
                    <option value="AX">Aland Islands</option>
                    <option value="AL">Albania</option>
                    <option value="DZ">Algeria</option>
                    <option value="AS">American Samoa</option>
                    <option value="AD">Andorra</option>
                    <option value="AO">Angola</option>
                    <option value="AI">Anguilla</option>
                    <option value="A1">Anonymous Proxy</option>
                    <option value="AQ">Antarctica</option>
                    <option value="AG">Antigua and Barbuda</option>
                    <option value="AR">Argentina</option>
                    <option value="AM">Armenia</option>
                    <option value="AW">Aruba</option>
                    <option value="AP">Asia/Pacific Region</option>
                    <option value="AU">Australia</option>
                    <option value="AT">Austria</option>
                    <option value="AZ">Azerbaijan</option>
                    <option value="BS">Bahamas</option>
                    <option value="BH">Bahrain</option>
                    <option value="BD">Bangladesh</option>
                    <option value="BB">Barbados</option>
                    <option value="BY">Belarus</option>
                    <option value="BE">Belgium</option>
                    <option value="BZ">Belize</option>
                    <option value="BJ">Benin</option>
                    <option value="BM">Bermuda</option>
                    <option value="BT">Bhutan</option>
                    <option value="BO">Bolivia</option>
                    <option value="BA">Bosnia and Herzegovina</option>
                    <option value="BW">Botswana</option>
                    <option value="BV">Bouvet Island</option>
                    <option value="BR">Brazil</option>
                    <option value="IO">British Indian Ocean Territory</option>
                    <option value="BN">Brunei Darussalam</option>
                    <option value="BG">Bulgaria</option>
                    <option value="BF">Burkina Faso</option>
                    <option value="BI">Burundi</option>
                    <option value="KH">Cambodia</option>
                    <option value="CM">Cameroon</option>
                    <option value="CA">Canada</option>
                    <option value="CV">Cape Verde</option>
                    <option value="KY">Cayman Islands</option>
                    <option value="CF">Central African Republic</option>
                    <option value="TD">Chad</option>
                    <option value="CL">Chile</option>
                    <option value="CN">China</option>
                    <option value="CX">Christmas Island</option>
                    <option value="CC">Cocos (Keeling) Islands</option>
                    <option value="CO">Colombia</option>
                    <option value="KM">Comoros</option>
                    <option value="CG">Congo</option>
                    <option value="CD">Congo, The Democratic Republic of the</option>
                    <option value="CK">Cook Islands</option>
                    <option value="CR">Costa Rica</option>
                    <option value="CI">Cote dIvoire</option>
                    <option value="HR">Croatia</option>
                    <option value="CU">Cuba</option>
                    <option value="CY">Cyprus</option>
                    <option value="CZ">Czech Republic</option>
                    <option value="DK">Denmark</option>
                    <option value="DJ">Djibouti</option>
                    <option value="DM">Dominica</option>
                    <option value="DO">Dominican Republic</option>
                    <option value="EC">Ecuador</option>
                    <option value="EG">Egypt</option>
                    <option value="SV">El Salvador</option>
                    <option value="GQ">Equatorial Guinea</option>
                    <option value="ER">Eritrea</option>
                    <option value="EE">Estonia</option>
                    <option value="ET">Ethiopia</option>
                    <option value="EU">Europe</option>
                    <option value="FK">Falkland Islands (Malvinas)</option>
                    <option value="FO">Faroe Islands</option>
                    <option value="FJ">Fiji</option>
                    <option value="FI">Finland</option>
                    <option value="FR">France</option>
                    <option value="GF">French Guiana</option>
                    <option value="PF">French Polynesia</option>
                    <option value="TF">French Southern Territories</option>
                    <option value="GA">Gabon</option>
                    <option value="GM">Gambia</option>
                    <option value="GE">Georgia</option>
                    <option value="DE">Germany</option>
                    <option value="GH">Ghana</option>
                    <option value="GI">Gibraltar</option>
                    <option value="GR">Greece</option>
                    <option value="GL">Greenland</option>
                    <option value="GD">Grenada</option>
                    <option value="GP">Guadeloupe</option>
                    <option value="GU">Guam</option>
                    <option value="GT">Guatemala</option>
                    <option value="GG">Guernsey</option>
                    <option value="GN">Guinea</option>
                    <option value="GW">Guinea-Bissau</option>
                    <option value="GY">Guyana</option>
                    <option value="HT">Haiti</option>
                    <option value="HM">Heard Island and McDonald Islands</option>
                    <option value="VA">Holy See (Vatican City State)</option>
                    <option value="HN">Honduras</option>
                    <option value="HK">Hong Kong</option>
                    <option value="HU">Hungary</option>
                    <option value="IS">Iceland</option>
                    <option value="IN">India</option>
                    <option value="ID">Indonesia</option>
                    <option value="IR">Iran, Islamic Republic of</option>
                    <option value="IQ">Iraq</option>
                    <option value="IE">Ireland</option>
                    <option value="IM">Isle of Man</option>
                    <option value="IL">Israel</option>
                    <option value="IT">Italy</option>
                    <option value="JM">Jamaica</option>
                    <option value="JP">Japan</option>
                    <option value="JE">Jersey</option>
                    <option value="JO">Jordan</option>
                    <option value="KZ">Kazakhstan</option>
                    <option value="KE">Kenya</option>
                    <option value="KI">Kiribati</option>
                    <option value="KP">Korea, Democratic Peoples Republic of</option>
                    <option value="KR">Korea, Republic of</option>
                    <option value="KW">Kuwait</option>
                    <option value="KG">Kyrgyzstan</option>
                    <option value="LA">Lao Peoples Democratic Republic</option>
                    <option value="LV">Latvia</option>
                    <option value="LB">Lebanon</option>
                    <option value="LS">Lesotho</option>
                    <option value="LR">Liberia</option>
                    <option value="LY">Libyan Arab Jamahiriya</option>
                    <option value="LI">Liechtenstein</option>
                    <option value="LT">Lithuania</option>
                    <option value="LU">Luxembourg</option>
                    <option value="MO">Macao</option>
                    <option value="MK">Macedonia</option>
                    <option value="MG">Madagascar</option>
                    <option value="MW">Malawi</option>
                    <option value="MY">Malaysia</option>
                    <option value="MV">Maldives</option>
                    <option value="ML">Mali</option>
                    <option value="MT">Malta</option>
                    <option value="MH">Marshall Islands</option>
                    <option value="MQ">Martinique</option>
                    <option value="MR">Mauritania</option>
                    <option value="MU">Mauritius</option>
                    <option value="YT">Mayotte</option>
                    <option value="MX">Mexico</option>
                    <option value="FM">Micronesia, Federated States of</option>
                    <option value="MD">Moldova, Republic of</option>
                    <option value="MC">Monaco</option>
                    <option value="MN">Mongolia</option>
                    <option value="ME">Montenegro</option>
                    <option value="MS">Montserrat</option>
                    <option value="MA">Morocco</option>
                    <option value="MZ">Mozambique</option>
                    <option value="MM">Myanmar</option>
                    <option value="NA">Namibia</option>
                    <option value="NR">Nauru</option>
                    <option value="NP">Nepal</option>
                    <option value="NL">Netherlands</option>
                    <option value="AN">Netherlands Antilles</option>
                    <option value="NC">New Caledonia</option>
                    <option value="NZ">New Zealand</option>
                    <option value="NI">Nicaragua</option>
                    <option value="NE">Niger</option>
                    <option value="NG">Nigeria</option>
                    <option value="NU">Niue</option>
                    <option value="NF">Norfolk Island</option>
                    <option value="MP">Northern Mariana Islands</option>
                    <option value="NO">Norway</option>
                    <option value="OM">Oman</option>
                    <option value="PK">Pakistan</option>
                    <option value="PW">Palau</option>
                    <option value="PS">Palestinian Territory</option>
                    <option value="PA">Panama</option>
                    <option value="PG">Papua New Guinea</option>
                    <option value="PY">Paraguay</option>
                    <option value="PE">Peru</option>
                    <option value="PH">Philippines</option>
                    <option value="PN">Pitcairn</option>
                    <option value="PL">Poland</option>
                    <option value="PT">Portugal</option>
                    <option value="PR">Puerto Rico</option>
                    <option value="QA">Qatar</option>
                    <option value="RE">Reunion</option>
                    <option value="RO">Romania</option>
                    <option value="RU">Russian Federation</option>
                    <option value="RW">Rwanda</option>
                    <option value="SH">Saint Helena</option>
                    <option value="KN">Saint Kitts and Nevis</option>
                    <option value="LC">Saint Lucia</option>
                    <option value="PM">Saint Pierre and Miquelon</option>
                    <option value="VC">Saint Vincent and the Grenadines</option>
                    <option value="WS">Samoa</option>
                    <option value="SM">San Marino</option>
                    <option value="ST">Sao Tome and Principe</option>
                    <option value="A2">Satellite Provider</option>
                    <option value="SA">Saudi Arabia</option>
                    <option value="SN">Senegal</option>
                    <option value="RS">Serbia</option>
                    <option value="SC">Seychelles</option>
                    <option value="SL">Sierra Leone</option>
                    <option value="SG">Singapore</option>
                    <option value="SK">Slovakia</option>
                    <option value="SI">Slovenia</option>
                    <option value="SB">Solomon Islands</option>
                    <option value="SO">Somalia</option>
                    <option value="ZA">South Africa</option>
                    <option value="GS">South Georgia and the South Sandwich Islands</option>
                    <option value="ES">Spain</option>
                    <option value="LK">Sri Lanka</option>
                    <option value="SD">Sudan</option>
                    <option value="SR">Suriname</option>
                    <option value="SJ">Svalbard and Jan Mayen</option>
                    <option value="SZ">Swaziland</option>
                    <option value="SE">Sweden</option>
                    <option value="CH">Switzerland</option>
                    <option value="SY">Syrian Arab Republic</option>
                    <option value="TW">Taiwan</option>
                    <option value="TJ">Tajikistan</option>
                    <option value="TZ">Tanzania, United Republic of</option>
                    <option value="TH">Thailand</option>
                    <option value="TL">Timor-Leste</option>
                    <option value="TG">Togo</option>
                    <option value="TK">Tokelau</option>
                    <option value="TO">Tonga</option>
                    <option value="TT">Trinidad and Tobago</option>
                    <option value="TN">Tunisia</option>
                    <option value="TR">Turkey</option>
                    <option value="TM">Turkmenistan</option>
                    <option value="TC">Turks and Caicos Islands</option>
                    <option value="TV">Tuvalu</option>
                    <option value="UG">Uganda</option>
                    <option value="UA">Ukraine</option>
                    <option value="AE">United Arab Emirates</option>
                    <option value="GB">United Kingdom</option>
                    <option value="US">United States</option>
                    <option value="UM">United States Minor Outlying Islands</option>
                    <option value="UY">Uruguay</option>
                    <option value="UZ">Uzbekistan</option>
                    <option value="VU">Vanuatu</option>
                    <option value="VE">Venezuela</option>
                    <option value="VN">Vietnam</option>
                    <option value="VG">Virgin Islands, British</option>
                    <option value="VI">Virgin Islands, U.S.</option>
                    <option value="WF">Wallis and Futuna</option>
                    <option value="EH">Western Sahara</option>
                    <option value="YE">Yemen</option>
                    <option value="ZM">Zambia</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
            <CardBody>
              <Form>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Supplier Type</Label>
                      <Input type="select" name="supplier_type" 
                      
                      >
                        <option value="" selected="selected">Please Select</option>
                        <option value="2nd middle man">2nd middle man</option>
                        <option value="3rd middle man">3rd middle man</option>
                        <option value="Broker">Broker</option>
                        <option value="Retailer">Retailer</option>
                        <option value="Wholesaler">Wholesaler</option>
                    </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Industry</Label>
                      <Input type="select" name="industry" 
                      
                      >
                        <option value="" selected="selected">Please Select</option>
                        <option value="Creative">Creative</option>
                        <option value="Education">Education</option>
                        <option value="Financial">Financial</option>
                        <option value="Jewellery">Jewellery</option>
                        <option value="Legal">Legal</option>
                        <option value="Management">Management</option>
                        <option value="Media">Media</option>
                        <option value="Medical">Medical</option>
                        <option value="Money Exchange">Money Exchange</option>
                        <option value="Organisation">Organisation</option>
                        <option value="Others">Others</option>
                        <option value="Property">Property</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Retail b2b">Retail b2b</option>
                        <option value="Retail b2c">Retail b2c</option>
                        <option value="Service">Service</option>
                        <option value="Software">Software</option>
                        <option value="Technology">Technology</option>
                        <option value="Telecom">Telecom</option>
                        <option value="Trading">Trading</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Company Size</Label>
                      <Input type="select" name="company_size" 
                      
                      >
                        <option value="" selected="selected">Please Select</option>
                        <option value="Large">Large</option>
                        <option value="Medium">Medium</option>
                        <option value="Small">Small</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Company Source</Label>
                      <Input type="select" name="source" 
                     
                      >
                        <option value="" selected="selected">Please Select</option>
                        <option value="Agency">Agency</option>
                        <option value="Direct">Direct</option>
                        <option value="Referral">Referral</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
        </Row>  
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={addCompanyToggle.bind(null)}>
          Save & Continue
        </Button>
        <Button color="secondary" onClick={addCompanyToggle.bind(null)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal> 
                      </Input>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Contact (OR) <Link to="" color="primary" onClick={addContactToggle.bind(null)}><b><u>Add New Contact</u></b></Link> </Label>
                        <Input type="select"  value="" name="contact_id" >
                        <option value="" selected>Please Select</option>
                        
                        <Modal isOpen={addContactModal} toggle={addContactToggle.bind(null)}>
                          <ModalHeader toggle={addContactToggle.bind(null)}>New Contact</ModalHeader>
                          <ModalBody>
                            <Row>
                            <Col md="12">
                              <Card>
                                <CardBody>
                                  <Form>
                                    <Row>
                                    <Col md="12">
                                      <FormGroup>
                                        <Label>Title</Label>
                                        <Input type="select" name="source">
                                          <option value="" selected="selected">Please Select</option>
                                          <option value="Ms">Ms</option>
                                          <option value="Mr">Mr</option>
                                          <option value="Mrs">Mrs</option>
                                        </Input>
                                      </FormGroup>
                                    </Col>
                                      <Col md="12">
                                        <FormGroup>
                                          <Label>Name</Label>
                                          <Input type="text" />
                                        </FormGroup>
                                      </Col>
                                      <Col md="12">
                                        <FormGroup>
                                          <Label>Email</Label>
                                          <Input type="text" />
                                        </FormGroup>
                                      </Col>
                                      <Col md="12">
                                        <FormGroup>
                                          <Label>Position</Label>
                                          <Input type="text" />
                                        </FormGroup>
                                      </Col>
                                      <Col md="12">
                                        <FormGroup>
                                          <Label>Department</Label>
                                          <Input type="text" />
                                        </FormGroup>
                                      </Col>
                                      <Col md="12">
                                        <FormGroup>
                                          <Label>Phone (Direct)</Label>
                                          <Input type="text" />
                                        </FormGroup>
                                      </Col>
                                      <Col md="12">
                                        <FormGroup>
                                          <Label>Fax (Direct)</Label>
                                          <Input type="text" />
                                        </FormGroup>
                                      </Col>
                                      <Col md="12">
                                        <FormGroup>
                                          <Label>Mobile</Label>
                                          <Input type="text" />
                                        </FormGroup>
                                      </Col>
                                      
                                    </Row>
                                  </Form>
                                </CardBody>
                              </Card>
                            </Col>
                            </Row>  
                          </ModalBody>
                          <ModalFooter>
                            <Button color="primary" onClick={addContactToggle.bind(null)}>
                              Submit
                            </Button>
                            <Button color="secondary" onClick={addContactToggle.bind(null)}>
                              Cancel
                            </Button>
                          </ModalFooter>
                        </Modal>

                    </Input>
                        </FormGroup>
                    </Col>
                    </Row>
              
                    <Row>
                    
                    <Col md="3">
                        <FormGroup>
                        <Label>Mode of submission</Label>
                        <Input type="text" value=""  name="mode_of_submission" />
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Services</Label>
                        <Input type="text"  value="" name="services"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Project Start Date</Label>
                            <Input type="date"  value="" name="site_show_date"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Project End Date</Label>
                        <Input value="" type="date" 
                         name="project_end_date" />
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    
                    <Col md="3">
                        <FormGroup>
                        <Label>Project Incharge</Label>
                        <Input type="select" value=""  name="site_show_attendee">
                            <option value="" selected="selected">Please Select</option>
                           
                         </Input>

                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Actual Submission Date</Label>
                        <Input type="date" value=""  name="actual_submission_date"/>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label> Status <span className='required'> *</span></Label>
                        <Input value="" type="select"  name="status">
                            <option value="">Please Select</option><option value="In Progress">In Progress</option>
                            <option value="Waiting for Approval">Waiting for Approval</option>
                            <option value="Submitted">Submitted</option>
                            <option value="Follow-up">Follow-up</option>
                            <option value="Awarded">Awarded</option>
                            <option value="Not Awarded">Not Awarded</option>
                            <option value="Enquiry">Enquiry</option>
                            <option value="Cancelled">Cancelled</option>
                            <option selected="selected" value="Converted to Project">Converted to Project</option>
                        </Input>

                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup>
                        <Label>Email</Label>
                        <Input type="text" value=""  name="email"/>
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col md="3">
                        <FormGroup>
                        <Label>Price</Label>
                        <Input  type="text" value="" name="price">
                            
                        </Input>
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                        <Button type="button" className="btn btn-success mr-2">
                        Save & Continue
                        </Button>
                        <Button type="submit" className="btn btn-dark">
                        Cancel
                        </Button>
                     </div>
                    </Row>
                </ComponentCard>
                </FormGroup> 
              </Form>

  <ComponentCard title="More Details">
    <ToastContainer></ToastContainer>

    <Modal isOpen={editCostingSummaryModel} toggle={editCostingSummaryToggle.bind(null)}>
      <ModalHeader toggle={editCostingSummaryToggle.bind(null)}>Edit Costing Summary</ModalHeader>
      <ModalBody>
        <Row>
        <Col md="12">
          <Card>
            <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
              Edit Costing Summary
            </CardTitle>
            <CardBody>
              <Form>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label>No. of Worker Used</Label>
                      <Input type="text" value=""/>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>No. of Days Worked</Label>
                      <Input type="text"  />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Labout Rates Per Day</Label>
                      <Input type="text"  />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Total Price (S$ W/o GST)</Label>
                      <Input type="text"  />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Profit Margin %</Label>
                      <Input type="text"  />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Profit Margin</Label>
                      <Input type="text" name="profit" class="text" id="fld_profit" value="39909998.00" tabindex="-1"/>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
            <CardBody className="bg-light">
              <CardTitle tag="h4" className="mb-0">
                
              </CardTitle>
            </CardBody>
            <CardBody>
              <Row>
              <Col md="3">
                <FormGroup>
                    <Label>Total Material</Label>
                    <Input type="text"/>
                </FormGroup>
                </Col>
                <Col md="3">
                <FormGroup>
                    <Label>Transport Charges %</Label>
                    <Input type="text"/>
                </FormGroup>
                </Col>
                <Col md="3">
                <FormGroup>
                    <Label>Transport Charges </Label>
                    <Input type="text" />
                </FormGroup>
                </Col>
                <Col md="3">
                <FormGroup>
                    <Label>Total Labour Charges</Label>
                    <Input type="text" />
                </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                    <Label>Salesman Commission %</Label>
                    <Input type="text"/>
                </FormGroup>
                </Col>
                <Col md="3">
                <FormGroup>
                    <Label>Salesman Commission </Label>
                    <Input type="text"/>
                </FormGroup>
                </Col>
                <Col md="3">
                <FormGroup>
                    <Label>Finance Charges % </Label>
                    <Input type="text" />
                </FormGroup>
                </Col>
                <Col md="3">
                <FormGroup>
                    <Label>Finance Charges </Label>
                    <Input type="text" />
                </FormGroup>
                </Col>
              </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                    <Label>Office Overheads %</Label>
                    <Input type="text"/>
                </FormGroup>
                </Col>
                <Col md="3">
                <FormGroup>
                    <Label>Office Overheads </Label>
                    <Input type="text"/>
                </FormGroup>
                </Col>
                <Col md="3">
                <FormGroup>
                    <Label>Other Charges </Label>
                    <Input type="text" />
                </FormGroup>
                </Col>
                <Col md="3">
                <FormGroup>
                    <Label>TOTAL COST</Label>
                    <Input type="text" />
                </FormGroup>
                </Col>
              </Row>
            </CardBody>
            <CardBody>
            <CardTitle className="mb-0 bg-light">
             
              </CardTitle>
              <Form>

                 <Row>
                    <Col><FormGroup><Label>Materials</Label> </FormGroup></Col>
                    <Col><FormGroup><Label>Supplier</Label> </FormGroup></Col>
                    <Col><FormGroup><Label>Sub-Con</Label> </FormGroup></Col>
                   <Col md="1"><FormGroup><Label>UoM</Label> </FormGroup></Col>
                    <Col md="1"><FormGroup><Label>Qty</Label> </FormGroup></Col>
                    <Col><FormGroup><Label>Unit Price</Label> </FormGroup></Col>
                    <Col><FormGroup><Label>Total Cost</Label> </FormGroup></Col>
            </Row>
                <Row>
                  <Col>
                    <FormGroup><Input type="text" value="BRICKS"/></FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input type="select" name="Select Category">
                          <option value="">Select</option>
                          <option selected="selected" value="1">ABC Supplier</option>
                          <option value="2">Supplier 2</option>
                          <option value="3">ABC New company Pte Ltd</option>
                          <option value="4">XYZ Factory</option>
                          <option value="5">Materials Supplier</option>
                          <option value="6">XYZ ENGINEERING PRIVATE LTD</option>
                          <option value="7">Kate Williams</option>
                          <option value="8">Xac Pte Ltd</option>
                          <option value="9">Jing Shaw Pte Ltd</option>
                          <option value="10">RAM SAND</option>
                          <option value="11">abcd</option>
                          <option value="12">pqrs</option>
                          <option value="13">Philips Boon</option>
                          <option value="14">DK Pte Ltd</option>
                          <option value="15">raj har</option>
                          <option value="16">New Frame Tech Ltd</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input type="text" placeholder='Please type and select'/>
                    </FormGroup>
                  </Col>
                  <Col md="1">
                    <FormGroup>
                      <Input type="text" placeholder=''/>
                    </FormGroup>
                  </Col>
                  <Col md="1">
                    <FormGroup>
                      <Input type="text" placeholder=''/>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input type="text" placeholder='' value="2.00"/>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Input type="text" placeholder='' value="2.00"/>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
        </Row>  
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={editCostingSummaryToggle.bind(null)}>
          Submit
        </Button>
        <Button color="secondary" onClick={editCostingSummaryToggle.bind(null)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal> 


    <Modal isOpen={quotationsModal} toggle={quotationstoggle.bind(null)}>
      <ModalHeader toggle={quotationstoggle.bind(null)}>Quote History</ModalHeader>
      <ModalBody>
        <Row>
        <Col md="12">
          <Card>
            <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
              Quote History
            </CardTitle>
            <CardBody>
             
            </CardBody>
          </Card>
        </Col>
        </Row>  
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={quotationstoggle.bind(null)}>
          Submit
        </Button>
        <Button color="secondary" onClick={quotationstoggle.bind(null)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal> 


        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => {
                toggle('1');
              }}
            >
              Costing Summary
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => {
                toggle('2');
              }}
            >
              Quotations
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '3' ? 'active' : ''}
              onClick={() => {
                toggle('3');
              }}
            >
              Attachment
            </NavLink>
          </NavItem>
        
        </Nav>
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col md="12" className='mb-4'>
                  <Button color="primary">Edit Costing Summary</Button>
              </Col>
            </Row>
            <Row>
              <Col md="3"><FormGroup><h3>Costing Summary</h3> </FormGroup></Col>
              <Col md="3"><FormGroup><Label>Total Cost : test</Label> </FormGroup></Col>
              <Col md="3"><FormGroup><Label>PO Price (S$ W/o GST) : test</Label> </FormGroup></Col>
              <Col md="3"><FormGroup><Label>Profit Margin : test %</Label> </FormGroup></Col>
            </Row>
            <hr/>
            <Row>
            <Col md="3">
                <FormGroup>
                <Label>Total Material</Label>
                <br/>
                <span>test</span>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Transport Charges</Label>
                <br/>
                <span>test</span>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Total Labour Charges</Label>
                <br/>
                <span>test</span>
                </FormGroup>
            </Col>
           
            <Col md="3">
                <FormGroup>
                <Label>Salesman Commission</Label>
                <br/>
                <span>test</span>
                </FormGroup>
            </Col>
            </Row>
            <br/>
            <Row>
            <Col md="3">
                <FormGroup>
                <Label> Finance Charges </Label>
                <br/>
                <span>test</span>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Office Overheads</Label>
                <br/>
                <span>test</span>
                </FormGroup>
            </Col>
            <Col md="3">
                <FormGroup>
                <Label>Other Charges</Label>
                <br/>
                <span>test</span>
                </FormGroup>
            </Col>
           
            <Col md="3">
                <FormGroup>
                <Label> TOTAL COST </Label>
                <br/>
                <span>test</span>
                </FormGroup>
            </Col>
            </Row>
          </TabPane>
          
          <TabPane tabId="2">

              <Row>
                  <Col md="3" className='mb-4 d-flex justify-content-between'>
                    <h3>Quotations </h3> 
                    <Button color="primary" onClick={quotationstoggle.bind(null)}>View Quote Log</Button>
                  </Col>
              </Row>


            <Form>
                <Row>
                  <Col><FormGroup><Label>Revision</Label> </FormGroup></Col>
                  <Col><FormGroup><Label>Quote Code</Label> </FormGroup></Col>
                  <Col><FormGroup><Label>Quote Date</Label> </FormGroup></Col>
                  <Col><FormGroup><Label>Quote Status</Label> </FormGroup></Col>
                  <Col md="1"><FormGroup><Label>Discount</Label> </FormGroup></Col>
                  <Col md="1"><FormGroup><Label>Amount</Label> </FormGroup></Col>
                  <Col><FormGroup><Label></Label> </FormGroup></Col>
                  <Col><FormGroup><Label>Action</Label> </FormGroup></Col>
                </Row>
                <Row>
                <Col>
                  <FormGroup></FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                      <span>test</span>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                      <Label>test</Label>
                  </FormGroup>
                </Col>
                <Col >
                  <FormGroup>
                      <Label>test</Label>
                  </FormGroup>
                </Col>
                <Col md="1">
                  <FormGroup>
                      <Label>test</Label>
                  </FormGroup>
                </Col>
                <Col md="1">
                  <FormGroup>
                      <Label>test</Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                      <Label><u>View Line Items</u></Label>

                      <Modal isOpen={viewLineModal} toggle={viewLineToggle.bind(null)}>
                            <ModalHeader toggle={viewLineToggle.bind(null)}>Line Items</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                <table className='lineitem'>
                                  
                                  <thead>
                                    <tr>
                                      <th scope="col">Title	</th>
                                      <th scope="col">Description	</th>
                                      <th scope="col">Qty</th>
                                      <th scope="col">Unit Price</th>
                                      <th scope="col">Amount</th>
                                      <th scope="col">Updated By</th>
                                      <th scope="col">Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {/* {lineItem && lineItem.map((e)=>{
                                      return(
                                        <tr>
                                            <td data-label="Title">{e.title}</td>
                                            <td data-label="Description">{e.description}</td>
                                            <td data-label="Qty">{e.quantity}</td>
                                            <td data-label="Unit Price">{e.unit_price}</td>
                                            <td data-label="Amount">{e.amount}</td>
                                            <td data-label="Updated By">{e.created_by}</td>
                                            <td data-label="Action"></td>
                                        </tr>
                                      )
                                        
                                    })} */}
                                   
                                  </tbody>
                                </table>
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={viewLineToggle.bind(null)}>Submit</Button>
                            </ModalFooter>
                        </Modal>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Generate Pdf</Label>
                  </FormGroup>
                </Col>
                </Row>
            </Form>
      </TabPane>


      <TabPane tabId="3">
                <Row>
                <Col xs="12" md="3">
                    <ComponentCard title="Attachments">
                        <Button color="primary" onClick={attachmentToggle.bind(null)}>
                            Add
                        </Button>
                        <Modal isOpen={attachmentModal} toggle={attachmentToggle.bind(null)}>
                            <ModalHeader toggle={attachmentToggle.bind(null)}>Upload Media</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label htmlFor="exampleFile">Select Files</Label>
                                    <Input type="file" placeholder="" />
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={attachmentToggle.bind(null)}>Upload</Button>
                            </ModalFooter>
                        </Modal>
                    </ComponentCard>
                </Col>
                </Row>
               
          </TabPane>
          
        </TabContent>
      </ComponentCard>
    </>
  )
};

export default ProjectEdit;