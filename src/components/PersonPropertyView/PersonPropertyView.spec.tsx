import { render } from '@testing-library/react'
import PersonPropertyView from './PersonPropertyView'

describe('PersonPropertyView', () => {
  it('renders a single value', () => {
    const { getByText } = render(<PersonPropertyView value='Single Value' />)
    const valueElement = getByText('Single Value')
    expect(valueElement).toBeInTheDocument()
  })

  it('renders a list of values', () => {
    const items = ['Item 1', 'Item 2', 'Item 3']
    const { getAllByRole } = render(<PersonPropertyView value={items} />)
    const listItems = getAllByRole('listitem')
    expect(listItems.length).toBe(items.length)

    listItems.forEach((item, index) => {
      expect(item).toHaveTextContent(items[index])
    })
  })

  it('renders "-" when value is empty', () => {
    const { getByText } = render(<PersonPropertyView value='' />)
    const dashElement = getByText('-')
    expect(dashElement).toBeInTheDocument()
  })

  it('renders "-" when list of values is empty', () => {
    const { getByText } = render(<PersonPropertyView value={[]} />)
    const dashElement = getByText('-')
    expect(dashElement).toBeInTheDocument()
  })

  it('renders a single value when list of values has length 1', () => {
    const { getByText } = render(<PersonPropertyView value={['Single Value']} />)
    const valueElement = getByText('Single Value')
    expect(valueElement).toBeInTheDocument()
  })
})
