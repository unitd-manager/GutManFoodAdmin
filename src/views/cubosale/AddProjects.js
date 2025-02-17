import React,{useState} from 'react';

import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import Swal from 'sweetalert2'
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';


const AddProjects = () => {

    const [projectname, setProjectName] = useState('')
    const addProject = () =>{
      if(projectname !== ''){
        api
        .post('/api/addProject',{
          title:projectname
        })
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
          title: 'Error',
          text: 'Project name is required!',
          icon: 'warning'
        })
      }
     
    }
  return (
    <div>
      <BreadCrumbs />
      <Row>
        <Col md="12">
          <ComponentCard title="Add Projects">
            <Form>
              <FormGroup>
                <Label htmlFor="exampleEmail12">Project Name</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail12"
                  onInput={e => setProjectName(e.target.value)}
                />
                
              </FormGroup>
             
              <Button onClick={()=>{addProject()}} color="primary">Submit</Button>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default AddProjects;
