import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createEmployeeTimesheet = createAsyncThunk(
  'employeeTimesheet/createEmployeeTimesheet',
  async (employeeTimesheetData, { rejectWithValue }) => {
    try {
      const response = await api.post('/employeeTimesheet/insertemployeeTimesheet',employeeTimesheetData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getEmployeeTimesheets = createAsyncThunk(
  'employeeTimesheet/getEmployeeTimesheets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/employeeTimesheet/getEmployeeTimesheets');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getEmployeeTimesheet = createAsyncThunk(
  'employeeTimesheet/getEmployeeTimesheet',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/employeeTimesheet/getEmployeeTimesheetsById',{opportunity_id:id});
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteEmployeeTimesheet = createAsyncThunk(
  'employeeTimesheet/deleteEmployeeTimesheet',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/employeeTimesheet/deleteEmployeeTimesheet',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateEmployeeTimesheet = createAsyncThunk(
  'employeeTimesheet/updateEmployeeTimesheet',
  async (updatedEmployeeTimesheetData, { rejectWithValue }) => {
    try {
      console.log(updatedEmployeeTimesheetData);
      const response = await api.post('/employeeTimesheet/edit-employeeTimesheet',
        // updatedEmployeeTimesheetData.id,
        updatedEmployeeTimesheetData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const employeeTimesheetSlice = createSlice({
  name: 'employeeTimesheet',
  initialState: {
    employeeTimesheet: {},
    employeeTimesheets: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createEmployeeTimesheet.pending]: (state) => {
      state.loading = true;
    },
    [createEmployeeTimesheet.fulfilled]: (state, action) => {
      state.loading = false;

      state.employeeTimesheets = [...state.employeeTimesheets, action.payload];
    },
    [createEmployeeTimesheet.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getEmployeeTimesheets.pending]: (state) => {
      state.loading = true;
    },
    [getEmployeeTimesheets.fulfilled]: (state, action) => {
      state.loading = false;
      state.employeeTimesheets = action.payload;
      state.employeeTimesheet = {};
    },
    [getEmployeeTimesheets.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getEmployeeTimesheet.pending]: (state) => {
      state.loading = true;
    },
    [getEmployeeTimesheet.fulfilled]: (state, action) => {
      state.loading = false;
      state.employeeTimesheet = action.payload;
    },
    [getEmployeeTimesheet.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteEmployeeTimesheet.pending]: (state) => {
      state.loading = true;
    },
    [deleteEmployeeTimesheet.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.employeeTimesheets = state.employeeTimesheets.filter((item) => item.id !== id);
      }
    },
    [deleteEmployeeTimesheet.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateEmployeeTimesheet.pending]: (state) => {
      state.loading = true;
    },
    [updateEmployeeTimesheet.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.employeeTimesheets.findIndex(
          (employeeTimesheet) => employeeTimesheet.id === action.payload.id
        );
        state.employeeTimesheets[index] = {
          ...state.employeeTimesheets[index],
          ...action.payload,
        };
      }
    },
    [updateEmployeeTimesheet.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default employeeTimesheetSlice.reducer;