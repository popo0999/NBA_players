import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import data from './players.json'

// page
import PlayerList from './pages/PlayerList'
import Team from './pages/Team'

const App = () => {
	return (
		<Router>
			<>
				<Nav />
				<Switch>
					<Route exact path="/">
						<PlayerList data={data} />
					</Route>
					<Route exact path="/NBA_players">
						<PlayerList data={data} />
					</Route>
					<Route exact path="/NBA_team">
						<Team />
						<PlayerList data={data} />
					</Route>
				</Switch>
			</>
		</Router>
	)
}

export default App
