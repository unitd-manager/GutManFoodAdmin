import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createTender = createAsyncThunk(
  'tender/createTender',
  async (tenderData, { rejectWithValue }) => {
    try {
      const response = await api.post('/tender/insertTender',tenderData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTenders = createAsyncThunk(
  'tender/getTenders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/tender/getTenders');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTender = createAsyncThunk(
  'tender/getTender',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/tender/getTendersById',{opportunity_id:id});
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTender = createAsyncThunk(
  'tender/deleteTender',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/tender/deleteTender',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTender = createAsyncThunk(
  'tender/updateTender',
  async (updatedTenderData, { rejectWithValue }) => {
    try {
      console.log(updatedTenderData);
      const response = await api.post('/tender/edit-Tenders',
        // updatedTenderData.id,
        updatedTenderData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const tenderSlice = createSlice({
  name: 'tender',
  initialState: {
    tender: {},
    tenders: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createTender.pending]: (state) => {
      state.loading = true;
    },
    [createTender.fulfilled]: (state, action) => {
      state.loading = false;

      state.tenders = [...state.tenders, action.payload];
    },
    [createTender.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTenders.pending]: (state) => {
      state.loading = true;
    },
    [getTenders.fulfilled]: (state, action) => {
      state.loading = false;
      state.tenders = action.payload;
      state.tender = {};
    },
    [getTenders.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getTender.pending]: (state) => {
      state.loading = true;
    },
    [getTender.fulfilled]: (state, action) => {
      state.loading = false;
      state.tender = action.payload;
    },
    [getTender.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteTender.pending]: (state) => {
      state.loading = true;
    },
    [deleteTender.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.tenders = state.tenders.filter((item) => item.id !== id);
      }
    },
    [deleteTender.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateTender.pending]: (state) => {
      state.loading = true;
    },
    [updateTender.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.tenders.findIndex(
          (tender) => tender.id === action.payload.id
        );
        state.tenders[index] = {
          ...state.tenders[index],
          ...action.payload,
        };
      }
    },
    [updateTender.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default tenderSlice.reducer;