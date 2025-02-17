import React, { useState, useEffect } from 'react';
import {
  FormGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import message from '../Message';


//VehicleFuelModal From VehicleEdit
const OtherChargesModal = ({ addSalesmanCommissionModal, setAddSalesmanCommissionModal }) => {
    OtherChargesModal.propTypes = {
        addSalesmanCommissionModal: PropTypes.bool,
        setAddSalesmanCommissionModal: PropTypes.func,
        
  };

  // All State Variable
  const { id } = useParams();
  const [salesmancommissiondetails, setSalesmanCommissionDetails] = useState();
  //const [gTotal, setGtotal] = useState(0);
  const [salesmancomissioninsertdetails, setSalesmanCommissionInsertDetails] = useState({
    costing_summary_id: id,
    date3: new Date().toISOString().slice(0,10)
  });

  //Setting Data in Vehicle Fuel
  const OtherChargeshandleInputs = (e) => {
    setSalesmanCommissionDetails({
      ...salesmancomissioninsertdetails,
      [e.target.name]: e.target.value,
    });
  };

  //Api call for getting Vehicle Fuel Data By ID
  const getSalesmanCommissionById = () => {
    api
      .post('/projecttabcostingsummary/getsalesmancommissionById', { costing_summary_id: id })
      .then((res) => {
        setSalesmanCommissionDetails(res.data.data);
        
        
      })
      .catch(() => {
        message('Sales commission Data Not Found', 'info');
      });
  };

  //Api call for Insert transport charges Data
  const insertSalesmanCommission= () => {
    if (salesmancomissioninsertdetails.amount && salesmancomissioninsertdetails.amount !=='') {
    api
      .post('/projecttabcostingsummary/insertSalesmanCommission', salesmancomissioninsertdetails)
      .then((res) => {
        setSalesmanCommissionInsertDetails(res.data.data);
        message('Sales commission Data Inserted Successfully', 'success');
      })
      .catch(() => {
        message('Sales commission Data Not Found', 'info');
      });
    }
    else {
      message('Please fill all required fields', 'warning');
    }
  };

  // useEffect for Vehicle Fuel
  useEffect(() => {
    getSalesmanCommissionById();
  }, [id]);

  return (
    <>
      <Modal size="md" isOpen={addSalesmanCommissionModal} > 
        <ModalHeader>
          Add Actual Charges
          <Button
            color="secondary"
            onClick={() => {
                setAddSalesmanCommissionModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <ModalHeader>Salesman Commission</ModalHeader>
          <FormGroup>
            <Table bordered className="lineitem">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Amount<span className='required'> *</span></th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Date">
                    <Input
                      type="date"
                      name="date3"
                      onChange={OtherChargeshandleInputs}
                      value={
                        salesmancomissioninsertdetails && moment(salesmancomissioninsertdetails.date3).format('YYYY-MM-DD')
                      }
                    />
                  </td>
                  <td data-label="Amount">
                    <Input
                      type="text"
                      name="amount3"
                      onChange={OtherChargeshandleInputs}
                      value={
                        salesmancomissioninsertdetails &&
                        salesmancomissioninsertdetails.amount3
                      } 
                    />
                  </td>
                  <td data-label="Description">
                    <Input
                      type="text"
                      name="description3"
                      onChange={OtherChargeshandleInputs}
                      value={
                        salesmancomissioninsertdetails && salesmancomissioninsertdetails.description3
                      }
                    />
                  </td>
                </tr>
                {salesmancommissiondetails &&
                  salesmancommissiondetails.map((e) => {
                    return (
                      <tr key={e.costing_summary_id}>
                        <td data-label="Date">{e.date}</td>
                        <td data-label="Amount">{e.amount}</td>
                        <td data-label="Description">{e.description}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            className="shadow-none"
            onClick={() => {
                insertSalesmanCommission();
                setAddSalesmanCommissionModal(false);
                
            }}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            onClick={() => {
                setAddSalesmanCommissionModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default OtherChargesModal;
