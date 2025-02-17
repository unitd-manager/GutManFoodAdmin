import React,{useEffect,useState} from 'react';

import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,

  Button,

} from 'reactstrap';
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';



const BasicForm = () => {
  const [company, setCompany] = React.useState([])
  const [title, settitle] = useState('')
  const [description, setdescription] = useState('')

  const [startDate, setStartDate] = useState('')
  const [estimatedFinishDate, setestimatedFinishDate] = useState('')
  const [companyId, setcompanyId] = useState('')
  const [file, setFile] = useState(null)
  // const [imgUrl, setImage] = useState('')
  const { id } = useParams();
  const getCompany = () => {
    api 
      .get('/api/getCompany')
      .then((res) => {
        setCompany(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
      api 
      .post('/api/getProjectById',{
        project_id:id
      })
      .then((res) => {
        console.log(res.data.data)
        settitle(res.data.data.title);
        setcompanyId(res.data.data.company_id);
        setdescription(res.data.data.description)
        setStartDate(res.data.data.start_date)
        setestimatedFinishDate(res.data.data.start_date)
       // setImage(res.data.data.attachment)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCompany()
  
    return () => {
      getCompany()
    }
  }, [])
  const editProject = async() =>{
    if(title !== '' 
    && description !== '' 
    && startDate !== '' 
    && estimatedFinishDate !== '' 
    && companyId !== ''){
      const fd = new FormData()
      fd.append('title',title)
      fd.append('description',description)
      fd.append('start_date',startDate)
      fd.append('estimated_finish_date',estimatedFinishDate)
      fd.append('company_id',companyId)
      fd.append('project_id',id)
      if(file != null){
        fd.append('attachment',file)
      }
      
      api
      .post('/attachment/edit-projects',fd)
      .then((res) => {
        
        if(res && res.data.status === '400'){
          alert('Cannot add project.')
        }else{
          Swal.fire({
            title: 'Success',
            text: 'Project Added!',
            icon: 'success'
          })
           window.location.reload()
        }
        //navigate('/dashboards/classic');
        // setLoginData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }else{
      Swal.fire({
        title: 'Field Missing',
        text: 'Title,description & Dates are required',
        icon: 'warning'
      })
    }
    
  }
  const onFileChange = (event) =>{
    setFile(event.target.files[0])
  }
  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col md="12">
          <Card>
           
            <CardBody className="bg-light">
              <CardTitle tag="h4" className="mb-0">
                Project Info
              </CardTitle>
            </CardBody>
            <CardBody>
              <Form>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Title</Label>
                      <Input 
                      defaultValue={title}
                      onInput={e => settitle(e.target.value)}
                      type="text" placeholder="" />
                      
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Description</Label>
                      <Input defaultValue={description} onInput={e => setdescription(e.target.value)} type="text" placeholder="" />
                      
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                <Col md="6">
                    <FormGroup>
                      <Label>Start Date</Label>
                      <Input defaultValue={startDate} onInput={e => setStartDate(e.target.value)} type="date" placeholder="DOB Here" />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Estimated Finish Date</Label>
                      <Input defaultValue={estimatedFinishDate} onInput={e => setestimatedFinishDate(e.target.value)} type="date" placeholder="DOB Here" />
                    </FormGroup>
                  </Col>
                </Row> 
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Company</Label>
                      <Input defaultChecked={companyId} onChange={e => setcompanyId(e.target.value)} type="select" name="Select Category">
                        {company.map(data=>(
                          <option key={data.company_id} selected={companyId === data.company_id && true} value={data.company_id}>{data.company_name}</option>
                        ))}
                        
                      
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <Label>Attachments</Label>
                    <FormGroup>
                        
                        <Input onChange={onFileChange} type="file" placeholder="" />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
     
            <CardBody className="border-top gap-2 d-flex align-items-center">
              <Button onClick={()=>{editProject()}} type="submit" className="btn btn-success">
                Save
              </Button>
              <Button type="button" className="btn btn-dark ml-2">
                Cancel
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    
    </div>
  );
};

export default BasicForm;
