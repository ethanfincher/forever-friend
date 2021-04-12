import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import '../styles/Pet.css'

export default function Pet({ match, token, type }) {
	const [pet, setPet] = useState();

	function getPet() {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', `https://api.petfinder.com/v2/animals/${match.params.ID}?location=60014`);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader('Authorization', 'Bearer ' + token);
		xhr.onreadystatechange = function () {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status === 200) {
					let data = JSON.parse(xhr.response);
					setPet(data.animal);
					console.log(data.animal);
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
			<h2 className='bigPetName'>{pet.name}</h2>
			{pet.breeds.mixed === true ? (
				<h5 className='bigBreed'>
					Breed: mix between {pet.breeds.primary} and{' '}
					{pet.breeds.secondary !== null ? `${pet.breeds.secondary}` : 'unkown'}
				</h5>
			) : (
				<h5 className='bigBreed'>Breed: {pet.breeds.primary}</h5>
			)}
			{pet.photos.length !== 0 ? (
				<img src={pet.photos[0].full} alt='' className='bigPetImage'></img>
			) : (
				<p>No pictures available</p>
			)}
			<ul>
				<li>Age: {pet.age}</li>
				<li>Gender: {pet.gender}</li>
				<li>Size: {pet.size}</li>
				<li>
					Spayed/Neutered:{' '}
					{pet.attributes.spayed_neutered === true ? 'Yes' : 'No'}
				</li>
				<li>
					House Trained: {pet.attributes.house_trained === true ? 'Yes' : 'No'}
				</li>
				{type === 'cat' ? (
					<li>Declawed: {pet.attributes.declawed === true ? 'Yes' : 'No'}</li>
				) : null}
				<li>
					Special Needs: {pet.attributes.special_needs === true ? 'Yes' : 'No'}
				</li>
				<li>
					Spayed/Neutered:{' '}
					{pet.attributes.shots_current === true ? 'Yes' : 'No'}
				</li>
			</ul>
			<h4>Contact Info</h4>
			<div className='contactInfo'>
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
				{pet.distance ? <p>distance from zip</p> : ''}
			</div>
		</div>
	);
}
