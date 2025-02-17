import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import random from 'random';
// import { Select } from '@material-ui/core';
import * as $ from "jquery"
// import { ToastContainer } from 'react-toastify';
import ComponentCard from '../ComponentCard';
import api from '../../constants/api';
import message from '../Message';


export default function ProductColor({ projectId }) {
    ProductColor.propTypes = {
      projectId: PropTypes.any,
     };
     const [employeeLinked, setEmployeeLinked] = useState();
     const [addLineItem, setAddLineItem] = useState([{
       "id": random.int(1, 99),
       "product_color": "",
       "stock_quantity": "",
        },])
     const AddNewLineItem = () => {
       setAddLineItem([...addLineItem, {
       "id": random.int(1, 99),
       "product_color": "",
       "stock_quantity": "",
       },])}
     const onchangeItem = (str, itemId) => {
       const element = addLineItem.find(el => el.id === itemId)
       element.product_color = str.value
          setAddLineItem(addLineItem)
          console.log(projectId);
     }
     const insertTrainingStaff = (staffObj) => {
       api.post('/product/insertProductSize', {
            product_size: staffObj.product_size
         , stock_quantity: staffObj.stock_quantity
           })
         .then(() => {
           message('TrainingStaff Added!', 'success')
         })
         .catch(() => {
           message('Unable to insert record.', 'error')
         })
     }
     // insert training staff
     const insertStaff = (formalArray) => {
       formalArray.forEach(pItems => {
         if (pItems.item !== '') {
           if (pItems.product_size !== '') {
             insertTrainingStaff(pItems)
           }
         }
       }) 
   
     }
   
     const insertTrainingData = () => {
       const result = [];
       const oldArray = addLineItem
       $(".newemp tbody tr").each(function input() {
         const allValues = {};
         $(this).find("input").each(function output() {
           const fieldName = $(this).attr("name");
           allValues[fieldName] = $(this).val();
         });
         result.push(allValues);
       })
       result.forEach(obj => {
            if (obj.id) {
           /* eslint-disable */
           const foundObj = oldArray.find(el => el.id === parseInt(obj.id))
           if (foundObj) {
             obj.product_size = foundObj.product_size
           }
         }
       })
       
       insertStaff(result)
      }
     // const getValuelist = () => {
     //   api
     //     .get('/product/getColorValueList')
     //     .then((res) => {
     //       setValuelist(res.data.data);
     //     })
     //     .catch(() => {
     //       message('valuelist not found', 'info');
     //     });
     // };
   
     // const handleInputcolor = (e) => {
     //   setProductColors({ ...productColors, [e.target.name]: e.target.value });
     // };
   
     // const insertProductColor = () => {
     //   productColors.product_id = projectId;
     //   api
     //   .post('/product/insertProductColor', productColors)
     //   .then((res) => {
     //     setProductColors(res.data.data);
     //     message('Record inserted successfully', 'success');
     //   })
     //   .catch(() => {
     //     message('Unable to insert Product Colors', 'error');
     //   });
     // };
     const getEmployee = () => {
       api
       .get('/product/getSizeValueList')
       .then((res) => {
         setEmployeeLinked(res.data.data);
       })
       .catch(() => {
         // message('valuelist not found', 'info');
       });
   };
     // const deleteTrainingStaffData = (staffId) => {
     //   api.post('/training/deleteTrainingStaff', { training_staff_id: staffId })
     //     .then(() => {
     //       message('Record deleted successfully', 'success')
     //       setTimeout(() => {
     //         window.location.reload()
     //       }, 300);
     //     })
     //     .catch(() => {
     //       message('Unable to delete record.', 'error')
     //     })
     // }
     // const getLinkedEmployee = () => {
       
     //   // eslint-disable-next-line
     //   api.post('/training/getTrainingStaffById', { training_id: parseInt(id) })
     //     .then((res) => {
           
     //       const resData = res.data.data
     //       const empArray = []
     //       resData.forEach(element => {
     //         empArray.push({
     //           "id": random.int(1, 99),
     //           "employee_name": element.first_name,
     //           "employee_id": element.employee_id,
     //           "from_date": element.from_date && element.from_date.substring(0, 10),
     //           "to_date": element.to_date && element.to_date.substring(0, 10),
     //           "training_staff_id": element.training_staff_id
     //         })
     //       });
           
     //       setPreviousEmployee([...empArray])
     //     })
     //     .catch(() => {
     //       message("Training Data Not Found", 'info')
     //     })
     // }
     
     useEffect(() => {
       getEmployee();
       // getValuelist();
       // getLinkedEmployee();
     }, []);
     return (
       <>
         <Form>
           <FormGroup>
                   <ComponentCard> 
           {/* Training Staff */}
           {/* <Row>
             <table className='lineitem  border border-secondary rounded' >
               <thead>
                 <tr>
                   <th scope="col">Employee Name</th>
                   <th scope="col">From Date</th>
                   <th scope="col">To date</th>
                 </tr>
               </thead>
               <tbody>
                 {prevEmployee && prevEmployee.map((item) => {
                   return (
                     <tr key={item.id}>
                       <td data-label="Employee Name">
                         <Select
                           key={item.id}
                           defaultValue={{ value: item.employee_id, label: item.employee_name }}
                           isDisabled={false}
                           options={employeeLinked}/>
                         <Input value={item.employee_id.toString()} type="hidden" name="employee_id"></Input>
                       </td>
                       <td data-label="From Date">
                         <p>{item.from_date}</p>
                       </td>
                       <td data-label="To Date">
                       <p>{item.to_date}</p>
                         
                       </td>
                       <td>
                         <Input type='hidden' name="id" defaultValue={item.id}></Input>
                       </td>
                     {/* delete button from training staff*/}
                     {/* <td><Button color="danger" className='shadow-none'
                       onClick={() => {{deleteTrainingStaffData(item.training_staff_id);}  }}>Delete</Button>
                       
                     </td>
                     </tr>
                   );
                 })}
               </tbody>
             </table>
           </Row> */} 
           <br/>
           <Row>
             <Col md="3">
               <Button color="primary" className='shadow-none'
                 type='button'
                 onClick={  () => { AddNewLineItem() }}>Add Color</Button>
             </Col>
           </Row>
           <br />
           <Row>
             <table className='lineitem newemp border border-secondary rounded' >
               <thead>
                 <tr>
                   <th scope="col">Product Size</th>
                   <th scope="col">Stock Quantity</th>
                   </tr>
               </thead>
               <tbody>
                 {addLineItem.map((item) => {
                   return (
                     <tr key={item.id}>
                       <td data-label="Product Size">
                         
                       <Input type='select'
                           defaultValue={item.product_size}
                           name="product_size"
                            onChange={(e) => {
                             onchangeItem(e, item.id)
                           }}
                         >
                       <option defaultValue="selected">Please Select</option>
                       {employeeLinked &&
                         employeeLinked.map((e) => {
                           return (
                             <option key={e.value} value={e.value}>
                               {e.value}
                             </option>
                           );
                         })}
                     </Input>
                         {/* <Select
                           key={item.id}
                           defaultValue={{ value: item.product_color}}
                           onChange={(e) => {
                             onchangeItem(e, item.id)
                           }}
                           options={employeeLinked}/>
                         <Input value={item.employee_id.toString()} type="hidden" name="employee_id"></Input> */}
                       </td>
                       <td data-label="Stock Quantity">
                         <Input type='number'
                           defaultValue={item.stock_quantity}
                           name="stock_quantity"
                         />
                       </td>
                     
                       <td>
                         <Input type='hidden' name="id" defaultValue={item.id}></Input>
                       </td>
                     </tr>
                   );
                 })}
               </tbody>
             </table>
           </Row>
         </ComponentCard>
         <Button
               color="primary"
               type="button"
               onClick={() => {
                 insertTrainingData();
               }}
             >
               Submit
             </Button>
           </FormGroup>
         </Form>
       </>
     );
   }
   