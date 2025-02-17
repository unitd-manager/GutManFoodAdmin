import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await api.post('/product/insertProduct',productData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/product/getProducts');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/product/getProductsById',{opportunity_id:id});
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/product/deleteProduct',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (updatedProductData, { rejectWithValue }) => {
    try {
      console.log(updatedProductData);
      const response = await api.post('/product/edit-Product',
        // updatedProductData.id,
        updatedProductData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: {},
    products: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createProduct.pending]: (state) => {
      state.loading = true;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = false;

      state.products = [...state.products, action.payload];
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getProducts.pending]: (state) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.product = {};
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getProduct.pending]: (state) => {
      state.loading = true;
    },
    [getProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    [getProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteProduct.pending]: (state) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.products = state.products.filter((item) => item.id !== id);
      }
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateProduct.pending]: (state) => {
      state.loading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = {
          ...state.products[index],
          ...action.payload,
        };
      }
    },
    [updateProduct.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default productSlice.reducer;