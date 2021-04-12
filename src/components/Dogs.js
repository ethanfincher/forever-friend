import React, { useState, useEffect } from 'react';
import PetList from './PetList.js';

export default function Dogs({ token }) {
	const [dogsList, setDogsList] = useState([]);
    const [location, setLocation] = useState('60014')

	function getDogs() {
		var xhr = new XMLHttpRequest();
		xhr.open(
			'GET',
			`https://api.petfinder.com/v2/animals?type=Dog&status=adoptable&location=${location}`
		);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader('Authorization', 'Bearer ' + token);
		xhr.onreadystatechange = function () {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status === 200) {
					let data = JSON.parse(xhr.response);
					setDogsList(data.animals);
                    console.log(data.animals[0].distance)
				} else {
					alert('PROBLEM2');
				}
			}
		};
		xhr.send(null);
	}

    function onChange(event){
        setLocation(event.target.value)
        console.log(location)
    }
    function onSubmit(event){
        event.preventDefault();
        console.log(location)
        getDogs()
    }

	useEffect(() => {
		getDogs();
	}, []);

	return (
		<div>
            <form onSubmit = {onSubmit}>
                <label>Enter your zip code here to find pets around you!</label><br/>
                <input type = 'text' onChange = {onChange} placeholder = 'ZIP'></input>
                <button type = 'submit'>Find a Friend!</button>
            </form>
			<PetList list={dogsList} type='dog' />
		</div>
	);
}
