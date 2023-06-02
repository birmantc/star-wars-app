import { createAsyncThunk } from '@reduxjs/toolkit'

import swapi from '../services/swapi'

import type { SearchParams } from '../models'

export const fetchPeople = createAsyncThunk('person/fetchPeople', async ({ page, query }: SearchParams, thunkAPI) => {
  try {
    const data = await swapi.fetchPeople(page, query)

    return data
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message)
  }
})
