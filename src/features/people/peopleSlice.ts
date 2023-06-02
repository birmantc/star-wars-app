import { createSlice } from '@reduxjs/toolkit'

import { fetchPeople } from '../../actions/peopleActions'

import type { People } from '../../models'

export interface PeopleState {
  loading: boolean
  error: string | null
  data: People | null
}

const initialState: PeopleState = {
  loading: false,
  error: null,
  data: null,
}

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPeople.pending, (state) => {
      state.loading = true
      state.error = null
    })

    builder.addCase(fetchPeople.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload as People
      state.error = null
    })

    builder.addCase(fetchPeople.rejected, (state, action) => {
      state.loading = false
      state.error = (action.error as string) || 'Unknown error occurred.'
    })
  },
})

export default peopleSlice.reducer
