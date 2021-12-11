import React from 'react'
import logo from './../img/logo_160.png'
import { Icon } from '@iconify/react'

const Nav = () => {
	return (
		<nav className="bet-cen p-3 ">
			<img src={logo} className="" alt="" />
			<Icon icon="carbon:user-avatar-filled" width="40" />
		</nav>
	)
}

export default Nav
