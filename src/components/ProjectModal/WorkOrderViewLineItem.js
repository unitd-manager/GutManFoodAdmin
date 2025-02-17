import React,{useEffect, useState} from 'react'
import { Button,Modal,ModalHeader,ModalBody, ModalFooter,Label,Row,Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types'
import api from '../../constants/api';
import message from '../Message';
import WorkOrderEditModal from './WorkOrderEditModal';


const WorkOrderViewLineItem = ({projectId,workOrderViewLineItem,setWorkOrderViewLineItem,subCon}) => {
    WorkOrderViewLineItem.propTypes = {
        workOrderViewLineItem: PropTypes.bool,
        setWorkOrderViewLineItem: PropTypes.func,
        projectId: PropTypes.any,
        subCon: PropTypes.any
        
    }
    
    const [subConWorkOrdeData, setWorkOrderViewLineItems ] = useState();
    const [subWorkData, setSubWorkData ] = useState(false);
    const [workLine, setWorkLine] = useState();
    const SubConWorkOrderLine = () => {
        api.post('/projecttabsubconworkorder/getWorkOrderBy',{project_id:projectId,sub_con_work_order_id:subCon})
            .then((res) => {
                setWorkOrderViewLineItems(res.data.data)
            console.log("SubConWorkOrderPortal",res.data.data)
            })
            .catch(()=>{
            message(" SubCon Work Order Data not found","info")
            })    
    }
    console.log('subconwork',subCon)
    useEffect(() => {
        SubConWorkOrderLine();
    },[])

  return (
    <>
    
        <Modal size="xl" isOpen={workOrderViewLineItem}>
            <ModalHeader>Work Order View Line Items</ModalHeader>
            <ModalBody>
            
                <table className='lineitem border border-secondary rounded'>
                    
                    <thead>
                    <tr>
                        <th scope="col">Description	</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Updated By</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    
                    <tbody>
            {subConWorkOrdeData &&
              subConWorkOrdeData.map((e) => {
                return (
                        <tr>
                            <td>{e.description}</td>
                            <td>{e.quantity}</td>
                            <td>{e.unit_rate}</td>
                            <td>{e.amount} </td>
                            <td>{e.amount}</td>
                            <td>
                            <Row>
                                <Col md='3'><Label><Link to=""><span  onClick={() => {
                                  setWorkLine(e);
                                  setSubWorkData(true);
                                }}><Icon.Edit /></span></Link></Label></Col>
                                <Col md='3'><Label><Link to=""> <span><Icon.Delete /></span> </Link></Label></Col>
                            </Row>
                            </td>
                        </tr>
                         );
                        })}
                    </tbody>
                </table>
               {subWorkData && <WorkOrderEditModal setSubWorkData={setSubWorkData} subWorkData={subWorkData} workLine={workLine}></WorkOrderEditModal>}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" className='shadow-none' onClick={()=>{setWorkOrderViewLineItem(false)}}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </>
  )
}

export default WorkOrderViewLineItem