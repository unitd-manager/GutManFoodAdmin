import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createTabProjectLinked = createAsyncThunk(
  'tabProjectLinked/createTabProjectLinked',
  async (tabProjectLinkedData, { rejectWithValue }) => {
    try {
      const response = await api.post('/inventory/inserttabProjectLinked',tabProjectLinkedData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTabProjectsLinked = createAsyncThunk(
  'tabProjectLinked/getTabProjectsLinked',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/inventory/getTabProjectLinked');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTabProjectLinked = createAsyncThunk(
  'tabProjectLinked/getTabProjectLinked',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/inventory/getTabProjectLinkedById',{inventory_id:id});
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTabProjectLinked = createAsyncThunk(
  'tabProjectLinked/deleteTabProjectLinked',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/inventory/deleteTabProjectLinked',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTabProjectLinked = createAsyncThunk(
  'tabProjectLinked/updateTabProjectLinked',
  async (updatedTabProjectLinkedData, { rejectWithValue }) => {
    try {
      console.log(updatedTabProjectLinkedData);
      const response = await api.post('/inventory/edit-tabProjectsLinked',
        // updatedTabProjectLinkedData.id,
        updatedTabProjectLinkedData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const tabProjectLinkedSlice = createSlice({
  name: 'tabProjectLinked',
  initialState: {
    tabProjectLinked: {},
    tabProjectsLinked: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createTabProjectLinked.pending]: (state) => {
      state.loading = true;
    },
    [createTabProjectLinked.fulfilled]: (state, action) => {
      state.loading = false;

      state.tabProjectsLinked = [...state.tabProjectsLinked, action.payload];
    },
    [createTabProjectLinked.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTabProjectsLinked.pending]: (state) => {
      state.loading = true;
    },
    [getTabProjectsLinked.fulfilled]: (state, action) => {
      state.loading = false;
      state.tabProjectsLinked = action.payload;
      state.tabProjectLinked = {};
    },
    [getTabProjectsLinked.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTabProjectLinked.pending]: (state) => {
      state.loading = true;
    },
    [getTabProjectLinked.fulfilled]: (state, action) => {
      state.loading = false;
      state.tabProjectLinked = action.payload;
    },
    [getTabProjectLinked.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteTabProjectLinked.pending]: (state) => {
      state.loading = true;
    },
    [deleteTabProjectLinked.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.tabProjectsLinked = state.tabProjectsLinked.filter((item) => item.id !== id);
      }
    },
    [deleteTabProjectLinked.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateTabProjectLinked.pending]: (state) => {
      state.loading = true;
    },
    [updateTabProjectLinked.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.tabProjectsLinked.findIndex(
          (tabProjectLinked) => tabProjectLinked.id === action.payload.id
        );
        state.tabProjectLinkeds[index] = {
          ...state.tabProjectsLinked[index],
          ...action.payload,
        };
      }
    },
    [updateTabProjectLinked.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default tabProjectLinkedSlice.reducer;