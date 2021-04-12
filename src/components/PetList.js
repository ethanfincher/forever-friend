import React from 'react';
import { Route, Link } from 'react-router-dom';
import Pet from './Pet.js';

export default function PetList({ list, type }) {
	let petList = list;
	return (
		<div>
			{petList.map((pet) => {
				const link = `/${type}s/${pet.id}`;

				return (
					<div>
						<h2>{pet.name}</h2>
						{pet.breeds.mixed ? (
							<h5>
								Breed: mix between {pet.breeds.primary} and{' '}
								{pet.breeds.secondary}
							</h5>
						) : (
							<h5>Breed: {pet.breeds.primary}</h5>
						)}
                        <p>Distance from ZIP: {pet.distance} mi</p>
						{pet.photos.length !== 0 ? (
							<img src={pet.photos[0].full} alt=''></img>
						) : (
							<p>no pictures available</p>
						)}<br/>
						<Link to={link}>
							<button>check them out!</button>
						</Link>
					</div>
				);
			})}
		</div>
	);
}
