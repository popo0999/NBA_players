import React from 'react'
import { Icon } from '@iconify/react'

const Filter = (props) => {
	const { data, setSelectTeam, selectTeam, setSearchText, searchText, setSearch } = props
	let teamAll = []

	// 先將每個人的球隊抓出來
	for (let v of data) {
		teamAll.push(v.team_name)
	}

	// 過濾掉相同的球隊
	const teamName = teamAll.filter((v, i, arr) => {
		return arr.indexOf(v) === i
	})
	const mySubmit = (e) => {
		setSearch(true)
		e.preventDefault()
	}

	return (
		<div className="mx-5  filter p-3">
			<div className="d-flex bet-cen">
				<div className="team cen-cen">
					<p className="mr-3 mb-0">Team: </p>
					<select
						className="cen-cen"
						onChange={(e) => {
							return setSelectTeam(e.target.value)
						}}
						value={selectTeam}
					>
						<option value="all">ALL</option>
						{teamName.map((v, i) => {
							return (
								<option key={v} value={v}>
									{v}
								</option>
							)
						})}
					</select>
				</div>
				<form className="keyword">
					<input
						type="text"
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						className="searchInput"
						placeholder="search here"
					/>
					<button className="noStyleInButton p-0" onClick={mySubmit}>
						<Icon icon="carbon:search" width="22" />
					</button>
				</form>
			</div>
		</div>
	)
}

export default Filter
