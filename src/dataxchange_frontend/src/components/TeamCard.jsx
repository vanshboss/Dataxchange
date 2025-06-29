import React from 'react';

export default function TeamCard({ name, role, image }) {
  return (
    <div className="team-card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>{role}</p>
    </div>
  );
}
