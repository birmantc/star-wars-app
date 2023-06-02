import { createSlice } from '@reduxjs/toolkit'

import { fetchPerson } from '../../actions/personActions'

import type { Person } from '../../models'

export interface PersonState {
  loading: boolean
  error: string | null
  data: Person | null
}

const initialState: PersonState = {
  loading: false,
  error: null,
  data: null,
}

export const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPerson.pending, (state) => {
      state.loading = true
      state.error = null
    })

    builder.addCase(fetchPerson.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload as Person
      state.error = null
    })

    builder.addCase(fetchPerson.rejected, (state, action) => {
      state.loading = false
      state.error = (action.error as string) || 'Unknown error occurred.'
    })
  },
})

export default personSlice.reducer
