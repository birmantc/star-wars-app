import { cn } from '@bem-react/classname'
import debounce from 'lodash/debounce'

import React, { useEffect, useRef, ChangeEventHandler, useCallback } from 'react'

import { Pagination, InputGroup, Form, Button } from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'

import { fetchPeople } from '../../actions/peopleActions'
import PeopleCards from '../../components/PeopleCards/PeopleCards'
import PeopleCardsSkeleton from '../../components/PeopleCardsSkeleton/PeopleCardsSkeleton'

import type { RootState } from '../../store'

import './PeoplePage.scss'

const b = cn('people-page')

type PeoplePageProps = {}

const PeoplePage: React.FC<PeoplePageProps> = () => {
  const searchRef = useRef<HTMLInputElement>(null)
  const inputValue = searchRef?.current?.value

  const pageRef = useRef<number>(1)
  const setPage = useCallback((page: number) => {
    pageRef.current = page
  }, [])

  const dispatch = useDispatch()
  const peopleState = useSelector((state: RootState) => state.people)

  const resetPagination = useCallback(() => {
    setPage(1)
  }, [setPage])

  const fetchAllPeople = useCallback(() => {
    resetPagination()
    dispatch(fetchPeople({ page: 1, query: '' }) as any)
  }, [dispatch, resetPagination])

  // Init fetching
  useEffect(() => {
    fetchAllPeople()
  }, [fetchAllPeople])

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus()
    }
  }, [])

  // Fetching on search, need to reset pagination
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const query = event.target.value
    resetPagination()
    debounceFetchPeople(query)
  }

  const debounceFetchPeople = useRef(
    debounce((query: string) => {
      dispatch(fetchPeople({ page: 1, query }) as any)
    }, 1000),
  ).current

  // Fetching on clear as initial fetching
  const handleClear = () => {
    if (searchRef.current) {
      searchRef.current.value = ''
      fetchAllPeople()
    }
  }

  // Fetching on paginate
  const handlePaginate = (page: number) => {
    setPage(page)
    dispatch(fetchPeople({ page, query: inputValue || '' }) as any)
  }

  const renderContent = () => {
    if (peopleState.loading) {
      return (
        <div className={b('container', b('container'))} data-testid='people-cards-skeleton'>
          <PeopleCardsSkeleton count={10} />
        </div>
      )
    }

    if (peopleState.error) {
      console.error(peopleState.error)
      return (
        <div className={b('error-container', b('container'))}>
          <h1 className={b('title')}>See an error in console</h1>
        </div>
      )
    }

    if (!peopleState.data) {
      return (
        <div className={b('error-container', b('container'))}>
          <h1 className={b('title')}>404 Not found</h1>
        </div>
      )
    }

    if (!peopleState.data.count) {
      return (
        <div className={b('error-container', b('container'))}>
          <h1 className={b('title')}>Nothing was found</h1>
        </div>
      )
    }

    return (
      <div className={b('container')}>
        <PeopleCards people={peopleState.data.results} />
        {(peopleState.data.next || peopleState.data.previous) && (
          <Pagination size='lg' className={b('pagination')}>
            {peopleState.data.previous && (
              <Pagination.Prev className={b('pagination-item')} onClick={() => handlePaginate(pageRef.current - 1)} />
            )}
            <Pagination.Item className={b('pagination-item')} active>
              {pageRef.current}
            </Pagination.Item>
            {peopleState.data.next && (
              <Pagination.Next className={b('pagination-item')} onClick={() => handlePaginate(pageRef.current + 1)} />
            )}
          </Pagination>
        )}
      </div>
    )
  }

  return (
    <div className={b('container', 'container')}>
      <InputGroup data-bs-theme='dark'>
        <InputGroup.Text className={b('search-label')} id='search'>
          Search
        </InputGroup.Text>
        <Form.Control
          ref={searchRef}
          className={b('search')}
          size='lg'
          placeholder='R2-D2'
          aria-label='search'
          aria-describedby='search'
          onChange={handleChange}
        />
        <Button variant='outline-secondary' onClick={handleClear} disabled={!inputValue}>
          Clear
        </Button>
      </InputGroup>
      {renderContent()}
    </div>
  )
}

export default PeoplePage
