import { cn } from '@bem-react/classname'
import React from 'react'

import { Link } from 'react-router-dom'

import './Header.scss'

// @ts-ignore
import { ReactComponent as Logo } from '../../images/logo.svg'

const b = cn('header')

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className={b()}>
      <Link to='/'>
        <Logo className={b('logo')} />
      </Link>
    </div>
  )
}

export default Header
