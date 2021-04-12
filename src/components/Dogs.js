import React, { useState, useEffect } from 'react';
import PetList from './PetList.js';

export default function Dogs({ token }) {
	const [dogsList, setDogsList] = useState([]);

	function getDogs() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://api.petfinder.com/v2/animals?type=Dog');
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader('Authorization', 'Bearer ' + token);
		xhr.onreadystatechange = function () {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status === 200) {
					let data = JSON.parse(xhr.response);
					setDogsList(data.animals);
				} else {
					alert('PROBLEM2');
				}
			}
		};
		xhr.send(null);
	}
	useEffect(() => {
		getDogs();
	}, []);

	return (
		<div>
			<PetList list={dogsList} type='dog' />
		</div>
	);
}
