import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import thunk from 'redux-thunk'

import PersonPage from './PersonPage'
import { fetchPerson } from '../../actions/personActions'
import { RootState } from '../../store'

const middlewares = [thunk]
const mockStore = configureMockStore<RootState>(middlewares)

describe('PersonPage', () => {
  let store: MockStoreEnhanced<RootState>
  const mockPerson = {
    url: 'people/1',
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'Blond',
    skin_color: 'Fair',
    eye_color: 'Blue',
    birth_year: '19BBY',
    gender: 'Male',
    homeworld: 'Tatooine',
    films: ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi'],
    species: ['Human'],
    vehicles: ['Snowspeeder'],
    created: '',
    edited: '',
    starships: ['X-wing', 'Millennium Falcon'],
  }

  beforeEach(() => {
    store = mockStore({
      person: {
        loading: false,
        error: null,
        data: mockPerson,
      },
      people: {
        loading: false,
        error: null,
        data: null,
      },
    })
  })

  it('renders the person details when data is available', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/persons/1']}>
          <Routes>
            <Route path='/persons/:id' element={<PersonPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    )

    const personName = await screen.findByText('Luke Skywalker')
    expect(personName).toBeInTheDocument()
  })

  it('renders a not found message when person data is not available', async () => {
    store = mockStore({
      person: {
        loading: false,
        error: null,
        data: null,
      },
      people: {
        loading: false,
        error: null,
        data: null,
      },
    })

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/persons/1']}>
          <Routes>
            <Route path='/persons/:id' element={<PersonPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    )

    const notFoundMessage = await screen.findByText('Not found')
    expect(notFoundMessage).toBeInTheDocument()
  })
})
