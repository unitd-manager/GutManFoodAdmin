import React,{ useState, useEffect } from 'react';
import { Row,Col,FormGroup,Input,Button,Modal,ModalHeader,ModalBody,Label,Form} from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import PropTypes from 'prop-types'
// import message from '../Message';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {EditorState, convertToRaw, ContentState } from 'draft-js';
import api from '../../constants/api';
import message from '../Message';

const ComponentCard = React.lazy(() => import('../ComponentCard'))

const EditQuoteModal = ({editQuoteModal,setEditQuoteModal,existingQuote}) => 

{
    EditQuoteModal.propTypes = {
        editQuoteModal: PropTypes.bool,
        setEditQuoteModal: PropTypes.func,
        existingQuote: PropTypes.object,
      }

    //   Get Quote Edited Value
    const [quoteData, setQuoteData] = useState(existingQuote);
    const [conditions, setConditions] = useState('')
    const [lineItem, setLineItem] = useState('')

      const handleData = (e) => {
        setQuoteData({...quoteData, [e.target.name]:e.target.value});
      }
     
    const GetEditQuote = () => {

        api.post('/tender/edit-TabQuote',quoteData)
        .then((res)=> {
          console.log('edit quote',res.data.data)
            message('Quote Edited Successfully.','success')
            window.location.reload()
        }).catch(()=>{
            message('Unable to edit quote. please fill all fields','error')
        })
    }

    const handleDataEditor = (e,type) =>{
        
            setQuoteData({...quoteData, [type]:draftToHtml(convertToRaw(e.getCurrentContent()))});

    }

    const convertHtmlToDraftcondition = (existingQuoteformal) =>{
        if(existingQuoteformal && existingQuoteformal.quote_condition){
            const contentBlock = htmlToDraft(existingQuoteformal && existingQuoteformal.quote_condition);
            if (contentBlock) {
              const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
              const editorState = EditorState.createWithContent(contentState);
              setConditions(editorState)
            }
        } 
    }


    const convertHtmlToDraft = (existingQuoteformal) =>{
        if(existingQuoteformal && existingQuoteformal.intro_drawing_quote){
            const contentBlock = htmlToDraft(existingQuoteformal && existingQuoteformal.intro_drawing_quote);
            if (contentBlock) {
              const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
              const editorState = EditorState.createWithContent(contentState);
              setLineItem(editorState)
            }
        }
    }

    useEffect(() => {
        setQuoteData(existingQuote)
        convertHtmlToDraftcondition(existingQuote)
        convertHtmlToDraft(existingQuote)
    }, [existingQuote])
    
    
  return (
    <>
     {/*  Edit Quote Modal */}
     <Modal size="lg" isOpen={editQuoteModal}>
        <ModalHeader>Edit Quote 
        <Button color="secondary" onClick={()=>{setEditQuoteModal(false) }}>X</Button>
        </ModalHeader>
        <ModalBody>
            <FormGroup>
                <Form>
                    <FormGroup>
                    <ComponentCard >
                        <Row>
                        <Col md="3">
                            <FormGroup>
                            <Label>Quote Date</Label>
                            <Input type="date" name="quote_date" defaultValue={quoteData && quoteData.quote_date} onChange={handleData}/>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                            <Label>Quote Code</Label>
                            <Input type="text" name='quote_code' defaultValue={quoteData && quoteData.quote_code} onChange={handleData}/>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                            <Label>Quote Status</Label>
                            <Input type="select" name="quote_status" defaultValue={quoteData && quoteData.quote_status} onChange={handleData}>
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
                            <Input type="text" name="project_location" defaultValue={quoteData && quoteData.project_location} onChange={handleData}/>
                            </FormGroup>
                        </Col>
                        </Row>
                        
                        <Row>
                        <Col md="3">
                            <FormGroup>
                            <Label>Project Reference</Label>
                                <Input type="text" name="project_reference" defaultValue={quoteData && quoteData.project_reference} onChange={handleData}/>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                            <Label>Mode of Payment</Label>
                            <Input type="select" name="payment_method" defaultValue={quoteData && quoteData.payment_method} onChange={handleData}>
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
                                <Input type="text" name="revision" defaultValue={quoteData && quoteData.revision} onChange={handleData}/>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                        <Label>Show Project Manager</Label>

                            <Form inline>
                                <div className="form-check form-check-inline">
                                <Input
                                    className="form-check-input"
                                    id="inlineradio1"
                                    type="radio"
                                    name="show_project_manager"
                                    value="1"
                                    defaultValue={quoteData && quoteData.show_project_manager} onChange={handleData}
                                />
                                <Label for="inlineradio1">yes</Label>
                                </div>
                                <div className="form-check form-check-inline">
                                <Input
                                    className="form-check-input"
                                    id="inlineradio2"
                                    type="radio"
                                    name="show_project_manager"
                                    value="0"
                                    defaultValue={quoteData && quoteData.show_project_manager} onChange={handleData}
                                />
                                <Label for="inlineradio2">No</Label>
                                </div>
                            </Form>
{/* <FormGroup check>
<Input name="show_project_manager" type="radio" value="1" defaultValue={quoteData && quoteData.show_project_manager} onChange={handleData}/>{' '}
<Label check>Yes</Label>
</FormGroup>
<FormGroup check>
    <Input name="show_project_manager" type="radio" value="0" defaultValue={quoteData && quoteData.show_project_manager} onChange={handleData}/>{' '}
    <Label check> No </Label>
</FormGroup> */}

                        </Col>
                        </Row>
                        <Row>
                        <Label>Intro Line Items</Label>
                        </Row>
                        <Editor
                            editorState={lineItem}
                            wrapperClassName="demo-wrapper mb-0"
                            editorClassName="demo-editor border mb-4 edi-height"
                            onEditorStateChange={(e)=>{
                                handleDataEditor(e,'intro_drawing_quote')
                                setLineItem(e)
                            }}
                        />
                        <Row>
                        <Label>Terms & Condition</Label>
                        </Row>
                        <Editor
                            editorState={conditions}
                            wrapperClassName="demo-wrapper mb-0"
                            editorClassName="demo-editor border mb-4 edi-height"
                            onEditorStateChange={(e)=>{
                                handleDataEditor(e,'quote_condition')
                                setConditions(e)
                            }}
                        />

                        <Row>
                        <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                            <Button type="button" color='primary' className="btn shadow-none mr-2" onClick={GetEditQuote}>
                            Save & Continue
                            </Button>
                            <Button color="secondary" className='shadow-none' onClick={()=>{setEditQuoteModal(false) }}>Cancel</Button>
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

export default EditQuoteModal
