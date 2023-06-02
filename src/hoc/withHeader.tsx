import { ReactNode } from 'react'

import Header from '../components/Header/Header'

const withHeader = (page: ReactNode) => (
  <main>
    <Header />
    {page}
  </main>
)

export default withHeader
