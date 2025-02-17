import React, { useMemo, useState } from 'react';
import { Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { createAdjustStock } from '../../store/inventory/adjustStockSlice';
import { updateInventoryStock } from '../../store/inventory/inventorySlice';

function StockInputChange({ element, setStockinputOpen }) {
  StockInputChange.propTypes = {
    setStockinputOpen: PropTypes.func,
    element: PropTypes.object,
  };

  const dispatch = useDispatch();
  const [actualStock, setActualStock] = useState();

  const [inventoryStock, setInventoryStock] = useState({
    inventory_id: element.inventory_id,
    stock: element.current_stock,
  });
  const adjStock = useMemo(() => {
    return actualStock - element.stock;
  });
  const [adjuststockDetails, setAdjuststockDetails] = useState({
    inventory_id: element.inventory_id,
    product_id: element.productId,
    adjust_stock: 0,
    modified_by: '',
    created_by: '',
    current_stock: element.stock,
  });

  const handleStockinput = (e) => {
    setActualStock(e.target.value);
    const adjustStock = actualStock - element.stock;
    alert(actualStock);

    setAdjuststockDetails({
      inventory_id: element.inventory_id,
      product_id: element.productId,
      adjust_stock: adjStock,
      modified_by: 'him',
      created_by: 'me',
      current_stock: element.stock,
    });

    setInventoryStock({
      inventory_id: element.inventory_id,
      stock: actualStock,
    });
  };

  const adjuststock = () => {
    dispatch(createAdjustStock(adjuststockDetails));
  };

  const updateStockinInventory = () => {
    dispatch(updateInventoryStock(inventoryStock));
  };

  return (
    <div>
      <Input
        type="number"
        name="actualStock"
        value={actualStock}
        defaultValue={element.stock}
        onChange={(e) => handleStockinput(e)}
      />
      <Button
        onClick={() => {
          adjuststock(element);
          updateStockinInventory();
          setStockinputOpen(false);
        }}
      >
        save
      </Button>
    </div>
  );
}

export default StockInputChange;
