import React, { useState, useEffect } from 'react';
import PetList from './PetList.js';

export default function Cats({ token }) {
	const [catsList, setCatsList] = useState([]);

	function getCats() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://api.petfinder.com/v2/animals?type=Cat');
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
	useEffect(() => {
		getCats();
	}, []);

	return (
		<div>
			<PetList list={catsList} type='cat' />
		</div>
	);
}
