import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createTabPassType = createAsyncThunk(
  'tabPassType/createTabPassType',
  async (tabPassTypeData, { rejectWithValue }) => {
    try {
      const response = await api.post('/employeeModule/inserttabPassType',tabPassTypeData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTabPassTypes = createAsyncThunk(
  'tabPassType/getTabPassTypes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/employeeModule/TabPassType');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTabPassType = createAsyncThunk(
  'tabPassType/getTabPassType',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/employeeModule/getTabPassTypeById',{employee_id:id});
      return response.data.data[0];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTabPassType = createAsyncThunk(
  'tabPassType/deleteTabPassType',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/employeeModule/deleteTabPassType',{employee_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTabPassType = createAsyncThunk(
  'tabPassType/updateTabPassType',
  async (updatedtabPassTypeData, { rejectWithValue }) => {
    try {
      console.log(updatedtabPassTypeData);
      const response = await api.post('/employeeModule/edit-TabPassType',
        // updatedtabPassTypeData.id,
        updatedtabPassTypeData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const tabPassTypeSlice = createSlice({
  name: 'tabPassType',
  initialState: {
    tabPassType: {},
    tabPassTypes: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createTabPassType.pending]: (state) => {
      state.loading = true;
    },
    [createTabPassType.fulfilled]: (state, action) => {
      state.loading = false;

      state.tabPassTypes = [...state.tabPassTypes, action.payload];
    },
    [createTabPassType.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTabPassTypes.pending]: (state) => {
      state.loading = true;
    },
    [getTabPassTypes.fulfilled]: (state, action) => {
      state.loading = false;
      state.tabPassTypes = action.payload;
      state.tabPassType = {};
    },
    [getTabPassTypes.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTabPassType.pending]: (state) => {
      state.loading = true;
    },
    [getTabPassType.fulfilled]: (state, action) => {
      state.loading = false;
      state.tabPassType = action.payload;
    },
    [getTabPassType.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteTabPassType.pending]: (state) => {
      state.loading = true;
    },
    [deleteTabPassType.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.tabPassTypes = state.tabPassTypes.filter((item) => item.id !== id);
      }
    },
    [deleteTabPassType.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateTabPassType.pending]: (state) => {
      state.loading = true;
    },
    [updateTabPassType.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.tabPassTypes.findIndex(
          (tabPassType) => tabPassType.id === action.payload.id
        );
        state.tabPassTypes[index] = {
          ...state.tabPassTypes[index],
          ...action.payload,
        };
      }
    },
    [updateTabPassType.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default tabPassTypeSlice.reducer;