import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createContact = createAsyncThunk(
  'contact/createContact',
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await api.post('/contact/insertcontact',contactData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async (companyId, { rejectWithValue }) => {
    try {
      const response = await api.post('/company/getcontactByCompanyId',{company_id:companyId});
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getContact = createAsyncThunk(
  'contact/getContact',
  async (companyId, { rejectWithValue }) => {
    try {
      const response = await api.post('/company/getcontactByCompanyId',{company_id:companyId});
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contact/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/contact/deleteContact',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateContact = createAsyncThunk(
  'contact/updateContact',
  async (updatedContactData, { rejectWithValue }) => {
    try {
      console.log(updatedContactData);
      const response = await api.post('/contact/edit-Contacts',
        // updatedContactData.id,
        updatedContactData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contact: {},
    contacts: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createContact.pending]: (state) => {
      state.loading = true;
    },
    [createContact.fulfilled]: (state, action) => {
      state.loading = false;

      state.contacts = [...state.contacts, action.payload];
    },
    [createContact.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getContacts.pending]: (state) => {
      state.loading = true;
    },
    [getContacts.fulfilled]: (state, action) => {
      state.loading = false;
      state.contacts = action.payload;
      state.contact = {};
    },
    [getContacts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getContact.pending]: (state) => {
      state.loading = true;
    },
    [getContact.fulfilled]: (state, action) => {
      state.loading = false;
      state.contact = action.payload;
    },
    [getContact.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteContact.pending]: (state) => {
      state.loading = true;
    },
    [deleteContact.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.contacts = state.contacts.filter((item) => item.id !== id);
      }
    },
    [deleteContact.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateContact.pending]: (state) => {
      state.loading = true;
    },
    [updateContact.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.contacts.findIndex(
          (contact) => contact.id === action.payload.id
        );
        state.contacts[index] = {
          ...state.contacts[index],
          ...action.payload,
        };
      }
    },
    [updateContact.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default contactSlice.reducer;