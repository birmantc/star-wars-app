import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import peopleReducer from './features/people/peopleSlice'
import personReducer from './features/person/personSlice'

export const store = configureStore({
  reducer: {
    person: personReducer,
    people: peopleReducer,
  },
  middleware: [thunk],
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
