import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThemesNames } from '../../themes/themes';

export const setGameTheme = createAsyncThunk('theme', async (data: ThemesNames, thunkAPI) => {
  try {
    thunkAPI.fulfillWithValue(data);
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось поменять тему');
  }
});

export const setDayOrNight = createAsyncThunk('theme/global', async (data: 'dark' | 'light', thunkAPI) => {
  try {
    thunkAPI.fulfillWithValue(data);
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось поменять тему');
  }
});