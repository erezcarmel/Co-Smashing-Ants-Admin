import React, { Component } from 'react';
import {
	Container,
	Label,
	Table
} from 'reactstrap';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import GameService from '../../services/gameService';

import './style.css';

class LeadersBoard extends Component {

	timeout = null;

	constructor(props) {
		super(props);

		this.state = {
			scores: []
		};
	}

	componentDidMount() {
		if (!GameService.validateServer()) browserHistory.push('/admin');
		this.updateScores();
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
	}

	updateScores() {
		GameService.leaders().then(res => {
			this.setState({
				scores: _.orderBy(res.data, ['score'], ['desc'])
			});
		});
		this.timeout = setTimeout(this.updateScores.bind(this), 1000);
	}

	render() {
		return (
			<div className="board leaders">
				<Container>
					<Label>LeadersBoard</Label>

					<Table>
						<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Score</th>
						</tr>
						</thead>
						<tbody>
						{
							this.state.scores.map((player, index) => {
								return <tr key={index}>
									<th scope="row">{index + 1}</th>
									<td>{player.name}</td>
									<td>{player.score}</td>
								</tr>
							})
						}
						</tbody>
					</Table>
				</Container>
			</div>
		);
	}
}

export default LeadersBoard;