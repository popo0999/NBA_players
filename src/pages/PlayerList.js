import React from 'react'
import { useState } from 'react'
import Charts from '../components/list/Charts'
import Filter from '../components/list/Filter'
import List from '../components/list/List'
import Menu from '../components/list/Menu'
import Page from '../components/list/Page'

const PlayerList = (props) => {
	const { data } = props
	// eslint-disable-next-line no-unused-vars
	const [rawData, setRawData] = useState(data)
	const [display, setDisplay] = useState(data)
	const [selectTeam, setSelectTeam] = useState('all')
	const [search, setSearch] = useState(false)
	const [searchText, setSearchText] = useState('')
	const [whichPage, setWhichPage] = useState(1)
	const [totalRows, setTotalRows] = useState(0)

	return (
		<>
			<Menu />
			<Charts data={data} rawData={rawData} />
			<Filter
				data={data}
				setSelectTeam={setSelectTeam}
				selectTeam={selectTeam}
				searchText={searchText}
				setSearchText={setSearchText}
				search={search}
				setSearch={setSearch}
			/>
			<List
				data={data}
				rawData={rawData}
				display={display}
				setDisplay={setDisplay}
				selectTeam={selectTeam}
				searchText={searchText}
				setSearchText={setSearchText}
				search={search}
				setSearch={setSearch}
				whichPage={whichPage}
				setWhichPage={setWhichPage}
				totalRows={totalRows}
				setTotalRows={setTotalRows}
			/>
			<Page
				display={display}
				whichPage={whichPage}
				setWhichPage={setWhichPage}
				totalRows={totalRows}
				setTotalRows={setTotalRows}
			/>
		</>
	)
}

export default PlayerList
