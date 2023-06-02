import { cn } from '@bem-react/classname'
import React, { useState } from 'react'

import { Button, Form, CloseButton } from 'react-bootstrap'

import './EditableList.scss'

const b = cn('editable-list')

type EditableListProps = {
  value: string[]
  onChange: (value: string[]) => void
}

const EditableList: React.FC<EditableListProps> = ({ value, onChange }) => {
  const [inputValues, setInputValues] = useState<string[]>(value)

  const handleInputChange = (event: React.ChangeEvent<any>, index: number) => {
    const newValues = [...inputValues]
    newValues[index] = event.target.value
    setInputValues(newValues)
    onChange(newValues)
  }

  const handleAddItem = () => {
    const newValues = [...inputValues, '']
    setInputValues(newValues)
    onChange(newValues)
  }

  const handleDeleteItem = (index: number) => {
    const newValues = inputValues.filter((_, i) => i !== index)
    setInputValues(newValues)
    onChange(newValues)
  }

  const renderInputList = () => {
    return (
      <Form.Group>
        {inputValues.map((item, index) => (
          <div key={index} className={b('edit-item')}>
            <Form.Control
              className={b('input')}
              size='sm'
              type='text'
              value={item}
              onChange={(e) => handleInputChange(e, index)}
            />
            <CloseButton variant='white' onClick={() => handleDeleteItem(index)} />
          </div>
        ))}
      </Form.Group>
    )
  }

  return (
    <div className={b('list-container')}>
      {renderInputList()}
      <Button className={b('control')} size='sm' variant='primary' onClick={handleAddItem}>
        +
      </Button>
    </div>
  )
}

export default EditableList
