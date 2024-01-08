import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://cruise-fleet-baknd.onrender.com'
const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchCars = createAsyncThunk('cars/fetchCars',
  async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/items/`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      const data = await response.data.result.items;
      return data;
    } catch (error) {
      throw new Error(error);
    }
  });

export const addCar = createAsyncThunk('cars/addCar', async (newCar) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/items/`,
      newCar,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteCar = createAsyncThunk('cars/deleteCar', async (id) => {
  try {
    await axios.delete(`${BASE_URL}/items/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return id;
  } catch (error) {
    throw new Error(error);
  }
});

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.items = state.items.filter((car) => car.id !== action.payload);
      });
  },
});

export const selectCars = (state) => state.cars.items;
export const selectCarsStatus = (state) => state.cars.status;
export const selectCarDetails = (state, carId) => state.cars.items.find((car) => car.id === carId);
export default carsSlice.reducer;
