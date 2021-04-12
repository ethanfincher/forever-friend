import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Dogs from './components/Dogs.js';
import Cats from './components/Cats.js';
import './App.css';
import Pet from './components/Pet.js';
const dotenv = require('dotenv').config();

function App() {
	console.log(process.env.REACT_APP_API_KEY);
	console.log(process.env.REACT_APP_SECRET);
	const [token, setToken] = useState('');

	var data_object = {
		grant_type: 'client_credentials',
		client_id: process.env.REACT_APP_API_KEY,
		client_secret: process.env.REACT_APP_SECRET,
	};

	function getToken() {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'https://api.petfinder.com/v2/oauth2/token', true);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = function () {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status === 200) {
					let data = JSON.parse(xhr.response);
					setToken(data.access_token);
				} else {
					alert('PROBLEM');
				}
			}
		};
		xhr.send(
			'grant_type=client_credentials&client_id=' +
				data_object.client_id +
				'&client_secret=' +
				data_object.client_secret
		);
	}

	useEffect(() => {
		getToken();
	}, []);

	return (
		<div className='App'>
			<h1>Welcome to Forever Friend!</h1>
			<Link to='/cats'>
				<button>cats</button>
			</Link>
			<Link to='/dogs'>
				<button>dogs</button>
			</Link>

			<Switch>
				<Route
					path='/dogs/:ID'
					render={(props) => (
						<Pet {...props} token={token} type='dog' />
					)}></Route>
				<Route
					path='/cats/:ID'
					render={(props) => (
						<Pet {...props} token={token} type='cat' />
					)}></Route>
				<Route exact path='/dogs'>
					<Dogs token={token} />
				</Route>
				<Route exact path='/cats'>
					<Cats token={token} />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
