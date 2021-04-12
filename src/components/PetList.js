import React from 'react';
import { Route, Link } from 'react-router-dom';
import Pet from './Pet.js';
import '../styles/PetList.css'

export default function PetList({ list, type }) {
	let petList = list;
	return (
		<div>
			{petList.map((pet) => {
				const link = `/${type}s/${pet.id}`;

				return (
					<div className = 'petCard'>
						<h2 className = 'petName'>{pet.name}</h2>
						{pet.breeds.mixed ? (
							<h5 className = 'breed'>
								Breed: mix between {pet.breeds.primary} and{' '}
								{pet.breeds.secondary}
							</h5>
						) : (
							<h5 className = 'breed'>Breed: {pet.breeds.primary}</h5>
						)}
                        <p>Distance from ZIP: {pet.distance} mi</p>
						{pet.photos.length !== 0 ? (
							<img src={pet.photos[0].full} alt='' className = 'petImage'></img>
						) : (
							<p>no pictures available</p>
						)}<br/>
						<Link to={link}>
							<button className = 'hello'>Say Hello!</button>
						</Link>
					</div>
				);
			})}
		</div>
	);
}
