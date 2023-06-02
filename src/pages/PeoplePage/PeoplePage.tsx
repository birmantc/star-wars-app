import { cn } from '@bem-react/classname'
import debounce from 'lodash/debounce'

import React, { useEffect, useState, useRef } from 'react'

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

  const dispatch = useDispatch()
  const peopleState = useSelector((state: RootState) => state.people)

  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(fetchPeople({ page, query: '' }) as any)
  }, [page, dispatch])

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus()
    }
  }, [])

  const handleChange = useRef(
    debounce((query: string) => {
      dispatch(fetchPeople({ page, query }) as any)
    }, 1000),
  ).current

  useEffect(() => {
    const inputElement = searchRef.current

    if (inputElement) {
      const eventListener = () => handleChange(inputElement.value)
      inputElement.addEventListener('input', eventListener)

      return () => {
        inputElement.removeEventListener('input', eventListener)
      }
    }
  }, [handleChange])

  const handleClear = () => {
    if (searchRef.current) {
      searchRef.current.value = ''
      dispatch(fetchPeople({ page, query: '' }) as any)
    }
  }

  const renderContent = () => {
    if (peopleState.loading) {
      return (
        <div className={b('container', b('container'))}>
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

    return (
      <div className={b('container')}>
        <PeopleCards people={peopleState.data.results} />
        {(peopleState.data.next || peopleState.data.previous) && (
          <Pagination size='lg' className={b('pagination')}>
            {peopleState.data.previous && (
              <Pagination.Prev className={b('pagination-item')} onClick={() => setPage(page - 1)} />
            )}
            <Pagination.Item className={b('pagination-item')} active>
              {page}
            </Pagination.Item>
            {peopleState.data.next && (
              <Pagination.Next className={b('pagination-item')} onClick={() => setPage(page + 1)} />
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
        />
        <Button variant='outline-secondary' onClick={handleClear}>
          Clear
        </Button>
      </InputGroup>
      {renderContent()}
    </div>
  )
}

export default PeoplePage
