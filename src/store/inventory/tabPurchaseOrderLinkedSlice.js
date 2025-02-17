import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createTabPurchaseOrderLinked = createAsyncThunk(
  'tabPurchaseOrderLinked/createTabPurchaseOrderLinked',
  async (tabPurchaseOrderLinkedData, { rejectWithValue }) => {
    try {
      const response = await api.post('/inventory/inserttabPurchaseOrderLinked',tabPurchaseOrderLinkedData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTabPurchaseOrdersLinked = createAsyncThunk(
  'tabPurchaseOrderLinked/getTabPurchaseOrdersLinked',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/inventory/gettabPurchaseOrderLinked');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const gettabPurchaseOrderLinked = createAsyncThunk(
  'tabPurchaseOrderLinked/gettabPurchaseOrderLinked',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/inventory/getTabPurchaseOrdersLinkedById',{inventory_id:id});
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTabPurchaseOrderLinked = createAsyncThunk(
  'tabPurchaseOrderLinked/deleteTabPurchaseOrderLinked',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/inventory/deleteSub_Category',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTabPurchaseOrderLinked = createAsyncThunk(
  'tabPurchaseOrderLinked/updateTabPurchaseOrderLinked',
  async (updatedtabPurchaseOrderLinkedData, { rejectWithValue }) => {
    try {
      console.log(updatedtabPurchaseOrderLinkedData);
      const response = await api.post('/inventory/edit-tabPurchaseOrdersLinked',
        // updatedtabPurchaseOrderLinkedData.id,
        updatedtabPurchaseOrderLinkedData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const tabPurchaseOrderLinkedSlice = createSlice({
  name: 'tabPurchaseOrderLinked',
  initialState: {
    tabPurchaseOrderLinked: {},
    tabPurchaseOrdersLinked: [],
    error: '',
    loading: false, 
  },
  extraReducers: {
    [createTabPurchaseOrderLinked.pending]: (state) => {
      state.loading = true;
    },
    [createTabPurchaseOrderLinked.fulfilled]: (state, action) => {
      state.loading = false;

      state.tabPurchaseOrdersLinked = [...state.tabPurchaseOrdersLinked, action.payload];
    },
    [createTabPurchaseOrderLinked.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTabPurchaseOrdersLinked.pending]: (state) => {
      state.loading = true;
    },
    [getTabPurchaseOrdersLinked.fulfilled]: (state, action) => {
      state.loading = false;
      state.tabPurchaseOrdersLinked = action.payload;
      state.tabPurchaseOrderLinked = {};
    },
    [getTabPurchaseOrdersLinked.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [gettabPurchaseOrderLinked.pending]: (state) => {
      state.loading = true;
    },
    [gettabPurchaseOrderLinked.fulfilled]: (state, action) => {
      state.loading = false;
      state.tabPurchaseOrderLinked = action.payload;
    },
    [gettabPurchaseOrderLinked.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteTabPurchaseOrderLinked.pending]: (state) => {
      state.loading = true;
    },
    [deleteTabPurchaseOrderLinked.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.tabPurchaseOrdersLinked = state.tabPurchaseOrdersLinked.filter((item) => item.id !== id);
      }
    },
    [deleteTabPurchaseOrderLinked.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateTabPurchaseOrderLinked.pending]: (state) => {
      state.loading = true;
    },
    [updateTabPurchaseOrderLinked.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.tabPurchaseOrdersLinked.findIndex(
          (tabPurchaseOrderLinked) => tabPurchaseOrderLinked.id === action.payload.id
        );
        state.tabPurchaseOrderLinkeds[index] = {
          ...state.tabPurchaseOrdersLinked[index],
          ...action.payload,
        };
      }
    },
    [updateTabPurchaseOrderLinked.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default tabPurchaseOrderLinkedSlice.reducer;