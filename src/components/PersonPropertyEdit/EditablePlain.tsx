import { cn } from '@bem-react/classname'
import React, { useState } from 'react'

import { Form } from 'react-bootstrap'

import './EditablePlain.scss'

const b = cn('editable-plain')

type EditablePlainProps = {
  value: string
  onChange: (value: string) => void
}

const EditablePlain: React.FC<EditablePlainProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState<string>(value)

  const handleInputChange = (event: React.ChangeEvent<any>) => {
    setInputValue(event.target.value)
    onChange(event.target.value)
  }

  return (
    <Form.Group className={b('input-group')}>
      <Form.Control className={b('input')} size='sm' type='text' value={inputValue} onChange={handleInputChange} />
    </Form.Group>
  )
}

export default EditablePlain
