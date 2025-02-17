import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createJobInformation = createAsyncThunk(
  'jobInformation/createJobInformation',
  async (jobInformationData, { rejectWithValue }) => {
    try {
      const response = await api.post('/jobInformation/insertpayroll_management',jobInformationData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getJobInformations = createAsyncThunk(
  'jobInformation/getJobInformations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/jobInformation/getpayrollmanagementMain');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getJobInformation = createAsyncThunk(
  'jobInformation/getJobInformation',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/jobInformation/getpayrollmanagementById',{payroll_management_id:id});
      return response.data.data[0];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteJobInformation = createAsyncThunk(
  'jobInformation/deleteJobInformation',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/jobInformation/deletepayroll_management',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateJobInformation = createAsyncThunk(
  'jobInformation/updateJobInformation',
  async (updatedJobInformationData, { rejectWithValue }) => {
    try {
      console.log(updatedJobInformationData);
      const response = await api.post('/jobInformation/editpayrollmanagementMain',
        // updatedpayrollManagementData.id,
        updatedJobInformationData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const jobInformationSlice = createSlice({
  name: 'jobInformation',
  initialState: {
    jobInformation: {},
    jobInformations: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createJobInformation.pending]: (state) => {
      state.loading = true;
    },
    [createJobInformation.fulfilled]: (state, action) => {
      state.loading = false;

      state.jobInformations = [...state.jobInformations, action.payload];
    },
    [createJobInformation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getJobInformations.pending]: (state) => {
      state.loading = true;
    },
    [getJobInformations.fulfilled]: (state, action) => {
      state.loading = false;
      state.jobInformations = action.payload;
      state.jobInformation = {};
    },
    [getJobInformations.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getJobInformation.pending]: (state) => {
      state.loading = true;
    },
    [getJobInformation.fulfilled]: (state, action) => {
      state.loading = false;
      state.jobInformation = action.payload;
    },
    [getJobInformation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteJobInformation.pending]: (state) => {
      state.loading = true;
    },
    [deleteJobInformation.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.jobInformations = state.jobInformations.filter((item) => item.id !== id);
      }
    },
    [deleteJobInformation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateJobInformation.pending]: (state) => {
      state.loading = true;
    },
    [updateJobInformation.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.jobInformations.findIndex(
          (jobInformation) => jobInformation.id === action.payload.id
        );
        state.jobInformations[index] = {
          ...state.jobInformations[index],
          ...action.payload,
        };
      }
    },
    [updateJobInformation.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default jobInformationSlice.reducer;