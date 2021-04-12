import React, { useState, useEffect } from 'react';
import PetList from './PetList.js';
import '../styles/DogOrCat.css';

export default function Cats({ token }) {
	const [catsList, setCatsList] = useState([]);
    const [location, setLocation] = useState('60014');

	function getCats() {
		var xhr = new XMLHttpRequest();
		xhr.open(
			'GET',
			`https://api.petfinder.com/v2/animals?type=Cat&status=adoptable&location=${location}`
		);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader('Authorization', 'Bearer ' + token);
		xhr.onreadystatechange = function () {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status === 200) {
					let data = JSON.parse(xhr.response);
					setCatsList(data.animals);
				} else {
					alert('PROBLEM2');
				}
			}
		};
		xhr.send(null);
	}

    function onChange(event) {
			setLocation(event.target.value);
			console.log(location);
		}
		function onSubmit(event) {
			event.preventDefault();
			console.log(location);
			getCats();
		}

	useEffect(() => {
		getCats();
	}, []);

	return (
		<div>
			<form onSubmit={onSubmit}>
				<label className='formLabel'>
					Enter your zip code here to find pets around you!
				</label>
				<br />
				<br />
				<input type='text' onChange={onChange} placeholder='ZIP'></input>
				<button type='submit'>Find a Friend!</button>
			</form>
			<PetList list={catsList} type='cat' />
		</div>
	);
}
