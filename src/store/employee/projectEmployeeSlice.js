import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createProjectEmployee = createAsyncThunk(
  'employee/createProjectEmployee',
  async (projectEmployeeData, { rejectWithValue }) => {
    try {
      const response = await api.post('/employee/insertemployee',projectEmployeeData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProjectEmployees = createAsyncThunk(
  'employee/getProjectEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/employee/getProjectEmployees');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProjectEmployee = createAsyncThunk(
  'employee/getProjectEmployee',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/employee/getProjectEmployeesById',{opportunity_id:id});
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteProjectEmployee = createAsyncThunk(
  'employee/deleteProjectEmployee',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/employee/deleteProjectEmployee',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProjectEmployee = createAsyncThunk(
  'employee/updateProjectEmployee',
  async (updatedProjectprojectEmployeeData, { rejectWithValue }) => {
    try {
      console.log(updatedProjectprojectEmployeeData);
      const response = await api.post('/employee/edit-employee',
        // updatedProjectprojectEmployeeData.id,
        updatedProjectprojectEmployeeData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const projectEmployeeSlice = createSlice({
  name: 'projectEmployee',
  initialState: {
    projectEmployee: {},
    projectEmployees: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createProjectEmployee.pending]: (state) => {
      state.loading = true;
    },
    [createProjectEmployee.fulfilled]: (state, action) => {
      state.loading = false;

      state.projectEmployees = [...state.projectEmployees, action.payload];
    },
    [createProjectEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getProjectEmployees.pending]: (state) => {
      state.loading = true;
    },
    [getProjectEmployees.fulfilled]: (state, action) => {
      state.loading = false;
      state.projectEmployees = action.payload;
      state.projectEmployee = {};
    },
    [getProjectEmployees.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getProjectEmployee.pending]: (state) => {
      state.loading = true;
    },
    [getProjectEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      state.projectEmployee = action.payload;
    },
    [getProjectEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteProjectEmployee.pending]: (state) => {
      state.loading = true;
    },
    [deleteProjectEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.projectEmployees = state.projectEmployees.filter((item) => item.id !== id);
      }
    },
    [deleteProjectEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateProjectEmployee.pending]: (state) => {
      state.loading = true;
    },
    [updateProjectEmployee.fulfilled]: (state, action) => {
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
          (employee) => projectEmployee.id === action.payload.id
        );
        state.employees[index] = {
          ...state.projectEmployees[index],
          ...action.payload,
        };
      }
    },
    [updateProjectEmployee.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default projectEmployeeSlice.reducer;