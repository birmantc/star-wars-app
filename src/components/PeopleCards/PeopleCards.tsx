import { cn } from '@bem-react/classname'
import React from 'react'

import Card from 'react-bootstrap/Card'

import { Link } from 'react-router-dom'

import type { PersonOverall } from '../../models'

import './PeopleCards.scss'

const b = cn('people-cards')

interface PeopleCardsProps {
  people: PersonOverall[]
}

const PeopleCards: React.FC<PeopleCardsProps> = ({ people }) => {
  return (
    <div className={b('container')}>
      <div className='row'>
        {people.map((person) => {
          const match = person.url.match(/people\/(\d*)/)

          if (!match) {
            return null
          }

          const id = match[1]

          return (
            <div className='col-md-4 mb-4' key={id}>
              <Link to={`/people/${id}`} className={b('link')}>
                <Card bg='dark' text='light' className={b('card')}>
                  <Card.Body>
                    <Card.Title>{person.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PeopleCards
