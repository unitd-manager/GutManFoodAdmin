import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createLineItem = createAsyncThunk(
  'lineItem/createLineItem',
  async (lineItemData, { rejectWithValue }) => {
    try {
      const response = await api.post('/lineItem/insertlineItem',lineItemData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getLineItems = createAsyncThunk(
  'lineItem/getLineItems',
  async (quotationId, { rejectWithValue }) => {
    try {
      const response = await api.post('/tender/getQuoteLineItemsById',{quote_id:quotationId});
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getLineItem = createAsyncThunk(
  'lineItem/getLineItem',
  async (quotationId, { rejectWithValue }) => {
    try {
      const response = await api.post('/tender/getQuoteLineItemsById',{quote_id:quotationId});
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteLineItem = createAsyncThunk(
  'lineItem/deleteLineItem',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/lineItem/deleteLineItem',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateLineItem = createAsyncThunk(
  'lineItem/updateLineItem',
  async (updatedLineItemData, { rejectWithValue }) => {
    try {
      console.log(updatedLineItemData);
      const response = await api.post('/lineItem/edit-lineItems',
        // updatedLineItemData.id,
        updatedLineItemData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const lineItemSlice = createSlice({
  name: 'lineItem',
  initialState: {
    lineItem: {},
    lineItems: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createLineItem.pending]: (state) => {
      state.loading = true;
    },
    [createLineItem.fulfilled]: (state, action) => {
      state.loading = false;

      state.lineItems = [...state.lineItems, action.payload];
    },
    [createLineItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getLineItems.pending]: (state) => {
      state.loading = true;
    },
    [getLineItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.lineItems = action.payload;
      state.lineItem = {};
    },
    [getLineItems.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getLineItem.pending]: (state) => {
      state.loading = true;
    },
    [getLineItem.fulfilled]: (state, action) => {
      state.loading = false;
      state.lineItem = action.payload;
    },
    [getLineItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteLineItem.pending]: (state) => {
      state.loading = true;
    },
    [deleteLineItem.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.lineItems = state.lineItems.filter((item) => item.id !== id);
      }
    },
    [deleteLineItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateLineItem.pending]: (state) => {
      state.loading = true;
    },
    [updateLineItem.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.lineItems.findIndex(
          (lineItem) => lineItem.id === action.payload.id
        );
        state.lineItems[index] = {
          ...state.lineItems[index],
          ...action.payload,
        };
      }
    },
    [updateLineItem.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default lineItemSlice.reducer;