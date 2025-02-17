import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup,Input, Button } from 'reactstrap';
// import { ToastContainer } from 'react-toastify';
import random from 'random';
// import { Select } from '@material-ui/core';
import * as $ from "jquery";
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import ComponentCard from '../ComponentCard';
import api from '../../constants/api';
import message from '../Message';


export default function ProductColor( ) {

    const [prevEmployee, setPreviousEmployee] = useState();
  const { id } = useParams();
  const [colorLinked, setColorLinked] = useState();
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
      element.colors = str.label
      element.valuelist_id = str.value.toString()
      setAddLineItem(addLineItem)
    }

    
    const insertProductColor = (trainingId, staffObj) => {
      api.post('/product/insertProductColor', {
         product_color: staffObj.valuelist_id
        , product_id: trainingId
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
  const insertColors = (formalArray) => {
    formalArray.forEach(pItems => {
      if (pItems.item !== '') {
        if (pItems.valuelist_id !== '') {
          insertProductColor(id, pItems)
        }
      }
    }) 

  }

  const insertColorData = () => {
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
          obj.valuelist_id = foundObj.valuelist_id
        }
      }
    })
    console.log('staff',result);
    insertColors(result);
   }
  

const getColors = () => {
  api.get('/product/getColorValueList', colorLinked)
    .then((res) => {
      const items = res.data.data
      const finaldat = []
      items.forEach(item => {
        finaldat.push({ value: item.valuelist_id, label: item.colors })
      })
      setColorLinked(finaldat)
    })
}

  const getProductColor = () => {
    
    // eslint-disable-next-line
    api.post('/product/getProductColor', { product_id: id })
      .then((res) => {
        
        const resData = res.data.data
        const empArray = []
        resData.forEach(element => {
          empArray.push({
            "id": random.int(1, 99),
            "product_color": element.product_color,
            "product_color_id": element.product_color_id
          })
        });
        
        setPreviousEmployee([...empArray])
      })
      .catch(() => {
        message("Product Color Data Not Found", 'info')
      })
  }
  const deleteProductColor = (staffId) => {
    api.post('/product/deleteProductColor', { product_color_id: staffId })
      .then(() => {
        message('Record deleted successfully', 'success')
        setTimeout(() => {
          window.location.reload()
        }, 300);
      })
      .catch(() => {
        message('Unable to delete record.', 'error')
      })
  }
  useEffect(() => {
    getColors();
    getProductColor();
    // getLinkedEmployee();
  }, []);
  return (
    <>
      <Form>
        <FormGroup>
                <ComponentCard> 
        {/* Training Staff */}
        <Row>
          <table className='lineitem  border border-secondary rounded' >
            <thead>
              <tr>
                <th scope="col">Product Color</th>
                <th scope="col">Stock Quantity</th>
            
              </tr>
            </thead>
            <tbody>
            {prevEmployee && prevEmployee.map((item) => {
                return (
                  <tr key={item.id}>
                    <td data-label="Employee Name">
                    <Select
                        key={item.id}
                        defaultValue={{ value: item.valuelist_id, label: item.colors }}
                      
                        options={colorLinked}/>
                      <Input value={item.valuelist_id} type="hidden" name="valuelist_id"></Input>
                      <Input value={item.colors} type="hidden" name="colors"></Input>
                    </td>
                    <td data-label="Stock Quantity">
                      <Input type='text'
                        defaultValue={item.stock_quantity}
                        name="stock_quantity"
                      />
                    </td>
                  
                    <td>
                      <Input type='hidden' name="id" defaultValue={item.id}></Input>
                    </td>
                   
                    {/* delete button from training staff*/}
                    <td><Button color="danger" className='shadow-none'
                    onClick={() => {{deleteProductColor(item.product_color_id);}  }}>Delete</Button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Row>
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
                <th scope="col">Product Color</th>
                <th scope="col">Stock Quantity</th>
                </tr>
            </thead>
            <tbody>
              {addLineItem.map((item) => {
                return (
                  <tr key={item.id}>
                    <td data-label="Product Color">
                    <Select
                        key={item.id}
                        defaultValue={{ value: item.valuelist_id, label: item.colors }}
                        onChange={(e) => {
                          onchangeItem(e, item.id)
                        }}
                        options={colorLinked}/>
                      <Input value={item.valuelist_id} type="hidden" name="valuelist_id"></Input>
                      <Input value={item.colors} type="hidden" name="colors"></Input>
                    </td>
                    <td data-label="Stock Quantity">
                      <Input type='text'
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
              insertColorData();
            }}
          >
            Submit
          </Button>
        </FormGroup>
      </Form>
    </>
  );
}
