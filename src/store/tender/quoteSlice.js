import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createQuote = createAsyncThunk(
  'quote/createQuote',
  async (quoteData, { rejectWithValue }) => {
    try {
      const response = await api.post('/quote/insertTender',quoteData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getQuote = createAsyncThunk(
    'quote/getQuote',
    async (id, { rejectWithValue }) => {
      try {
        const response = await api.post('/tender/getquoteById',{opportunity_id:id});
        return response.data.data[0];
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const getQuotes = createAsyncThunk(
    'quote/getQuotes',
    async (id, { rejectWithValue }) => {
      try {
        const response = await api.post('/tender/getquoteById',{opportunity_id:id});
        return response.data.data[0];
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const updateQuote = createAsyncThunk(
    'quote/updateQuote',
    async (quoteData, { rejectWithValue }) => {
      try {
        console.log(quoteData);
        const response = await api.post('/tender/edit-TabQuote',quoteData)
  
        return response.data.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const deleteQuote = createAsyncThunk(
    'quote/deleteQuote',
    async (id, { rejectWithValue }) => {
      try {
        const response = await api.post('/quote/deleteQuote',{opportunity_id:id});
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  const quoteSlice = createSlice({
    name: 'quote',
    initialState: {
      quote: {},
      quotes:[],
      error: '',
      loading: false,
    },
    extraReducers: {
      [createQuote.pending]: (state) => {
        state.loading = true;
      },
      [createQuote.fulfilled]: (state, action) => {
        state.loading = false;
  
        state.quotes = [...state.quotes, action.payload];
      },
      [createQuote.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },

      [getQuote.pending]: (state) => {
        state.loading = true;
      },
      [getQuote.fulfilled]: (state, action) => {
        state.loading = false;
        state.quote = action.payload;
      },
      [getQuote.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [getQuotes.pending]: (state) => {
        state.loading = true;
      },
      [getQuotes.fulfilled]: (state, action) => {
        state.loading = false;
        state.quotes = action.payload;
        state.quote = {};
      },
      [getQuotes.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
      [updateQuote.pending]: (state) => {
        state.loading = true;
      },
      [updateQuote.fulfilled]: (state, action) => {
        state.loading = false;
        console.log('action', action);
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          //   state.cenders = state.cenders.map((item) =>
  
          //      item.id === id ? item=action.payload :item = item
  
          //   );
  
          const index = state.quote.findIndex(
            (quote) => quote.id === action.payload.id
          );
          state.quote[index] = {
            ...state.quote[index],
            ...action.payload,
          };
        }
      },
      [updateQuote.rejected]: (state, obj, action) => {
        console.log({ rejected: obj });
        state.loading = false;
        state.error = action.payload.message;
      },
      [deleteQuote.pending]: (state) => {
        state.loading = true;
      },
      [deleteQuote.fulfilled]: (state, action) => {
        state.loading = false;
        console.log('action', action);
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.quotes = state.quotes.filter((item) => item.id !== id);
        }
      },
      [deleteQuote.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
    },
  });
  
  export default quoteSlice.reducer;