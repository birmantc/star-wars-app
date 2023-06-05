import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom/extend-expect'

import PeoplePage from './PeoplePage'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('PeoplePage', () => {
  let store: ReturnType<typeof mockStore>

  beforeEach(() => {
    store = mockStore({
      people: {
        loading: false,
        error: null,
        data: {
          count: 1,
          results: [{ name: 'Luke Skywalker', url: '/people/1' }],
        },
      },
    })
  })

  it('renders loading skeleton when loading is true', () => {
    store = mockStore({
      people: {
        loading: true,
        error: null,
        data: null,
      },
    })

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PeoplePage />
        </BrowserRouter>
      </Provider>,
    )

    const skeleton = screen.getByTestId('people-cards-skeleton')
    expect(skeleton).toBeInTheDocument()
  })

  it('renders error message when there is an error', () => {
    store = mockStore({
      people: {
        loading: false,
        error: 'An error occurred',
        data: null,
      },
    })

    const consoleErrorMock = jest.spyOn(console, 'error')
    consoleErrorMock.mockImplementation(() => {})

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PeoplePage />
        </BrowserRouter>
      </Provider>,
    )

    const errorMessage = screen.getByText('See an error in console')
    expect(errorMessage).toBeInTheDocument()

    expect(console.error).toHaveBeenCalled()

    consoleErrorMock.mockRestore()
  })

  it('renders "Not found" message when data is empty', () => {
    store = mockStore({
      people: {
        loading: false,
        error: null,
        data: { count: 0, results: [] },
      },
    })

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PeoplePage />
        </BrowserRouter>
      </Provider>,
    )

    const notFoundMessage = screen.getByText('Nothing was found')
    expect(notFoundMessage).toBeInTheDocument()
  })

  it('renders the list of people when data is available', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PeoplePage />
        </BrowserRouter>
      </Provider>,
    )

    const person = screen.getByText('Luke Skywalker')
    expect(person).toBeInTheDocument()
  })
})
