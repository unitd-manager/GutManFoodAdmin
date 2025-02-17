import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createloanHistory = createAsyncThunk(
  'loanHistory/createloanHistory',
  async (jobInformationData, { rejectWithValue }) => {
    try {
      const response = await api.post('/loan/insertpayroll_management',jobInformationData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getLoanHistories = createAsyncThunk(
  'loanHistory/getLoanHistories',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/loan/getLeaveByEmpId',{employee_id:id});
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getLoanHistory = createAsyncThunk(
  'loanHistory/getLoanHistory',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/loan/getpayrollmanagementById',{payroll_management_id:id});
      return response.data.data[0];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteLoanHistory = createAsyncThunk(
  'loanHistory/deleteLoanHistory',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/loan/deletepayroll_management',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateLoanHistory = createAsyncThunk(
  'loanHistory/updateLoanHistory',
  async (updatedJobInformationData, { rejectWithValue }) => {
    try {
      console.log(updatedJobInformationData);
      const response = await api.post('/loan/editpayrollmanagementMain',
        // updatedpayrollManagementData.id,
        updatedJobInformationData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const loanHistorySlice = createSlice({
  name: 'loanHistory',
  initialState: {
    loanHistory: {},
    loanHistories: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createloanHistory.pending]: (state) => {
      state.loading = true;
    },
    [createloanHistory.fulfilled]: (state, action) => {
      state.loading = false;

      state.loanHistories = [...state.loanHistories, action.payload];
    },
    [createloanHistory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getLoanHistories.pending]: (state) => {
      state.loading = true;
    },
    [getLoanHistories.fulfilled]: (state, action) => {
      state.loading = false;
      state.loanHistories = action.payload;
      state.loanHistory = {};
    },
    [getLoanHistories.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getLoanHistory.pending]: (state) => {
      state.loading = true;
    },
    [getLoanHistory.fulfilled]: (state, action) => {
      state.loading = false;
      state.loanHistory = action.payload;
    },
    [getLoanHistory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteLoanHistory.pending]: (state) => {
      state.loading = true;
    },
    [deleteLoanHistory.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.loanHistories = state.loanHistories.filter((item) => item.id !== id);
      }
    },
    [deleteLoanHistory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateLoanHistory.pending]: (state) => {
      state.loading = true;
    },
    [updateLoanHistory.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.loanHistories.findIndex(
          (loanHistory) => loanHistory.id === action.payload.id
        );
        state.loanHistories[index] = {
          ...state.loanHistories[index],
          ...action.payload,
        };
      }
    },
    [updateLoanHistory.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default loanHistorySlice.reducer;