import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createAnnualLeave = createAsyncThunk(
  'leaveHistory/createAnnualLeave',
  async (jobInformationData, { rejectWithValue }) => {
    try {
      const response = await api.post('/leaveHistory/insertpayroll_management',jobInformationData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getLeaveHistories = createAsyncThunk(
  'leaveHistory/getLeaveHistories',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/payrollmanagement/getPastLeaveHistory',{employee_id:id});
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getLeaveHistory = createAsyncThunk(
  'leaveHistory/getLeaveHistory',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/leaveHistory/getpayrollmanagementById',{payroll_management_id:id});
      return response.data.data[0];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteLeaveHistory = createAsyncThunk(
  'leaveHistory/deleteLeaveHistory',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/leaveHistory/deletepayroll_management',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateLeaveHistory = createAsyncThunk(
  'leaveHistory/updateLeaveHistory',
  async (updatedJobInformationData, { rejectWithValue }) => {
    try {
      console.log(updatedJobInformationData);
      const response = await api.post('/leaveHistory/editpayrollmanagementMain',
        // updatedpayrollManagementData.id,
        updatedJobInformationData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const leaveHistorySlice = createSlice({
  name: 'leaveHistory',
  initialState: {
    leaveHistory: {},
    leaveHistories: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createAnnualLeave.pending]: (state) => {
      state.loading = true;
    },
    [createAnnualLeave.fulfilled]: (state, action) => {
      state.loading = false;

      state.leaveHistories = [...state.leaveHistories, action.payload];
    },
    [createAnnualLeave.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getLeaveHistories.pending]: (state) => {
      state.loading = true;
    },
    [getLeaveHistories.fulfilled]: (state, action) => {
      state.loading = false;
      state.leaveHistories = action.payload;
      state.leaveHistory = {};
    },
    [getLeaveHistories.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getLeaveHistory.pending]: (state) => {
      state.loading = true;
    },
    [getLeaveHistory.fulfilled]: (state, action) => {
      state.loading = false;
      state.leaveHistory = action.payload;
    },
    [getLeaveHistory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteLeaveHistory.pending]: (state) => {
      state.loading = true;
    },
    [deleteLeaveHistory.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.leaveHistories = state.leaveHistories.filter((item) => item.id !== id);
      }
    },
    [deleteLeaveHistory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateLeaveHistory.pending]: (state) => {
      state.loading = true;
    },
    [updateLeaveHistory.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.leaveHistories.findIndex(
          (leaveHistory) => leaveHistory.id === action.payload.id
        );
        state.leaveHistories[index] = {
          ...state.leaveHistories[index],
          ...action.payload,
        };
      }
    },
    [updateLeaveHistory.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default leaveHistorySlice.reducer;