import React from 'react'
import { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Pagination from '@mui/material/Pagination'

const Page = (props) => {
	const { setWhichPage, totalRows, whichPage } = props
	const perPage = 15
	const [totalPage, setTotalPage] = useState(0)
	useEffect(() => {
		let calcPage = Math.ceil(totalRows / perPage)
		setTotalPage(calcPage)
		setWhichPage(1)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [totalRows])
	return (
		<div className="cen-cen  m-5">
			<Pagination
				count={totalPage}
				color="primary"
				defaultPage={1}
				siblingCount={2}
				boundaryCount={1}
				page={whichPage}
				onChange={(e, page) => {
					setWhichPage(page)
				}}
			/>
		</div>
	)
}

export default withRouter(Page)
