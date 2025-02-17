import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createCostingSummary = createAsyncThunk(
  'costingSummary/createCostingSummary',
  async (costingSummaryData, { rejectWithValue }) => {
    try {
      const response = await api.post('/employee/insertcostingSummary',costingSummaryData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCostingSummaries = createAsyncThunk(
  'costingSummary/getCostingSummaries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/employee/costingSummary');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCostingSummary = createAsyncThunk(
  'costingSummary/getCostingSummary',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/employee/getCostingSummary',{opportunity_id:id});
      return response.data.data[0];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteCostingSummary = createAsyncThunk(
  'costingSummary/deleteCostingSummary',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/employee/deleteCostingSummary',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCostingSummary = createAsyncThunk(
  'costingSummary/updateCostingSummary',
  async (updatedcostingSummaryData, { rejectWithValue }) => {
    try {
      console.log(updatedcostingSummaryData);
      const response = await api.post('/employee/edit-costingSummary',
        // updatedcostingSummaryData.id,
        updatedcostingSummaryData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const costingSummarySlice = createSlice({
  name: 'costingSummary',
  initialState: {
    costingSummary: {},
    costingSummaries: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createCostingSummary.pending]: (state) => {
      state.loading = true;
    },
    [createCostingSummary.fulfilled]: (state, action) => {
      state.loading = false;

      state.costingSummaries = [...state.costingSummaries, action.payload];
    },
    [createCostingSummary.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getCostingSummaries.pending]: (state) => {
      state.loading = true;
    },
    [getCostingSummaries.fulfilled]: (state, action) => {
      state.loading = false;
      state.costingSummaries = action.payload;
      state.costingSummary = {};
    },
    [getCostingSummaries.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getCostingSummary.pending]: (state) => {
      state.loading = true;
    },
    [getCostingSummary.fulfilled]: (state, action) => {
      state.loading = false;
      state.costingSummary = action.payload;
    },
    [getCostingSummary.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteCostingSummary.pending]: (state) => {
      state.loading = true;
    },
    [deleteCostingSummary.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.costingSummaries = state.costingSummaries.filter((item) => item.id !== id);
      }
    },
    [deleteCostingSummary.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateCostingSummary.pending]: (state) => {
      state.loading = true;
    },
    [updateCostingSummary.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.costingSummaries.findIndex(
          (costingSummary) => costingSummary.id === action.payload.id
        );
        state.costingSummaries[index] = {
          ...state.costingSummaries[index],
          ...action.payload,
        };
      }
    },
    [updateCostingSummary.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default costingSummarySlice.reducer;