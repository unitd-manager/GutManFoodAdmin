import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createSection = createAsyncThunk(
  'section/createSection',
  async (sectionData, { rejectWithValue }) => {
    try {
      const response = await api.post('/product/insertSection',sectionData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getSections = createAsyncThunk(
  'section/getSections',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/section/getSections');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getSection = createAsyncThunk(
  'section/getSection',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/section/getSectionsById',{opportunity_id:id});
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteSection = createAsyncThunk(
  'section/deleteSection',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/product/deleteSection',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateSection = createAsyncThunk(
  'section/updateSection',
  async (updatedSectionData, { rejectWithValue }) => {
    try {
      console.log(updatedSectionData);
      const response = await api.post('/section/edit-sections',
        // updatedSectionData.id,
        updatedSectionData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const sectionSlice = createSlice({
  name: 'section',
  initialState: {
    section: {},
    sections: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createSection.pending]: (state) => {
      state.loading = true;
    },
    [createSection.fulfilled]: (state, action) => {
      state.loading = false;

      state.sections = [...state.sections, action.payload];
    },
    [createSection.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getSections.pending]: (state) => {
      state.loading = true;
    },
    [getSections.fulfilled]: (state, action) => {
      state.loading = false;
      state.sections = action.payload;
      state.section = {};
    },
    [getSections.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getSection.pending]: (state) => {
      state.loading = true;
    },
    [getSection.fulfilled]: (state, action) => {
      state.loading = false;
      state.section = action.payload;
    },
    [getSection.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteSection.pending]: (state) => {
      state.loading = true;
    },
    [deleteSection.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.sections = state.sections.filter((item) => item.id !== id);
      }
    },
    [deleteSection.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateSection.pending]: (state) => {
      state.loading = true;
    },
    [updateSection.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.sections.findIndex(
          (section) => section.id === action.payload.id
        );
        state.sections[index] = {
          ...state.sections[index],
          ...action.payload,
        };
      }
    },
    [updateSection.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default sectionSlice.reducer;