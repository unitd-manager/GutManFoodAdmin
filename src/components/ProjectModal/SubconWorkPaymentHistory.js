import React,{useEffect,useState } from 'react'
import {CardTitle, Row,Col,Form,FormGroup,Label,Modal,ModalHeader,ModalFooter,ModalBody,Button, } from 'reactstrap';
// import { Link } from 'react-router-dom';
// import * as Icon from 'react-feather';
import PropTypes from 'prop-types'
import moment from 'moment';
import api from '../../constants/api';
import message from '../Message';



function SubconWorkPaymentHistory({workOrderPaymentHistory,setWorkOrderPaymentHistory,subCon}) {

    SubconWorkPaymentHistory.propTypes = {
        workOrderPaymentHistory: PropTypes.bool,
        setWorkOrderPaymentHistory: PropTypes.func,
        subCon: PropTypes.any
      }

     
      const [paymentHistoryData, setPaymentHistoryData ] = useState([]);


      const PaymentHistoryData = () => {
        api.post('/projecttabsubconworkorder/SubConPaymentHistory',{sub_con_work_order_id:subCon})
            .then((res) => {
            setPaymentHistoryData(res.data.data)
            })
            .catch(()=>{
            message(" SubCon Work Order Data not found","info")
            })    
    }

    useEffect(() => {
        
        PaymentHistoryData();

    },[])


  return (
    <> 
      <Modal size="lg" isOpen={workOrderPaymentHistory}>
        <ModalHeader>
          Work Order Details
          <Button
            color="secondary"
            onClick={() => {
                setWorkOrderPaymentHistory(false);
            }}
          >
            X
          </Button>
        </ModalHeader>
        <ModalBody>
         <Row className='mt-4'>
            <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white"> Payment History </CardTitle>
        </Row>

        <Form className='mt-4'>
            <Row className='border-bottom mb-3'>
                <Col><FormGroup><Label>Date</Label> </FormGroup></Col>
                <Col><FormGroup><Label>SubCon Name</Label> </FormGroup></Col>
                <Col><FormGroup><Label>Amount</Label> </FormGroup></Col>
                <Col><FormGroup><Label>Mode of Payment</Label> </FormGroup></Col>
            </Row>
            {paymentHistoryData && paymentHistoryData.map((element)=>{
                return(
                    <Row>
                        <Col>
                        <FormGroup>
                            <span>{moment(element.date).format('DD-MM-YYYY')}</span>
                        </FormGroup>
                        </Col>
                        <Col>
                        <FormGroup>
                            <span>{element.company_name}</span>
                        </FormGroup>
                        </Col>
                        <Col>
                        <FormGroup>
                            <Label>{element.amount}</Label>
                        </FormGroup>
                        </Col>
                        <Col>
                        <FormGroup>
                            <Label>{element.mode_of_payment}</Label>
                        </FormGroup>
                        </Col>
                    </Row>
                )
            })}
           
        </Form>
        </ModalBody>

        <ModalFooter>
          <Row>
            <div className="pt-3 mt-3 d-flex align-items-center gap-2">
              <Button
                color="secondary"
                onClick={() => {
                    setWorkOrderPaymentHistory(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Row>
        </ModalFooter>
</Modal>
</>
  )
}

export default SubconWorkPaymentHistory