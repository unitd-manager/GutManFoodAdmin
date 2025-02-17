import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createSite = createAsyncThunk(
  'site/createSite',
  async (siteData, { rejectWithValue }) => {
    try {
      const response = await api.post('/inventory/insertsite',siteData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getSites = createAsyncThunk(
  'site/getSites',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/inventory/getSites');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getSite = createAsyncThunk(
  'site/getSite',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/inventory/getSitesById',{opportunity_id:id});
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteSite = createAsyncThunk(
  'site/deleteSite',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/inventory/deleteSite',{opportunity_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateSite = createAsyncThunk(
  'site/updateSite',
  async (updatedSiteData, { rejectWithValue }) => {
    try {
      console.log(updatedSiteData);
      const response = await api.post('/inventory/edit-site',
        // updatedsiteData.id,
        updatedSiteData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const siteSlice = createSlice({
  name: 'site',
  initialState: {
    site: {},
    sites: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createSite.pending]: (state) => {
      state.loading = true;
    },
    [createSite.fulfilled]: (state, action) => {
      state.loading = false;

      state.sites = [...state.sites, action.payload];
    },
    [createSite.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getSites.pending]: (state) => {
      state.loading = true;
    },
    [getSites.fulfilled]: (state, action) => {
      state.loading = false;
      state.sites = action.payload;
      state.site = {};
    },
    [getSites.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getSite.pending]: (state) => {
      state.loading = true;
    },
    [getSite.fulfilled]: (state, action) => {
      state.loading = false;
      state.site = action.payload;
    },
    [getSite.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteSite.pending]: (state) => {
      state.loading = true;
    },
    [deleteSite.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.sites = state.sites.filter((item) => item.id !== id);
      }
    },
    [deleteSite.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateSite.pending]: (state) => {
      state.loading = true;
    },
    [updateSite.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.sites.findIndex(
          (site) => site.id === action.payload.id
        );
        state.sites[index] = {
          ...state.sites[index],
          ...action.payload,
        };
      }
    },
    [updateSite.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default siteSlice.reducer;