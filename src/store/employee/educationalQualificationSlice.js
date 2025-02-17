import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../constants/api';

export const createEducationalQualification = createAsyncThunk(
  'educationalQualification/createEducationalQualification',
  async (educationalQualificationData, { rejectWithValue }) => {
    try {
      const response = await api.post('/employeeModule/inserteducationalQualification',educationalQualificationData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getEducationalQualifications = createAsyncThunk(
  'educationalQualification/getEducationalQualifications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/employeeModule/TabEducationalQualification');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getEducationalQualification = createAsyncThunk(
  'educationalQualification/getEducationalQualification',
  async (id, { rejectWithValue }) => {
    try {
      
      const response = await api.post('/employeeModule/TabEducationalQualificationById',{employee_id:id});
      return response.data.data[0];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteEducationalQualification = createAsyncThunk(
  'educationalQualification/deleteEducationalQualification',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/employeeModule/deleteEducationalQualification',{employee_id:id});
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateEducationalQualification = createAsyncThunk(
  'educationalQualification/updateEducationalQualification',
  async (updatededucationalQualificationData, { rejectWithValue }) => {
    try {
      console.log(updatededucationalQualificationData);
      const response = await api.post('/employeeModule/edit-EducationalQualification',
        // updatededucationalQualificationData.id,
        updatededucationalQualificationData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const educationalQualificationSlice = createSlice({
  name: 'educationalQualification',
  initialState: {
    educationalQualification: {},
    educationalQualifications: [],
    error: '',
    loading: false,
  },
  extraReducers: {
    [createEducationalQualification.pending]: (state) => {
      state.loading = true;
    },
    [createEducationalQualification.fulfilled]: (state, action) => {
      state.loading = false;

      state.educationalQualifications = [...state.educationalQualifications, action.payload];
    },
    [createEducationalQualification.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getEducationalQualifications.pending]: (state) => {
      state.loading = true;
    },
    [getEducationalQualifications.fulfilled]: (state, action) => {
      state.loading = false;
      state.educationalQualifications = action.payload;
      state.educationalQualification = {};
    },
    [getEducationalQualifications.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getEducationalQualification.pending]: (state) => {
      state.loading = true;
    },
    [getEducationalQualification.fulfilled]: (state, action) => {
      state.loading = false;
      state.educationalQualification = action.payload;
    },
    [getEducationalQualification.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteEducationalQualification.pending]: (state) => {
      state.loading = true;
    },
    [deleteEducationalQualification.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.educationalQualifications = state.educationalQualifications.filter((item) => item.id !== id);
      }
    },
    [deleteEducationalQualification.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateEducationalQualification.pending]: (state) => {
      state.loading = true;
    },
    [updateEducationalQualification.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('action', action);
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        //   state.cenders = state.cenders.map((item) =>

        //      item.id === id ? item=action.payload :item = item

        //   );

        const index = state.educationalQualifications.findIndex(
          (educationalQualification) => educationalQualification.id === action.payload.id
        );
        state.educationalQualifications[index] = {
          ...state.educationalQualifications[index],
          ...action.payload,
        };
      }
    },
    [updateEducationalQualification.rejected]: (state, obj, action) => {
      console.log({ rejected: obj });
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default educationalQualificationSlice.reducer;