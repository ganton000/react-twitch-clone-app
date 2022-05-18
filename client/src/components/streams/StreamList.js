import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams } from '../../actions';

class StreamList extends React.Component {

	componentDidMount() {
		//only renders on initialization of component
		//returns all Streams in state held by redux
		this.props.fetchStreams();
	};

	renderAdmin(stream) {
		if (stream.userId === this.props.currentUserId) {
			return (
				<div className="right floated content">
					<Link
					to={`/streams/edit/${stream.id}`}
					className="ui button primary">
						Edit
					</Link>
					<Link to={`/streams/delete/${stream.id}`}
					className="ui button negative">
						Delete
					</Link>
				</div>
			)
		}
	};

	renderCreate() {
		if (this.props.isSignedIn) {
			return (
				<div style={{ textAlign: 'right' }}>
					<Link
					className="ui button primary"
					to="/streams/new">
						Create Stream
					</Link>
				</div>
			)
		}
	};

	renderList() {
		return this.props.streams.map(stream => {
			return (
				<div
				className="item"
				key={stream.id}>
					{this.renderAdmin(stream)}
					<i className="large middle aligned icon camera" />
					<div className="content">

						<Link
						to={`/streams/${stream.id}`}
						className="header"
						>
							{stream.title}
						</Link>
						<div className="description">
							{stream.description}
						</div>
					</div>
				</div>
			)
		});
	};

	render() {
		return (
		<div>
			<h2>Streams</h2>
			<div className="ui celled list">
				{this.renderList()}
			</div>
			{this.renderCreate()}
		</div>
	)};
};

const mapStateToProps = (state) => {

	//Object.values() takes Object and inserts
	//all values inside the object into an array
	return {
		streams: Object.values(state.streams),
		currentUserId: state.auth.userId,
		isSignedIn: state.auth.isSignedIn
	}
}


export default connect(mapStateToProps,
	{ fetchStreams }
)(StreamList);