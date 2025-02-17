import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createAdjustStock = createAsyncThunk(
  'adjustStock/createAdjustStock',
  async (adjustStockData, { rejectWithValue }) => {
    try {
      const response = await api.post('/inventory/insertadjust_stock_log',adjustStockData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAdjustStock = createAsyncThunk(
  'adjustStock/getAdjustStocks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/inventory/getAdjustStockMain');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAdjustStocks = createAsyncThunk(
  'adjustStock/getAdjustStock',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/inventory/getAdjustStock',{inventory_id:id});
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteAdjustStock = createAsyncThunk(
  'adjustStock/deleteAdjustStock',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/adjustStock/deleteAdjustStock',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateAdjustStock = createAsyncThunk(
  'adjustStock/updateAdjustStock',
  async (updatedData, { rejectWithValue }) => {
    try {
      console.log(updatedData);
      const response = await api.post('/adjustStock/editadjustStockMain',
        // updatedData.id,
        updatedData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const adjustStockSlice = createSlice({
  name: 'adjustStock',
  initialState: {
    adjustStock: {},
    adjustStocks: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createAdjustStock.pending]: (state) => {
      state.loading = true;
    },
    [createAdjustStock.fulfilled]: (state, action) => {
      state.loading = false;

      state.adjustStocks = [...state.adjustStocks, action.payload];
    },
    [createAdjustStock.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getAdjustStocks.pending]: (state) => {
      state.loading = true;
    },
    [getAdjustStocks.fulfilled]: (state, action) => {
      state.loading = false;
      state.adjustStocks = action.payload;
      state.adjustStock = {};
    },
    [getAdjustStocks.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getAdjustStock.pending]: (state) => {
      state.loading = true;
    },
    [getAdjustStock.fulfilled]: (state, action) => {
      state.loading = false;
      state.adjustStock = action.payload;
    },
    [getAdjustStock.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteAdjustStock.pending]: (state) => {
      state.loading = true;
    },
    [deleteAdjustStock.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.adjustStocks = state.adjustStocks.filter((item) => item.id !== id);
      }
    },
    [deleteAdjustStock.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateAdjustStock.pending]: (state) => {
      state.loading = true;
    },
    [updateAdjustStock.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.adjustStocks.findIndex(
          (adjustStock) => adjustStock.id === action.payload.id
        );
        state.adjustStocks[index] = {
          ...state.adjustStocks[index],
          ...action.payload,
        };
      }
    },
    [updateAdjustStock.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default adjustStockSlice.reducer;