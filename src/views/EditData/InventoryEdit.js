import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { useParams } from 'react-router-dom';
import api from '../../constants/api';
import message from '../../components/Message';
import InventoryEditPart from '../../components/Inventory/InventoryEditPart';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const Test = () => {
  // State variables
  const [inventoryDetails, setInventoryDetails] = useState({
    inventory_code: '',
    inventory_id: '',
    minimum_order_level: '',
    productId: '',
    product_type: '',
    company_name: '',
    product_name: '',
    item_code: '',
    unit: '',
    notes: '',
    product_code: '',
    current_stock: '', // Assuming this is the field you're updating
  });

  // Params and routing
  const { id } = useParams();
  const { loggedInuser } = useContext(AppContext);

  // Handle input change
  const handleInputs = (e) => {
    setInventoryDetails({ ...inventoryDetails, [e.target.name]: e.target.value, inventory_id: id });
  };
 // Update product quantity in stock
 const updateProductQuantity = () => {
  const productUpdateData = {
    product_id: inventoryDetails.productId, // Assuming product_id is the same as productId
    qty_in_stock: inventoryDetails.current_stock, // Updating quantity_in_stock with current_stock value
  };

  api
    .post('/product/editInventoryProduct', productUpdateData)
    .then(() => {
      message('Product quantity updated successfully', 'success');
    })
    .catch(() => {
      message('Unable to update product quantity.', 'error');
    });
};
  // Get inventory by product id
  const getInventoryData = () => {
    api
      .post('/inventory/getinventoryById', { productId: id })
      .then((res) => {
        setInventoryDetails(res.data.data[0]);
      })
      .catch(() => {
        message('Unable to get inventory data.', 'error');
      });
  };

  // Update Inventory
  const editinventoryData = () => {
    inventoryDetails.modification_date = creationdatetime;
    inventoryDetails.modified_by = loggedInuser.first_name;
    api
      .post('/inventory/editinventoryMain', inventoryDetails)
      .then(() => {
        // Successfully updated inventory, now update the product table
        updateProductQuantity();
        message('Record edited successfully', 'success');
        // setTimeout(() => {
        //   window.location.reload();
        // }, 300);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

 

  useEffect(() => {
    getInventoryData();
  }, [id]);

  return (
    <>
      <ToastContainer />
      <InventoryEditPart
        inventoryDetails={inventoryDetails}
        handleInputs={handleInputs}
        editinventoryData={editinventoryData}
      />
    </>
  );
};

export default Test;
