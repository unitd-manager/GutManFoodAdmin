import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createEmployee = createAsyncThunk(
  'employee/createEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await api.post('/employeeModule/insertEmployee',employeeData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getEmployees = createAsyncThunk(
  'employee/getEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/employeeModule/getEmployee');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getEmployee = createAsyncThunk(
  'employee/getEmployee',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/employeeModule/getEmployeeById',{employee_id:id});
      return response.data.data[0];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  'employee/deleteEmployee',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/employeeModule/deleteEmployee',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'employee/updateEmployee',
  async (updatedEmployeeData, { rejectWithValue }) => {
    try {
      console.log(updatedEmployeeData);
      const response = await api.post('/employeeModule/edit-Employee',
        // updatedEmployeeData.id,
        updatedEmployeeData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employee: {},
    employees: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createEmployee.pending]: (state) => {
      state.loading = true;
    },
    [createEmployee.fulfilled]: (state, action) => {
      state.loading = false;

      state.employees = [...state.employees, action.payload];
    },
    [createEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getEmployees.pending]: (state) => {
      state.loading = true;
    },
    [getEmployees.fulfilled]: (state, action) => {
      state.loading = false;
      state.employees = action.payload;
      state.employee = {};
    },
    [getEmployees.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getEmployee.pending]: (state) => {
      state.loading = true;
    },
    [getEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      state.employee = action.payload;
    },
    [getEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteEmployee.pending]: (state) => {
      state.loading = true;
    },
    [deleteEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.employees = state.employees.filter((item) => item.id !== id);
      }
    },
    [deleteEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateEmployee.pending]: (state) => {
      state.loading = true;
    },
    [updateEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.employees.findIndex(
          (employee) => employee.id === action.payload.id
        );
        state.employees[index] = {
          ...state.employees[index],
          ...action.payload,
        };
      }
    },
    [updateEmployee.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default employeeSlice.reducer;