import React from 'react'
import logo from './../img/NBA.png'
import { Icon } from '@iconify/react'

const Nav = () => {
	return (
		<nav className="bet-cen p-3 ">
			<img src={logo} className="h-100" alt="" />
			<Icon icon="carbon:user-avatar-filled" width="40" />
		</nav>
	)
}

export default Nav
