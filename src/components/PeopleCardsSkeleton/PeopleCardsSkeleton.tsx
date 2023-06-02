import { cn } from '@bem-react/classname'
import React from 'react'

import Card from 'react-bootstrap/Card'

import './PeopleCardsSkeleton.scss'

const b = cn('people-cards-skeleton')

interface PeopleCardsSkeletonProps {
  count: number
}

const PeopleCardsSkeleton: React.FC<PeopleCardsSkeletonProps> = ({ count }) => {
  return (
    <div className={b('container')}>
      <div className='row'>
        {Array(count)
          .fill(0)
          .map((_, index) => {
            return (
              <div className='col-md-4 mb-4' key={index}>
                <Card bg='dark' text='light' className={b('card-skeleton')}>
                  <Card.Body className={b('card-body')}>
                    <Card.Title className={b('card-title')}>
                      <div className={b('card-skeleton-animation')}>
                        <div className={b('card-skeleton-line')}></div>
                      </div>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default PeopleCardsSkeleton
