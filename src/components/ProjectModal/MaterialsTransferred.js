import React,{useEffect, useState} from 'react'
import {Row,Col,Form,FormGroup,Label} from 'reactstrap';
import PropTypes from 'prop-types'
import api from '../../constants/api';
import message from '../Message';


function MaterialsTransferred({projectId}) {

    MaterialsTransferred.propTypes = {
        projectId: PropTypes.string
      }

    const [materialsTransferredData, setMaterialsTransferredData ] = useState();

    const MaterialsTransferredFromOtherProject = () => {
        api.post('/projecttabmaterialstransferredportal/TabMaterialTransferred',{project_id:projectId})
            .then((res) => {
            setMaterialsTransferredData(res.data.data)
            })
            .catch(()=>{
            message(" Materials Transferred Data not found","info")
            })    
    }

    useEffect(() => {
        
        MaterialsTransferredFromOtherProject();

    },[projectId])

  return (
    <>

        <Form className='mt-4'>
            <Row className='border-bottom mb-3'>
                <Col><FormGroup><Label>Ref Project</Label> </FormGroup></Col>
                <Col><FormGroup><Label>Product</Label> </FormGroup></Col>
                <Col><FormGroup><Label>Quantity</Label> </FormGroup></Col>
                <Col><FormGroup><Label>To Project</Label> </FormGroup></Col>
                <Col><FormGroup><Label>Updated By</Label> </FormGroup></Col>
            </Row>

            { materialsTransferredData && materialsTransferredData.map((e)=>{
                return <Row key={e.to_project_id}>
                        <Col>
                        <FormGroup></FormGroup>
                        </Col>
                    <Col>
                        <FormGroup>
                            <span>{e.title}</span>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>{e.quantity}</Label>
                        </FormGroup>
                    </Col>
                    <Col >
                        <FormGroup>
                            <Label>{e.pro_name}</Label>
                        </FormGroup>
                    </Col>
                    <Col >
                        <FormGroup>
                            <Label></Label>
                        </FormGroup>
                    </Col>
                    </Row>
            })}
          
      </Form>
      
      </>
  )
}

export default MaterialsTransferred