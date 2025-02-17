import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createPayrollManagement = createAsyncThunk(
  'payrollManagement/createPayrollManagement',
  async (payrollManagementData, { rejectWithValue }) => {
    try {
      const response = await api.post('/payrollmanagement/insertpayroll_management',payrollManagementData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getPayrollManagements = createAsyncThunk(
  'payrollManagement/getPayrollManagements',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/payrollmanagement/getpayrollmanagementMain');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getPayrollManagement = createAsyncThunk(
  'payrollManagement/getPayrollManagement',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/payrollmanagement/getpayrollmanagementById',{payroll_management_id:id});
      return response.data.data[0];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletePayrollManagement = createAsyncThunk(
  'payrollManagement/deletePayrollManagement',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/payrollmanagement/deletepayroll_management',{payroll_management_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updatePayrollManagement = createAsyncThunk(
  'payrollManagement/updatePayrollManagement',
  async (updatedpayrollManagementData, { rejectWithValue }) => {
    try {
      console.log(updatedpayrollManagementData);
      const response = await api.post('/payrollmanagement/editpayrollmanagementMain',
        // updatedpayrollManagementData.id,
        updatedpayrollManagementData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const payrollManagementSlice = createSlice({
  name: 'payrollManagement',
  initialState: {
    payrollManagement: {},
    payrollManagements: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createPayrollManagement.pending]: (state) => {
      state.loading = true;
    },
    [createPayrollManagement.fulfilled]: (state, action) => {
      state.loading = false;

      state.payrollManagements = [...state.payrollManagements, action.payload];
    },
    [createPayrollManagement.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getPayrollManagements.pending]: (state) => {
      state.loading = true;
    },
    [getPayrollManagements.fulfilled]: (state, action) => {
      state.loading = false;
      state.payrollManagements = action.payload;
      state.payrollManagement = {};
    },
    [getPayrollManagements.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getPayrollManagement.pending]: (state) => {
      state.loading = true;
    },
    [getPayrollManagement.fulfilled]: (state, action) => {
      state.loading = false;
      state.payrollManagement = action.payload;
    },
    [getPayrollManagement.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deletePayrollManagement.pending]: (state) => {
      state.loading = true;
    },
    [deletePayrollManagement.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.payrollManagements = state.payrollManagements.filter((item) => item.id !== id);
      }
    },
    [deletePayrollManagement.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updatePayrollManagement.pending]: (state) => {
      state.loading = true;
    },
    [updatePayrollManagement.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.payrollManagements.findIndex(
          (payrollManagement) => payrollManagement.id === action.payload.id
        );
        state.payrollManagements[index] = {
          ...state.payrollManagements[index],
          ...action.payload,
        };
      }
    },
    [updatePayrollManagement.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default payrollManagementSlice.reducer;