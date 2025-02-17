import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createTabLeave = createAsyncThunk(
  'tabLeave/createTabLeave',
  async (tabLeaveData, { rejectWithValue }) => {
    try {
      const response = await api.post('/employee/inserttabLeave',tabLeaveData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTabLeaves = createAsyncThunk(
  'tabLeave/getTabLeaves',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/employee/TabLeave');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTabLeave = createAsyncThunk(
  'tabLeave/getTabLeave',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/employee/getTabLeavesById',{employee_id:id});
      return response.data.data[0];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTabLeave = createAsyncThunk(
  'tabLeave/deleteTabLeave',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/employee/deleteTabLeave',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTabLeave = createAsyncThunk(
  'tabLeave/updateTabLeave',
  async (updatedTabLeaveData, { rejectWithValue }) => {
    try {
      console.log(updatedTabLeaveData);
      const response = await api.post('/employee/edit-TabLeave',
        // updatedTabLeaveData.id,
        updatedTabLeaveData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const tabLeaveSlice = createSlice({
  name: 'tabLeave',
  initialState: {
    tabLeave: {},
    tabLeaves: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createTabLeave.pending]: (state) => {
      state.loading = true;
    },
    [createTabLeave.fulfilled]: (state, action) => {
      state.loading = false;

      state.tabLeaves = [...state.tabLeaves, action.payload];
    },
    [createTabLeave.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTabLeaves.pending]: (state) => {
      state.loading = true;
    },
    [getTabLeaves.fulfilled]: (state, action) => {
      state.loading = false;
      state.tabLeaves = action.payload;
      state.tabLeave = {};
    },
    [getTabLeaves.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTabLeave.pending]: (state) => {
      state.loading = true;
    },
    [getTabLeave.fulfilled]: (state, action) => {
      state.loading = false;
      state.tabLeave = action.payload;
    },
    [getTabLeave.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteTabLeave.pending]: (state) => {
      state.loading = true;
    },
    [deleteTabLeave.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.tabLeaves = state.tabLeaves.filter((item) => item.id !== id);
      }
    },
    [deleteTabLeave.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateTabLeave.pending]: (state) => {
      state.loading = true;
    },
    [updateTabLeave.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.tabLeaves.findIndex(
          (tabLeave) => tabLeave.id === action.payload.id
        );
        state.tabLeaves[index] = {
          ...state.tabLeaves[index],
          ...action.payload,
        };
      }
    },
    [updateTabLeave.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default tabLeaveSlice.reducer;