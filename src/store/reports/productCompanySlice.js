import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createProductCompany = createAsyncThunk(
  'productCompany/createProductCompany',
  async (productCompanyData, { rejectWithValue }) => {
    try {
      const response = await api.post('/product/insertProduct_Company',productCompanyData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProductCompanies = createAsyncThunk(
  'productCompany/getProductCompanies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/productCompany/getProductCompany');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProductCompany = createAsyncThunk(
  'productCompany/getProductCompany',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get('',id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteProductCompany = createAsyncThunk(
  'productCompany/deleteProductCompany',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/product/deleteProduct_Company',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProductCompany = createAsyncThunk(
  'productCompany/updateProductCompany',
  async (updatedProductCompanyData, { rejectWithValue }) => {
    try {
      console.log(updatedProductCompanyData);
      const response = await api.post('/tender/edit-Tenders',
        // updatedProductCompanyData.id,
        updatedProductCompanyData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const productCompanySlice = createSlice({
  name: 'productCompany',
  initialState: {
    productCompany: {},
    productCompanies: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createProductCompany.pending]: (state) => {
      state.loading = true;
    },
    [createProductCompany.fulfilled]: (state, action) => {
      state.loading = false;

      state.productCompanies = [...state.productCompanies, action.payload];
    },
    [createProductCompany.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getProductCompanies.pending]: (state) => {
      state.loading = true;
    },
    [getProductCompanies.fulfilled]: (state, action) => {
      state.loading = false;
      state.productCompanies = action.payload;
      state.productCompany = {};
    },
    [getProductCompanies.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getProductCompany.pending]: (state) => {
      state.loading = true;
    },
    [getProductCompany.fulfilled]: (state, action) => {
      state.loading = false;
      state.productCompany = action.payload;
    },
    [getProductCompany.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteProductCompany.pending]: (state) => {
      state.loading = true;
    },
    [deleteProductCompany.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.productCompanies = state.productCompanies.filter((item) => item.id !== id);
      }
    },
    [deleteProductCompany.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateProductCompany.pending]: (state) => {
      state.loading = true;
    },
    [updateProductCompany.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.productCompanies.findIndex(
          (company) => company.id === action.payload.id
        );
        state.productCompanies[index] = {
          ...state.productCompanies[index],
          ...action.payload,
        };
      }
    },
    [updateProductCompany.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default productCompanySlice.reducer;