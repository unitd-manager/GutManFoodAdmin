import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createUserGroup = createAsyncThunk(
  'userGroup/createUserGroup',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await api.post('/userGroup/insertProduct',productData);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserGroups = createAsyncThunk(
  'userGroup/getUserGroups',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/usergroup/getusergroup');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserGroup = createAsyncThunk(
  'userGroup/getUserGroup',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/userGroup/getUserGroup',{product_id:id});
      return response.data.data[0];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteUserGroup = createAsyncThunk(
  'userGroup/deleteUserGroup',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/userGroup/deleteUserGroup',{product_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUserGroup = createAsyncThunk(
  'userGroup/updateUserGroup',
  async (updatedUSerGroupData, { rejectWithValue }) => {
    try {
      console.log(updatedUSerGroupData);
      const response = await api.post('/userGroup/edit-userGroup',
        // updatedUSerGroupData.id,
        updatedUSerGroupData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userGroupSlice = createSlice({
  name: 'userGroup',
  initialState: {
    userGroup: {},
    userGroups: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createUserGroup.pending]: (state) => {
      state.loading = true;
    },
    [createUserGroup.fulfilled]: (state, action) => {
      state.loading = false;

      state.userGroups = [...state.userGroups, action.payload];
    },
    [createUserGroup.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getUserGroups.pending]: (state) => {
      state.loading = true;
    },
    [getUserGroups.fulfilled]: (state, action) => {
      state.loading = false;
      state.userGroups = action.payload;
      state.userGroup = {};
    },
    [getUserGroups.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getUserGroup.pending]: (state) => {
      state.loading = true;
    },
    [getUserGroup.fulfilled]: (state, action) => {
      state.loading = false;
      state.userGroup = action.payload;
    },
    [getUserGroup.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteUserGroup.pending]: (state) => {
      state.loading = true;
    },
    [deleteUserGroup.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userGroups = state.userGroups.filter((item) => item.id !== id);
      }
    },
    [deleteUserGroup.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateUserGroup.pending]: (state) => {
      state.loading = true;
    },
    [updateUserGroup.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.userGroups.findIndex(
          (userGroup) => userGroup.id === action.payload.id
        );
        state.userGroups[index] = {
          ...state.userGroups[index],
          ...action.payload,
        };
      }
    },
    [updateUserGroup.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default userGroupSlice.reducer;