import React, { useState } from 'react'
import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)
const PlayerCharts = (props) => {
	const { data, rawData } = props
	const dataObj = data[0]
	const playerPR = {}
	/*
    field_goal_percentage投籃命中率
    free_throw_percentage罰球率
    assists_per_game助攻
    blocks_per_game阻攻
    rebounds_per_game籃板
    points_per_game得分

    steals_per_game抄截

    PR=100－（100R－50）/N
    式中R為某分數在按大小排列的數列中的名次，N是分數的總次數或個數

	leagueData.FGP = fieldGoalAll.reduce((acc, cur) => acc + cur) / rawData.length
    */
	console.log('dataObj', dataObj)
	const dataLength = rawData.length
	const PR = (all, calc) => {
		const dataSort = all.sort((a, b) => b - a).indexOf(calc) + 1
		return Math.floor(100 - (100 * dataSort - 50) / dataLength)
	}
	// FGP
	const fieldGoalAll = rawData.map((v) => {
		return v.field_goal_percentage
	})
	playerPR.FGP = PR(fieldGoalAll, dataObj.field_goal_percentage)

	//FTP
	const freeThrowAll = rawData.map((v) => {
		return v.free_throw_percentage
	})
	playerPR.FTP = PR(freeThrowAll, dataObj.free_throw_percentage)

	// assists_per_game
	const assistsAll = rawData.map((v) => {
		return v.assists_per_game
	})
	playerPR.assists = PR(assistsAll, dataObj.assists_per_game)

	// blocks_per_game阻攻
	const blocksAll = rawData.map((v) => {
		return v.blocks_per_game
	})
	playerPR.blocks = PR(blocksAll, dataObj.blocks_per_game)

	// rebounds_per_game籃板
	const reboundsAll = rawData.map((v) => {
		return v.rebounds_per_game
	})
	playerPR.rebounds = PR(reboundsAll, dataObj.rebounds_per_game)

	// points_per_game得分
	const pointsAll = rawData.map((v) => {
		return v.points_per_game
	})
	playerPR.points = PR(pointsAll, dataObj.points_per_game)

	console.log('playerPR', playerPR)
	const options = {
		scale: {
			beginAtZero: true,
			max: 99,
			min: 1,
			stepSize: 20,
			ticks: {},
		},
	}
	const RadarData = {
		labels: [
			'FGP 投籃命中率',
			'FTP 罰球率',
			'assists 助攻',
			'blocks 阻攻',
			'rebounds 籃板',
			'points 得分',
		],
		datasets: [
			{
				label: `${dataObj.name}`,
				data: [
					playerPR.FGP,
					playerPR.FTP,
					playerPR.assists,
					playerPR.blocks,
					playerPR.rebounds,
					playerPR.points,
				],
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1,
			},
		],
	}

	return (
		<div>
			<Radar data={RadarData} options={options} min={1} />
		</div>
	)
}

export default PlayerCharts
