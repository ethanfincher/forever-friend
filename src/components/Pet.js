import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';

export default function Pet({ match, token, type }) {
	const [pet, setPet] = useState();

	function getPet() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', `https://api.petfinder.com/v2/animals/${match.params.ID}`);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader('Authorization', 'Bearer ' + token);
		xhr.onreadystatechange = function () {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status === 200) {
					let data = JSON.parse(xhr.response);
					setPet(data.animal);
					console.log(typeof data.animal.breeds);
				} else {
					alert('PROBLEM3');
				}
			}
		};
		xhr.send(null);
	}

	useEffect(() => {
		getPet();
	}, []);

	console.log(pet);
	if (!pet) {
		return <p>rendering</p>;
	}
	return (
		<div>
			<h2>{pet.name}</h2>
			{pet.breeds.mixed === true ? (
				<h5>
					Breed: mix between {pet.breeds.primary} and{' '}
					{pet.breeds.secondary !== null ? `${pet.breeds.secondary}` : 'unkown'}
				</h5>
			) : (
				<h5>Breed: {pet.breeds.primary}</h5>
			)}
			{pet.photos.length !== 0 ? (
				<img src={pet.photos[0].full} alt=''></img>
			) : (
				<p>no pictures available</p>
			)}
			<ul>
				<li>Age: {pet.age}</li>
				<li>Gender: {pet.gender}</li>
				<li>Size: {pet.size}</li>
				<li>
					Spayed/Neutered:
					{pet.attributes.spayed_neutered === true ? 'yes' : 'no'}
				</li>
				<li>
					House Trained: {pet.attributes.house_trained === true ? 'yes' : 'no'}
				</li>
				{type === 'cat' ? (
					<li>Declawed: {pet.attributes.declawed === true ? 'yes' : 'no'}</li>
				) : null}
				<li>
					Special Needs: {pet.attributes.special_needs === true ? 'yes' : 'no'}
				</li>
				<li>
					Spayed/Neutered:{' '}
					{pet.attributes.shots_current === true ? 'yes' : 'no'}
				</li>
			</ul>
			<div>
				<h4>Contact Info</h4>
				{pet.contact.address.adress1 ? (
					<p>
						Address: {pet.contact.address.adress1}, {pet.contact.address.city},{' '}
						{pet.contact.address.state}
					</p>
				) : (
					'No address given'
				)}
				<p>Email: {pet.contact.email}</p>
				<p>Phone Number: {pet.contact.phone}</p>
			</div>
		</div>
	);
}
