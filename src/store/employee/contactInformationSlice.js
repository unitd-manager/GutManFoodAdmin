import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createContactInformation = createAsyncThunk(
  'contactInformation/createContactInformation',
  async (contactInformationData, { rejectWithValue }) => {
    try {
      const response = await api.post('/employeeModule/insertcontactInformation',contactInformationData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getContactInformations = createAsyncThunk(
  'contactInformation/getContactInformations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/employeeModule/TabContactInformation');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getContactInformation = createAsyncThunk(
  'contactInformation/getContactInformation',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/employeeModule/TabContactInformationById',{employee_id:id});
      return response.data.data[0];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteContactInformation = createAsyncThunk(
  'contactInformation/deleteContactInformation',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/employeeModule/deleteSub_Category',{employee_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateContactInformation = createAsyncThunk(
  'contactInformation/updateContactInformation',
  async (updatedcontactInformationData, { rejectWithValue }) => {
    try {
      console.log(updatedcontactInformationData);
      const response = await api.post('/employeeModule/edit-ContactInformation',
        // updatedcontactInformationData.id,
        updatedcontactInformationData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const contactInformationSlice = createSlice({
  name: 'contactInformation',
  initialState: {
    contactInformation: {},
    contactInformations: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createContactInformation.pending]: (state) => {
      state.loading = true;
    },
    [createContactInformation.fulfilled]: (state, action) => {
      state.loading = false;

      state.contactInformations = [...state.contactInformations, action.payload];
    },
    [createContactInformation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getContactInformations.pending]: (state) => {
      state.loading = true;
    },
    [getContactInformations.fulfilled]: (state, action) => {
      state.loading = false;
      state.contactInformations = action.payload;
      state.contactInformation = {};
    },
    [getContactInformations.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getContactInformation.pending]: (state) => {
      state.loading = true;
    },
    [getContactInformation.fulfilled]: (state, action) => {
      state.loading = false;
      state.contactInformation = action.payload;
    },
    [getContactInformation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteContactInformation.pending]: (state) => {
      state.loading = true;
    },
    [deleteContactInformation.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.contactInformations = state.contactInformations.filter((item) => item.id !== id);
      }
    },
    [deleteContactInformation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateContactInformation.pending]: (state) => {
      state.loading = true;
    },
    [updateContactInformation.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.contactInformations.findIndex(
          (contactInformation) => contactInformation.id === action.payload.id
        );
        state.contactInformations[index] = {
          ...state.contactInformations[index],
          ...action.payload,
        };
      }
    },
    [updateContactInformation.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default contactInformationSlice.reducer;