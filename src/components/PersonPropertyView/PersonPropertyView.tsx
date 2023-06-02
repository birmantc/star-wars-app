import { cn } from '@bem-react/classname'
import React from 'react'

import './PersonPropertyView.scss'

const b = cn('person-property-view')

type PersonPropertyViewProps = {
  value: string | string[]
}

const PersonPropertyView: React.FC<PersonPropertyViewProps> = ({ value }) => {
  const renderValue = (value: string) => {
    return <span className={b('value')}>{value || '-'}</span>
  }

  const renderList = (items: string[]) => {
    if (items.length === 1) {
      return renderValue(items[0])
    }

    if (!items.length) {
      return renderValue('-')
    }

    return (
      <ul className={b('list')}>
        {items.map((item, index) => (
          <li className={b('list-item')} key={index}>
            {item}
          </li>
        ))}
      </ul>
    )
  }

  if (Array.isArray(value)) {
    return renderList(value)
  } else {
    return renderValue(value)
  }
}

export default PersonPropertyView
