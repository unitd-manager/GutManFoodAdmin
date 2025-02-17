import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createJobInformationHistory = createAsyncThunk(
  'jobInformationHistory/createJobInformationHistory',
  async (jobInformationHistoryData, { rejectWithValue }) => {
    try {
      const response = await api.post('/employeeModule/insertjobInformationHistory',jobInformationHistoryData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getJobInformationHistories = createAsyncThunk(
  'jobInformationHistory/getJobInformationHistories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/employeeModule/TabJobInformationHistory');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getJobInformationHistory = createAsyncThunk(
  'jobInformationHistory/getJobInformationHistory',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/employeeModule/TabJobInformationHistoryById',{employee_id:id});
      return response.data.data[0];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteJobInformationHistory = createAsyncThunk(
  'jobInformationHistory/deleteJobInformationHistory',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/employeeModule/deleteJobInformationHistory',{employee_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateJobInformationHistory = createAsyncThunk(
  'jobInformationHistory/updateJobInformationHistory',
  async (updatedJobInformationHistoryData, { rejectWithValue }) => {
    try {
      console.log(updatedJobInformationHistoryData);
      const response = await api.post('/employeeModule/edit-JobInformationHistory',
        // updatedJobInformationHistoryData.id,
        updatedJobInformationHistoryData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const jobInformationHistorySlice = createSlice({
  name: 'jobInformationHistory',
  initialState: {
    jobInformationHistory: {},
    jobInformationHistories: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createJobInformationHistory.pending]: (state) => {
      state.loading = true;
    },
    [createJobInformationHistory.fulfilled]: (state, action) => {
      state.loading = false;

      state.jobInformationHistories = [...state.jobInformationHistories, action.payload];
    },
    [createJobInformationHistory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getJobInformationHistories.pending]: (state) => {
      state.loading = true;
    },
    [getJobInformationHistories.fulfilled]: (state, action) => {
      state.loading = false;
      state.jobInformationHistories = action.payload;
      state.jobInformationHistory = {};
    },
    [getJobInformationHistories.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getJobInformationHistory.pending]: (state) => {
      state.loading = true;
    },
    [getJobInformationHistory.fulfilled]: (state, action) => {
      state.loading = false;
      state.jobInformationHistory = action.payload;
    },
    [getJobInformationHistory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteJobInformationHistory.pending]: (state) => {
      state.loading = true;
    },
    [deleteJobInformationHistory.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.jobInformationHistories = state.jobInformationHistories.filter((item) => item.id !== id);
      }
    },
    [deleteJobInformationHistory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateJobInformationHistory.pending]: (state) => {
      state.loading = true;
    },
    [updateJobInformationHistory.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.jobInformationHistories.findIndex(
          (jobInformationHistory) => jobInformationHistory.id === action.payload.id
        );
        state.jobInformationHistories[index] = {
          ...state.jobInformationHistories[index],
          ...action.payload,
        };
      }
    },
    [updateJobInformationHistory.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default jobInformationHistorySlice.reducer;