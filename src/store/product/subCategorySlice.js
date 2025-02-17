import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createSubCategory = createAsyncThunk(
  'subCategory/createSubCategory',
  async (subCategoryData, { rejectWithValue }) => {
    try {
      const response = await api.post('/product/insertSubCategory',subCategoryData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getSubCategories = createAsyncThunk(
  'subCategory/getSubCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/subCategory/getSubCategories');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getSubCategory = createAsyncThunk(
  'subCategory/getSubCategory',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/subCategory/getSubCategoriesById',{opportunity_id:id});
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteSubCategory = createAsyncThunk(
  'subCategory/deleteSubCategory',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/subCategory/deleteSub_Category',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateSubCategory = createAsyncThunk(
  'subCategory/updateSubCategory',
  async (updatedSubCategoryData, { rejectWithValue }) => {
    try {
      console.log(updatedSubCategoryData);
      const response = await api.post('/subCategory/edit-subCategories',
        // updatedSubCategoryData.id,
        updatedSubCategoryData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const subCategorySlice = createSlice({
  name: 'subCategory',
  initialState: {
    subCategory: {},
    subCategories: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createSubCategory.pending]: (state) => {
      state.loading = true;
    },
    [createSubCategory.fulfilled]: (state, action) => {
      state.loading = false;

      state.subCategories = [...state.subCategories, action.payload];
    },
    [createSubCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getSubCategories.pending]: (state) => {
      state.loading = true;
    },
    [getSubCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.subCategories = action.payload;
      state.subCategory = {};
    },
    [getSubCategories.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getSubCategory.pending]: (state) => {
      state.loading = true;
    },
    [getSubCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.subCategory = action.payload;
    },
    [getSubCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteSubCategory.pending]: (state) => {
      state.loading = true;
    },
    [deleteSubCategory.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.subCategories = state.subCategories.filter((item) => item.id !== id);
      }
    },
    [deleteSubCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateSubCategory.pending]: (state) => {
      state.loading = true;
    },
    [updateSubCategory.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.subCategories.findIndex(
          (subCategory) => subCategory.id === action.payload.id
        );
        state.subCategorys[index] = {
          ...state.subCategories[index],
          ...action.payload,
        };
      }
    },
    [updateSubCategory.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default subCategorySlice.reducer;