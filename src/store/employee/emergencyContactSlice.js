import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createEmergencyContact = createAsyncThunk(
  'emergencyContact/createEmergencyContact',
  async (emergencyContactData, { rejectWithValue }) => {
    try {
      const response = await api.post('/employeeModule/insertemergencyContact',emergencyContactData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getEmergencyContacts = createAsyncThunk(
  'emergencyContact/getEmergencyContacts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/employeeModule/TabEmergencyContact');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getEmergencyContact = createAsyncThunk(
  'emergencyContact/getEmergencyContact',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/employeeModule/TabEmergencyContactById',{employee_id:id});
      return response.data.data[0];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteEmergencyContact = createAsyncThunk(
  'emergencyContact/deleteEmergencyContact',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/employeeModule/deleteEmergencyContact',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateEmergencyContact = createAsyncThunk(
  'emergencyContact/updateEmergencyContact',
  async (updatedEmergencyContactData, { rejectWithValue }) => {
    try {
      console.log(updatedEmergencyContactData);
      const response = await api.post('/employeeModule/edit-EmergencyContact',
        // updatedEmergencyContactData.id,
        updatedEmergencyContactData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const emergencyContactSlice = createSlice({
  name: 'emergencyContact',
  initialState: {
    emergencyContact: {},
    emergencyContacts: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createEmergencyContact.pending]: (state) => {
      state.loading = true;
    },
    [createEmergencyContact.fulfilled]: (state, action) => {
      state.loading = false;

      state.emergencyContacts = [...state.emergencyContacts, action.payload];
    },
    [createEmergencyContact.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getEmergencyContacts.pending]: (state) => {
      state.loading = true;
    },
    [getEmergencyContacts.fulfilled]: (state, action) => {
      state.loading = false;
      state.emergencyContacts = action.payload;
      state.emergencyContact = {};
    },
    [getEmergencyContacts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getEmergencyContact.pending]: (state) => {
      state.loading = true;
    },
    [getEmergencyContact.fulfilled]: (state, action) => {
      state.loading = false;
      state.emergencyContact = action.payload;
    },
    [getEmergencyContact.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteEmergencyContact.pending]: (state) => {
      state.loading = true;
    },
    [deleteEmergencyContact.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.emergencyContacts = state.emergencyContacts.filter((item) => item.id !== id);
      }
    },
    [deleteEmergencyContact.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateEmergencyContact.pending]: (state) => {
      state.loading = true;
    },
    [updateEmergencyContact.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.emergencyContacts.findIndex(
          (emergencyContact) => emergencyContact.id === action.payload.id
        );
        state.emergencyContacts[index] = {
          ...state.emergencyContacts[index],
          ...action.payload,
        };
      }
    },
    [updateEmergencyContact.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default emergencyContactSlice.reducer;