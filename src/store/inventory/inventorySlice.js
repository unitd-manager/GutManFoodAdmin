import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createInventory = createAsyncThunk(
  'inventory/createInventory',
  async (inventoryData, { rejectWithValue }) => {
    try {
      const response = await api.post('/inventory/insertinventory',inventoryData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getInventories = createAsyncThunk(
  'inventory/getInventories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/inventory/getinventoryMain');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getInventory = createAsyncThunk(
  'inventory/getInventory',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/inventory/getinventoryById',{product_id:id});
      return response.data.data[0];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteInventory = createAsyncThunk(
  'inventory/deleteInventory',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/inventory/deleteInventory',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateInventory = createAsyncThunk(
  'inventory/updateInventory',
  async (inventoryDetails, { rejectWithValue }) => {
    try {
      console.log(inventoryDetails);
      const response = await api.post('/inventory/editinventoryMain',
        
        inventoryDetails
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateInventoryStock = createAsyncThunk(
  'inventory/updateInventoryStock',
  async (inventoryDetails, { rejectWithValue }) => {
    try {
      console.log(inventoryDetails);
      const response = await api.post('/inventory/updateinventoryStock',
        
        inventoryDetails
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    inventory: {},
    inventories: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createInventory.pending]: (state) => {
      state.loading = true;
    },
    [createInventory.fulfilled]: (state, action) => {
      state.loading = false;

      state.inventories = [...state.inventories, action.payload];
    },
    [createInventory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getInventories.pending]: (state) => {
      state.loading = true;
    },
    [getInventories.fulfilled]: (state, action) => {
      state.loading = false;
      state.inventories = action.payload;
      state.inventory = {};
    },
    [getInventories.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getInventory.pending]: (state) => {
      state.loading = true;
    },
    [getInventory.fulfilled]: (state, action) => {
      state.loading = false;
      state.inventory = action.payload;
    },
    [getInventory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteInventory.pending]: (state) => {
      state.loading = true;
    },
    [deleteInventory.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.inventories = state.inventories.filter((item) => item.id !== id);
      }
    },
    [deleteInventory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateInventory.pending]: (state) => {
      state.loading = true;
    },
    [updateInventory.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.inventories.findIndex(
          (inventory) => inventory.id === action.payload.id
        );
        state.inventories[index] = {
          ...state.inventories[index],
          ...action.payload,
        };
      }
    },
    [updateInventory.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateInventoryStock.pending]: (state) => {
      state.loading = true;
    },
    [updateInventoryStock.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.inventories.findIndex(
          (inventory) => inventory.id === action.payload.id
        );
        state.inventories[index] = {
          ...state.inventories[index],
          ...action.payload,
        };
      }
    },
    [updateInventoryStock.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default inventorySlice.reducer;