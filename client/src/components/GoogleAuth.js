import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

	componentDidMount() {

		const clientId = process.env.REACT_APP_Client_Id;

		//window scopes the gapi.load() method to load client library into gapi
		window.gapi.load('client:auth2', ()=> {
			window.gapi.client.init({
				client_id:clientId,
				scope: 'email',
				plugin_name: "streamy"
			})
			.then(() => {
				this.auth = window.gapi.auth2.getAuthInstance();

				//Updates redux state in auth store
				this.onAuthChange(this.auth.isSignedIn.get());
				//Listen for changes
				this.auth.isSignedIn.listen(this.onAuthChange);
			})
		});

	};

	onAuthChange = isSignedIn => {

		if (isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};

	onSignInClick = () => {
		this.auth.signIn();
	}

	onSignOutClick = () => {
		this.auth.signOut();
	}

	renderAuthButton() {

		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return(
			<button
			onClick={this.onSignOutClick}
			className="ui red google button">
				<i className="google icon" />
				Sign Out
			</button>)
		} else {
			return (
			<button
			onClick={this.onSignInClick}
			className="ui green google button">
			<i className="google icon" />
			Sign In with Google
		</button>)
		}
	}

	render() {
		return(
			<div>
				{this.renderAuthButton()}
			</div>
		)
	}
};

const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn }
};

export default connect(mapStateToProps,
	{ signIn, signOut }
)(GoogleAuth);