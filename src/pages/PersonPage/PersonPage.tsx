import { cn } from '@bem-react/classname'
import React, { useEffect, useState } from 'react'

import { Button, Spinner } from 'react-bootstrap'

import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { fetchPerson } from '../../actions/personActions'

import { EditableList, EditablePlain } from '../../components/PersonPropertyEdit'
import PersonPropertyView from '../../components/PersonPropertyView/PersonPropertyView'

import type { Person } from '../../models'
import type { RootState } from '../../store'

import './PersonPage.scss'

const b = cn('person-page')

type PersonPageProps = {}

const PersonPage: React.FC<PersonPageProps> = () => {
  const { id } = useParams()
  const [isEditMode, setIsEditMode] = useState(false)
  const [person, setPerson] = useState<Person | null>(null)

  const dispatch = useDispatch()
  const personState = useSelector((state: RootState) => state.person)

  useEffect(() => {
    dispatch(fetchPerson(id as string) as any)
  }, [id, dispatch])

  useEffect(() => {
    if (personState.data) {
      setPerson(personState.data)
    }
  }, [personState.data])

  const makeOnChangeProperty = (property: string) => (value: string | string[]) => {
    const preparedValue = Array.isArray(value) ? value.filter(Boolean) : value
    const newPerson = { ...person, [property]: preparedValue }
    setPerson(newPerson as Person)
  }

  const renderValue = (label: string, value: string, property: string) => {
    return (
      <div className={b('attribute')}>
        <span className={b('label')}>{label}</span>
        {isEditMode ? (
          <EditablePlain value={value} onChange={makeOnChangeProperty(property)} />
        ) : (
          <PersonPropertyView value={value || '-'} />
        )}
      </div>
    )
  }

  const renderList = (label: string, items: string[], property: string) => {
    return (
      <div className={b('attribute')}>
        <span className={b('label')}>{label}</span>
        {isEditMode ? (
          <EditableList value={items} onChange={makeOnChangeProperty(property)} />
        ) : (
          <PersonPropertyView value={items} />
        )}
      </div>
    )
  }

  const onChangeEditMode = () => {
    if (isEditMode) {
      console.log('Saved this person:', person)
    }

    setIsEditMode(!isEditMode)
  }

  const renderContent = () => {
    if (personState.loading) {
      return (
        <div className={b('spinner-container')}>
          <Spinner className={b('spinner')} animation='border' variant='light' />
        </div>
      )
    }

    if (personState.error) {
      console.error(personState.error)
      return <h1 className={b('title')}>See an error in console</h1>
    }

    if (!person || !personState.data) {
      return <h1 className={b('title')}>Not found</h1>
    }

    return (
      <div className='col-md-12'>
        <div className={b('top-panel')}>
          <h1 className={b('title')}>{person.name}</h1>
          <Button
            className={b('control-edit')}
            onClick={onChangeEditMode}
            variant={isEditMode ? 'primary' : 'outline-primary'}
            size='sm'
          >
            {isEditMode ? 'Save' : 'Edit'}
          </Button>
        </div>
        {renderValue('Height:', person.height, 'height')}
        {renderValue('Mass:', person.mass, 'mass')}
        {renderValue('Hair Color:', person.hair_color, 'hair_color')}
        {renderValue('Skin Color:', person.skin_color, 'skin_color')}
        {renderValue('Eye Color:', person.eye_color, 'eye_color')}
        {renderValue('Birth Year:', person.birth_year, 'birth_year')}
        {renderValue('Gender:', person.gender, 'gender')}
        {renderValue('Homeworld:', person.homeworld, 'homeworld')}
        {renderList('Films:', person.films, 'films')}
        {renderList('Species:', person.species, 'species')}
        {renderList('Vehicles:', person.vehicles, 'vehicles')}
        {renderList('Starships:', person.starships, 'starships')}
      </div>
    )
  }

  return <div className={b('container')}>{renderContent()}</div>
}

export default PersonPage
