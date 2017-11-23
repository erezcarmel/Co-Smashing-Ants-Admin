import React, { Component } from 'react';
import {
	Container,
	Label
} from 'reactstrap';
import { browserHistory } from 'react-router';
import { BarChart, Bar, XAxis, Tooltip} from 'recharts';
import GameService from '../../services/gameService';

import './style.css';

class TeamBoard extends Component {

	timeout = null;

	constructor(props) {
		super(props);

		this.state = {
			teams: []
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
		GameService.teams().then(res => {
			this.setState({
				teams: res.data
			});
		});
		this.timeout = setTimeout(this.updateScores.bind(this), 1000,);
	}

	render() {
		return (
			<div className="board team">
				<Container>
					<Label>TeamBoard</Label>

					<BarChart
						width={600}
						height={300}
						data={this.state.teams}
						barSize={20}
					>
						<pattern
							id="pattern-stripe"
							width="8"
							height="8"
							patternUnits="userSpaceOnUse"
							patternTransform="rotate(45)"
						>
							<rect width="4" height="8" transform="translate(0,0)" fill="white" />
						</pattern>
						<mask id="mask-stripe">
							<rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-stripe)" />
						</mask>

						<Tooltip />
						<XAxis dataKey="name" axisLine={false} tickLine={false}/>
						<Bar dataKey="score" fill="#f00" label={{ fontSize: 18 }} shape={<CandyBar />} />
					</BarChart>
				</Container>
			</div>
		);
	}
}

export default TeamBoard;

const CandyBar = (props) => {
	const {
		x: oX,
		y: oY,
		width: oWidth,
		height: oHeight,
		fill
	} = props;

	let x = oX;
	let y = oHeight < 0 ? oY + oHeight : oY;
	let width = oWidth;
	let height = Math.abs(oHeight);

	return (
		<rect fill={fill}
					mask='url(#mask-stripe)'
					x={x}
					y={y}
					width={width}
					height={height} />
	);
};