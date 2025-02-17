import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createOpportunityEmployee = createAsyncThunk(
  'oppotunityEmployee/createOpportunityEmployee',
  async (oppotunityEmployeeData, { rejectWithValue }) => {
    try {
      const response = await api.post('/employee/insertOpportunityEmployee',oppotunityEmployeeData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getOppotunityEmployees = createAsyncThunk(
  'oppotunityEmployee/getOppotunityEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/employee/getTabEmployee');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getOppotunityEmployee = createAsyncThunk(
  'oppotunityEmployee/getOppotunityEmployee',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get('/employee/',id);
      return response.data[0];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteOppotunityEmployee = createAsyncThunk(
  'oppotunityEmployee/deleteOppotunityEmployee',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/employee/deleteOpportunityEmployee',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateOppotunityEmployee = createAsyncThunk(
  'oppotunityEmployee/updateOppotunityEmployee',
  async (updatedoppotunityEmployeeData, { rejectWithValue }) => {
    try {
      console.log(updatedoppotunityEmployeeData);
      const response = await api.post('/employee/edit-OpportunityEmployee',
        // updatedoppotunityEmployeeData.id,
        updatedoppotunityEmployeeData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const oppotunityEmployeeSlice = createSlice({
  name: 'oppotunityEmployee',
  initialState: {
    oppotunityEmployee: {},
    oppotunityEmployees: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createOpportunityEmployee.pending]: (state) => {
      state.loading = true;
    },
    [createOpportunityEmployee.fulfilled]: (state, action) => {
      state.loading = false;

      state.oppotunityEmployees = [...state.oppotunityEmployees, action.payload];
    },
    [createOpportunityEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getOppotunityEmployees.pending]: (state) => {
      state.loading = true;
    },
    [getOppotunityEmployees.fulfilled]: (state, action) => {
      state.loading = false;
      state.oppotunityEmployees = action.payload;
      state.oppotunityEmployee = {};
    },
    [getOppotunityEmployees.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getOppotunityEmployee.pending]: (state) => {
      state.loading = true;
    },
    [getOppotunityEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      state.oppotunityEmployee = action.payload;
    },
    [getOppotunityEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteOppotunityEmployee.pending]: (state) => {
      state.loading = true;
    },
    [deleteOppotunityEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.oppotunityEmployees = state.oppotunityEmployees.filter((item) => item.id !== id);
      }
    },
    [deleteOppotunityEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateOppotunityEmployee.pending]: (state) => {
      state.loading = true;
    },
    [updateOppotunityEmployee.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.oppotunityEmployees.findIndex(
          (company) => company.id === action.payload.id
        );
        state.oppotunityEmployees[index] = {
          ...state.oppotunityEmployees[index],
          ...action.payload,
        };
      }
    },
    [updateOppotunityEmployee.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default oppotunityEmployeeSlice.reducer;