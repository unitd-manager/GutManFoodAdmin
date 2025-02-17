import React,{ useState } from 'react';
import { Row,Col,FormGroup,Input,Button,Modal,ModalHeader,ModalBody,Label,Form} from 'reactstrap';
// import { Editor } from 'react-draft-wysiwyg';
import PropTypes from 'prop-types'
//import { useParams } from 'react-router-dom';
// import message from '../Message';
// import api from '../../constants/api';
import ComponentCard from '../ComponentCard';


function EditQuote({editQuoteModal, setEditQuoteModal,
    quoteDate,
    quoteCode,
    quoteStatus,
    projectLocation,
    projectReference,
    paymentMethod,
    revision,
    // introDrawingQuote,
    // condition,
}) 

{

    EditQuote.propTypes = {
        editQuoteModal: PropTypes.bool,
        setEditQuoteModal: PropTypes.func,
        quoteDate: PropTypes.string,
        quoteCode: PropTypes.string,
        quoteStatus: PropTypes.string,
        projectLocation: PropTypes.string,
        projectReference: PropTypes.string,
        paymentMethod: PropTypes.string,
        revision: PropTypes.string,
        // introDrawingQuote: PropTypes.string,
        // condition: PropTypes.string,
      }

    //   Get Quote Edited Value

    const [quoteData, setQuoteData] = useState({
        quote_date:"",
        quote_code:"",
        quote_status:"",
        project_location:"",
        project_reference:"",
        payment_method:"",
        revision:"",
        intro_drawing_quote:"",
      });

      const handleData = (e) => {
        console.log(setQuoteData({...quoteData, [e.target.name]:e.target.value}))
        //setQuoteData({...quoteData, [e.target.name]:e.target.value});
      }

    const GetEditQuote = () => {

        console.log(quoteData)

        // api.post('/tender/edit-TabQuote',{id})
        // .then((res)=> {
        //   console.log(res.data.data)
        // })
    }
    

  return (
    <>
     {/*  Edit Quote Modal */}
     <Modal isOpen={editQuoteModal}>
        <ModalHeader>Edit Quote </ModalHeader>
        <ModalBody>
            <FormGroup>
                <Form>
                    <FormGroup>
                    <ComponentCard >
                        <Row>
                        <Col md="3">
                            <FormGroup>
                            <Label>Quote Date</Label>
                            <Input type="date" name="quote_date" value={quoteDate} onChange={handleData}/>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                            <Label>Quote Code</Label>
                            <Input type="text" name='quote_code' value={quoteCode} onChange={handleData}/>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                            <Label>Quote Status</Label>
                            <Input type="select" name="quote_status" value={quoteStatus} onChange={handleData}>
                            <option selected="selected" value="New">New</option>
                            <option value="Quoted">Quoted</option>
                            <option value="Awarded">Awarded</option>
                            <option value="Not Awarded">Not Awarded</option>
                            <option value="Cancelled">Cancelled</option>
                            </Input>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                            <Label>Project Location</Label>
                            <Input type="text" name="project_location" value={projectLocation} onChange={handleData}/>
                            </FormGroup>
                        </Col>
                        </Row>
                        
                        <Row>
                        <Col md="3">
                            <FormGroup>
                            <Label>Project Reference</Label>
                                <Input type="text" name="project_reference" value={projectReference} onChange={handleData}/>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                            <Label>Mode of Payment</Label>
                            <Input type="select" name="payment_method" value={paymentMethod} onChange={handleData}>
                                <option value="">Please Select</option><option value="15 days">15 days</option>
                                <option selected="selected" value="30 days">30 days</option>
                                <option value="60 days">60 days</option>
                                <option value="COD">COD</option>
                            </Input>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                            <Label>Quote Revision</Label>
                                <Input type="text" name="revision" value={revision} onChange={handleData}/>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                        <Label>Show Project Manager</Label>
                            <FormGroup check>
                            <Input name="radio1" type="radio" />{' '}
                            <Label check>Yes</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input name="radio1" type="radio"/>{' '}
                                <Label check> No </Label>
                            </FormGroup>
                        </Col>
                        </Row>
                        <Row>
                        <Label>Intro Line Items</Label>
                        </Row>
                        {/* <Editor
                            wrapperClassName="demo-wrapper mb-0"
                            editorClassName="demo-editor border mb-4 edi-height"
                            name="intro_drawing_quote"
                            value={introDrawingQuote}
                            onChange={handleData}
                        /> */}
                        <Row>
                        <Label>Terms & Condition</Label>
                        </Row>
                        {/* <Editor
                            wrapperClassName="demo-wrapper mb-0"
                            editorClassName="demo-editor border mb-4 edi-height"
                            name="terms_condition"
                            value={condition}
                        /> */}

                        <Row>
                        <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                            <Button type="submit" className="btn btn-success mr-2" onClick={GetEditQuote}>
                            Save & Continue
                            </Button>
                            <Button color="secondary" onClick={()=>{setEditQuoteModal(false) }}>Cancel</Button>
                        </div>
                        </Row>

                    </ComponentCard>
                    </FormGroup> 
                </Form>
            </FormGroup>
        </ModalBody>
    </Modal>
    {/* END Edit Quote Modal */}

</>
  )
}

export default EditQuote