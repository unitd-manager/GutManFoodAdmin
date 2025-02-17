import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await api.post('/product/insertCategory',categoryData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCategories = createAsyncThunk(
  'category/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/product/getCategory');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCategory = createAsyncThunk(
  'category/getCategory',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/category/getCategoriesById',{opportunity_id:id});
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/product/deleteCategory',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async (updatedCategoryData, { rejectWithValue }) => {
    try {
      console.log(updatedCategoryData);
      const response = await api.post('/category/edit-categories',
        // updatedCategoryData.id,
        updatedCategoryData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    category: {},
    categories: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createCategory.pending]: (state) => {
      state.loading = true;
    },
    [createCategory.fulfilled]: (state, action) => {
      state.loading = false;

      state.categories = [...state.categories, action.payload];
    },
    [createCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getCategories.pending]: (state) => {
      state.loading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.category = {};
    },
    [getCategories.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getCategory.pending]: (state) => {
      state.loading = true;
    },
    [getCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.category = action.payload;
    },
    [getCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteCategory.pending]: (state) => {
      state.loading = true;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.categories = state.categories.filter((item) => item.id !== id);
      }
    },
    [deleteCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateCategory.pending]: (state) => {
      state.loading = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        const index = state.categories.findIndex(
          (category) => category.id === action.payload.id
        );
        state.categorys[index] = {
          ...state.categories[index],
          ...action.payload,
        };
      }
    },
    [updateCategory.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default categorySlice.reducer;