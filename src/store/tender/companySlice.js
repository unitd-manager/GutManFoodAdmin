import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createCompany = createAsyncThunk(
  'company/createCompany',
  async (companyData, { rejectWithValue }) => {
    try {
      const response = await api.post('/company/insertCompany',companyData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCompanies = createAsyncThunk(
  'company/getCompanies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/company/getCompany');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCompany = createAsyncThunk(
  'company/getCompany',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get('',id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteCompany = createAsyncThunk(
  'company/deleteCompany',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/company/deleteCompany',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCompany = createAsyncThunk(
  'company/updateCompany',
  async (updatedCompanyData, { rejectWithValue }) => {
    try {
      console.log(updatedCompanyData);
      const response = await api.post('/tender/edit-Tenders',
        // updatedCompanyData.id,
        updatedCompanyData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState: {
    company: {},
    companies: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createCompany.pending]: (state) => {
      state.loading = true;
    },
    [createCompany.fulfilled]: (state, action) => {
      state.loading = false;

      state.companies = [...state.companies, action.payload];
    },
    [createCompany.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getCompanies.pending]: (state) => {
      state.loading = true;
    },
    [getCompanies.fulfilled]: (state, action) => {
      state.loading = false;
      state.companies = action.payload;
      state.company = {};
    },
    [getCompanies.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getCompany.pending]: (state) => {
      state.loading = true;
    },
    [getCompany.fulfilled]: (state, action) => {
      state.loading = false;
      state.company = action.payload;
    },
    [getCompany.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteCompany.pending]: (state) => {
      state.loading = true;
    },
    [deleteCompany.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.companies = state.companies.filter((item) => item.id !== id);
      }
    },
    [deleteCompany.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateCompany.pending]: (state) => {
      state.loading = true;
    },
    [updateCompany.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.companies.findIndex(
          (company) => company.id === action.payload.id
        );
        state.companies[index] = {
          ...state.companies[index],
          ...action.payload,
        };
      }
    },
    [updateCompany.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default companySlice.reducer;