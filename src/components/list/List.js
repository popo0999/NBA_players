import React from 'react'
import { Table, Modal, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import PlayerCharts from './PlayerCharts'

const List = (props) => {
	const {
		rawData,
		display,
		setDisplay,
		selectTeam,
		searchText,
		search,
		whichPage,
		setTotalRows,
		setSearch,
	} = props
	const [selectedPlayer, setSelectedPlayer] = useState('')
	const [selectedPlayerData, setSelectedPlayerData] = useState([])
	const [sortBy, setSortBy] = useState('points')
	const [sorting, setSorting] = useState(false)
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const handleSearch = (data, searchText) => {
		let newData = []

		if (searchText) {
			newData = data.filter((v) => {
				// includes -> String API
				return v.name.toLowerCase().includes(searchText.toLowerCase())
			})
		} else {
			newData = [...data]
		}
		return newData
	}
	const handleSort = (data, sortBy) => {
		let newData = [...data]
		if (sorting) {
			if (sortBy === 'games') {
				newData = [...newData].sort((a, b) => a.games_played - b.games_played)
			}
			if (sortBy === 'points') {
				newData = [...newData].sort((a, b) => a.points_per_game - b.points_per_game)
			}
			if (sortBy === 'steals') {
				newData = [...newData].sort((a, b) => a.steals_per_game - b.steals_per_game)
			}
			if (sortBy === 'rebounds') {
				newData = [...newData].sort((a, b) => a.rebounds_per_game - b.rebounds_per_game)
			}
			if (sortBy === 'blocks') {
				newData = [...newData].sort((a, b) => a.blocks_per_game - b.blocks_per_game)
			}
			if (sortBy === 'assists') {
				newData = [...newData].sort((a, b) => a.assists_per_game - b.assists_per_game)
			}
		} else {
			if (sortBy === 'games') {
				newData = [...newData].sort((a, b) => b.games_played - a.games_played)
			}
			if (sortBy === 'points') {
				newData = [...newData].sort((a, b) => b.points_per_game - a.points_per_game)
			}
			if (sortBy === 'steals') {
				newData = [...newData].sort((a, b) => b.steals_per_game - a.steals_per_game)
			}
			if (sortBy === 'rebounds') {
				newData = [...newData].sort((a, b) => b.rebounds_per_game - a.rebounds_per_game)
			}
			if (sortBy === 'blocks') {
				newData = [...newData].sort((a, b) => b.blocks_per_game - a.blocks_per_game)
			}
			if (sortBy === 'assists') {
				newData = [...newData].sort((a, b) => b.assists_per_game - a.assists_per_game)
			}
		}

		return newData
	}
	const handleSelectTeam = (data, selectTeam) => {
		let newData = []

		if (selectTeam !== 'all') {
			newData = data.filter((v, i) => v.team_name === selectTeam)
		} else {
			newData = [...data]
		}

		return newData
	}
	const handlePage = (data, page) => {
		let newData = []
		newData = data.slice(page * 15 - 15, page * 15)

		return newData
	}

	useEffect(() => {
		let newData = []

		// 處理搜尋
		newData = handleSearch(rawData, searchText)

		// 處理排序
		newData = handleSort(newData, sortBy)

		// 處理選擇team
		newData = handleSelectTeam(newData, selectTeam)
		setTotalRows(newData.length)
		newData = handlePage(newData, whichPage)
		setDisplay(newData)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search, selectTeam, sortBy, whichPage, sorting])

	// player's Detail資料
	useEffect(() => {
		const playerData = rawData.filter((v) => v.name === selectedPlayer)

		setSelectedPlayerData(playerData)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedPlayer])
	const titleArr = ['games', 'points', 'rebounds', 'assists', 'steals', 'blocks']
	return (
		<div className="m-5 mainList">
			<Table striped bordered hover>
				<thead className="">
					<tr>
						<th>Team</th>
						<th>Name</th>
						{titleArr.map((v) => {
							return sortBy === v ? (
								<th
									className={'pointer changeBgc'}
									onClick={(e) => {
										setSortBy(v)
										setSorting(!sorting)
									}}
									key={v}
								>
									{v.slice(0, 1).toUpperCase() + v.slice(1).toLowerCase()}
									<Icon icon="bx:bxs-sort-alt" inline={true} />
								</th>
							) : (
								<th
									className={'pointer'}
									onClick={(e) => {
										setSortBy(v)
										setSorting(false)
									}}
									key={v}
								>
									{v.slice(0, 1).toUpperCase() + v.slice(1).toLowerCase()}
									<Icon icon="bx:bxs-sort-alt" inline={true} />
								</th>
							)
						})}

						<th>Details</th>
					</tr>
				</thead>
				<tbody>
					{display.length > 0 &&
						display.map((v, i) => {
							return (
								<tr key={v.name}>
									<td>{v.team_name}</td>
									<td>{v.name}</td>
									<td>{v.games_played}</td>
									<td>{v.points_per_game}</td>
									<td>{v.rebounds_per_game}</td>
									<td>{v.assists_per_game}</td>
									<td>{v.steals_per_game}</td>
									<td>{v.blocks_per_game}</td>

									<td className="text-center pointer">
										<Icon
											icon="icon-park-outline:view-grid-detail"
											width="30"
											onClick={() => {
												handleShow()
												setSelectedPlayer(v.name)
											}}
										/>
									</td>
								</tr>
							)
						})}
				</tbody>
			</Table>
			<Modal show={show} onHide={handleClose} className="playersModal">
				<Modal.Header closeButton>
					<Modal.Title>Player's Detail</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{selectedPlayerData.length > 0 &&
						selectedPlayerData.map((v) => {
							return (
								<div key={v.name}>
									<h5>球員能力值</h5>
									<p>將該數據以全數據的百分等級呈現</p>
									<PlayerCharts data={selectedPlayerData} rawData={rawData} />
									<div className="d-flex m-3">
										<div className="title">
											<p>Name:</p>
											<p>Team:</p>
											<p>TeamName:</p>
											<p>Games:</p>
											<p>MPG:</p>
											<p>FGA:</p>
											<p>FGM:</p>
											<p>FG% :</p>
											<p>FT%:</p>
											<p>3PA:</p>
											<p>3PM:</p>
											<p>3PT%:</p>
											<p>Points:</p>
											<p>ORebounds:</p>
											<p>DRebounds:</p>
											<p>Rebounds:</p>
											<p>Assists:</p>
											<p>Steals:</p>
											<p>Blocks:</p>
											<p>Turnovers:</p>
											<p>Efficiency:</p>
										</div>
										<div className="players ml-3">
											<p>{v.name}</p>
											<p>{v.team_acronym}</p>
											<p>{v.team_name}</p>
											<p>{v.games_played}</p>
											<p>{v.minutes_per_game}</p>
											<p>{v.field_goals_attempted_per_game}</p>
											<p>{v.field_goals_made_per_game}</p>
											<p>{v.field_goal_percentage}</p>
											<p>{v.free_throw_percentage}</p>
											<p>{v.three_point_attempted_per_game}</p>
											<p>{v.three_point_made_per_game}</p>
											<p>{v.three_point_percentage}</p>
											<p>{v.points_per_game}</p>
											<p>{v.offensive_rebounds_per_game}</p>
											<p>{v.defensive_rebounds_per_game}</p>
											<p>{v.rebounds_per_game}</p>
											<p>{v.assists_per_game}</p>
											<p>{v.steals_per_game}</p>
											<p>{v.blocks_per_game}</p>
											<p>{v.turnovers_per_game}</p>
											<p>{v.player_efficiency_rating}</p>
										</div>
									</div>
								</div>
							)
						})}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default List
