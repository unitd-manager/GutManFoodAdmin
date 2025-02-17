import React, { useEffect, useState } from 'react'
import {CardTitle, Row,Col,Form,FormGroup,Label,Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types'
import AddMaterialsUsed from './AddMaterialsUsed';
import api from '../../constants/api';
import message from '../Message';
import EditMaterialused from './EditMaterialused';
import PdfMaterialUsed from '../PDF/PdfMaterialUsed';
import ReturnStockModal from './ReturnStockModal';


const MaterialsusedTab = ({projectId}) => {
    MaterialsusedTab.propTypes = {
        projectId: PropTypes.any,
      }

    const [ addMaterialsUsed, setAddMaterialsUsed ] = useState(false);
    const [ editMaterialsUsed, setEditMaterialsUsed ] = useState(false);
    const [ editMaterialsUsedData, setEditMaterialsUsedData] = useState(null)
    const [ materialusedportal, setMaterialusedportal ] = useState();
    const [ returnStockModal, setReturnStockModal ] = useState(false);
    const [ returnItem, setReturnItem ] = useState({});

      useEffect(() =>
      {
        // Get Material Used Portal Data
            api.post('/projecttabmaterialusedportal/TabMaterialUsedPortal',{project_id:projectId})
            .then((res) => {
            setMaterialusedportal(res.data.data)
            })
            .catch(()=>{
            message(" Material Used Portal Data not found","info")
            })    
      },[projectId])

  return (
    <> 
        <AddMaterialsUsed addMaterialsUsed={addMaterialsUsed} setAddMaterialsUsed={setAddMaterialsUsed}  />
        <EditMaterialused editMaterialsUsed={editMaterialsUsed} setEditMaterialsUsed={setEditMaterialsUsed} FetchMaterialsUsed={editMaterialsUsedData} />
       {returnStockModal&& <ReturnStockModal returnStockModal={returnStockModal} setReturnStockModal={setReturnStockModal} returnItem={returnItem}/>}
        <Row  className='mb-4'>
            <Col ><PdfMaterialUsed materialusedportal={materialusedportal} addMaterialsUsed={addMaterialsUsed}id={projectId}></PdfMaterialUsed></Col>
            <Col md="3"><Button color="primary" className='shadow-none' onClick={()=>
                setAddMaterialsUsed(true)}
                
                >Add materials used</Button></Col>
        </Row>
        <Row>
            <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white"> Materials used </CardTitle>
        </Row>

        <Form className='mt-4'>
            <Row className='border-bottom mb-3'>
                <Col><FormGroup><Label>Title</Label> </FormGroup></Col>
                <Col><FormGroup><Label>UoM</Label> </FormGroup></Col>
                <Col><FormGroup><Label>Quantity</Label> </FormGroup></Col>
                <Col><FormGroup><Label>Remarks</Label> </FormGroup></Col>
                <Col><FormGroup><Label>Status</Label> </FormGroup></Col>
                <Col><FormGroup><Label>Action</Label> </FormGroup></Col>
            </Row>
            </Form>
            {materialusedportal && materialusedportal.map((res)=>{
                     return (
                        <Row key={res.project_materials_id}>
                            <Col>
                            <FormGroup>{res.title}</FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                <span>{res.unit}</span>
                            </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                <Label>{res.quantity}</Label>
                            </FormGroup>
                            </Col>
                            <Col >
                            <FormGroup>
                                <Label>{res.description}</Label>
                            </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                <Label>{res.status}</Label>
                            </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                <Row>
                                    <Col md='2'><Label><Link to=""><span onClick={()=>{
                                        setEditMaterialsUsed(true)
                                        setEditMaterialsUsedData(res)
                                    }}><Icon.Edit /></span></Link></Label></Col>
                                    <Col md='2'><Label><Link to=""> <span><Icon.Eye /></span> </Link></Label></Col>
                                    <Col md='8'><Label><Link to=""><span onClick={()=>{ setReturnItem(res);setReturnStockModal(true);}} >Return To Stock</span></Link></Label></Col>
                                    <Col md='8'><Label><Link to=""><span >View</span></Link></Label></Col>
                                </Row>
                            </FormGroup>
                            </Col>
                        </Row>
                    ) 
                })}
    </>
  )
}

export default MaterialsusedTab