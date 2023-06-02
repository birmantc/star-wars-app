import { createAsyncThunk } from '@reduxjs/toolkit'

import swapi from '../services/swapi'

export const fetchPerson = createAsyncThunk('person/fetchPerson', async (id: string, thunkAPI) => {
  try {
    const data = await swapi.fetchPerson(id)

    return data
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message)
  }
})
