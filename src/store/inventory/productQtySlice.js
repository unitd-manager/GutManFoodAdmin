import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createProductQty = createAsyncThunk(
  'productQty/createProductQty',
  async (inventoryData, { rejectWithValue }) => {
    try {
      const response = await api.post('/productQty/insertinventory',inventoryData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProductQtties = createAsyncThunk(
  'productQty/getProductQtties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/productQty/getinventoryMain');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProductQty = createAsyncThunk(
  'productQty/getProductQty',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/inventory/getProductQuantity',{product_id:id});
      return response.data.data[0];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteProductQty = createAsyncThunk(
  'productQty/deleteProductQty',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/productQty/deleteProductQty',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProductQty = createAsyncThunk(
  'productQty/updateProductQty',
  async (inventoryDetails, { rejectWithValue }) => {
    try {
      console.log(inventoryDetails);
      const response = await api.post('/productQty/editinventoryMain',
        
        inventoryDetails
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);



const productQtySlice = createSlice({
  name: 'productQty',
  initialState: {
    productQty: {},
    productQtties: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createProductQty.pending]: (state) => {
      state.loading = true;
    },
    [createProductQty.fulfilled]: (state, action) => {
      state.loading = false;

      state.productQtties = [...state.productQtties, action.payload];
    },
    [createProductQty.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getProductQtties.pending]: (state) => {
      state.loading = true;
    },
    [getProductQtties.fulfilled]: (state, action) => {
      state.loading = false;
      state.productQtties = action.payload;
      state.productQty = {};
    },
    [getProductQtties.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getProductQty.pending]: (state) => {
      state.loading = true;
    },
    [getProductQty.fulfilled]: (state, action) => {
      state.loading = false;
      state.productQty = action.payload;
    },
    [getProductQty.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteProductQty.pending]: (state) => {
      state.loading = true;
    },
    [deleteProductQty.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.productQtties = state.productQtties.filter((item) => item.id !== id);
      }
    },
    [deleteProductQty.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateProductQty.pending]: (state) => {
      state.loading = true;
    },
    [updateProductQty.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.productQtties.findIndex(
          (productQty) => productQty.id === action.payload.id
        );
        state.productQtties[index] = {
          ...state.productQtties[index],
          ...action.payload,
        };
      }
    },
    [updateProductQty.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
    
  },
});

export default productQtySlice.reducer;